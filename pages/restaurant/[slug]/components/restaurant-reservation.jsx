'use client';

import { useState } from 'react';
import {
  partySize,
  times,
} from '../../../../data';
import DatePicker from 'react-datepicker';

export default function RestaurantReservation({
  openTime,
  closeTime,
}) {
  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const handleChangeDate = (date) => {
    if (date) {
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const filterTimesByOpenWindow = () => {
    const timesWithinWindow = [];

    let isWithinWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }
      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });
    return timesWithinWindow;
  };

  return (
    <div className='fixed w-[25%] bottom-7 bg-white rounded p-3 shadow my-3'>
      <div className='text-center border-b pb-2 font-bold'>
        <h4 className='mr-7 text-lg'>
          Make a Reservation
        </h4>
      </div>
      <div className='my-3 flex flex-col'>
        <label htmlFor=''>Party size</label>
        <select
          name=''
          className='py-3 border-b font-light'
          id=''
        >
          {partySize.map((party) => (
            <option value={party.value}>
              {party.label}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-between'>
        <div className='flex flex-col w-[48%]'>
          <label htmlFor=''>Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className='p-2 border-b font-light text-reg w-28'
            dateFormat='MMMM d'
            wrapperClassName='w-[48%]'
          />
        </div>
        <div className='flex flex-col w-[48%]'>
          <label htmlFor=''>Time</label>
          <select
            name=''
            id=''
            className='py-3 border-b font-light'
          >
            {filterTimesByOpenWindow().map(
              (time) => (
                <option value={time.time}>
                  {time.displayTime}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <div className='mt-5'>
        <button className='bg-red-600 rounded w-full px-4 text-white font-bold h-16'>
          Find a Time
        </button>
      </div>
    </div>
  );
}
