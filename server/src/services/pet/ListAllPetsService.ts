import Pet from '../../models/Pet.js';

interface QueryData {
  petsPerPage: number;
  currentCursor: NativeDate | null;
}

export class ListAllPetsService {
  static async execute({ petsPerPage, currentCursor }: QueryData) {
    try {
      const query = currentCursor ? { createdAt: { $lt: currentCursor } } : {};

      const pets = await Pet.find(query)
        .sort('-createdAt')
        .limit(petsPerPage + 1);

      let hasNextPage = false;
      if (pets.length > petsPerPage) {
        hasNextPage = true;
        pets.pop();
      }

      const nextCursor = hasNextPage ? pets[pets.length - 1].createdAt : null;

      return { pets, hasNextPage, nextCursor };
    } catch (err) {
      throw new Error(err as string);
    }
  }
}
