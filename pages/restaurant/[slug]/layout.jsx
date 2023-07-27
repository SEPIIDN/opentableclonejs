import { useRouter } from 'next/router';
import Header from './components/restaurant-header';

export default function MenuLayout({ children }) {
  const formatName = () => {
    const router = useRouter();
    const name = router.query.slug;
    const nameArray = name.split('-');
    nameArray[nameArray.length - 1] = `(${
      nameArray[nameArray.length - 1]
    })`;

    return nameArray.join(' ');
  };
  return (
    <main>
      <Header name={formatName()} />
      <div className='flex m-auto w-2/3 justify-between items-start 0 -mt-11'>
        {children}
      </div>
    </main>
  );
}
