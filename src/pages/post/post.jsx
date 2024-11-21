import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import { supabase } from '../../client';
import './post.css';
import Navbar from '../nav/nav';

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState({ title: '', content: '', image: '', comment: [], upvotes: 0 });
  const [newComment, setNewComment] = useState('');
  const [upvotes, setUpvotes] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('post')
        .select('title, content, image, comment, upvotes')
        .eq('id', postId)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        return;
      }
      setPost(data);
      setUpvotes(data.upvotes || 0);
    };

    fetchPost();
  }, [postId]);

  const handleAddComment = async (event) => {
    event.preventDefault();
    if (newComment.trim() === '') return;

    const updatedComments = [...(post.comment || []), newComment];
    const { error } = await supabase
      .from('post')
      .update({ comment: updatedComments })
      .eq('id', postId);

    if (error) {
      console.error('Error adding comment:', error);
      return;
    }

    setPost((prevPost) => ({
      ...prevPost,
      comment: updatedComments,
    }));
    setNewComment('');
  };

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleUpvote = async () => {
    const newUpvotes = upvotes + 1;

    const { error } = await supabase
      .from('post')
      .update({ upvotes: newUpvotes })
      .eq('id', postId);

    if (error) {
      console.error('Error updating upvotes:', error);
      return;
    }

    setUpvotes(newUpvotes);
  };

  return (
    <div>
      <div className="post">
        <h2>{post.title}</h2>
        <img src={post.image} alt="" className="post-image" />
        <p>{post.content}</p>
        <div className="upvote-section">
          <button onClick={handleUpvote} className="upvote-button">
            👍 {upvotes} UPVOTES
          </button>
          {/* Add the Edit button */}
          <Link to={`/edit/${postId}`} className="edit-button">
            ✏️ Edit
          </Link>
        </div>
        <div className="comment-section">
          <h3>Comments</h3>
          <ul>
            {post.comment && post.comment.length > 0 ? (
              post.comment.map((c, index) => <li key={index}>- {c}</li>)
            ) : (
              <li>No comments yet</li>
            )}
          </ul>
          <form onSubmit={handleAddComment}>
            <textarea
              value={newComment}
              onChange={handleChange}
              placeholder="Leave a comment..."
              className="comment-input"
            />
            <button type="submit" className="comment-button">
              Add Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
