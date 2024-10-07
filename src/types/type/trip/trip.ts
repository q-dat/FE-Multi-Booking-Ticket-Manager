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
    departure_date: Date;
    departure_time: string;
    return_date: Date;
    return_time: string;
}