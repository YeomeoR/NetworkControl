const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.path);
    next();
});

app.use(express.static('public'));
app.use(express.json());

app.post('/api/network-config', (req, res) => {
    console.log('Request reached /api/network-config endpoint');
    const config = req.body;
    console.log('Received network configuration:', config);

    if (!config.ipAddress || !config.gateway || !config.dns1 || !config.dns2) {
        console.log('Validation failed: Missing required fields');
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    console.log('Validation passed');
    res.json({ success: true, message: 'Network configuration updated' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 