import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import { IOrder, OrderStatus } from '../../types/type/order/order';
import {
  getAllOrdersApi,
  createOrderApi,
  updateOrderStatusApi,
  deleteOrderApi
} from '../../axios/api/orderApi';

interface OrderContextType {
  orders: IOrder[];
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllOrders: () => void;
  getOrderById: (id: string) => IOrder | undefined;
  createOrder: (order: Partial<IOrder>) => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
}

const defaultContextValue: OrderContextType = {
  orders: [],
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false,
  },
  error: null,
  getAllOrders: () => { },
  getOrderById: () => undefined,
  createOrder: async () => { },
  updateOrderStatus: async () => { },
  deleteOrder: async () => { }
};

export const OrderContext = createContext<OrderContextType>(defaultContextValue);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState({
    getAll: false,
    create: false,
    update: false,
    delete: false,
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

  const getAllOrders = useCallback(() => {
    fetchData(
      getAllOrdersApi,
      data => setOrders(data),
      'getAll'
    );
  }, []);

  const getOrderById = useCallback(
    (id: string) => {
      return orders.find(order => order._id === id);
    },
    [orders]
  );

  const createOrder = useCallback(async (order: Partial<IOrder>): Promise<void> => {
    await fetchData(
      () => createOrderApi(order),
      data => setOrders(prevOrders => [...prevOrders, data]),
      'create'
    );
  }, []);

  const updateOrderStatus = useCallback(async (id: string, status: OrderStatus): Promise<void> => {
    await fetchData(
      () => updateOrderStatusApi(id, status),
      data =>
        setOrders(prevOrders =>
          prevOrders.map(order => (order._id === id ? data : order))
        ),
      'update'
    );
  }, []);

  const deleteOrder = useCallback(async (id: string): Promise<void> => {
    await fetchData(
      () => deleteOrderApi(id),
      () =>
        setOrders(prevOrders =>
          prevOrders.filter(order => order._id !== id)
        ),
      'delete'
    );
  }, []);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        getAllOrders,
        getOrderById,
        createOrder,
        updateOrderStatus,
        deleteOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
