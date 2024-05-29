import { useState } from "react";
import "../styles/ListingCardOwner.scss";

import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,

} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";

const ListingCardOwner = ({
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
}) => {
  /* SLIDER FOR IMAGES */
  const [currentIndex, setCurrentIndex] = useState(0);
  const user = useSelector((state) => state.user);
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

  return (
    <div
      className="listing-card"

    >
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

              onClick={
                ((e) => {
                  e.preventDefault();
                  navigate(`/properties/edit/${listingId}`);
                })
              }
            >
              <EditIcon />
              Edit</button>
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
              Delete</button>
          </div>
        </>
      ) : (
        <>
          <p>
            {startDate} - {endDate}
          </p>
          <div className="d-flex justify-content-between">
            <p>
              <span>${totalPrice}</span> total
            </p>
            <button className="booking">Booking</button>
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
    </div>
  );
};

export default ListingCardOwner;
