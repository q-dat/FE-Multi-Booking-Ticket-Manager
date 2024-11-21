import { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { ISeat } from '../../types/type/seat/seat';
import {
  createSeatApi,
  deleteSeatApi,
  getSeatsApi,
  updateSeatApi,
  searchSeatsByVehicleNameApi,
  getListIdByVehicleNameApi,
  createMultipleSeatsApi,
  deleteSeatsByCatalogIdApi
} from '../../axios/api/seatApi';
import { AxiosResponse } from 'axios';

interface SeatContextType {
  seats: ISeat[];
  seatIds: string[];
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    filter: boolean;
    getListIdByVehicleName: boolean;
    createMultipleSeats: boolean;
    deleteSeatsByCatalogId: boolean;
  };
  error: string | null;
  getAllSeats: () => void;
  getSeatById: (_id: string) => ISeat | undefined;
  createSeat: (seat: ISeat) => Promise<AxiosResponse<any>>;
  updateSeat: (_id: string, seat: ISeat) => Promise<AxiosResponse<any>>;
  deleteSeat: (_id: string) => Promise<AxiosResponse<any>>;
  searchSeatsByName: (filterParams: Record<string, string>) => Promise<ISeat[]>;
  getListIdByVehicleName: (vehicleName: string) => Promise<void>; // Giữ kiểu Promise<void>
  createMultipleSeats: (data: {
    quantity: number;
    seatCatalogId: string;
    price: number;
  }) => Promise<AxiosResponse<any>>;
  deleteSeatsByCatalogId: (seatCatalogId: string) => Promise<AxiosResponse<any>>;
}


const defaultContextValue: SeatContextType = {
  seats: [],
  seatIds: [],
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false,
    filter: false,
    getListIdByVehicleName: false,
    createMultipleSeats: false,
    deleteSeatsByCatalogId: false
  },
  error: null,
  getAllSeats: () => {},
  getSeatById: () => undefined,
  createSeat: async () =>
    ({ data: { savedSeat: null } }) as AxiosResponse,
  updateSeat: async () =>
    ({ data: { seat: null } }) as AxiosResponse,
  deleteSeat: async () =>
    ({ data: { deleted: true } }) as AxiosResponse,
  searchSeatsByName: async () => [],
  getListIdByVehicleName: async () => {},
  createMultipleSeats: async () =>
    ({ data: { savedSeats: [] } }) as AxiosResponse,
  deleteSeatsByCatalogId: async () =>
    ({ data: { deleted: true } }) as AxiosResponse
};

export const SeatContext = createContext<SeatContextType>(defaultContextValue);

export const SeatProvider = ({ children }: { children: ReactNode }) => {
  const [seats, setSeats] = useState<ISeat[]>([]);
  const [seatIds, setSeatIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<SeatContextType['loading']>({
    getAll: false,
    create: false,
    update: false,
    delete: false,
    filter: false,
    getListIdByVehicleName: false,
    createMultipleSeats: false,
    deleteSeatsByCatalogId: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Lỗi cục bộ!');
  };

  const fetchData = async (
    apiCall: () => Promise<AxiosResponse<any>>,
    onSuccess: (data: any) => void,
    requestType: keyof typeof loading
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
  const getAllSeats = useCallback(() => {
    fetchData(getSeatsApi, data => setSeats(data.seats || []), 'getAll');
  }, []);

  // Get By Id
  const getSeatById = useCallback(
    (id: string) => seats.find(seat => seat._id === id),
    [seats]
  );

  // Create
  const createSeat = useCallback(
    async (seat: ISeat): Promise<AxiosResponse<any>> =>
      fetchData(
        () => createSeatApi(seat),
        data => {
          if (data.savedSeat) setSeats(prev => [...prev, data.savedSeat]);
        },
        'create'
      ),
    []
  );

  // Update
  const updateSeat = useCallback(
    async (id: string, seat: ISeat): Promise<AxiosResponse<any>> =>
      fetchData(
        () => updateSeatApi(id, seat),
        data => {
          if (data.seat)
            setSeats(prev =>
              prev.map(s => (s._id === id ? data.seat : s))
            );
        },
        'update'
      ),
    []
  );

  // Delete
  const deleteSeat = useCallback(
    async (id: string): Promise<AxiosResponse<any>> =>
      fetchData(
        () => deleteSeatApi(id),
        () => setSeats(prev => prev.filter(seat => seat._id !== id)),
        'delete'
      ),
    []
  );

  // Search by Vehicle Name
  const searchSeatsByName = useCallback(
    async (filterParams: Record<string, string>): Promise<ISeat[]> => {
      const response = await fetchData(
        () => searchSeatsByVehicleNameApi(filterParams),
        data => setSeats(data.seats || []),
        'filter'
      );
      return response.data.seats || [];
    },
    []
  );

  // Get List IDs by Vehicle Name
  const getListIdByVehicleName = useCallback(
    async (vehicleName: string): Promise<void> => {
      // Gọi fetchData nhưng không cần trả về AxiosResponse
      await fetchData(
        () => getListIdByVehicleNameApi(vehicleName),
        data => setSeatIds(data.seatIds || []),
        'getListIdByVehicleName'
      );
    },
    []
  );
  
  
  // Create Multiple Seats
  const createMultipleSeats = useCallback(
    async (data: { quantity: number; seatCatalogId: string; price: number }): Promise<AxiosResponse<any>> =>
      fetchData(
        () => createMultipleSeatsApi(data),
        response => {
          if (response.savedSeats)
            setSeats(prev => [...prev, ...response.savedSeats]);
        },
        'createMultipleSeats'
      ),
    []
  );

  // Delete Seats by Catalog ID
  const deleteSeatsByCatalogId = useCallback(
    async (seatCatalogId: string): Promise<AxiosResponse<any>> =>
      fetchData(
        () => deleteSeatsByCatalogIdApi(seatCatalogId),
        () =>
          setSeats(prev => prev.filter(seat => seat.seat_catalog_id._id !== seatCatalogId)),
        'deleteSeatsByCatalogId'
      ),
    []
  );

  useEffect(() => {
    getAllSeats();
  }, [getAllSeats]);

  return (
    <SeatContext.Provider
      value={{
        seats,
        seatIds,
        loading,
        error,
        getAllSeats,
        getSeatById,
        createSeat,
        updateSeat,
        deleteSeat,
        searchSeatsByName,
        getListIdByVehicleName,
        createMultipleSeats,
        deleteSeatsByCatalogId
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
