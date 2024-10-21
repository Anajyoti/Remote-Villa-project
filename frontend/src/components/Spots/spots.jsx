// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getSpotsThunk } from '../../store/spots';
// import { useNavigate } from 'react-router-dom';
// //import { getUserReviewsThunk } from '../../store/review';
// import './spots.css'; // Import CSS for styling
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from "@fortawesome/fontawesome-free-solid";
// //import StarAndRating from '../Reviews/StarAndRating';
// import  { getSpotReviewsThunk } from '../../store/review';

// const Spots = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   // Local state to handle loading or errors

//   const [isLoading, setIsLoading] = useState(true);
//   const spots = useSelector((state) => state.spots.allSpots);

//   useEffect(() => {
//     dispatch(getSpotsThunk())
//     //dispatch(getUserReviewsThunk())
//       .then(() => setIsLoading(false));
//   }, [dispatch]);
//   // const [error, setError] = useState(null);
//   //const spots = useSelector((state) => state.spots); // Accessing the state
//   //const allSpots = useSelector((state) => state.spots?.allSpots || []);
//   // useEffect(() => {
//   //   dispatch(getSpots())
//       // .then(() => setIsLoading(false)) // Set loading to false once data is fetched
//       //  .catch(() => {
//       //   setError('Failed to load spots. Please try again.');
//       //   setIsLoading(false);
//       // });
//   // }, [dispatch]);

//   const handleSpotClick = (spotId) => {
//     navigate(`/spots/${spotId}`);
//   };

//   if (isLoading) return <div>Loading...</div>; // Show loading spinner or message
//   // if (error) return <div>{error}</div>; // Show error message if fetching failed

//   // if (!spots) return <div>No spots available</div>;
//   //console.log(">>>>>>",spots)
//   return (
//     <div className="spotList">
//     {Object.values(spots).map((spot) => (
//       <div key={spot.id} className="eachSpot" title={spot.name} onClick={()=>handleSpotClick(spot.id)}>
//           {/* Thumbnail Image */}
//           {/* <img className="spot-thumbnail" src={spot.previewImage} alt={spot.name} /> */}
//           <img className="spot-thumbnail" src={'/preview1.jpeg'} alt="Spot"/>
          
//           {/* City and State */}
//           <div className="spot-info">
//             <p className="spot-location">{spot.city}, {spot.state}</p>

//             {/* Tooltip with the name */}
//             <div className="spot-name" title={spot.name}>{spot.name}</div>

//             {/* Star Rating */}
//             {/* <div className="spot-rating">
//               {/* {spot.avgRating ? (
//                 // <StarAndRating rating={spot.avgRating} onChange={() => {}} />
//               ) : (
//                 <span>New</span>
//               )}
//             </div> */} 
//             <div className='star-icon'>
//                   <FontAwesomeIcon icon={faStar} color='black'/>ratings
//                   </div>

//             {/* Price per night */}
//             <p className="spot-price">${spot.price} <span className="night-label">night</span></p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Spots;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsThunk } from '../../store/spots';
import { getSpotReviewsThunk } from '../../store/review';
import { useNavigate } from 'react-router-dom';
import './spots.css'; // Import CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/fontawesome-free-solid';
// import Reviews from '../Reviews';
const Spots = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all spots from Redux store
  const spots = useSelector((state) => state.spots.allSpots);

  // Fetch spots when the component mounts
  useEffect(() => {
    dispatch(getSpotsThunk()).then(() => setIsLoading(false));
  }, [dispatch]);

  const handleSpotClick = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="spotList">
      {Object.values(spots)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))   
        .map((spot) => (
        <SpotTile key={spot.id} spot={spot} onClick={handleSpotClick} />
      ))}
    </div>
  );
};

// SpotTile Component to render each spot with tooltip, image, rating, and price
const SpotTile = ({ spot, onClick }) => {
  const dispatch = useDispatch();
  const [avgStar, setAvgStar] = useState(0);
  const reviews = useSelector((state) => state.reviews[spot.id] || []); // Select reviews for this spot from Redux

  // Fetch reviews when the component loads
  useEffect(() => {
    dispatch(getSpotReviewsThunk(spot.id));
  }, [dispatch, spot.id]);

  // Calculate average star rating when reviews change
  useEffect(() => {
    if (reviews.length > 0) {
    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
  //     const avgRating = allReviews.length
  // ? (allReviews.reduce((sum, review) => sum + review.stars, 0) / allReviews.length).toFixed(1)
  // : 'New';
    const avgRating = totalStars / reviews.length; //spot.avgRating ? spot.avgRating.toFixed(1) : 'New';
    setAvgStar(avgRating);
     } else {
       setAvgStar(0); // No reviews, so set avgStar to 0 or "New"
     }
  }, [reviews]);

  
  return (
    <div className="eachSpot" title={spot.name} onClick={() => onClick(spot.id)}>
      <img className="spot-thumbnail" src={spot.previewImage || '/preview1.jpeg'} alt={spot.name} />
      <div className="spot-info">
        <p className="spot-location">{spot.city}, {spot.state}</p>
        <div className="spot-name" title={spot.name}>{spot.name}</div>
        {/* <StarAndRating avgRating={spot.avgRating}/> */}
        <div className="spot-rating">
          {avgStar > 0 ? (
               
            <div>
              <FontAwesomeIcon icon={faStar} color='black' /> {avgStar.toFixed(1)}
            </div>
          ) : (
            <span>New</span>
          )}
        </div>
        <p className="spot-price">${spot.price} <span className="night-label">night</span></p>
      </div>
    </div>
  );
};

export default Spots;
