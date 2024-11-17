import {
    createContext,
    useState,
    ReactNode,
    useCallback,
  } from 'react';
  import axios from '../../config/axiosConfig'; 
  
  interface BackupContextType {
    loading: {
      export: boolean;
      import: boolean;
    };
    error: string | null;
    exportData: () => Promise<void>;
    importData: (file: File) => Promise<void>;
  }
  
  const defaultContextValue: BackupContextType = {
    loading: {
      export: false,
      import: false
    },
    error: null,
    exportData: async () => {},
    importData: async () => {}
  };
  
  export const BackupContext = createContext<BackupContextType>(defaultContextValue);
  
  export const BackupProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState({
      export: false,
      import: false
    });
    const [error, setError] = useState<string | null>(null);
  
    const handleError = (err: any) => {
      setError(err.response?.data?.message || 'Lỗi cục bộ!');
    };
  
    const exportData = useCallback(async () => {
      setLoading((prev) => ({ ...prev, export: true }));
      try {
        const response = await axios.get('/api/data/export', { responseType: 'blob' });
        // Xử lý response để download file
        const blob = new Blob([response.data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'backup.json';
        link.click();
      } catch (error) {
        handleError(error);
      } finally {
        setLoading((prev) => ({ ...prev, export: false }));
      }
    }, []);
  
    const importData = useCallback(async (file: File) => {
      setLoading((prev) => ({ ...prev, import: true }));
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        await axios.post('/api/data/import', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } catch (error) {
        handleError(error);
      } finally {
        setLoading((prev) => ({ ...prev, import: false }));
      }
    }, []);
  
    return (
      <BackupContext.Provider value={{ loading, error, exportData, importData }}>
        {children}
      </BackupContext.Provider>
    );
  };
  