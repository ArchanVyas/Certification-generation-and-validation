// Logout.js
import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    // Redirect to login page or any other desired location
    window.location.replace('/login');
  };

  // Call the handleLogout function immediately when the component mounts
  React.useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      <h1>Logging out...</h1>
      {/* You can show a loader or any other message here */}
    </div>
  );
}

export default Logout;
