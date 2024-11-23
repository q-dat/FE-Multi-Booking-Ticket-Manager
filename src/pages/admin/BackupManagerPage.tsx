import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BackupContext } from '../../context/backup/DataContext';
import { Toastify } from '../../helper/Toastify';
import Header from '../../components/UserPage/Header';
import { Button, Input } from 'react-daisyui';
import LabelForm from '../../components/admin/LabelForm';
import { FaFileExport } from 'react-icons/fa';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';

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
    deleteBackupFile
  } = useContext(BackupContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ImportFormData>();

  useEffect(() => {
    fetchBackupFiles();
  }, [fetchBackupFiles]);

  const handleExport = async () => {
    try {
      await exportData();
      fetchBackupFiles();
      Toastify('Dữ liệu đã được xuất thành công', 200);
    } catch (error) {
      fetchBackupFiles();
      Toastify('Lỗi khi xuất dữ liệu!', 500);
    }
  };

  const handleImport = async (data: ImportFormData) => {
    const file = data.file[0];
    if (file) {
      try {
        await importData(file);
        fetchBackupFiles();
        Toastify('Dữ liệu đã được nhập thành công', 200);
      } catch (error) {
        fetchBackupFiles();
        Toastify('Lỗi khi nhập dữ liệu!', 500);
      }
    }
  };

  const handleDownload = async (fileName: string) => {
    try {
      await downloadBackupFile(fileName);
      Toastify('File đã được tải xuống', 200);
    } catch (error) {
      Toastify('Lỗi khi tải file!', 500);
    }
  };

  const handleDelete = async (fileName: string) => {
    try {
      await deleteBackupFile(fileName);
      fetchBackupFiles();
      Toastify('File đã được xóa thành công', 200);
    } catch (error) {
      Toastify('Lỗi khi xóa file!', 500);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <HeaderResponsive Title_NavbarMobile="Sao Lưu/Khôi Phục" />
      </div>
      <div className="px-2 pb-[20px] xl:pt-[90px]">
        <h1 className="text-center text-[40px] font-bold">Quản lý Dữ Liệu</h1>
        <div className="flex w-full flex-col items-center justify-around gap-5 xl:items-start">
          {/* Export Button */}
          <div className="w-full">
            <Button
              size="sm"
              onClick={handleExport}
              className="w-full rounded-sm bg-red-500 px-4 py-2 text-white disabled:bg-gray-400 md:w-[200px]"
              disabled={loading.export}
            >
              {loading.export ? 'Đang tải...' : 'Export Dữ liệu'}
              <FaFileExport />
            </Button>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>
          {/* Import Form */}
          <form
            onSubmit={handleSubmit(handleImport)}
            className="w-full rounded-md p-2 shadow-inner shadow-gray-50"
          >
            <div>
              <LabelForm title={'Tải lên file BSON'} />
              <Input
                id="file"
                type="file"
                {...register('file', { required: 'File là bắt buộc!' })}
                className="block rounded-md border-none px-0 focus:outline-none"
              />
              {errors.file && (
                <p className="text-sm text-red-500">{errors.file.message}</p>
              )}
            </div>

            <Button
              size="sm"
              type="submit"
              className="rounded-md bg-green-500 px-4 py-2 text-white disabled:bg-gray-400"
              disabled={loading.import}
            >
              {loading.import ? 'Đang tải...' : 'Import Dữ liệu'}
            </Button>
          </form>
        </div>

        {/* Backup Files List */}
        <div>
          <h2 className="mt-6 text-xl font-semibold">
            Lịch sử danh sách file backup
          </h2>
          {loading.listFiles && <p>Đang tải danh sách file...</p>}
          {!loading.listFiles && backupFiles.length === 0 && (
            <p>Không có file backup nào.</p>
          )}
          <ul className="mt-4 space-y-2">
            {backupFiles.map(file => (
              <li
                key={file.name}
                className="flex items-center justify-between rounded-md border p-2"
              >
                <div>
                  <span>{file.name}</span>
                  <p className="text-sm text-gray-500">{`Ngày tạo: ${new Date(file.createdAt).toLocaleString()}`}</p>
                </div>
                <div className="flex space-x-4">
                  <Button
                    onClick={() => handleDownload(file.name)}
                    className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
                    disabled={loading.downloadFile}
                  >
                    {loading.downloadFile ? 'Đang tải...' : 'Tải về'}
                  </Button>
                  <Button
                    onClick={() => handleDelete(file.name)}
                    className="rounded-md bg-red-500 px-4 py-2 text-white disabled:bg-gray-400"
                    disabled={loading.deleteFile}
                  >
                    {loading.deleteFile ? 'Đang xóa...' : 'Xóa'}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BackupManagerPage;

