import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { ISeat } from '../../types/type/seat/seat';
import {
  createSeatApi,
  deleteSeatApi,
  getSeatsApi,
  updateSeatApi,
  searchSeatsByVehicleNameApi
} from '../../axios/api/seatApi';

interface SeatContextType {
  seats: ISeat[];
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    filter: boolean;
  };
  error: string | null;
  getAllSeats: () => void;
  getSeatById: (_id: string) => ISeat | undefined;
  createSeat: (seat: ISeat) => Promise<void>;
  updateSeat: (_id: string, seat: ISeat) => Promise<void>;
  deleteSeat: (_id: string) => Promise<void>;
  searchSeatsByName: (filterParams: Record<string, string>) => Promise<ISeat[]>;
}

const defaultContextValue: SeatContextType = {
  seats: [],
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false,
    filter: false,
  },
  error: null,
  getAllSeats: () => {},
  getSeatById: () => undefined,
  createSeat: async () => {},
  updateSeat: async () => {},
  deleteSeat: async () => {},
  searchSeatsByName:  async () => [],
};

export const SeatContext = createContext<SeatContextType>(defaultContextValue);

export const SeatProvider = ({ children }: { children: ReactNode }) => {
  const [seats, setSeats] = useState<ISeat[]>([]);
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
    requestType: keyof typeof loading // 'getAll', 'create', 'update', 'delete', 'filter'
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
  const getAllSeats = useCallback(() => {
    fetchData(getSeatsApi, data => setSeats(data.seats || []), 'getAll');
  }, []);

  // Get By Id
  const getSeatById = useCallback(
    (id: string) => {
      return seats.find(seat => seat._id === id);
    },
    [seats]
  );

  // Post
  const createSeat = useCallback(async (seat: ISeat): Promise<void> => {
    await fetchData(
      () => createSeatApi(seat),
      data => {
        if (data.savedSeat) {
          setSeats(prevSeats => [...prevSeats, data.savedSeat]);
        }
      },
      'create'
    );
  }, []);

  // Put
  const updateSeat = useCallback(
    async (id: string, seat: ISeat): Promise<void> => {
      await fetchData(
        () => updateSeatApi(id, seat),
        data => {
          if (data.seat) {
            setSeats(prevSeats =>
              prevSeats.map(s => (s._id === id ? data.seat : s))
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete
  const deleteSeat = useCallback(async (id: string): Promise<void> => {
    await fetchData(
      () => deleteSeatApi(id),
      () => setSeats(prevSeats => prevSeats.filter(seat => seat._id !== id)),
      'delete'
    );
  }, []);

//
  const searchSeatsByName = useCallback(
    async (filterParams: Record<string, string>): Promise<ISeat[]> => {
      await fetchData(
        () => searchSeatsByVehicleNameApi(filterParams),
        data => {
          setSeats(data.seats || []);
        },
        'filter'
      );
      return seats;
    },
    [seats]
  );

  useEffect(() => {
    getAllSeats();
  }, [getAllSeats]);

  return (
    <SeatContext.Provider
      value={{
        seats,
        loading,
        error,
        getAllSeats,
        getSeatById,
        createSeat,
        updateSeat,
        deleteSeat,
        searchSeatsByName
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
