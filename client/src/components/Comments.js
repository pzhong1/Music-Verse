// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import "../styles/Comments.css";
////
import API from "../utils/api";
//////
import Rating from "./Rating";

const Comments = ({ musicId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

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
          style={{ marginBottom: "20px", textAlign: "center" }}
          className="average-rating"
        >
          Average Rating: {averageRating.toFixed(1)}
        </div>
      )}
      {/*  /////////////////////////*/}
      <Rating onRate={setNewRating} currentRating={newRating} />
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        rows="3"
      />
      <button onClick={handleAddComment}>Post Comment</button>

      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            {comment.comment}
            <p>Rating: {comment.rating}</p>
            <p>Date: {comment.date ? comment.date : "No Date"}</p>

            {/* delete and uncomment the code below after the signin and signup is working */}
            {/* {currentUser && comment.userId === currentUser.id && ( */}
            <button onClick={() => handleDeleteComment(comment._id)}>
              Delete
            </button>
            {/* )}  uncomment this')}' after the signin and signup is working*/}
            {/*  */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
