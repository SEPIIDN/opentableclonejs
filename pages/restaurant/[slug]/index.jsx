import RestaurantNavbar from './components/restaurant-navbar';
import RestaurantTitle from './components/restaurant-title';
import RestaurantRating from './components/restaurant-rating';
import RestaurantDescription from './components/restaurant-description';
import RestaurantImages from './components/restaurant-images';
import RestaurantReviews from './components/restaurant-reviews';
import RestaurantReservation from './components/restaurant-reservation';
import MenuLayout from './layout';
import PageTitle from './head';
import { PrismaClient } from '@prisma/client';
import Custom404 from '../../../components/layout/404';

const prisma = new PrismaClient();

export default function RestaurantDetails({
  restaurant,
}) {
  return (
    <MenuLayout>
      {restaurant ? (
        <>
          <PageTitle />
          <div className='bg-white w-[70%] rounded p-3 shadow'>
            <RestaurantNavbar
              slug={restaurant.slug}
            />
            <RestaurantTitle
              name={restaurant.name}
            />
            <RestaurantRating
              reviews={restaurant.reviews}
            />
            <RestaurantDescription
              description={restaurant.description}
            />
            <RestaurantImages
              images={restaurant.images}
            />
            <RestaurantReviews
              reviews={restaurant.reviews}
            />
          </div>
          <div className='w-[27%] relative text-reg'>
            <RestaurantReservation
              openTime={restaurant.open_time}
              closeTime={restaurant.close_time}
            />
          </div>
        </>
      ) : (
        <Custom404 />
      )}
    </MenuLayout>
  );
}

export async function getServerSideProps({
  params,
}) {
  const restaurantSelector = async (slug) => {
    const selectedRestaurant =
      await prisma.restaurant.findUnique({
        where: { slug },
        select: {
          id: true,
          name: true,
          description: true,
          images: true,
          slug: true,
          reviews: true,
          open_time: true,
          close_time: true,
        },
      });
    return selectedRestaurant;
  };

  const restaurant = await restaurantSelector(
    params.slug
  );

  // const formattedRestaurant = JSON.parse(
  //   JSON.stringify(restaurant)
  // );

  return {
    props: { restaurant: restaurant },
  };
}
