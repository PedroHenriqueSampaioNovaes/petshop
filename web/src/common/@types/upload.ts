export type IUploadFolder = 'pets' | 'users';

export interface ISignature {
  signature: string;
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  transformation: string;
}

export interface IUploadedFile {
  public_id: string;
  secure_url: string;
}
