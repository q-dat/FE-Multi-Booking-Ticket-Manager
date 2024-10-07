import { createContext, useState, ReactNode } from 'react';
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
  getLocationById: (id: string) => void;
  createLocation: (location: ILocation) => void;
  updateLocation: (id: string, location: ILocation) => void;
  deleteLocation: (id: string) => void;
}

export const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

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
  //Get
  const getAllLocations = () => {
    if (isFetching) return;
    setIsFetching(true);
    fetchData(getAllLocationsApi, data =>
      setLocations(data.locations || [])
    ).finally(() => setIsFetching(false));
  };
  //Get By ID
  const getLocationById = (id: string) => {
    fetchData(
      () => getLocationByIdApi(id),
      data => setLocations([data.location])
    );
  };
  //Post
  const createLocation = (location: ILocation) => {
    fetchData(
      () => createLocationApi(location),
      data => setLocations(prevLocations => [...prevLocations, data.location])
    );
  };
  //Put
  const updateLocation = (id: string, location: ILocation) => {
    fetchData(
      () => updateLocationApi(id, location),
      data =>
        setLocations(prevLocations =>
          prevLocations.map(t => (t._id === id ? data.location : t))
        )
    );
  };
  //Delete
  const deleteLocation = (id: string) => {
    fetchData(
      () => deleteLocationApi(id),
      () =>
        setLocations(prevLocations => prevLocations.filter(t => t._id !== id))
    );
  };

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
