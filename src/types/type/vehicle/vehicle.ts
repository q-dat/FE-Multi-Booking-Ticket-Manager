export interface IVehicle {
    _id: string;
    name: string;
    status: 'active' | 'inactive' | 'maintenance';
    createAt: string;
    updateAt: string;
  }
  
  export interface IVehicleDetail {
    _id: string;
    vehicle_id: string;
    model: string;
    year: number;
    capacity: number;
    license_plate: string;
    createAt: string;
    updateAt: string;
  }