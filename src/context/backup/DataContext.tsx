import { createContext, useState, ReactNode, useCallback } from 'react';
import axios from '../../config/axiosConfig';

interface BackupFile {
  name: string;
  createdAt: string;
}

interface BackupContextType {
  loading: {
    export: boolean;
    import: boolean;
    listFiles: boolean;
    downloadFile: boolean;
    deleteFile: boolean;
  };
  error: string | null;
  success: string | null;
  backupFiles: BackupFile[];
  exportData: () => Promise<void>;
  importData: (file: File) => Promise<void>;
  fetchBackupFiles: () => Promise<void>;
  downloadBackupFile: (fileName: string) => Promise<void>;
  deleteBackupFile: (fileName: string) => Promise<void>;
}

const defaultContextValue: BackupContextType = {
  loading: {
    export: false,
    import: false,
    listFiles: false,
    downloadFile: false,
    deleteFile: false
  },
  error: null,
  success: null,
  backupFiles: [],
  exportData: async () => {},
  importData: async () => {},
  fetchBackupFiles: async () => {},
  downloadBackupFile: async () => {},
  deleteBackupFile: async () => {}
};

export const BackupContext =
  createContext<BackupContextType>(defaultContextValue);

export const BackupProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState({
    export: false,
    import: false,
    listFiles: false,
    downloadFile: false,
    deleteFile: false
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [backupFiles, setBackupFiles] = useState<BackupFile[]>([]);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Đã xảy ra lỗi!');
    setSuccess(null);
  };

  const handleSuccess = (message: string) => {
    setSuccess(message);
    setError(null);
  };
  //Export
  const exportData = useCallback(async () => {
    setLoading(prev => ({ ...prev, export: true }));
    try {
      const response = await axios.get('/api/data/export', {
        responseType: 'arraybuffer'
      });
      const blob = new Blob([response.data], {
        type: 'application/octet-stream'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'laclactrip.bson';
      link.click();
      handleSuccess('Xuất dữ liệu thành công!');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(prev => ({ ...prev, export: false }));
    }
  }, []);
  //Import
  const importData = useCallback(async (file: File) => {
    setLoading(prev => ({ ...prev, import: true }));

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bsonData = new Uint8Array(arrayBuffer); // BSON cần gửi dưới dạng Uint8Array

      const formData = new FormData();
      formData.append(
        'file',
        new Blob([bsonData], { type: 'application/octet-stream' }),
        file.name
      );

      await axios.post('/api/data/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      handleSuccess('Nhập dữ liệu thành công!');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(prev => ({ ...prev, import: false }));
    }
  }, []);
  //Get
  const fetchBackupFiles = useCallback(async () => {
    setLoading(prev => ({ ...prev, listFiles: true }));
    try {
      const response = await axios.get('/api/data/backups');
      const files: BackupFile[] = response.data.files.map((file: any) => ({
        name: file.name,
        createdAt: file.createdAt
      }));
      setBackupFiles(files);
      handleSuccess('Lấy danh sách file backup thành công!');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(prev => ({ ...prev, listFiles: false }));
    }
  }, []);
  //Download
  const downloadBackupFile = useCallback(async (fileName: string) => {
    setLoading(prev => ({ ...prev, downloadFile: true }));
    try {
      const response = await axios.get(`/api/data/backups/${fileName}`, {
        responseType: 'arraybuffer'
      });
      const blob = new Blob([response.data], {
        type: 'application/octet-stream'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      handleSuccess(`Tải file ${fileName} thành công!`);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(prev => ({ ...prev, downloadFile: false }));
    }
  }, []);
  //Delete
  const deleteBackupFile = useCallback(
    async (fileName: string) => {
      setLoading(prev => ({ ...prev, deleteFile: true }));
      try {
        await axios.delete(`/api/data/backups/${fileName}`);
        handleSuccess(`Xóa file ${fileName} thành công!`);
        await fetchBackupFiles();
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(prev => ({ ...prev, deleteFile: false }));
      }
    },
    [fetchBackupFiles]
  );

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
        deleteBackupFile
      }}
    >
      {children}
    </BackupContext.Provider>
  );
};
