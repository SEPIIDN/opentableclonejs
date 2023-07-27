import { Fragment } from 'react';
import ReservationForm from './components/reservation-form';
import ReservationHeader from './components/reservation-header';
import PageTitle from './head';

export default function Reserve() {
  return (
    <Fragment>
      <PageTitle />
      <div className='border-t h-screen'>
        <div className='py-9 w-3/5 m-auto'>
          <ReservationHeader />
          <ReservationForm />
        </div>
      </div>
    </Fragment>
  );
}
