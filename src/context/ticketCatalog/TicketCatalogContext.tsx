import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
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
  loading: {
    getAll: boolean;
    getById: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllTicketCatalogs: () => void;
  getTicketCatalogById: (_id: string) => void;
  createTicketCatalog: (ticketCatalog: ITicketCatalog) => Promise<void>;
  updateTicketCatalog: (_id: string, ticketCatalog: ITicketCatalog) => Promise<void>;
  deleteTicketCatalog: (_id: string) => Promise<void>;
}

const defaultContextValue: TicketCatalogContextType = {
  ticketCatalogs: [],
  loading: {
    getAll: false,
    getById: false,
    create: false,
    update: false,
    delete: false
  },
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
  const [loading, setLoading] = useState<{
    getAll: boolean;
    getById: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  }>({
    getAll: false,
    getById: false,
    create: false,
    update: false,
    delete: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Lỗi cục bộ!');
  };

  const fetchData = async (
    apiCall: () => Promise<any>,
    onSuccess: (data: any) => void,
    requestType: keyof typeof loading // 'getAll', 'getById', 'create', 'update', 'delete'
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
  const getAllTicketCatalogs = useCallback(() => {
    fetchData(getAllTicketCatalogsApi, data => setTicketCatalogs(data.ticketCatalogs || []), 'getAll');
  }, []);

  // Get By ID
  const getTicketCatalogById = useCallback((id: string) => {
    fetchData(
      () => getTicketCatalogByIdApi(id),
      data => {
        setTicketCatalogs(prevCatalogs => {
          const existingCatalog = prevCatalogs.find(catalog => catalog._id === id);
          if (!existingCatalog) {
            return [...prevCatalogs, data.ticketCatalog];
          }
          return prevCatalogs.map(catalog =>
            catalog._id === id ? data.ticketCatalog : catalog
          );
        });
      },
      'getById'
    );
  }, []);

  // Post
  const createTicketCatalog = useCallback(async (ticketCatalog: ITicketCatalog): Promise<void> => {
    await fetchData(
      () => createTicketCatalogApi(ticketCatalog),
      data => {
        if (data.savedTicketCatalog) {
          setTicketCatalogs(prevCatalogs => [...prevCatalogs, data.savedTicketCatalog]);
        }
      },
      'create'
    );
  }, []);

  // Put
  const updateTicketCatalog = useCallback(async (id: string, ticketCatalog: ITicketCatalog): Promise<void> => {
    await fetchData(
      () => updateTicketCatalogApi(id, ticketCatalog),
      data => {
        if (data.ticketCatalog) {
          setTicketCatalogs(prevCatalogs =>
            prevCatalogs.map(catalog => (catalog._id === id ? data.ticketCatalog : catalog))
          );
        }
      },
      'update'
    );
  }, []);

  // Delete
  const deleteTicketCatalog = useCallback(async (id: string): Promise<void> => {
    await fetchData(
      () => deleteTicketCatalogApi(id),
      () => setTicketCatalogs(prevCatalogs => prevCatalogs.filter(catalog => catalog._id !== id)),
      'delete'
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
