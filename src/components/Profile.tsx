import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  date: string;
}

const Profile: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!user.id) {
      navigate('/');
    } else {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/posts?userId=${user.id}`);
          setPosts(response.data.sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        } catch (error) {
          console.error(error);
        }
      };

      fetchPosts();
    }
  }, [user.id, navigate]);

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <h2>Posts:</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>{new Date(post.date).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;