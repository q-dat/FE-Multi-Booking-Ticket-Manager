import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BackupContext } from '../../context/backup/DataContext';

interface ImportFormData {
  file: FileList;
}

const BackupManagerPage = () => {
  const { loading, exportData, importData, error } = useContext(BackupContext);
  const { register, handleSubmit, formState: { errors } } = useForm<ImportFormData>();
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = async () => {
    await exportData(); // Call export from context
  };

  const handleImport = async (data: ImportFormData) => {
    setIsImporting(true);
    const file = data.file[0];
    if (file) {
      await importData(file); // Call import from context
    }
    setIsImporting(false);
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
          disabled={isImporting || loading.import}
        >
          {isImporting || loading.import ? 'Đang tải...' : 'Import Dữ liệu'}
        </button>
      </form>
    </div>
  );
};

export default BackupManagerPage;
