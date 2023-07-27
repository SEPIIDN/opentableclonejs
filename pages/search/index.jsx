import RestaurantCard from '../../components/restaurants/restaurant-card';
import SideBar from '../../components/restaurants/restaurant-search--sidebar';
import { Fragment } from 'react';
import PageTitle from './head';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function Search({
  restaurants,
  locations,
  cuisines,
  searchParams,
}) {
  return (
    <Fragment>
      <PageTitle />
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
        <SideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        {restaurants.length ? (
          <div className='ml-20 w-5/6'>
            {restaurants.map((restaurant) => (
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
            ))}
          </div>
        ) : (
          <div
            class='flex-1 bg-red-100 rounded-lg p-4 mb-4 text-lg font-bold text-red-700'
            role='alert'
          >
            <div>
              <span class='font-bold'>
                Sorry!
              </span>{' '}
              no restaurants available for your
              search
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export async function getServerSideProps({
  query,
}) {
  const fetchRestaurantsByCity = (query) => {
    const where = {};
    if (query.city) {
      const location = {
        name: {
          equals: query.city.toLowerCase(),
        },
      };
      where.location = location;
    }
    if (query.cuisine) {
      const cuisine = {
        name: {
          equals: query.cuisine.toLowerCase(),
        },
      };
      where.cuisine = cuisine;
    }
    if (query.price) {
      const price = {
        equals: query.price,
      };
      where.price = price;
    }

    return prisma.restaurant.findMany({
      where,
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
  };

  const fetchLocations = () => {
    return prisma.location.findMany();
  };

  const fetchCuisines = () => {
    return prisma.cuisine.findMany();
  };

  const restaurants =
    await fetchRestaurantsByCity(query);

  const formattedRestaurants = JSON.parse(
    JSON.stringify(restaurants)
  );

  const [locations, cuisines] = await Promise.all(
    [fetchLocations(), fetchCuisines()]
  );

  const formattedLocations = JSON.parse(
    JSON.stringify(locations)
  );
  const formattedcuisines = JSON.parse(
    JSON.stringify(cuisines)
  );

  // console.log(query);

  // const locations = fetchLocations();
  // const cuisines = fetchCuisines();
  return {
    props: {
      restaurants: formattedRestaurants,
      locations: formattedLocations,
      cuisines: formattedcuisines,
      searchParams: query,
    },
  };
}
