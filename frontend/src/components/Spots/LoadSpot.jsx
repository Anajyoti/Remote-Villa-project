import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotByIdThunk } from '../../store/spots'; // Import the thunk
import { useParams } from 'react-router-dom';
import './LoadSpot.css';
import Reviews from '../Reviews/Reviews' ;
//import StarAndRating from '../Reviews/StarAndRating';
import  { getSpotReviewsThunk } from '../../store/review';
export function LoadSpot() {
   const { spotId } = useParams(); // Extract spotId from route parameters
   const dispatch = useDispatch();
   const reviews = useSelector((state) => state.reviews.spotReviews);
   const reviewArray = Object.values(reviews)
//    const starValues = reviewArray .map(review => review.stars)
//    const totalStar = starValues.reduce((sum,star) => sum+star,0)
//    const avgStar = totalStar/starValues.length;

    const [allStar, setAvgStar] = useState(0);
   // Fetch the spot details when the component loads or when spotId changes
   useEffect(() => {
       dispatch(getSpotByIdThunk(spotId));
       dispatch (getSpotReviewsThunk(spotId))
    //    .then(() => dispatch(getAllReviewsOfSpotThunk(spotId)));
   }, [dispatch, spotId]);
    useEffect (() => {
        if (reviewArray.length > 0) {
            const starValues = reviewArray .map(review => review.stars)
            const totalStar = starValues.reduce((sum,star) => sum+star,0)
            const avgStar = totalStar/starValues.length;
            setAvgStar(avgStar);
        }
        else setAvgStar (0)
    }, [reviewArray]
);

   // Access the spot data from the Redux store
   const spot = useSelector((state) => state.spots.singleSpot);
   //const reviews = useSelector((state) => state.reviews.currentUserReviews);
//    const reviews = useSelector((state) => state.reviews.allReviews);


   // Handle the case where the spot is not found or loading
   if (!spot || !spot.id) {
       return <h1>Spot Not Found</h1>;
   }


   return (
       <div className="spots-detail-container">
         {/* Image gallery */}
         <div className="image-gallery">
                <div className="large-image">
                    <img src={'/preview1.jpeg'} alt="Spot" />
                </div>
                <div className="small-images">
                    <img src={'/detail1.jpeg'} alt="Spot" />
                    <img src={'/detail2.jpeg'} alt="Spot" />
                    <img src={'/detail3.jpeg'} alt="Spot" />
                    <img src={'/detail4.jpeg'} alt="Spot" />
                </div>
            </div>
           {/* Image gallery */}
           {/* <div className="image-gallery">
               <div className="large-image">
                   <img src={spot.mainImage} alt="Spot" />
               </div>
               <div className="small-images">
                   <img src={spot.secondaryImage1} alt="Spot" />
                   <img src={spot.secondaryImage2} alt="Spot" />
                   <img src={spot.secondaryImage3} alt="Spot" />
                   <img src={spot.secondaryImage4} alt="Spot" />
               </div>
           </div> */}

       <div className="spot-details"> 
           {/* Spot details */}
           <div className="spot-info">
               <h1>{spot.name}</h1>
               <h2>Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h2>
               <p>{spot.city}, {spot.state}</p>
               <p>{spot.description}</p>


               {/* Booking section
               <div className="booking-section">
                   <div className="price">${spot.price} / night</div>
                   <button>Reserve</button>
               </div> */}
           </div>


           {/* About section
           <div className="about-section">
               <h2>About the place</h2>
               <p>{spot.about}</p>
           </div>
        </div>
            */}

           {/* Review and Count Section */}
           <div className="calloutBox" data-testid='spot-callout-box'>
               <div className="reviewAndCount">
                   {/* <StarAndRating rating={spot.avgStarRating} /> */}
                   <span className="rating">★ {allStar > 0 ? allStar.toFixed(1): "New"} · {reviewArray.length > 1 ? "reivews": "review"}</span>
                   <span>
                       {/* {spot.numReviews ? `· ${spot.numReviews} Review${spot.numReviews === 1 ? '' : 's'}` : ''} */}
                   </span>
               </div>
               <p data-testid='spot-price'>${spot.price} / night</p>
               <button data-testid='reserve-button' onClick={() => alert("Feature coming soon")}>Reserve</button>
           </div>
        </div> 


           {/* Review Area
           <div className="reviews">
               <Reviews spotId={spot.id} />
           </div> */}


<Reviews 
        spotId={spot.id} 
        avgRating={spot.avgRating} 
        numReviews={spot.numReviews} 
        RefechReviewChange={() => dispatch(getSpotReviewsThunk(spotId))}
        />



           {/* Inline reviews for visual demo
           <div className="review-section">
   <h2>Reviews</h2>
   {Object.values(reviews).length > 0 ? (
       Object.values(reviews).map((review, i) => (
           <div key={i} className="review">
               <div className="review-author">{review.author}</div>
               <div className="review-text">{review.text}</div>
           </div>
       ))
   ) : (
       <p>No reviews available.</p>
   )}
</div> */}
       </div>
   );
}
export default LoadSpot;
