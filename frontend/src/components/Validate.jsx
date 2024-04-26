import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { Table } from 'antd';
import Modal from "react-modal";
import html2pdf from "html2pdf.js";
import { IoIosArrowRoundDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const customStyles = {
  content: {
    // top: "50%",
    // left: "50%",
    // right: "auto",
    // bottom: "auto",
    // marginRight: "-50%",
    // transform: "translate(-50%, -50%)",
    height: "500px",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    padding: "0px 200px",
    padding: "20px",
    border: "none"
    // width: "80%",
    // maxWidth: "500px", // Adjust max width as needed
  },
};

const Validate = () => {
  // State to store the fetched data
  const [courseData, setCourseData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
  const [currentPage, setCurrentPage] = useState(1);
  // State to handle loading state
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null); // State to manage selected certificate

  const showModal = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setSelectedCertificate(null);
    setIsModalOpen(false);
  };


  useEffect(() => {
    // Function to fetch course data
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URI}/course/validateCourse`);
        const data = await response.json();
        // Set the fetched data to the state
        console.log(data)
        setCourseData(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setLoading(false);
      }
    };

    // Call the fetchCourseData function
    fetchCourseData();
  }, []); // Empty dependency array to ensure useEffect only runs once

  const columns = [
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => currentPage === 1 ? index + 1 : index + 1 + (currentPage - 1) * 5,
    },
    {
      title: 'Template ID',
      dataIndex: 'template_Id',
      key: 'template_Id',
    },
    {
      title: 'User Name',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: 'Course Name',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <div>
          {record.status ? 'Accepted' : 'Rejected'}
        </div>
      ),
    },
    {
      title: '',
      render: (text, record) => (
        <div className="gap-10 grid grid-cols-2">
          <button className="bg-blue-500 text-white p-2 rounded-md"
            onClick={() => showModal(record.certificate)}
          >Open Certificate</button>
          <button className="bg-green-500 text-white p-2 rounded-md"
          >Validate</button>
        </div>
      )
    }
  ]

  return (
    <div>
      <AdminNavbar />

      <div>

        <Table dataSource={courseData} columns={columns}
        className="m-6"
          pagination={{ pageSize: 5 }}
          onChange={(pagination, filters, sorter) => {
            setCurrentPage(pagination.current);
          }
          }
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"

      >
        {/* Certificate content */}
        <div id="certificateContent" dangerouslySetInnerHTML={{ __html: selectedCertificate }}></div>
        {/* Download PDF button */}
        {/* Close modal button */}
        <button onClick={closeModal} className="top-5 right-4 fixed">
          <RxCross2 size={24} />
        </button>
      </Modal>
    </div>
  );
};

export default Validate;