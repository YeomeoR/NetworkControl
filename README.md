# Network Configuration Form

A web application that provides a user interface for managing network configurations. 
Built with Node.js and Express for the backend, and vanilla JavaScript for the frontend.

## Features

- Input form for network configuration settings
- Dynamic/Static IP mode switching
- Real-time form validation
- Toast notifications using SweetAlert2

## Installation

1. Clone the repository:
```bash
git clone https://github.com/YeomeoR/NetworkControl.git
cd NetworkControl
```

2. Install dependencies:
```bash
npm install
```

## Usage

1. Start the server:
```bash
npm start
```

2. Navigate to:
```
http://localhost:3000
```

3. Fill in the network configuration form:
   - IP Address
   - Gateway
   - DNS 1
   - DNS 2

## API Endpoints

### POST /api/network-config
Updates network configuration settings

**Request Body:**
```json
{
  "ipAddress": "192.168.1.100",
  "gateway": "192.168.1.1",
  "dns1": "8.8.8.8",
  "dns2": "8.8.4.4"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Network configuration updated"
}
```