export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: {
    url: string;
    public_id: string;
  };
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}
