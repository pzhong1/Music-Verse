// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import "../styles/Comments.css";
////
import API from "../utils/api";
//////
import Rating from "./Rating";
import AuthService from "../utils/auth";

const Comments = ({ musicId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isAuthenticated());

  //////////////////////////
  const averageRating =
    comments.length > 0
      ? comments.reduce((total, comment) => total + comment.rating, 0) /
        comments.length
      : 0;

  /////////////////////////

  useEffect(() => {
    API.getCommentsByMusicId(musicId).then((response) => {
      setComments(response.data);
    });
  }, [musicId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const ratingValue = newRating;
      console.log("Rating Value:", ratingValue);
      const currentDate = new Date().toLocaleString(); //for display date
      API.addComment(musicId, newComment, ratingValue, currentDate).then(
        (response) => {
          loadComments();
          // setComments([...comments, response.data]);
        }
      );
      setNewComment("");
      setNewRating(0);
    }
  };

  ///////////load/////
  const loadComments = () => {
    API.getCommentsByMusicId(musicId).then((response) => {
      setComments(response.data);
    });
  };

  ///////////
  ////////DELETE//////
  const handleDeleteComment = (commentId) => {
    API.deleteComment(commentId).then(() => {
      loadComments();
    });
  };

  ///////////////

  return (
    <div className="comments-section">
      {/* display avg rating  */}
      {comments.length > 0 && (
        <div
          style={{ marginBottom: "20px", textAlign: "center", color: "orange" }}
          className="average-rating "
        >
          Average Rating: {averageRating.toFixed(1)}
        </div>
      )}
      {isLoggedIn ? (
        <>
          <Rating onRate={setNewRating} currentRating={newRating} />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows="3"
          />
          <button onClick={handleAddComment}>Post Comment</button>
        </>
      ) : (
        <p style={{ color: "red" }}>Only members can comment.</p>
      )}

      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            {comment.comment}
            <p style={{ color: "orange" }}>Rating: {comment.rating}</p>
            <p style={{ color: "orange" }}>
              Date: {comment.date ? comment.date : "No Date"}
            </p>
            {isLoggedIn && (
              <button onClick={() => handleDeleteComment(comment._id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
