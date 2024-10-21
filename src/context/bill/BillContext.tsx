import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { IBill } from '../../types/type/bill/bill';
import {
  getAllBillsApi,
  createBillApi,
  updateBillApi,
  deleteBillApi,
  getBillByIdApi
} from '../../axios/api/billApi';

interface BillContextType {
  bills: IBill[];
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    getById: boolean;
  };
  error: string | null;
  getAllBills: () => void;
  getBillById: (id: string) => Promise<IBill | undefined>;
  getBillByOrderId: (orderId: string) => IBill | undefined;
  createBill: (bill: Partial<IBill>) => Promise<void>;
  updateBill: (id: string, bill: Partial<IBill>) => Promise<void>;
  deleteBill: (id: string) => Promise<void>;
}

const defaultContextValue: BillContextType = {
  bills: [],
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false,
    getById: false
  },
  error: null,
  getAllBills: () => {},
  getBillById: async () => undefined,
  getBillByOrderId: () => undefined,
  createBill: async () => {},
  updateBill: async () => {},
  deleteBill: async () => {}
};

export const BillContext = createContext<BillContextType>(defaultContextValue);

export const BillProvider = ({ children }: { children: ReactNode }) => {
  const [bills, setBills] = useState<IBill[]>([]);
  const [loading, setLoading] = useState({
    getAll: false,
    create: false,
    update: false,
    delete: false,
    getById: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Đã có lỗi xảy ra!');
  };

  const fetchData = async (
    apiCall: () => Promise<any>,
    onSuccess: (data: any) => void,
    loadingKey: keyof typeof loading
  ) => {
    setLoading(prev => ({ ...prev, [loadingKey]: true }));
    setError(null);
    try {
      const response = await apiCall();
      onSuccess(response);
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const getAllBills = useCallback(() => {
    fetchData(getAllBillsApi, data => setBills(data), 'getAll');
  }, []);

  const getBillById = useCallback(
    async (id: string): Promise<IBill | undefined> => {
      let bill: IBill | undefined;

      await fetchData(
        () => getBillByIdApi(id),
        data => {
          bill = data;
          setBills(prevBills => {
            const existingBill = prevBills.find(
              existingBill => existingBill._id === id
            );
            return existingBill
              ? prevBills.map(b => (b._id === id ? data : b))
              : [...prevBills, data];
          });
        },
        'getById'
      );

      return bill;
    },
    []
  );

  const getBillByOrderId = useCallback(
    (orderId: string): IBill | undefined => {
      return bills.find(bill => bill.orderId?._id === orderId);
    },
    [bills]
  );

  const createBill = useCallback(
    async (bill: Partial<IBill>): Promise<void> => {
      await fetchData(
        () => createBillApi(bill),
        data => setBills(prevBills => [...prevBills, data]),
        'create'
      );
    },
    []
  );

  const updateBill = useCallback(
    async (id: string, bill: Partial<IBill>): Promise<void> => {
      await fetchData(
        () => updateBillApi(id, bill),
        data =>
          setBills(prevBills =>
            prevBills.map(existingBill =>
              existingBill._id === id ? data : existingBill
            )
          ),
        'update'
      );
    },
    []
  );

  const deleteBill = useCallback(async (id: string): Promise<void> => {
    await fetchData(
      () => deleteBillApi(id),
      () =>
        setBills(prevBills =>
          prevBills.filter(existingBill => existingBill._id !== id)
        ),
      'delete'
    );
  }, []);

  useEffect(() => {
    getAllBills();
  }, [getAllBills]);

  return (
    <BillContext.Provider
      value={{
        bills,
        loading,
        error,
        getAllBills,
        getBillById,
        getBillByOrderId,
        createBill,
        updateBill,
        deleteBill
      }}
    >
      {children}
    </BillContext.Provider>
  );
};
