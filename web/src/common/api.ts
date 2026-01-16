import { IApiGetPets } from './@types/pets';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function GET_PETS({ petsPerPage = 8, nextCursor = null }: IApiGetPets) {
  return {
    url: `${BASE_URL}/pet?petsPerPage=${petsPerPage}&nextCursor=${nextCursor}`,
  };
}
