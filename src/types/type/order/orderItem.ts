export interface OrderItem {
  departureDate: string;
  destinationDate: string;
  ticketCatalog: string;
  departureTime: string
  returnTime: string
  departurePoint: string;
  destinationPoint: string;
  seat: string;
  vehicle: string;
  seatCatalog: string;
  price: number;
  quantity: number;
  ticketCode: string;
}

export interface Address {
  fullName: string;
  email: string;
  street: string;
  city: string;
  cccd: number;
  country: string;
  phone: string;
}