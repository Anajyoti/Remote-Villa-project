import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteSpotThunk, getUserSpotsThunk } from "../../store/spots";
import { useModal } from "../../context/Modal";  // Import the useModal hook
import ConfirmationModal from "./ConfirmationModal";  // Import the ConfirmationModal
import "./ManageSpots.css";
import CreateSpot from "./CreateSpot";

function ManageSpots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state?.session?.user?.id);
  const allSpots = useSelector((state) => state.spots.spotsOwnedByCurrentUser);
  const { setModalContent, closeModal } = useModal();  // Destructure modal functions
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   if (userId) {
  //     dispatch(getUserSpotsThunk(userId));
  //   }
  // }, [dispatch, userId]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(getUserSpotsThunk());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const deleteSpot = (spotId) => {
    dispatch(deleteSpotThunk(spotId)).then(() => {
      dispatch(getUserSpotsThunk(userId)); // Re-fetch user spots after deletion
      closeModal();  // Close the modal after deletion
    });
  };

  const handleDelete = (e, spotId) => {
    e.stopPropagation();  // Prevent click from going to the spot detail
    // Set the modal content to the ConfirmationModal when "Delete" is clicked
    setModalContent(
      <ConfirmationModal
        onConfirm={() => deleteSpot(spotId)}  // Pass the delete action to onConfirm
        onClose={closeModal}  // Pass closeModal to handle closing the modal
      />
    );
  };

  const toEdit = (e, spotId) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/spots/${spotId}/edit`);
  };
// const toEdit = (e, spotId) => {
//     e.preventDefault();
//     navigate(`/spots/${spotId}/edit`);
//   };

  const goToSpotDetail = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  return (
    <div className="manage-spots-container">
      <h1>Manage Spots</h1>
      <h2>{Object.values(allSpots).length} SPOTS</h2>

      {Object.values(allSpots).length === 0 ? (
        <button className="create-new-spot" onClick={() => setShowCreateModal(true)}>
          Create a New Spot
        </button>
      ) : (
        <div className="spot-tiles-grid">
          {Object.values(allSpots).map((spot) => (
            <div
              key={spot.id}
              className="spot-tile"
              onClick={() => goToSpotDetail(spot.id)}
            >
              {/* <img src={spot.image} alt={spot.name} className="spot-image" /> */}
              <img src={'/preview3.jpeg'} alt={spot.name} className="spot-image" /> 
              <div className="spot-info">
                <h3>{spot.name}</h3>
                <p>{spot.city}, {spot.state}</p>
                <p>Rating: {spot.rating}</p>
                <p>Price: ${spot.price}</p>
                <div className="spot-buttons">
                  <button className="update" onClick={(e) => toEdit(e, spot.id)}>Update</button>
                  <button className="delete" onClick={(e) => handleDelete(e, spot.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <div className="create-spot-modal">
          <CreateSpot setShowModal={setShowCreateModal} />
        </div>
      )}
    </div>
  );
}

export default ManageSpots;
