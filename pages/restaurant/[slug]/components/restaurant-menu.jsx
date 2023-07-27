import MenuCard from './menu-card';

export default function MenuDetails({ menu }) {
  return (
    <main className='bg-white mt-5'>
      <div>
        <div className='mt-4 pb-1 mb-1'>
          <h1 className='font-bold text-4xl'>
            Menu
          </h1>
        </div>
        {menu.length ? (
          <div className='flex flex-wrap justify-between'>
            {menu.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        ) : (
          <h1 className='capitalize'>
            this restaurant does not have a menu
          </h1>
        )}
      </div>
    </main>
  );
}
