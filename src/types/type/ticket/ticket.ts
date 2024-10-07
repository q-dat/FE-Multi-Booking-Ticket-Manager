export interface ITicket {
  _id: string;
  ticket_catalog_id: {
    _id: string;
    name: string;
  };
  seat_id: {
    _id: string;
    name: string;
    price: number;
    status: string;
  };
  trip_id: {
    _id: string;
    departure_point: {
      _id: string;
      name: string;
    };
    destination_point: {
      _id: string;
      name: string;
    };
    price: number;
    departure_date: string;
    departure_time: string;
    return_date: string;
    return_time: string;
  };
  createAt?: string;
  updateAt?: string;
  price: number;
}
export interface TicketCatalog {
  _id: string;
  name: string;
}

export interface Seat {
  _id: string;
  name: string;
  price: number;
  status: string;
}

export interface Trip {
  _id: string;
  departure_point: {
    _id: string;
    name: string;
  };
  destination_point: {
    _id: string;
    name: string;
  };
  price: number;
  departure_date: string;
  departure_time: string;
  return_date: string;
  return_time: string;
}

export interface Ticket {
  _id: string;
  ticket_catalog_id: TicketCatalog;
  seat_id: Seat;
  trip_id: Trip;
  createAt: string;
  updateAt: string;
  price: number;
}
//
export interface SearchFormData {
  ticket_catalog_name: string;
  seat_name: string;
  departure_point_name: string; //Điểm Khởi Hành
  destination_point_name: string; // Điểm Đến
  departure_date: Date;
  return_date: Date;
}

export interface TicketContextType {
  searchTickets: (data: SearchFormData) => void;
  loading: boolean;
  error: string | null;
}
