import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";

const Validate = () => {
  // State to store the fetched data
  const [courseData, setCourseData] = useState(null);
  // State to handle loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch course data
    const fetchCourseData = async () => {
      try {
        const response = await fetch("http://localhost:7000/course/validateCourse");
        const data = await response.json();
        // Set the fetched data to the state
        console.log(data)
        setCourseData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setLoading(false);
      }
    };

    // Call the fetchCourseData function
    fetchCourseData();
  }, []); // Empty dependency array to ensure useEffect only runs once

  return (
    <div>
      <AdminNavbar />
      <h1 className="text-center px-32">VALIDATE</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Render the course data */}
          {courseData && (
            <div>
              <p>Status: {courseData.status}</p>
              <p>Message: {courseData.message}</p>
              {/* Render additional details as needed */}
              <h2>Data:</h2>
              <table>
                <thead>
                  <tr>
                    {/* Modify this part according to your data structure */}
                    {/* Example assumes each item has 'name', 'description', and 'price' properties */}
                    <th>template_Id</th>
                    <th>user_name</th>
                    <th>course_name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courseData.data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.template_Id}</td>
                      <td>{item.user_name}</td>
                      <td>{item.course_name}</td>
                      <td>{item._id}</td>
                      {/* Add more td elements if there are more properties */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Validate;