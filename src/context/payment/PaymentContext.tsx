import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { IPayment, PaymentStatus } from '../../types/type/payment/payment';
import {
  getAllPaymentsApi,
  createPaymentApi,
  updatePaymentStatusApi,
  deletePaymentApi
} from '../../axios/api/paymentApi';
interface PaymentContextType {
  payments: IPayment[];
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllPayments: () => void;
  getPaymentById: (id: string) => IPayment | undefined;
  createPayment: (payment: Partial<IPayment>) => Promise<void>;
  updatePaymentStatus: (id: string, status: PaymentStatus) => Promise<void>;
  deletePayment: (id: string) => Promise<void>;
}

const defaultContextValue: PaymentContextType = {
  payments: [],
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllPayments: () => {},
  getPaymentById: () => undefined,
  createPayment: async () => {},
  updatePaymentStatus: async () => {},
  deletePayment: async () => {}
};

export const PaymentContext =
  createContext<PaymentContextType>(defaultContextValue);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [loading, setLoading] = useState({
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

  const getAllPayments = useCallback(() => {
    fetchData(getAllPaymentsApi, data => setPayments(data), 'getAll');
  }, []);

  const getPaymentById = useCallback(
    (id: string) => {
      return payments.find(payment => payment._id === id);
    },
    [payments]
  );

  const createPayment = useCallback(
    async (payment: Partial<IPayment>): Promise<void> => {
      await fetchData(
        () => createPaymentApi(payment),
        data => setPayments(prevPayments => [...prevPayments, data]),
        'create'
      );
    },
    []
  );

  const updatePaymentStatus = useCallback(
    async (id: string, status: PaymentStatus): Promise<void> => {
      await fetchData(
        () => updatePaymentStatusApi(id, status),
        data =>
          setPayments(prevPayments =>
            prevPayments.map(payment => (payment._id === id ? data : payment))
          ),
        'update'
      );
    },
    []
  );

  const deletePayment = useCallback(async (id: string): Promise<void> => {
    await fetchData(
      () => deletePaymentApi(id),
      () =>
        setPayments(prevPayments =>
          prevPayments.filter(payment => payment._id !== id)
        ),
      'delete'
    );
  }, []);

  useEffect(() => {
    getAllPayments();
  }, [getAllPayments]);

  return (
    <PaymentContext.Provider
      value={{
        payments,
        loading,
        error,
        getAllPayments,
        getPaymentById,
        createPayment,
        updatePaymentStatus,
        deletePayment
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
