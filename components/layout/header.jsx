'use client';
import Link from 'next/link';
import AuthModal from '../../pages/restaurant/[slug]/components/auth-modal';
import { useContext } from 'react';
import { AuthenticationContext } from '../../context/auth-context';
import useAuth from '../../hooks/use-auth';

export default function Header() {
  const { data, loading } = useContext(
    AuthenticationContext
  );
  const { signout } = useAuth();
  return (
    <main className='max-w-screen-2xl m-auto bg-white'>
      <nav className='bg-white p-2 flex justify-between'>
        <Link
          href='/'
          className='font-bold text-gray-700 text-2xl'
        >
          OpenTable
        </Link>
        <div className='mr-5'>
          {!loading && (
            <div className='flex'>
              {data ? (
                <button
                  className='bg-red-600 text-white text-center mr-3 border p-1 px-4 rounded'
                  onClick={signout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <AuthModal isSignIn={true} />
                  <AuthModal isSignIn={false} />
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </main>
  );
}
