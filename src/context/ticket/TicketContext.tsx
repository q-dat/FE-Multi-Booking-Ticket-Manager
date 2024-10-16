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
  fillterTicketsApi,
  getAllTicketsApi,
  searchTicketsApi,
  updateTicketApi
} from '../../axios/api/ticketApi';

interface TicketContextType {
  tickets: ITicket[];
  loading: boolean;
  error: string | null;
  searchTickets: (searchParams: Record<string, string>) => Promise<ITicket[]>;
  fillterTickets: (fillterParams: Record<string, string>) => Promise<ITicket[]>;
  getAllTickets: () => void;
  getTicketById: (_id: string) => ITicket | undefined;
  createTicket: (ticket: ITicket) => Promise<void>;
  updateTicket: (_id: string, ticket: ITicket) => Promise<void>;
  deleteTicket: (_id: string) => Promise<void>;
}

const defaultContextValue: TicketContextType = {
  tickets: [],
  loading: false,
  error: null,
  searchTickets: async () => [],
  fillterTickets: async () => [],
  getAllTickets: () => {},
  getTicketById: () => undefined,
  createTicket: async () => {},
  updateTicket: async () => {},
  deleteTicket: async () => {}
};

export const TicketContext =
  createContext<TicketContextType>(defaultContextValue);

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
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

  // Search
  const searchTickets = useCallback(
    async (searchParams: Record<string, string>): Promise<ITicket[]> => {
      let ticketsData: ITicket[] = [];
      await fetchData(
        () => searchTicketsApi(searchParams),
        data => {
          ticketsData = data.tickets || [];
          setTickets(ticketsData);
        }
      );
      return ticketsData;
    },
    []
  );
  // Filter
  const fillterTickets = useCallback(
    async (fillterParams: Record<string, string>): Promise<ITicket[]> => {
      let ticketsData: ITicket[] = [];
      await fetchData(
        () => fillterTicketsApi(fillterParams),
        data => {
          ticketsData = data.tickets || [];
          setTickets(ticketsData);
        }
      );
      return ticketsData;
    },
    []
  );

  // Get All
  const getAllTickets = useCallback(() => {
    fetchData(getAllTicketsApi, data => setTickets(data.tickets || []));
  }, []);
  //Get By ID
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
      data => setTickets(prevTickets => [...prevTickets, data.ticket])
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
          )
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
        )
    );
  }, []);

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
        fillterTickets,
        getAllTickets,
        getTicketById,
        createTicket,
        updateTicket,
        deleteTicket
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
