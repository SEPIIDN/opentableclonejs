import fullStar from '../../public/icons/full-star.png';
import halfStar from '../../public/icons/half-star.png';
import emptyStar from '../../public/icons/empty-star.png';
import { ratingAverageCalculator } from '../../utils/ratingAverageCalculator';
import Image from 'next/image';

export default function Star({
  reviews,
  rating,
}) {
  const reviewRating =
    rating || ratingAverageCalculator(reviews);

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const difference = parseFloat(
        (reviewRating - i).toFixed(1)
      );

      if (difference >= 1) {
        stars.push(fullStar);
      } else if (
        0 < difference &&
        difference < 1
      ) {
        if (difference <= 0.2) {
          stars.push(emptyStar);
        } else if (
          0.2 < difference &&
          difference <= 0.6
        ) {
          stars.push(halfStar);
        } else {
          stars.push(fullStar);
        }
      } else {
        stars.push(emptyStar);
      }
    }
    return stars.map((star) => (
      <Image
        key={`image-${reviews.id}`}
        src={star}
        alt=''
        className='w-4 h-4 mr-1'
      />
    ));
  };
  return (
    <div
      key={reviews.id}
      className='flex items-center'
    >
      {renderStars()}
    </div>
  );
}
