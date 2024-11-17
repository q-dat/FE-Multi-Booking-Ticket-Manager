import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BackupContext } from '../../context/backup/DataContext';

interface ImportFormData {
  file: FileList;
}

const BackupManagerPage = () => {
  const {
    loading,
    error,
    exportData,
    importData,
    fetchBackupFiles,
    backupFiles,
    downloadBackupFile,
  } = useContext(BackupContext);
  const { register, handleSubmit, formState: { errors } } = useForm<ImportFormData>();

  // Fetch backup files on component mount
  useEffect(() => {
    fetchBackupFiles();
  }, [fetchBackupFiles]);

  const handleExport = async () => {
    await exportData();
  };

  const handleImport = async (data: ImportFormData) => {
    const file = data.file[0];
    if (file) {
      await importData(file);
      fetchBackupFiles(); // Refresh the list after importing
    }
  };

  const handleDownload = async (fileName: string) => {
    await downloadBackupFile(fileName);
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">Quản lý Dữ Liệu</h1>

      {/* Export Button */}
      <div>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-green-500 text-white rounded-md disabled:bg-gray-400"
          disabled={loading.export}
        >
          {loading.export ? 'Đang tải...' : 'Export Dữ liệu'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* Import Form */}
      <form onSubmit={handleSubmit(handleImport)} className="space-y-4">
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Tải lên file JSON</label>
          <input
            id="file"
            type="file"
            {...register('file', { required: 'File là bắt buộc!' })}
            className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
          disabled={loading.import}
        >
          {loading.import ? 'Đang tải...' : 'Import Dữ liệu'}
        </button>
      </form>

      {/* Backup Files List */}
      <div>
        <h2 className="text-xl font-semibold mt-6">Danh sách file backup</h2>
        {loading.listFiles && <p>Đang tải danh sách file...</p>}
        {!loading.listFiles && backupFiles.length === 0 && <p>Không có file backup nào.</p>}
        <ul className="mt-4 space-y-2">
          {backupFiles.map((file) => (
            <li key={file} className="flex items-center justify-between border p-2 rounded-md">
              <span>{file}</span>
              <button
                onClick={() => handleDownload(file)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
                disabled={loading.downloadFile}
              >
                {loading.downloadFile ? 'Đang tải...' : 'Tải về'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BackupManagerPage;
