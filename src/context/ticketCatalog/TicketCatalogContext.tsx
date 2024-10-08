import { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import {
  createTicketCatalogApi,
  deleteTicketCatalogApi,
  getAllTicketCatalogsApi,
  getTicketCatalogByIdApi,
  updateTicketCatalogApi
} from '../../axios/api/ticketCatalogApi';
import { ITicketCatalog } from '../../types/type/ticket-catalog/ticket-catalog';

interface TicketCatalogContextType {
  ticketCatalogs: ITicketCatalog[];
  loading: boolean;
  error: string | null;
  getAllTicketCatalogs: () => void;
  getTicketCatalogById: (_id: string) => void;
  createTicketCatalog: (TicketCatalog: ITicketCatalog) => Promise<void>;
  updateTicketCatalog: (_id: string, TicketCatalog: ITicketCatalog) => Promise<void>;
  deleteTicketCatalog: (_id: string) => Promise<void>;
}

const defaultContextValue: TicketCatalogContextType = {
  ticketCatalogs: [],
  loading: false,
  error: null,
  getAllTicketCatalogs: () => {},
  getTicketCatalogById: () => {},
  createTicketCatalog: async () => {},
  updateTicketCatalog: async () => {},
  deleteTicketCatalog: async () => {}
};

export const TicketCatalogContext = createContext<TicketCatalogContextType>(defaultContextValue);

export const TicketCatalogProvider = ({ children }: { children: ReactNode }) => {
  const [ticketCatalogs, setTicketCatalogs] = useState<ITicketCatalog[]>([]);
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
  const getAllTicketCatalogs = useCallback(() => {
    fetchData(getAllTicketCatalogsApi, data => setTicketCatalogs(data.ticketCatalogs || []));
  }, []);

  //Get By ID
  const getTicketCatalogById = useCallback((id: string) => {
    fetchData(() => getTicketCatalogByIdApi(id), data => {
      setTicketCatalogs([data.ticketCatalog]);
    });
  }, []);

  //Post
  const createTicketCatalog = useCallback(async (ticketCatalog: ITicketCatalog): Promise<void> => {
    await fetchData(
      () => createTicketCatalogApi(ticketCatalog),
      data => setTicketCatalogs(prevTicketCatalogs => [...prevTicketCatalogs, data.ticketCatalog])
    );
  }, []);

  //Put
  const updateTicketCatalog = useCallback(async (id: string, ticketCatalog: ITicketCatalog): Promise<void> => {
    await fetchData(
      () => updateTicketCatalogApi(id, ticketCatalog),
      data => setTicketCatalogs(prevTicketCatalogs =>
        prevTicketCatalogs.map(ticketCatalog => (ticketCatalog._id === id ? data.TicketCatalog : ticketCatalog))
      )
    );
  }, []);

  //Delete
  const deleteTicketCatalog = useCallback(async (id: string): Promise<void> => {
    await fetchData(
      () => deleteTicketCatalogApi(id),
      () => setTicketCatalogs(prevTicketCatalogs => prevTicketCatalogs.filter(ticketCatalog => ticketCatalog._id !== id))
    );
  }, []);

  useEffect(() => {
    getAllTicketCatalogs();
  }, [getAllTicketCatalogs]);

  return (
    <TicketCatalogContext.Provider
      value={{
        ticketCatalogs,
        loading,
        error,
        getAllTicketCatalogs,
        getTicketCatalogById,
        createTicketCatalog,
        updateTicketCatalog,
        deleteTicketCatalog
      }}
    >
      {children}
    </TicketCatalogContext.Provider>
  );
};
