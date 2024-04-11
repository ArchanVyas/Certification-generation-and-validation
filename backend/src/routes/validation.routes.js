const express = require("express");
const router = express.Router();
const { exec } = require('child_process');

router.post('/validateCertificate', async (req, res) => {
	try {
		// Execute the validation script
		exec('python ../../Validation_Script.py', (error, stdout, stderr) => {
			if (error) {
				console.error(`Error executing validation script: ${erro}`);
				res.status(500).json({ success: false, message: 'Internal server error' });
			} else {
				console.log(`Validation script output: ${stdout}`);
				res.status(500).json({ success: true, message: 'Validation successful' });
			}
		});
	} catch (error) {
		console.error(`Error in validation route: ${error}`);
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
});

module.exports = router;
