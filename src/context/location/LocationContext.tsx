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
  createLocation: (location: ILocation) => Promise<void>;
  updateLocation: (_id: string, location: ILocation) => Promise<void>;
  deleteLocation: (_id: string) => Promise<void>;
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
  createLocation: async () => {},
  updateLocation: async () => {},
  deleteLocation: async () => {}
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
    apiCall: () => Promise<any>,
    onSuccess: (data: any) => void,
    requestType: keyof typeof loading // 'getAll', 'create', 'update', 'delete'
  ) => {
    setLoading(prev => ({ ...prev, [requestType]: true }));
    setError(null);
    try {
      const response = await apiCall();
      onSuccess(response.data);
    } catch (err: any) {
      handleError(err);
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
  //Get By Id
  const getLocationById = useCallback(
    (id: string) => {
      return locations.find(location => location._id === id);
    },
    [locations]
  );

  // Post
  const createLocation = useCallback(
    async (location: ILocation): Promise<void> => {
      await fetchData(
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

  // Put
  const updateLocation = useCallback(
    async (id: string, location: ILocation): Promise<void> => {
      await fetchData(
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

  // Delete
  const deleteLocation = useCallback(async (id: string): Promise<void> => {
    await fetchData(
      () => deleteLocationApi(id),
      () =>
        setLocations(prevLocations =>
          prevLocations.filter(location => location._id !== id)
        ),
      'delete'
    );
  }, []);

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

