import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setFlightsList } from "../redux/state";
import FlightCard from "../components/FlightCard";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Flight } from "@mui/icons-material";

const FlightsList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user?._id); // Vérification de nullité pour éviter les erreurs
  const FlightsList = useSelector((state) => state.user?.FlightsList); // Vérification de nullité pour éviter les erreurs

  const dispatch = useDispatch();

  const getFlightsList = async () => {
    try {
      const response = await fetch(`http://localhost:3001/flights/`, {
        method: "GET",
      });

      const data = await response.json();
      dispatch(setFlightsList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    }
  };

  useEffect(() => {
    getFlightsList();
  }, [userId]); // Ajout de userId comme dépendance pour recharger la liste des voyages en cas de changement

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Flight List</h1>
      <div className="list">
        {FlightsList?.map(
          ({
            airline,
            flightNumber,
            source,
            destination,
            departureTime,
            arrivalTime,
            price,
            seatsAvailable,
            _id,
          }) => (
            <FlightCard
              airline={airline}
              flightNumber={flightNumber}
              source={source}
              destination={destination}
              departureTime={departureTime}
              arrivalTime={arrivalTime}
              price={price}
              seatsAvailable={seatsAvailable}
              $
              _id={_id}
            />
          )
        )}
      </div>

      <Footer />
    </>
  );
};

export default FlightsList;
