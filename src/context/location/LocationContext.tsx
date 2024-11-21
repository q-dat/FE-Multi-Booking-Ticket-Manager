import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { ILocation } from '../../types/type/location/location';
import {
  createLocationApi,
  deleteLocationApi,
  getAllLocationsApi,
  updateLocationApi
} from '../../axios/api/locationApi';
import { AxiosResponse } from 'axios';
interface LocationContextType {
  locations: ILocation[];
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllLocations: () => void;
  getLocationById: (_id: string) => ILocation | undefined;
  createLocation: (location: ILocation) => Promise<AxiosResponse<any>>;
  updateLocation: (
    _id: string,
    location: ILocation
  ) => Promise<AxiosResponse<any>>;
  deleteLocation: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: LocationContextType = {
  locations: [],
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllLocations: () => {},
  getLocationById: () => undefined,
  createLocation: async () =>
    ({ data: { savedLocation: null } }) as AxiosResponse,
  updateLocation: async () => ({ data: { location: null } }) as AxiosResponse,
  deleteLocation: async () => ({ data: { deleted: true } }) as AxiosResponse
};

export const LocationContext =
  createContext<LocationContextType>(defaultContextValue);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [loading, setLoading] = useState<{
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  }>({
    getAll: false,
    create: false,
    update: false,
    delete: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Lỗi cục bộ!');
  };

  const fetchData = async (
    apiCall: () => Promise<AxiosResponse<any>>,
    onSuccess: (data: any) => void,
    requestType: keyof typeof loading // 'getAll', 'create', 'update', 'delete'
  ): Promise<AxiosResponse<any>> => {
    setLoading(prev => ({ ...prev, [requestType]: true }));
    setError(null);
    try {
      const response = await apiCall();
      onSuccess(response.data);
      return response;
    } catch (err: any) {
      handleError(err);
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, [requestType]: false }));
    }
  };

  // Get All
  const getAllLocations = useCallback(() => {
    fetchData(
      getAllLocationsApi,
      data => setLocations(data.locations || []),
      'getAll'
    );
  }, []);

  // Get By Id
  const getLocationById = useCallback(
    (id: string) => {
      return locations.find(location => location._id === id);
    },
    [locations]
  );

  // Create Location
  const createLocation = useCallback(
    async (location: ILocation): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createLocationApi(location),
        data => {
          if (data.savedLocation) {
            setLocations(prevLocations => [
              ...prevLocations,
              data.savedLocation
            ]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update Location
  const updateLocation = useCallback(
    async (id: string, location: ILocation): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updateLocationApi(id, location),
        data => {
          if (data.location) {
            setLocations(prevLocations =>
              prevLocations.map(loc => (loc._id === id ? data.location : loc))
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete Location
  const deleteLocation = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deleteLocationApi(id),
        () =>
          setLocations(prevLocations =>
            prevLocations.filter(location => location._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllLocations();
  }, [getAllLocations]);

  return (
    <LocationContext.Provider
      value={{
        locations,
        loading,
        error,
        getAllLocations,
        getLocationById,
        createLocation,
        updateLocation,
        deleteLocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
