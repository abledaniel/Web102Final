import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../client';
import './edit.css';

function EditPost() {
  const { postId } = useParams(); 
  const navigate = useNavigate(); 
  const [post, setPost] = useState({ title: '', content: '', image: '' });

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('post') 
        .select('*')
        .eq('id', postId) 
        .single(); 

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data); 
      }
    };

    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('post')
      .update({
        title: post.title,
        content: post.content,
        image: post.image,
      })
      .eq('id', postId);

    if (error) {
      console.error('Error updating post:', error);
    } else {
      navigate('/');
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from('post') 
      .delete()
      .eq('id', postId); 

    if (error) {
      console.error('Error deleting post:', error);
    } else {
      navigate('/'); 
    }
  };

  return (
    <div className="edit-post">
      <h1>EDIT POST</h1>
      <form onSubmit={handleSubmit}>
        <h3>TITLE</h3>
        <label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        </label>
        <h3>CONTENT</h3>
        <label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
          />
        </label>
        <h3>IMAGE URL</h3>
        <label>
          <input
            type="text"
            name="image"
            value={post.image}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Post</button>
      </form>
      <button onClick={handleDelete} style={{ color: 'red', marginTop: '10px' }}>
        Delete Post
      </button>
    </div>
  );
}

export default EditPost;
