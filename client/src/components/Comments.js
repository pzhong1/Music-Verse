// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import "../styles/Comments.css";
////
import API from "../utils/api";
///

const Comments = ({ musicId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    API.getCommentsByMusicId(musicId).then((response) => {
      setComments(response.data);
    });
  }, [musicId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      API.addComment(musicId, newComment).then((response) => {
        setComments([...comments, response.data]);
      });
      setNewComment("");
    }
  };

  return (
    <div className="comments-section">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
