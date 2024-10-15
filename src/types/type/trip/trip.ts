export interface ITrip {
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
  createAt: string;
  updateAt: string;
}
