import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import FlightsList from "./pages/FlightsList";
import MyFlightsList from "./pages/MyFlightsList";
//import LanguageCard from "./pages/LanguageCard";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Importez le fichier de configuration i18n

import StripePayment from './components/StripePayment';
import About from "./pages/About";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />
          <Route path="/:userId/trips" element={<TripList />} />
          <Route path="/:userId/wishList" element={<WishList />} />
          <Route path="/:userId/properties" element={<PropertyList />} />
          <Route path="/:userId/reservations" element={<ReservationList />} />
          <Route path="/properties/edit/:listingId" element={<EditListing />} />
          <Route path="/flights" element={<FlightsList />} />
          <Route path="/:userId/Myflights" element={<MyFlightsList />} />
          {/* <Route path="/languageCard" element={<LanguageCard />} /> */}

          
          <Route path='/pay/:bookingId' element={<StripePayment/>}/> 
          <Route path='/about' element={<About/>}/> 
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;
