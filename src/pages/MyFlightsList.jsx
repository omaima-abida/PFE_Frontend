import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCardOwner from "../components/ListingCardOwner";
import { useEffect, useState } from "react";
import { setMyFlightsList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer"
import MyFlightCard from "../components/MyFlightCard";

const MyFlightsList = () => {
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user)
  const MyFlightsList = user?.MyFlightsList;
  console.log(user)

  const dispatch = useDispatch()
  const getMyFlightsList = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${user._id}/flights`, {
        method: "GET"
      })
      const data = await response.json()
      console.log(data)
      dispatch(setMyFlightsList(data))
      setLoading(false)
    } catch (err) {
      console.log("Fetch all properties failed", err.message)
    }
  }

  useEffect(() => {
    getMyFlightsList()
  }, [])

  return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list">Available Flights</h1>
      <div className="list">
        {MyFlightsList?.map(
          ({
                
            flight,
            seatNumber,
            ticketNumber,
            status,
            _id
          }) => (
            <MyFlightCard
              airline={flight.airline}
              flightNumber={flight.flightNumber}
              source={flight.source}
              destination={flight.destination}
              departureTime={flight.departureTime}
              arrivalTime={flight.arrivalTime}
              price={flight.price}
              seatsAvailable={flight.seatsAvailable}
              seatNumber={seatNumber}
              ticketNumber={ticketNumber}
              status={status}
              _id={_id}
            />
          )
        )}
      </div>

      <Footer />
    </>
  );
};

export default MyFlightsList;
