import React, { useState } from 'react'; // Importing necessary modules from React
import axios from 'axios'; // Importing Axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from React Router DOM

// Functional component Login using React.FC type
const Login: React.FC = () => {
  const [email, setEmail] = useState(''); // State variable to hold email input, initialized as an empty string
  const [password, setPassword] = useState(''); // State variable to hold password input, initialized as an empty string
  const navigate = useNavigate(); // Hook from React Router DOM to get the navigation function

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Make GET request to fetch user data based on email and password input
      const response = await axios.get(`http://localhost:5000/users?email=${email}&password=${password}`);

      // Check if response contains any data (user found)
      if (response.data.length > 0) {
        // Store user data in localStorage as JSON string
        localStorage.setItem('user', JSON.stringify(response.data[0]));
        // Navigate to the '/profile' route using the navigate function
        navigate('/profile');
      } else {
        // Display alert message for invalid credentials if no user found
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error(error); // Log any errors encountered during the request to the console
    }
  };

  // Render function for the Login component
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        {/* Input field for email with value bound to email state and onChange handler */}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        {/* Input field for password with value bound to password state and onChange handler */}
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {/* Submit button to trigger form submission */}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login; // Export Login component as default