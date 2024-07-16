import React, { useEffect, useState } from 'react'; // Importing necessary modules from React
import axios from 'axios'; // Importing Axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from React Router DOM

// Interface defining the structure of a Post
interface Post {
  userId: string;
  postedAt: string;
  title: string;
  text: string;
}

// Functional component Profile using React.FC type
const Profile: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // State variable to hold posts, initialized as an empty array
  const navigate = useNavigate(); // Hook from React Router DOM to get the navigation function
  const user = JSON.parse(localStorage.getItem('user') || '{}'); // Retrieve user data from localStorage and parse as an object

  // useEffect hook to fetch posts when the component mounts or user.id changes
  useEffect(() => {
    // Check if user.id exists; if not, navigate back to the home page
    if (!user.id) {
      navigate('/'); // Navigate to the root URL
    } else {
      // Function to asynchronously fetch posts for the current user
      const fetchPosts = async () => {
        try {
          // Make GET request to fetch posts filtered by user ID from json-server
          const response = await axios.get(`http://localhost:5000/posts?userId=${user.id}`);
          // Set the fetched posts in state, sorted by postedAt date descending
          setPosts(response.data.sort((a: Post, b: Post) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()));
        } catch (error) {
          console.error(error); // Log any errors encountered during the request
        }
      };

      fetchPosts(); // Call the fetchPosts function to initiate data fetching
    }
  }, [user.id, navigate]); // Dependencies array ensures useEffect runs when user.id or navigate changes

  // Render function for the Profile component
  return (
    <div>
      <h1>{user.firstName} {user.lastName}'s Profile</h1> {/* Display user's first and last name */}
      <h2>Posts:</h2>
      <ul>
        {/* Map through posts array and render each post as a list item */}
        {posts.map((post) => (
          <li key={post.postedAt}>
            <h3>{post.title}</h3> {/* Display post title */}
            <p>{post.text}</p> {/* Display post text */}
            <small>{new Date(post.postedAt).toLocaleString()}</small> {/* Display formatted post date */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile; // Export Profile component as default