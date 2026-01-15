import Pet from '../../models/Pet.js';

interface QueryData {
  petsPerPage: number;
  nextCursor: NativeDate | null;
}

export class ListAllPetsService {
  static async execute({ petsPerPage, nextCursor }: QueryData) {
    try {
      const query = nextCursor ? { createdAt: { $lt: nextCursor } } : {};

      const pets = await Pet.find(query)
        .sort('-createdAt')
        .limit(petsPerPage + 1);

      let hasNextPage = false;
      if (pets.length > petsPerPage) {
        hasNextPage = true;
        pets.pop();
      }

      const newNextCursor = hasNextPage ? pets[pets.length - 1].createdAt : null;

      return { pets, hasNextPage, nextCursor: newNextCursor };
    } catch (err) {
      throw new Error(err as string);
    }
  }
}
