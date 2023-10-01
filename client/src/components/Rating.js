import React, { useState, useEffect } from "react";
import "../styles/Rating.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";

const Rating = ({ onRate }) => {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    // Retrieve all ratings from localStorage
    const storedRatings = JSON.parse(localStorage.getItem("ratings") || "[]");
    // Calculate the average rating
    const avgRating =
      storedRatings.length > 0
        ? storedRatings.reduce((a, b) => a + b) / storedRatings.length
        : 0;
    setAverageRating(avgRating);
  }, []);

  const handleStarClick = (starValue) => {
    let newRating = rating === starValue ? 0 : starValue;
    setRating(newRating);
    onRate(newRating);
    // Retrieve all ratings from localStorage
    let storedRatings = JSON.parse(localStorage.getItem("ratings") || "[]");
    // Check if storedRatings is an array, if not, initialize it as an empty array
    if (!Array.isArray(storedRatings)) {
      storedRatings = [];
    }
    // Add the new rating to the array
    storedRatings.push(newRating);
    localStorage.setItem("ratings", JSON.stringify(storedRatings));
    // Update the average rating
    const avgRating =
      storedRatings.length > 0
        ? storedRatings.reduce((a, b) => a + b) / storedRatings.length
        : 0;
    setAverageRating(avgRating);
  };

  return (
    <div className="rating-container">
      {[...Array(5).keys()].map((index) => {
        const starValue = index + 1;
        const isHovered = hover >= starValue;
        const isSelected = rating >= starValue;

        return (
          <span
            key={index}
            className="star"
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
            onClick={() => handleStarClick(starValue)}
          >
            <FontAwesomeIcon
              icon={isHovered || isSelected ? fasStar : farStar}
              className={`${isHovered ? "hovered-star" : ""} ${
                isSelected ? "active-star" : "inactive-star"
              }`}
            />
          </span>
        );
      })}
      {averageRating > 0 && (
        <div className="average-rating">
          Average Rating: {averageRating.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default Rating;
