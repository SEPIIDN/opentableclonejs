import RestaurantNavbar from '../components/restaurant-navbar';
import MenuDetails from '../components/restaurant-menu';
import MenuLayout from '../layout';
import PageTitle from './head';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function MenuTab({ menu, slug }) {
  return (
    <MenuLayout>
      <PageTitle />
      <div className='bg-white w-[100%] rounded p-3 shadow'>
        <RestaurantNavbar slug={slug} />
        <MenuDetails menu={menu} />
      </div>
    </MenuLayout>
  );
}

export async function getServerSideProps({
  params,
}) {
  const fetchRestaurantMenu = async (slug) => {
    const restaurant =
      await prisma.restaurant.findUnique({
        where: { slug },
        select: {
          items: true,
        },
      });
    if (!restaurant) {
      throw new Error();
    }
    return restaurant.items;
  };

  const menu = await fetchRestaurantMenu(
    params.slug
  );
  const formattedMenu = JSON.parse(
    JSON.stringify(menu)
  );
  return {
    props: {
      menu: formattedMenu,
      slug: params.slug,
    },
  };
}
