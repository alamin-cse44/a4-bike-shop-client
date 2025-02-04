import { TBike } from "./bike.type";
import { TUserRegistration } from "./user.type";

export type TOrder = {
  _id: string;
  email: string;
  customer: TUserRegistration;
  product: TBike;
  totalPrice: number;
  orderStatus: string;
  quantity: number;
  address: string;
  phone: string;
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
};
