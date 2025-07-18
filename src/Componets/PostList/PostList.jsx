import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, removePost } from '../../Store/PostList';
import test_image from "../PostList/professional_img.webp"
import './PostList.css'

const PostList = () => {

  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.allposts);
  const status = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  const [currentPage, setCurrentPage] = useState(1);
  const postsToPage = 6;
  const [Loading, setLoading] = useState(true);

  const indexOfLastPost = currentPage * postsToPage;
  const indexOfFirstPost = indexOfLastPost - postsToPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(() => {
    dispatch(fetchPosts());
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleRemoveBtn = (index) => {
    const globalIndex = indexOfFirstPost + index;
    dispatch(removePost(globalIndex));
  }

  const paginatePost = pageNumber => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(posts.length / postsToPage);



  if (Loading || status === 'loading') return <p className='loading'> Loading...</p>
  if (status === 'failed') return <p className='error'> Error: {error}</p>


  return (
    <div>
      <div className="posts-container">
        <h2 className='title'>Posts - Page {currentPage}</h2>
        <div className="card-grid">
          {currentPosts.map((post, index) => (
            <div className="card" key={post.id}>
              <button className='close-btn' onClick={() => handleRemoveBtn(index)}>
                &times;
              </button>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
              <img src={test_image} alt="test-image" className='test-image' />
            </div>
          ))}
        </div>
        <div className="pagination-page">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i}
              onClick={() => paginatePost(i + 1)}
              className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostList;
