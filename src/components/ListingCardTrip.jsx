import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../styles/ListingCard.scss";
import { ArrowForwardIos, ArrowBackIosNew, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListingCardTrip = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
  bookingId
}) => {
  /* SLIDER FOR IMAGES */
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ADD TO WISHLIST */
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];

  const isLiked = wishList?.find((item) => item?._id === listingId);

  const patchWishList = async () => {
    if (user?._id !== creator._id) {
    const response = await fetch(
      `http://localhost:3001/users/${user?._id}/${listingId}`,
      {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setWishList(data.wishList));
  } else { return }
  };

  /* MODAL LOGIC */
  const [showModal, setShowModal] = useState(false);
  const [newStartDate, setNewStartDate] = useState(startDate);
  const [newEndDate, setNewEndDate] = useState(endDate);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleSaveClick = async () => {
    // Add logic to save the updated booking details
    const response = await fetch(`http://localhost:3001/bookings/edit/${bookingId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ startDate: newStartDate, endDate: newEndDate })
    });

    const data = await response.json();
    console.log(data);
    // Optionally refresh or update the UI after saving
    setShowModal(false);
  };

  return (
    <div className="listing-card">
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:3001/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3>
        {city}, {province}, {country}
      </h3>
      <p>{category}</p>

      {!booking ? (
        <>
          <p>{type}</p>
          <div className="d-flex justify-content-between">
            <p>
              <span>${price}</span> per night
            </p>
            <button className="btn btn-primary btn-icon" style={{ padding: "5px 20px 5px 20px", width: "100px" }}

              onClick={handleEditClick}
            >
              <EditIcon />
              Edit
            </button>
            <button className="btn btn-danger btn-icon" style={{ marginLeft: "10px", padding: "5px 20px 5px 20px", width: "100px" }}
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm("Are you sure you want to delete this listing?")) {
                  fetch(`http://localhost:3001/properties/${listingId}`, {
                    method: "DELETE",
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      console.log(data);
                      if (data.success) {
                        window.location.reload();
                      }
                    });
                }
              }}
            >
              <DeleteIcon />
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <p>
            {startDate} - {endDate}
          </p>
          <p>
            <span>${totalPrice}</span> total
          </p>
          <div className="d-flex justify-content-between">
            <p>
              <span>${price}</span> per night
            </p>
            <button className="btn btn-primary btn-icon" style={{ padding: "5px 20px 5px 20px", width: "100px" }}

              onClick={handleEditClick}
            >
              <EditIcon />
              Edit
            </button>
            <button className="btn btn-danger btn-icon" style={{ marginLeft: "10px", padding: "5px 20px 5px 20px", width: "100px" }}
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm("Are you sure you want to delete this listing?")) {
                  fetch(`http://localhost:3001/bookings/trips/delete/${bookingId}`, {
                    method: "DELETE",
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      console.log(data);
                      if (data) {
                        window.location.reload();
                      }
                    });
                }
              }}
            >
              <DeleteIcon />
              Delete
            </button>
          </div>
        </>
      )}

      <button
        className="favorite"
        onClick={(e) => {
          e.stopPropagation();
          patchWishList();
        }}
        disabled={!user}
      >
        {isLiked ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <Favorite sx={{ color: "white" }} />
        )}
      </button>

      {/* Modal for editing booking details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={newStartDate}
                onChange={(e) => setNewStartDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={newEndDate}
                onChange={(e) => setNewEndDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListingCardTrip;
