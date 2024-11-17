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
    listFiles: boolean;
    downloadFile: boolean;
  };
  error: string | null;
  success: string | null;
  backupFiles: string[];
  exportData: () => Promise<void>;
  importData: (file: File) => Promise<void>;
  fetchBackupFiles: () => Promise<void>;
  downloadBackupFile: (fileName: string) => Promise<void>;
}

const defaultContextValue: BackupContextType = {
  loading: {
    export: false,
    import: false,
    listFiles: false,
    downloadFile: false,
  },
  error: null,
  success: null,
  backupFiles: [],
  exportData: async () => {},
  importData: async () => {},
  fetchBackupFiles: async () => {},
  downloadBackupFile: async () => {},
};

export const BackupContext = createContext<BackupContextType>(defaultContextValue);

export const BackupProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState({
    export: false,
    import: false,
    listFiles: false,
    downloadFile: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [backupFiles, setBackupFiles] = useState<string[]>([]);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Đã xảy ra lỗi!');
    setSuccess(null); 
  };

  const handleSuccess = (message: string) => {
    setSuccess(message);
    setError(null); 
  };

  const exportData = useCallback(async () => {
    setLoading((prev) => ({ ...prev, export: true }));
    try {
      const response = await axios.get('/api/data/export', { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'laclactrip.json';
      link.click();
      handleSuccess('Xuất dữ liệu thành công!');
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
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      handleSuccess('Nhập dữ liệu thành công!');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading((prev) => ({ ...prev, import: false }));
    }
  }, []);

  const fetchBackupFiles = useCallback(async () => {
    setLoading((prev) => ({ ...prev, listFiles: true }));
    try {
      const response = await axios.get('/api/data/backups');
      setBackupFiles(response.data.files);
      handleSuccess('Lấy danh sách file backup thành công!');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading((prev) => ({ ...prev, listFiles: false }));
    }
  }, []);

  const downloadBackupFile = useCallback(async (fileName: string) => {
    setLoading((prev) => ({ ...prev, downloadFile: true }));
    try {
      const response = await axios.get(`/api/data/backups/${fileName}`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      handleSuccess(`Tải file ${fileName} thành công!`);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading((prev) => ({ ...prev, downloadFile: false }));
    }
  }, []);

  return (
    <BackupContext.Provider
      value={{
        loading,
        error,
        success,
        backupFiles,
        exportData,
        importData,
        fetchBackupFiles,
        downloadBackupFile,
      }}
    >
      {children}
    </BackupContext.Provider>
  );
};
