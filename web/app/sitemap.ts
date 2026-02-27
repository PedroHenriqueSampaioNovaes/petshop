import { MetadataRoute } from 'next';
import petsGet from '@/app/actions/pets-get';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://petshop-web-five.vercel.app';

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Dynamic routes (Pets)
  try {
    const { data, ok } = await petsGet({ petsPerPage: 100 });

    if (ok && data?.pets) {
      const petRoutes: MetadataRoute.Sitemap = data.pets.map((pet) => ({
        url: `${baseUrl}/pet/${pet._id}`,
        lastModified: new Date(pet.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));

      return [...routes, ...petRoutes];
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  return routes;
}
