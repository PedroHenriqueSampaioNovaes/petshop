import { MulterMemoryFile } from './image.js';

export interface IPetMulterDataRequest {
  name: string;
  age: number;
  weight: number;
  images: MulterMemoryFile[];
  description: string;
  breed: string;
  gender: 'male' | 'female';
  castrationStatus: boolean;
  state: string;
  municipality: string;
}
