import React from 'react';
import Axios from 'axios';
import AdminNavbar from "./AdminNavbar";

const Validate = () => {
	const handleValidate = async () => {
		try {
			// Make an HTTP POST request to the backend endpoint
			const response = await Axios.post('/api/validateCertificate', { certificateId: 'certificateIdHere' });
			console.log(response.data);
		} catch (error) {
			console.error('Error validating certificate:', error);
		}
	};

	return (
		<div>
			<AdminNavbar />
			<h1 className="text-center px-32">VALIDATE CERTIFICATES</h1>
			<button onClick={handleValidate}>Validate Certificate</button>
		</div>
	);
};

export default Validate;
