import React from "react";

const BestDestinations = () => {
  return (
    <div>
      <h1>Best Destinations In The World</h1>
      <div className="destination">
        {/* <img src="/assets/destinations/dest1.jpg" alt="Rome" /> */}
        <h2>Destination 1 : Rome - Italie</h2>
        <p>
          The Colosseum is an ancient Roman amphitheater located in the city
          center. It is one of the largest amphitheaters ever built and is
          considered one of the greatest achievements of Roman architecture and
          engineering. Built in the 1st century AD, it was used for gladiator
          contests and other public events. Today, the Colosseum is a major
          attraction for tourists from around the world, attracting millions of
          visitors each year who come to admire its impressive architecture and
          learn more about its fascinating history.
        </p>
      </div>

      <div className="destination">
        {/* <img src="/assests/destinations/dest2.jpg" alt="Destination 2" /> */}
        <h2>Destination 2 : Oslo - Norvege</h2>
        <p>Night cruise in the fjord with shrimp buffet</p>
      </div>

      <div className="destination">
        {/* <img src="/assests/destinations/dest3.jpg" alt="Destination 3" /> */}
        <h2>Destination 3 : Japan - Tokyo</h2>
        <p>
          {" "}
          Tokyo Skytree - Tokyo Skytree is a towering landmark and
          communications tower in Sumida, Tokyo, Japan. Standing at a height of
          634 meters (2,080 feet), it is one of the tallest structures in the
          world. The Skytree offers breathtaking panoramic views of Tokyo and
          its surrounding areas from its observation decks, located at heights
          of 350 meters and 450 meters. Visitors can enjoy stunning vistas of
          the cityscape, including landmarks such as Tokyo Tower, the Tokyo
          Dome, and Mount Fuji on clear days. The tower also houses a variety of
          shops, restaurants, and attractions, making it a popular destination
          for both locals and tourists alike.
        </p>
      </div>
    </div>
  );
};

export default BestDestinations;
