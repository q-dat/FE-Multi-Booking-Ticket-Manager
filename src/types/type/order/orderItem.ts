export interface OrderItem {
  name: string;
  cccd: string;
  phone: string;
  departureDate: string;
  destinationDate: string;
  ticketCatalog: string;
  departureTime: string;
  returnTime: string;
  departurePoint: string;
  destinationPoint: string;
  seat: string;
  vehicle: string;
  seatCatalog: string;
  price: number;
  quantity: number;
  ticketCode: string;
  status: string;
  discount: string;
}
export interface Address {
  fullName: string;
  email: string;
  street: string;
  city: string;
  cccd: string;
  country: string;
  phone: string;
}
