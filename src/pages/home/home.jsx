import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../client';
import { formatDistanceToNow } from 'date-fns'; 
import './home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredPosts, setFilteredPosts] = useState([]); 
  const [sortBy, setSortBy] = useState('mostRecent'); 

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title?.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('post').select();
    if (error) {
      console.error(error);
      return;
    }
    setPosts(data);
    setFilteredPosts(data); 
  };

  const sortPostsByUpvotes = () => {
    const sorted = [...filteredPosts].sort((a, b) => b.upvotes - a.upvotes);
    setFilteredPosts(sorted);
    setSortBy('mostUpvotes');
  };

  const sortPostsByRecent = () => {
    const sorted = [...filteredPosts].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setFilteredPosts(sorted);
    setSortBy('mostRecent');
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="SEARCH POSTS"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="sort-buttons">
        <button
          onClick={sortPostsByRecent}
          className={sortBy === 'mostRecent' ? 'active' : ''}
        >
          MOST RECENT
        </button>
        <button
          onClick={sortPostsByUpvotes}
          className={sortBy === 'mostUpvotes' ? 'active' : ''}
        >
          MOST UPVOTES
        </button>
      </div>
      <div className="home">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <Link to={`/post/${post.id}`} key={index} className="post">
              <div>
                <h3>{post.title}</h3>
                <p className='postcontent'>{post.content}</p>
                <img src={post.image} alt="" />
                <p>UPVOTES: {post.upvotes}</p>
                {/* Display time since created */}
                <p className="timestamp">
                  {post.created_at
                    ? `Created ${formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}`
                    : ''}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
}

export default Home;
