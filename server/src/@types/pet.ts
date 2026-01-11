import { MulterMemoryFile } from './image.js';

export interface IPetMulterDataRequest {
  name: string;
  age: number;
  weight: number;
  images: MulterMemoryFile[];
  description: string;
  breed: string;
  gender: string;
  castrationStatus: boolean;
  location: {
    state: string;
    municipality: string;
  };
}
