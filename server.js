const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

let botProcess = null;
let botStatus = 'starting';
let botStartTime = Date.now();
let cycleCount = 0;
let lastActivity = Date.now();

app.get('/', (req, res) => {
  const uptime = Math.floor((Date.now() - botStartTime) / 1000);
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = uptime % 60;
  
  res.json({
    service: 'Minecraft Bot',
    status: botStatus,
    uptime: `${hours}h ${minutes}m ${seconds}s`,
    cycleCount: cycleCount,
    lastActivity: new Date(lastActivity).toISOString(),
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    botStatus: botStatus,
    uptime: Math.floor((Date.now() - botStartTime) / 1000)
  });
});

function startBot() {
  console.log('Starting Minecraft bot...');
  botStatus = 'starting';
  
  botProcess = spawn('node', ['bot.js'], {
    stdio: 'inherit',
    env: process.env
  });
  
  botProcess.on('spawn', () => {
    console.log('Bot process spawned successfully');
    botStatus = 'running';
    lastActivity = Date.now();
  });
  
  botProcess.on('error', (error) => {
    console.error('Bot process error:', error);
    botStatus = 'error';
  });
  
  botProcess.on('exit', (code, signal) => {
    console.log(`Bot process exited with code ${code} and signal ${signal}`);
    botStatus = 'stopped';
    
    if (code !== 0 && code !== null) {
      console.log('Bot crashed, restarting in 10 seconds...');
      setTimeout(startBot, 10000);
    }
  });
}

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Health check server listening on port ${PORT}`);
  console.log(`Health endpoint: http://localhost:${PORT}/health`);
  console.log(`Status endpoint: http://localhost:${PORT}/`);
  
  startBot();
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    if (botProcess) {
      botProcess.kill();
    }
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    if (botProcess) {
      botProcess.kill();
    }
    process.exit(0);
  });
});
