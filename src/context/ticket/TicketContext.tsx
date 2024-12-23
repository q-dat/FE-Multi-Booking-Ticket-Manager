import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { ITicket } from '../../types/type/ticket/ticket';
import {
  createTicketApi,
  deleteTicketApi,
  deleteTicketsByVehicleIdApi,
  filterTicketsApi,
  getAllTicketsApi,
  getTicketsByVehicleIdApi,
  searchTicketsApi,
  updateTicketApi
} from '../../axios/api/ticketApi';

interface TicketContextType {
  tickets: ITicket[];
  loading: {
    getAll: boolean;
    search: boolean;
    filter: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    getByVehicle: boolean;
    deleteByVehicle: boolean;
  };
  error: string | null;
  searchTickets: (searchParams: Record<string, string>) => Promise<ITicket[]>;
  filterTickets: (filterParams: Record<string, string>) => Promise<ITicket[]>;
  getAllTickets: () => void;
  getTicketById: (_id: string) => ITicket | undefined;
  createTicket: (ticket: ITicket) => Promise<void>;
  updateTicket: (_id: string, ticket: ITicket) => Promise<void>;
  deleteTicket: (_id: string) => Promise<void>;
  getTicketsByVehicleId: (vehicleId: string) => Promise<ITicket[]>;
  deleteTicketsByVehicleId: (vehicleId: string) => Promise<void>;
}

const defaultContextValue: TicketContextType = {
  tickets: [],
  loading: {
    getAll: false,
    search: false,
    filter: false,
    create: false,
    update: false,
    delete: false,
    getByVehicle: false,
    deleteByVehicle: false
  },
  error: null,
  searchTickets: async () => [],
  filterTickets: async () => [],
  getAllTickets: () => {},
  getTicketById: () => undefined,
  createTicket: async () => {},
  updateTicket: async () => {},
  deleteTicket: async () => {},
  getTicketsByVehicleId: async () => [],
  deleteTicketsByVehicleId: async () => {}
};

export const TicketContext =
  createContext<TicketContextType>(defaultContextValue);

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState({
    getAll: false,
    search: false,
    filter: false,
    create: false,
    update: false,
    delete: false,
    getByVehicle: false,
    deleteByVehicle: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Lỗi cục bộ!');
  };

  const fetchData = async (
    apiCall: () => Promise<any>,
    onSuccess: (data: any) => void,
    requestType: keyof typeof loading
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

  // Search
  const searchTickets = useCallback(
    async (searchParams: Record<string, string>): Promise<ITicket[]> => {
      let ticketsData: ITicket[] = [];
      await fetchData(
        () => searchTicketsApi(searchParams),
        data => {
          ticketsData = data.tickets || [];
          setTickets(ticketsData);
        },
        'search'
      );
      return ticketsData;
    },
    []
  );

  // Filter
  const filterTickets = useCallback(
    async (filterParams: Record<string, string>): Promise<ITicket[]> => {
      await fetchData(
        () => filterTicketsApi(filterParams),
        data => {
          setTickets(data.tickets || []);
        },
        'filter'
      );
      return tickets;
    },
    [tickets]
  );
  // Get All
  const getAllTickets = useCallback(() => {
    fetchData(
      getAllTicketsApi,
      data => setTickets(data.tickets || []),
      'getAll'
    );
  }, []);

  // Get By ID
  const getTicketById = useCallback(
    (id: string) => {
      return tickets.find(ticket => ticket._id === id);
    },
    [tickets]
  );

  // Post
  const createTicket = useCallback(async (ticket: ITicket): Promise<void> => {
    await fetchData(
      () => createTicketApi(ticket),
      data => setTickets(prevTickets => [...prevTickets, data.ticket]),
      'create'
    );
  }, []);

  // Put
  const updateTicket = useCallback(
    async (id: string, ticket: ITicket): Promise<void> => {
      await fetchData(
        () => updateTicketApi(id, ticket),
        data =>
          setTickets(prevTickets =>
            prevTickets.map(t => (t._id === id ? data.ticket : t))
          ),
        'update'
      );
    },
    []
  );

  // Delete
  const deleteTicket = useCallback(async (id: string): Promise<void> => {
    await fetchData(
      () => deleteTicketApi(id),
      () =>
        setTickets(prevTickets =>
          prevTickets.filter(ticket => ticket._id !== id)
        ),
      'delete'
    );
  }, []);
  // Get Multiple Tickets by Vehicle ID
  const getTicketsByVehicleId = useCallback(
    async (vehicleId: string): Promise<ITicket[]> => {
      let ticketsData: ITicket[] = [];
      await fetchData(
        () => getTicketsByVehicleIdApi(vehicleId),
        data => {
          ticketsData = data.tickets || [];
          setTickets(ticketsData);
        },
        'getByVehicle'
      );
      return ticketsData;
    },
    []
  );

  // Delete Multiple Tickets by Vehicle ID
  const deleteTicketsByVehicleId = useCallback(
    async (vehicleId: string): Promise<void> => {
      await fetchData(
        () => deleteTicketsByVehicleIdApi(vehicleId),
        () =>
          setTickets(prevTickets =>
            prevTickets.filter(
              ticket =>
                !ticket.seat_id.some(
                  seat => seat.seat_catalog_id.vehicle_id._id === vehicleId
                )
            )
          ),
        'deleteByVehicle'
      );
    },
    []
  );

  useEffect(() => {
    getAllTickets();
  }, [getAllTickets]);

  return (
    <TicketContext.Provider
      value={{
        tickets,
        loading,
        error,
        searchTickets,
        filterTickets,
        getAllTickets,
        getTicketById,
        createTicket,
        updateTicket,
        deleteTicket,
        getTicketsByVehicleId,
        deleteTicketsByVehicleId
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
