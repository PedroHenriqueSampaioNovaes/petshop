import { IApiGetPets } from './@types/pets';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function GET_PETS({ petsPerPage = 8, nextCursor = null }: IApiGetPets) {
  return {
    url: `${BASE_URL}/pets?petsPerPage=${petsPerPage}&nextCursor=${nextCursor}`,
  };
}

export function GET_PET({ id }: { id: string }) {
  return {
    url: `${BASE_URL}/pets/${id}`,
  };
}

export function GET_MYPETS() {
  return {
    url: `${BASE_URL}/pets/myPets`,
  };
}

export function DELETE_PET({ id }: { id: string }) {
  return {
    url: `${BASE_URL}/pets/${id}`,
  };
}

export function PET_CREATE() {
  return {
    url: `${BASE_URL}/pets/create`,
  };
}

export function PET_UPDATE({ id }: { id: string }) {
  return {
    url: `${BASE_URL}/pets/${id}`,
  };
}

export function PET_SCHEDULE({ id }: { id: string }) {
  return {
    url: `${BASE_URL}/pets/schedule/${id}`,
  };
}

export function LOGIN() {
  return {
    url: `${BASE_URL}/user/session`,
  };
}

export function REGISTER() {
  return {
    url: `${BASE_URL}/user/register`,
  };
}

export function USER_GET() {
  return {
    url: `${BASE_URL}/user/me`,
  };
}

export function USER_UPDATE() {
  return {
    url: `${BASE_URL}/user`,
  };
}
