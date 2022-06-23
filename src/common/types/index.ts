export interface IUser {
  id: number;
  username: string;
  phone: string;
  email: string;
  token: string | any;
}
export interface TaskParams {
  id: number;
  userId: number;
}
