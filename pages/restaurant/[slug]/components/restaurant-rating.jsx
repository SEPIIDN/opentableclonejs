import Star from '../../../../components/restaurants/restaurant-star';
import { ratingAverageCalculator } from '../../../../utils/ratingAverageCalculator';

export default function RestaurantRating({
  reviews,
}) {
  return (
    <div className='flex items-end'>
      <div className='ratings mt-2 flex items-center'>
        <Star reviews={reviews} />
        <p className='text-reg ml-3'>
          {ratingAverageCalculator(
            reviews
          ).toFixed(1)}
        </p>
      </div>
      <div>
        <p className='text-reg ml-4'>
          {reviews.length} Review
          {reviews.length > 1 && 's'}
        </p>
      </div>
    </div>
  );
}
