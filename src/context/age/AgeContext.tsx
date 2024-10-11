import {
    createContext,
    useState,
    ReactNode,
    useCallback,
    useEffect
  } from 'react';
  import { deleteAgeApi, getAllAgesApi,createAgeApi, updateAgeApi } from '../../axios/api/ageApi';
import { IAge } from '../../types/type/age/age';
  
  interface AgeContextType {
    ages: IAge[];
    loading: {
      getAll: boolean;
      create: boolean;
      update: boolean;
      delete: boolean;
    };
    error: string | null;
    getAllAges: () => void;
    getAgeById: (_id: string) => IAge | undefined;
    createAge: (age: IAge) => Promise<void>;
    updateAge: (_id: string, age: IAge) => Promise<void>;
    deleteAge: (_id: string) => Promise<void>;
  }
  
  const defaultContextValue: AgeContextType = {
    ages: [],
    loading: {
      getAll: false,
      create: false,
      update: false,
      delete: false
    },
    error: null,
    getAllAges: () => {},
    getAgeById: () => undefined,
    createAge: async () => {},
    updateAge: async () => {},
    deleteAge: async () => {}
  };
  
  export const AgeContext = createContext<AgeContextType>(defaultContextValue);
  
  export const AgeProvider = ({ children }: { children: ReactNode }) => {
    const [ages, setAges] = useState<IAge[]>([]);
    const [loading, setLoading] = useState<{
      getAll: boolean;
      create: boolean;
      update: boolean;
      delete: boolean;
    }>({
      getAll: false,
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
  
    // Get All
    const getAllAges = useCallback(() => {
      fetchData(
        getAllAgesApi,
        data => setAges(data.ages || []), 
        'getAll'
      );
    }, []);
  
    // Get By Id
    const getAgeById = useCallback(
      (id: string) => {
        return ages.find(age => age._id === id);
      },
      [ages]
    );
  
    // Post
    const createAge = useCallback(
      async (age: IAge): Promise<void> => {
        await fetchData(
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
  
    // Put
    const updateAge = useCallback(
      async (id: string, age: IAge): Promise<void> => {
        await fetchData(
          () => updateAgeApi(id, age),
          data => {
            if (data.updatedAge) {
              setAges(prevAges =>
                prevAges.map(existingAge => (existingAge._id === id ? data.updatedAge : existingAge))
              );
            }
          },
          'update'
        );
      },
      []
    );
  
    // Delete
    const deleteAge = useCallback(async (id: string): Promise<void> => {
      await fetchData(
        () => deleteAgeApi(id),
        () =>
          setAges(prevAges =>
            prevAges.filter(age => age._id !== id)
          ),
        'delete'
      );
    }, []);
  
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
          deleteAge
        }}
      >
        {children}
      </AgeContext.Provider>
    );
  };
  