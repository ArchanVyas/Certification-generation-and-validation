const express = require("express");
const router = express.Router();

router.post('/validateCertificate', async (req, res) => {
    try {
        const { certificateId } = req.body;
        const { exec } = require('child_process');
        const scriptPath = '../../Validation_Script.py';
        const scriptCommand = `python ${scriptPath} ${certificateId}`;
        const { error, stdout } = await runCommand(scriptCommand);
        if (error) {
            console.error(`Error executing validation script: ${error}`);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            console.log(`Validation script output: ${stdout}`);
            res.status(200).json({ success: true, message: 'Validation successful' });
        }
    } catch (error) {
        console.error(`Error in validation route: ${error}`);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

async function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (error) {
                reject(error);
            } else {
                resolve({ error, stdout });
            }
        });
    });
}

module.exports = router;