import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("user");
    window.location.replace('/login');
  };

  React.useEffect(() => {
    handleLogout(); 
  });

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default Logout;
