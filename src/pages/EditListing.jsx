import "../styles/CreateListing.scss";
import Navbar from "../components/Navbar";
import { categories, types, facilities } from "../data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { useState, useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";

const EditListing = () => {
  const { listingId } = useParams();
  const [listingDetails, setListingDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });


  /* BASIC COUNTS */
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/properties/${listingId}`);
        if (response.ok) {
          const data = await response.json();
          setListingDetails(data);
          setLoading(false);
          filldata(data);
        } else {
          throw new Error("Failed to fetch listing details");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchListingDetails();
  }, [listingId]);



  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */



  const [amenities, setAmenities] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [formDescription, setFormDescription] = useState({ title: "", description: "" });
  const [formPricing, setFormPricing] = useState({ price: "" });
  const [formRules, setFormRules] = useState({
    minimumStay: "",
    maximumStay: "",
    checkinTime: "",
    checkoutTime: "",
  });
  const [availability, setAvailability] = useState({ startDate: "", endDate: "" });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({ ...formLocation, [name]: value });
  };

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({ ...formDescription, [name]: value });
  };

  const handleChangePricing = (e) => {
    const { name, value } = e.target;
    setFormPricing({ ...formPricing, [name]: value });
  };

  const handleChangeRules = (e) => {
    const { name, value } = e.target;
    setFormRules({ ...formRules, [name]: value });
  };

  const handleChangeAvailability = (e) => {
    const { name, value } = e.target;
    setAvailability({ ...availability, [name]: value });
  };

  const handleSelectAmenities = (name) => {
    setAmenities((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const handleUploadPhotos = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPhotos(items);
  };

  const creatorId = useSelector((state) => state.user._id);

  const navigate = useNavigate();
  const handlePost = async (e) => {
    e.preventDefault();

    try {
      const listingForm = document.getElementById("listingForm");

      const formData = new FormData(listingForm);

      const response = await fetch(`http://localhost:3001/properties/edit/${listingId}`, {
        method: "POST",
        body: formData,  
      });

      if (response.ok) {
        console.log("Publish Listing successful");
        navigate(`/${creatorId}/properties`);
      } else {
        console.log("Publish Listing failed");
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  };


  const filldata = (data) => {
    setCategory(data.category);
    setType(data.type);
    setFormLocation({
      streetAddress: data.streetAddress,
      aptSuite: data.aptSuite,
      city: data.city,
      province: data.province,
      country: data.country,
    });
    setGuestCount(data.guestCount);
    setBedroomCount(data.bedroomCount);
    setBedCount(data.bedCount);
    setBathroomCount(data.bathroomCount);
    setAmenities(data.amenities);
    setFormDescription({
      title: data.title,
      description: data.description,
      highlight: data.highlight,
      highlightDesc: data.highlightDesc,
      price: data.price,
    });
    setPhotos(data.listingPhotoPaths);
 
    setFormPricing({ price: data.price });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="create-listing">
        <h1>Publish Hotel</h1>
        <form onSubmit={handlePost} id="listingForm">
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about your trip</h2>
            <hr />
            <h3>Which of these categories best describes your destination?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${listingDetails.category === item.label ? "selected" : ""}`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h3>What type of hotel will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3>Where's your hotel located?</h3>
            <div className="full">
              <div className="location">
                <p>Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Apartment, Suite, etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Apt, Suite, etc. (if applicable)"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <h3>Share some basics about holiday</h3>
            <div className="basics">
              <div className="basic">
                <p>Travellers</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      guestCount > 1 && setGuestCount(guestCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setGuestCount(guestCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedroomCount(bedroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedCount > 1 && setBedCount(bedCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedCount(bedCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBathroomCount(bathroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="create-listing_step2">
            <h2>Step 2: Make your hotel stand out</h2>
            <hr />

            <h3>Tell guests what your destination has to offer</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${amenities.includes(item.name) ? "selected" : ""}`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>

            <h3>Add some photos of your vacation</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => (
                          <Draggable key={index} draggableId={index.toString()} index={index}>
                            {(provided) => (
                              <div
                                className="photo"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <img
                                  src={`http://localhost:3001/${photo.replace("public", "")}`}
                                  alt="place"
                                />
                                <button type="button" onClick={() => handleRemovePhoto(index)}>
                                  <BiTrash />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3>What makes your holiday attractive and exciting?</h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />
              <p>Description</p>
              <textarea
                placeholder="Description"
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />
              <p>Highlight details</p>
              <textarea
                type="text"
                placeholder="Highlight details"
                name="highlightDesc"
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
                required
              />
              <p>Now, set your PRICE</p>
              <span>$</span>
              <input
                type="number"
                placeholder="100"
                name="price"
                value={formPricing.price}
                onChange={handleChangePricing}
                className="price"
                required
              />
            </div>
          </div>





          <button className="submit_btn" type="submit">
            UPDATE YOUR LISTING
          </button>
        </form>
      </div>
    </>
  );
};

export default EditListing;
