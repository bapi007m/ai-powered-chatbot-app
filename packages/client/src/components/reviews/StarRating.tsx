import { FaRegStar, FaStar } from 'react-icons/fa';

type Props = {
   value: number; // ratig from 0 to 5
};

const StarRating = ({ value }: Props) => {
   const placeholders = [1, 2, 3, 4, 5];
   return (
      <div className="flex gap-1 text-yellow-500">
         {placeholders.map((placeholder) =>
            placeholder <= value ? (
               <FaStar key={placeholder} />
            ) : (
               <FaRegStar key={placeholder} />
            )
         )}
      </div>
   );
};

export default StarRating;
