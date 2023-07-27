import RestaurantCard from '../components/restaurants/restaurant-card';
import PageTitle from './head';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function Home({ restaurants }) {
  return (
    <main className='bg-gray-100 min-h-screen w-screen'>
      <PageTitle />
      <div className='py-3 px-36 mt-10 flex flex-wrap justify-center'>
        {restaurants ? (
          restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              name={restaurant.name}
              main_image={restaurant.main_image}
              cuisine={restaurant.cuisine}
              slug={restaurant.slug}
              location={restaurant.location}
              price={restaurant.price}
              reviews={restaurant.reviews}
            />
          ))
        ) : (
          <p>loading...</p>
        )}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const restaurants =
    await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        main_image: true,
        slug: true,
        price: true,
        location: true,
        cuisine: true,
        reviews: true,
      },
    });
  const formattedRestaurants = JSON.parse(
    JSON.stringify(restaurants)
  );
  return {
    props: { restaurants: formattedRestaurants },
  };
}
