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
  getAllTicketsApi,
  getTicketByIdApi,
  searchTicketsApi,
  updateTicketApi
} from '../../axios/api/ticketApi';

interface TicketContextType {
  tickets: ITicket[];
  loading: boolean;
  error: string | null;
  searchTickets: (searchParams: Record<string, string>) => Promise<ITicket[]>;
  getAllTickets: () => void;
  getTicketBy_Id: (_id: string) => void;
  createTicket: (ticket: ITicket) => Promise<void>;
  updateTicket: (_id: string, ticket: ITicket) => Promise<void>;
  deleteTicket: (_id: string) => Promise<void>;
}
const defaultContextValue: TicketContextType = {
  tickets: [],
  loading: false,
  error: null,
  searchTickets: async () => [],
  getAllTickets: () => {},
  getTicketBy_Id: () => {},
  createTicket: async () => {},
  updateTicket: async () => {},
  deleteTicket: async () => {}
};
export const TicketContext =
  createContext<TicketContextType>(defaultContextValue);

export const TicketProv_ider = ({ children }: { children: ReactNode }) => {
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

  //Search
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

  //Get All
  const getAllTickets = useCallback(() => {
    fetchData(getAllTicketsApi, data => setTickets(data.tickets || []));
  }, []);

  // Get By _ID
  const getTicketBy_Id = useCallback((_id: string) => {
    fetchData(
      () => getTicketByIdApi(_id),
      data => setTickets([data.ticket])
    );
  }, []);

  // Post
  const createTicket = useCallback(async (ticket: ITicket): Promise<void> => {
    await fetchData(
      () => createTicketApi(ticket),
      data => setTickets(prevTickets => [...prevTickets, data.ticket])
    );
  }, []);

  // Put
  const updateTicket = useCallback(
    async (_id: string, ticket: ITicket): Promise<void> => {
      await fetchData(
        () => updateTicketApi(_id, ticket),
        data =>
          setTickets(prevTickets =>
            prevTickets.map(ticket =>
              ticket._id === _id ? data.ticket : ticket
            )
          )
      );
    },
    []
  );

  // Delete
  const deleteTicket = useCallback(async (_id: string): Promise<void> => {
    await fetchData(
      () => deleteTicketApi(_id),
      () =>
        setTickets(prevTickets =>
          prevTickets.filter(ticket => ticket._id !== _id)
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
        getAllTickets,
        getTicketBy_Id,
        createTicket,
        updateTicket,
        deleteTicket
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
