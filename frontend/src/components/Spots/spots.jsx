import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsThunk } from '../../store/spots';
import { useNavigate } from 'react-router-dom';
import './spots.css'; // Import CSS for styling
const Spots = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Local state to handle loading or errors

  const [isLoading, setIsLoading] = useState(true);
  const spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(getSpotsThunk())
      .then(() => setIsLoading(false));
  }, [dispatch]);
  // const [error, setError] = useState(null);
  //const spots = useSelector((state) => state.spots); // Accessing the state
  //const allSpots = useSelector((state) => state.spots?.allSpots || []);
  // useEffect(() => {
  //   dispatch(getSpots())
      // .then(() => setIsLoading(false)) // Set loading to false once data is fetched
      //  .catch(() => {
      //   setError('Failed to load spots. Please try again.');
      //   setIsLoading(false);
      // });
  // }, [dispatch]);

  const handleSpotClick = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  if (isLoading) return <div>Loading...</div>; // Show loading spinner or message
  // if (error) return <div>{error}</div>; // Show error message if fetching failed

  // if (!spots) return <div>No spots available</div>;
  //console.log(">>>>>>",spots)
  return (
    <div className="spotList">
    {Object.values(spots).map((spot) => (
      <div key={spot.id} className="eachSpot" title={spot.name} onClick={()=>handleSpotClick(spot.id)}>
          {/* Thumbnail Image */}
          <img className="spot-thumbnail" src={spot.previewImage} alt={spot.name} />

          {/* City and State */}
          <div className="spot-info">
            <p className="spot-location">{spot.city}, {spot.state}</p>

            {/* Tooltip with the name */}
            <div className="spot-name" title={spot.name}>{spot.name}</div>

            {/* Star Rating */}
            <div className="spot-rating">
              <span>{spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}</span>
            </div>

            {/* Price per night */}
            <p className="spot-price">${spot.price} <span className="night-label">night</span></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Spots;