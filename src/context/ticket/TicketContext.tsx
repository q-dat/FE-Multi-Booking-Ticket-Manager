import { createContext, useState, ReactNode } from 'react';
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
  searchTickets: (searchParams: Record<string, string>) => void;
  getAllTickets: () => void;
  getTicketById: (id: string) => void;
  createTicket: (ticket: ITicket) => void;
  updateTicket: (id: string, ticket: ITicket) => void;
  deleteTicket: (id: string) => void;
}

export const TicketContext = createContext<TicketContextType | undefined>(
  undefined
);

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
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
  //Search
  const searchTickets = (searchParams: Record<string, string>) => {
    fetchData(
      () => searchTicketsApi(searchParams),
      data => setTickets(data.tickets || [])
    );
  };
  //Get
  const getAllTickets = () => {
    if (isFetching) return;
    setIsFetching(true);
    fetchData(getAllTicketsApi, data => setTickets(data.tickets || [])).finally(
      () => setIsFetching(false)
    );
  };
  //Get By ID
  const getTicketById = (id: string) => {
    fetchData(
      () => getTicketByIdApi(id),
      data => setTickets([data.ticket])
    );
  };
  //Post
  const createTicket = (ticket: ITicket) => {
    fetchData(
      () => createTicketApi(ticket),
      data => setTickets(prevTickets => [...prevTickets, data.ticket])
    );
  };
  //Put
  const updateTicket = (id: string, ticket: ITicket) => {
    fetchData(
      () => updateTicketApi(id, ticket),
      data =>
        setTickets(prevTickets =>
          prevTickets.map(t => (t._id === id ? data.ticket : t))
        )
    );
  };
  //Delete
  const deleteTicket = (id: string) => {
    fetchData(
      () => deleteTicketApi(id),
      () => setTickets(prevTickets => prevTickets.filter(t => t._id !== id))
    );
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        loading,
        error,
        searchTickets,
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
