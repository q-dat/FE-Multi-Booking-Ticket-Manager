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
  getLocationByIdApi,
  updateLocationApi
} from '../../axios/api/locationApi';

interface LocationContextType {
  locations: ILocation[];
  loading: boolean;
  error: string | null;
  getAllLocations: () => void;
  getLocationById: (_id: string) => void;
  createLocation: (location: ILocation) => Promise<void>;
  updateLocation: (_id: string, location: ILocation) => Promise<void>;
  deleteLocation: (_id: string) => Promise<void>;
}

const defaultContextValue: LocationContextType = {
  locations: [],
  loading: false,
  error: null,
  getAllLocations: () => {},
  getLocationById: () => {},
  createLocation: async () => {},
  updateLocation: async () => {},
  deleteLocation: async () => {}
};

export const LocationContext =
  createContext<LocationContextType>(defaultContextValue);

export const LocationProv_ider = ({ children }: { children: ReactNode }) => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Lỗi cục bộ!');
  };

  const fetchData = async (
    apiCall: () => Promise<any>,
    onSuccess: (data: any) => void
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall();
      onSuccess(response.data);
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  //Get All
  const getAllLocations = useCallback(() => {
    fetchData(getAllLocationsApi, data => setLocations(data.locations || []));
  }, []);

  //Get By _ID
  const getLocationById = useCallback((_id: string) => {
    fetchData(
      () => getLocationByIdApi(_id),
      data => {
        setLocations([data.location]);
      }
    );
  }, []);

  //Post
  const createLocation = useCallback(
    async (location: ILocation): Promise<void> => {
      await fetchData(
        () => createLocationApi(location),
        data => setLocations(prevLocations => [...prevLocations, data.location])
      );
    },
    []
  );

  //Put
  const updateLocation = useCallback(
    async (_id: string, location: ILocation): Promise<void> => {
      await fetchData(
        () => updateLocationApi(_id, location),
        data =>
          setLocations(prevLocations =>
            prevLocations.map(location =>
              location._id === _id ? data.location : location
            )
          )
      );
    },
    []
  );

  //Delete
  const deleteLocation = useCallback(async (_id: string): Promise<void> => {
    await fetchData(
      () => deleteLocationApi(_id),
      () =>
        setLocations(prevLocations =>
          prevLocations.filter(location => location._id !== _id)
        )
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

