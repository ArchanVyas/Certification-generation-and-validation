import React, { useEffect } from 'react';
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

	useEffect(() => {
		const executeValidationScript = () => {
			const { exec } = require('child_process');
			exec('python ../../Validation_Script.py', (error, stdout) => {
				if (error) {
					console.error(`Error executing validation script: ${error}`);
				} else {
					console.log(`Validation script output: ${stdout}`);
				}
			});
		};

		const button = document.querySelector('button');
		button.addEventListener('click', executeValidationScript);

		return () => {
			button.removeEventListener('click', executeValidationScript);
		};
	}, []);

	return (
		<div>
			<AdminNavbar />
			<h1 className="text-center px-32">VALIDATE CERTIFICATES</h1>
			<button onClick={handleValidate} className="text-center px-32 items-center bg-blue-600 px-4 py-2 rounded-md text-white">
				Validate Certificate
			</button>
		</div>
	);
};

export default Validate;