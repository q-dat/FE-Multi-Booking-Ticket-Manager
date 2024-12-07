import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { AxiosResponse } from 'axios';
import {
  createTicketCatalogApi,
  deleteTicketCatalogApi,
  getAllTicketCatalogsApi,
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
  getTicketCatalogById: (_id: string) => ITicketCatalog | undefined;
  createTicketCatalog: (
    ticketCatalog: ITicketCatalog
  ) => Promise<AxiosResponse<any>>;
  updateTicketCatalog: (
    _id: string,
    ticketCatalog: ITicketCatalog
  ) => Promise<AxiosResponse<any>>;
  deleteTicketCatalog: (_id: string) => Promise<AxiosResponse<any>>;
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
  getTicketCatalogById: () => undefined,
  createTicketCatalog: async () =>
    ({ data: { savedTicketCatalog: null } }) as AxiosResponse,
  updateTicketCatalog: async () =>
    ({ data: { ticketCatalog: null } }) as AxiosResponse,
  deleteTicketCatalog: async () =>
    ({ data: { deleted: true } }) as AxiosResponse
};

export const TicketCatalogContext =
  createContext<TicketCatalogContextType>(defaultContextValue);

export const TicketCatalogProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [ticketCatalogs, setTicketCatalogs] = useState<ITicketCatalog[]>([]);
  const [loading, setLoading] = useState<TicketCatalogContextType['loading']>({
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
  const getAllTicketCatalogs = useCallback(() => {
    fetchData(
      getAllTicketCatalogsApi,
      data => setTicketCatalogs(data.ticketCatalogs || []),
      'getAll'
    );
  }, []);

  // Get By ID
  const getTicketCatalogById = useCallback(
    (id: string) =>
      ticketCatalogs.find(ticketCatalog => ticketCatalog._id === id),
    [ticketCatalogs]
  );

  // Post
  const createTicketCatalog = useCallback(
    async (ticketCatalog: ITicketCatalog): Promise<AxiosResponse<any>> =>
      fetchData(
        () => createTicketCatalogApi(ticketCatalog),
        data => {
          if (data.savedTicketCatalog) {
            setTicketCatalogs(prevCatalogs => [
              ...prevCatalogs,
              data.savedTicketCatalog
            ]);
          }
        },
        'create'
      ),
    []
  );

  // Put
  const updateTicketCatalog = useCallback(
    async (
      id: string,
      ticketCatalog: ITicketCatalog
    ): Promise<AxiosResponse<any>> =>
      fetchData(
        () => updateTicketCatalogApi(id, ticketCatalog),
        data => {
          if (data.ticketCatalog) {
            setTicketCatalogs(prevCatalogs =>
              prevCatalogs.map(catalog =>
                catalog._id === id ? data.ticketCatalog : catalog
              )
            );
          }
        },
        'update'
      ),
    []
  );

  // Delete
  const deleteTicketCatalog = useCallback(
    async (id: string): Promise<AxiosResponse<any>> =>
      fetchData(
        () => deleteTicketCatalogApi(id),
        () =>
          setTicketCatalogs(prevCatalogs =>
            prevCatalogs.filter(catalog => catalog._id !== id)
          ),
        'delete'
      ),
    []
  );

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
