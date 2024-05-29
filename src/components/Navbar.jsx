import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";
import { FaGlobe } from "react-icons/fa";
import { FaPlane } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useTranslation } from 'react-i18next';
import { FaDollarSign } from 'react-icons/fa';
import { FaHome, FaSuitcase, FaTools } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);


  };
  

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>

    
      <div className="navbar_language">
        <FaGlobe /> 
        <select className=" navbar_section"
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="ar">العربية</option>
        </select>
      </div>


      <div className="navbar_price ">
      <FaDollarSign /> 
      <select className=" navbar_section"
     
        >
          <option value="tnd">TND</option>
          <option value="eur">EUR</option>
          <option value="usd">USD</option>
        </select>
      </div>
         {/* Affichage de la traduction de la clé "welcome" */}
      {/* <h1>{t('welcome')}</h1> */}

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <IconButton
          disabled={search === ""}
          onClick={() => navigate(`/properties/search/${search}`)}
        >
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>


    

      <div className="navbar_right">
      <a href="/" className="host">
      <FaHome size={30} /> Home
          </a>
      </div>
      <div className="navbar_right">
      <a href="/about " className="host">
      <FaSuitcase size={30} /> About
          </a>
      </div>
      {/* <div className="navbar_right">
      <a href="/" className="host">
      <FaTools size={30} />ervice
          </a>
      </div> */}
      <div className="navbar_right">
      <a href="/flights" className="host">
            < FaPlane size={30} /> Book Flight
          </a>
      </div>



      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            <AiOutlineUserAdd /> Become A Host
          </a>
        ) : (
          <a href="/login" className="host">
            Become A Host
          </a>
        )}

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: variables.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/trips`}>Trip List</Link>
            <Link to={`/${user._id}/wishList`}>Wish List</Link>
            <Link to={`/${user._id}/properties`}>Property List</Link>
            <Link to={`/${user._id}/reservations`}>Reservation List</Link>
            <Link to={`/${user._id}/Myflights`}>My flights</Link>
            <Link to="/create-listing">Become A Host</Link>

            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
