import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GiPalmTree } from 'react-icons/gi';
import { BiHappy } from 'react-icons/bi';
import { FaUmbrellaBeach } from 'react-icons/fa';
import "../styles/Slide.scss"
import Weather from '../components/weather';

const Slide = () => {
  const { t } = useTranslation();

  // State pour gérer les valeurs du formulaire
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");

  // Fonction de gestion de la soumission du formulaire
  const handleSearch = () => {
    // Effectuez vos actions de recherche ici
    console.log("Location:", location);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  };

  return (
    <div className="slide">
      <h1>{t('discover_world')}</h1>
      <h2>{t('book_now')}</h2>
      {/* Formulaire */}
      <div className='form'>
        {/* <h1>Book accommodations Unique </h1> */}
        {/* <p>Trouvez un logement à moindre coût et parfaitement adapté à tout type de séjour sur DreamTravel et payez en toute sécurité.</p> */}
        <div className="inputContainer">
          <span>Where</span>
          <input type="text" placeholder="where  to?" onChange={(e) => setLocation(e.target.value)}
           />
        </div>
        <div className="inputContainer">
          {/* <span>Quand</span> */}
          <div>
            <span>Check In</span>
            <input type="date" onChange={(e) => setStartDate(e.target.value)} />
            <span>Checkout</span>
            <input type="date" onChange={(e) => setEndDate(e.target.value)} />
            {/* <span>À Tout Moment</span> */}
          </div>
        </div>
        <div className="inputContainer">
          <span>GUEST</span>
          <select>
            <option>1 guest</option>
            <option>2 guest</option>
            <option>3 guest</option>
            <option>4 guest</option>
            {/* Ajoutez autant d'options que nécessaire */}
          </select>
        </div>
        <button onClick={handleSearch}  value={search}
         >Search</button>
      </div>

    </div>
  );
};

export default Slide;
