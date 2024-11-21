import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import {
  deleteAgeApi,
  getAllAgesApi,
  createAgeApi,
  updateAgeApi,
  searchAgesByNameApi
} from '../../axios/api/ageApi';
import { IAge } from '../../types/type/age/age';
import { AxiosResponse } from 'axios';

interface AgeContextType {
  ages: IAge[];
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    search: boolean;
  };
  error: string | null;
  getAllAges: () => void;
  getAgeById: (_id: string) => IAge | undefined;
  createAge: (age: IAge) => Promise<AxiosResponse<any>>;
  updateAge: (_id: string, age: IAge) => Promise<AxiosResponse<any>>;
  deleteAge: (_id: string) => Promise<AxiosResponse<any>>;
  searchAgesByName: (name: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: AgeContextType = {
  ages: [],
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false,
    search: false
  },
  error: null,
  getAllAges: () => {},
  getAgeById: () => undefined,
  createAge: async () => ({ data: { savedAge: null } }) as AxiosResponse,
  updateAge: async () => ({ data: { updatedAge: null } }) as AxiosResponse,
  deleteAge: async () => ({ data: { deleted: true } }) as AxiosResponse,
  searchAgesByName: async () => ({ data: { ages: [] } }) as AxiosResponse
};

export const AgeContext = createContext<AgeContextType>(defaultContextValue);

export const AgeProvider = ({ children }: { children: ReactNode }) => {
  const [ages, setAges] = useState<IAge[]>([]);
  const [loading, setLoading] = useState<{
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    search: boolean;
  }>({
    getAll: false,
    create: false,
    update: false,
    delete: false,
    search: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Lỗi cục bộ!');
  };

  const fetchData = async (
    apiCall: () => Promise<AxiosResponse<any>>,
    onSuccess: (data: any) => void,
    requestType: keyof typeof loading // 'getAll', 'create', 'update', 'delete'
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
  const getAllAges = useCallback(() => {
    fetchData(getAllAgesApi, data => setAges(data.ages || []), 'getAll');
  }, []);

  // Get By Id
  const getAgeById = useCallback(
    (id: string) => {
      return ages.find(age => age._id === id);
    },
    [ages]
  );

  // Create
  const createAge = useCallback(
    async (age: IAge): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createAgeApi(age),
        data => {
          if (data.savedAge) {
            setAges(prevAges => [...prevAges, data.savedAge]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update
  const updateAge = useCallback(
    async (id: string, age: IAge): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updateAgeApi(id, age),
        data => {
          if (data.updatedAge) {
            setAges(prevAges =>
              prevAges.map(existingAge =>
                existingAge._id === id ? data.updatedAge : existingAge
              )
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete
  const deleteAge = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deleteAgeApi(id),
        () => setAges(prevAges => prevAges.filter(age => age._id !== id)),
        'delete'
      );
    },
    []
  );

  // Search By Name
  const searchAgesByName = useCallback(
    async (name: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => searchAgesByNameApi(name),
        data => setAges(data.ages || []),
        'search'
      );
    },
    []
  );

  useEffect(() => {
    getAllAges();
  }, [getAllAges]);

  return (
    <AgeContext.Provider
      value={{
        ages,
        loading,
        error,
        getAllAges,
        getAgeById,
        createAge,
        updateAge,
        deleteAge,
        searchAgesByName
      }}
    >
      {children}
    </AgeContext.Provider>
  );
};
