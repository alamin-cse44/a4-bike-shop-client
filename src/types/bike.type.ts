export type TBike = {
  _id: string;
  name: string;
  brand: string;
  model: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type TCart = {
  _id: string;
  userEmail: string;
  product: TBike,
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
