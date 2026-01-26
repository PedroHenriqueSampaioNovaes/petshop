export interface IPet {
  _id: string;
  name: string;
  age: number;
  weight: number;
  gender: 'male' | 'female';
  breed: string;
  castrationStatus: boolean;
  location: {
    state: string;
    municipality: string;
  };
  description: string;
  images: {
    url: string;
    public_id: string;
  }[];
  available: boolean;
  user: {
    _id: string;
    name: string;
    image: string;
    phone: string;
  };
  adopter: {
    _id: string;
    name: string;
    image: {
      url: string;
      public_id: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface IApiGetPets {
  petsPerPage?: number;
  nextCursor?: string | null;
}
