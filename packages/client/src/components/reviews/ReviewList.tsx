import axios from 'axios';
import { HiSparkles } from 'react-icons/hi2';
import StarRating from './StarRating';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import ReviewSkeleton from './ReviewSkeleton';
import {
   reviewsApi,
   type GetReviewResponse,
   type SummarizeResponse,
} from './reviewsApi';

type Props = {
   productId: number;
};

// { summary, reviews }

// type SummarizeResponse = {
//    summary: string;
// };

const ReviewList = ({ productId }: Props) => {
   //    const [summary, setSummary] = useState('');
   //    const [isSummaryLoading, setIsSummaryLoading] = useState(false);
   //    const [summaryError, setSummaryError] = useState('');
   //    const {
   //       mutate: handleSummerize,
   //       isPending: isSummaryLoading,
   //       isError: isSummaryError,
   //       data: summarizeResponse,
   //    } = useMutation<SummarizeResponse>({
   //       mutationFn: () => summarizeReviews(),
   //    });

   const summaryMutation = useMutation<SummarizeResponse>({
      mutationFn: () => reviewsApi.summarizeReviews(productId),
   });

   //    const {
   //       data: reviewData,
   //       isLoading,
   //       error,
   //    } = useQuery<GetReviewResponse>({
   //       queryKey: ['reviews', productId],
   //       queryFn: () => fetchReviews(),
   //    });

   const reviewsQuery = useQuery<GetReviewResponse>({
      queryKey: ['reviews', productId],
      queryFn: () => reviewsApi.fetchReviews(productId),
   });
   //    const [reviewData, setReviewData] = useState<GetReviewResponse>();
   //    const [isLoading, setIsLoading] = useState(false);
   //    const [error, setError] = useState('');

   //    useEffect(() => {
   //       fetchReviews();
   //    }, []);

   if (reviewsQuery.isLoading) {
      //   return <p>Loading...</p>;
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((index) => (
               <ReviewSkeleton key={index} />
            ))}
            {summaryMutation.isError && (
               <p className="text-red-500">
                  Could not fetch reviews. Try again!
               </p>
            )}
         </div>
      );
   }
   if (reviewsQuery.isError) {
      return (
         <p className="text-red-500">Could not fetch reviews. Try again!</p>
      );
   }

   if (!reviewsQuery.data?.reviews.length) {
      return null;
   }

   const currentSummary =
      reviewsQuery.data.summary || summaryMutation.data?.summary;

   return (
      <div>
         <div className="mb-5">
            {currentSummary ? (
               <p>{currentSummary}</p>
            ) : (
               <div>
                  <Button
                     onClick={() => summaryMutation.mutate()}
                     className="cursor-pointer"
                     disabled={summaryMutation.isPending}
                  >
                     <HiSparkles />
                     Summarize
                  </Button>
                  {summaryMutation.isPending && (
                     <div className="py-3">
                        <ReviewSkeleton />
                     </div>
                  )}
               </div>
            )}
         </div>
         <div className="flex flex-col gap-5">
            {reviewsQuery.data?.reviews.map((review) => (
               <div key={review.id}>
                  <div className="font-semibold">{review.author}</div>
                  {/* <div>Rating: {review.rating}/5</div> */}
                  <div>
                     <StarRating value={review.rating} />
                  </div>
                  <p className="py-2">{review.content}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ReviewList;
