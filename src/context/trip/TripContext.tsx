import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { ITrip } from '../../types/type/trip/trip';
import {
  createTripApi,
  deleteTripApi,
  getAllTripsApi,
  updateTripApi,
  filterTripsByVehicleCatalogIdApi
} from '../../axios/api/tripApi';

interface TripContextType {
  trips: ITrip[];
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    filter: boolean;
  };
  error: string | null;
  getAllTrips: () => void;
  getTripById: (_id: string) => ITrip | undefined;
  createTrip: (trip: ITrip) => Promise<void>;
  updateTrip: (_id: string, trip: ITrip) => Promise<void>;
  deleteTrip: (_id: string) => Promise<void>;
  filterTripsByVehicleCatalogId: (vehicle_catalog_id: string) => void;
}

const defaultContextValue: TripContextType = {
  trips: [],
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false,
    filter: false
  },
  error: null,
  getAllTrips: () => {},
  getTripById: () => undefined,
  createTrip: async () => {},
  updateTrip: async () => {},
  deleteTrip: async () => {},
  filterTripsByVehicleCatalogId: () => {}
};

export const TripContext = createContext<TripContextType>(defaultContextValue);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [loading, setLoading] = useState<{
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    filter: boolean;
  }>({
    getAll: false,
    create: false,
    update: false,
    delete: false,
    filter: false
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
  const getAllTrips = useCallback(() => {
    fetchData(getAllTripsApi, data => setTrips(data.trips || []), 'getAll');
  }, []);

  // Get By Id
  const getTripById = useCallback(
    (id: string) => {
      return trips.find(trip => trip._id === id);
    },
    [trips]
  );

  // Post
  const createTrip = useCallback(async (trip: ITrip): Promise<void> => {
    await fetchData(
      () => createTripApi(trip),
      data => {
        if (data.savedTrip) {
          setTrips(prevTrips => [...prevTrips, data.savedTrip]);
        }
      },
      'create'
    );
  }, []);

  // Put
  const updateTrip = useCallback(
    async (id: string, trip: ITrip): Promise<void> => {
      await fetchData(
() => updateTripApi(id, trip),
        data => {
          if (data.trip) {
            setTrips(prevTrips =>
              prevTrips.map(trp => (trp._id === id ? data.trip : trp))
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete
  const deleteTrip = useCallback(async (id: string): Promise<void> => {
    await fetchData(
      () => deleteTripApi(id),
      () => setTrips(prevTrips => prevTrips.filter(trip => trip._id !== id)),
      'delete'
    );
  }, []);
  // Filter By Vehicle Catalog ID
  const filterTripsByVehicleCatalogId = useCallback(
    (vehicle_catalog_id: string) => {
      fetchData(
        () => filterTripsByVehicleCatalogIdApi(vehicle_catalog_id),
        data => setTrips(data.trips || []),
        'filter'
      );
    },
    []
  );
  useEffect(() => {
    getAllTrips();
  }, [getAllTrips]);

  return (
    <TripContext.Provider
      value={{
        trips,
        loading,
        error,
        getAllTrips,
        getTripById,
        createTrip,
        updateTrip,
        deleteTrip,
        filterTripsByVehicleCatalogId
      }}
    >
      {children}
    </TripContext.Provider>
  );
};