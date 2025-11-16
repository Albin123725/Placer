# Minecraft Bot for Aternos Server

## Overview
This is a Minecraft bot built with Node.js and mineflayer that connects to an Aternos server. The bot walks in circular patterns (clockwise and anti-clockwise) while jumping, places/breaks blocks in a repeating cycle, and automatically sleeps when night falls.

## Recent Changes
- **November 16, 2025**: Optimized auto-sleep and bed placement system
  - Changed bed search radius from 64 to 20 blocks (configurable via config.bedSearchRadius)
  - Implemented immediate night detection - bot now stops and sleeps instantly when night falls
  - Enhanced bed placement to primarily use creative inventory via ensureItemInCreativeInventory
  - Added support for all 16 bed color types in search and placement logic
  - Optimized night monitoring interval from 5 seconds to 2 seconds for faster response
  - Improved server synchronization with proper delays to prevent disconnections
  - Added detailed logging for bed search, placement, and sleep process
  - Fixed bed placement to work from creative inventory without requiring crafting

- **November 14, 2025**: Fixed Render deployment issue
  - Added Express-based health check server (server.js) that runs on port 3000
  - Server.js spawns and supervises the bot process as a child process
  - Bot now properly reads configuration from environment variables

- **November 14, 2025**: Fixed block placement and breaking issues
  - Fixed Vec3 usage for proper position handling
  - Added multiple placement direction fallback strategies
  - Improved error handling and detailed logging for placement failures

- **November 14, 2025**: Added auto-sleep and inventory management
  - Implemented nighttime detection using bot.time.timeOfDay (night = 13000-23000 ticks)
  - Added automatic sleep functionality - bot sleeps when night falls
  - Bot finds nearby beds or automatically places one from creative inventory
  - Bot automatically resumes circular pattern after waking

## Project Architecture

### Structure
```
.
├── server.js           # Health check server and bot supervisor
├── bot.js              # Main bot logic
├── config.json         # Location and behavior configuration
├── package.json        # Node.js dependencies
├── render.yaml         # Render deployment configuration
├── .env.example        # Example environment variables
├── .env                # Actual environment variables (not in git)
└── README.md           # Documentation
```

### Key Components
1. **server.js**: Health check server and process supervisor
   - Express HTTP server on port 3000
   - Health check endpoints at /health and /
   - Bot process spawning and supervision
   - Automatic bot restart on crashes

2. **bot.js**: Main application file
   - Minecraft server connection logic
   - Circular path generation using trigonometry
   - Pathfinding and movement system with jumping
   - Block placement and breaking functionality
   - **Optimized auto-sleep system:**
     - Immediate night detection (checks every 2 seconds)
     - 20-block bed search radius (configurable)
     - Creative inventory bed placement
     - All 16 bed color type support

3. **config.json**: Configuration
   - Circle center coordinates (x, y, z)
   - Circle radius in blocks
   - Number of waypoints per circle
   - Block type to place/break
   - Walking speed and jump settings
   - Auto-sleep settings with bed search radius

### Dependencies
- `express`: HTTP server for health checks and Render compatibility
- `mineflayer`: Core Minecraft bot framework
- `mineflayer-pathfinder`: Navigation and pathfinding
- `dotenv`: Environment variable management

## Configuration Required

### Environment Variables
- `MINECRAFT_HOST`: Aternos server address
- `MINECRAFT_PORT`: Server port
- `MINECRAFT_USERNAME`: Microsoft account email (online mode) or username (offline)
- `MINECRAFT_VERSION`: Minecraft version (e.g., 1.21.10)
- `MINECRAFT_AUTH`: Authentication mode ('microsoft' or 'offline')

### Server Requirements
- Aternos server must be running
- Bot should be in creative mode for best experience
- Bot account may need to be whitelisted
- Server must allow block placement/breaking

## Auto-Sleep Features

### Immediate Sleep Trigger
- Night monitoring checks every 2 seconds (optimized from 5 seconds)
- Bot immediately stops walking when night is detected
- No delay between night detection and sleep attempt

### Smart Bed Placement
- Searches for beds within 20 blocks (configurable)
- Supports all 16 bed colors (red, blue, white, etc.)
- Automatically gets bed from creative inventory if none found
- Places bed in optimal location (2-5 blocks away in cardinal directions)
- Proper server synchronization with delays to prevent kicks

### Optimization for Server Stability
- Proper delays between actions (200ms equip, 500ms after placement, 300ms before sleep)
- Night monitoring interval reduced to 2 seconds for faster response
- Creative inventory integration for seamless bed acquisition
- Error handling to prevent crashes during sleep attempts

## Getting Started on Replit

1. **Create your .env file**: Copy `.env.example` to `.env` and fill in your server details
2. **Customize bot behavior**: Edit `config.json` for circle center, radius, and sleep settings
3. **Start your Aternos server**: Make sure it's online before running the bot
4. **Run the bot**: Click the "Run" button or restart the workflow
5. **Set creative mode**: In game, run `/gamemode creative YourBotName`

## Usage
1. Configure `.env` with server details
2. Edit `config.json` with desired locations and blocks
3. Start Aternos server
4. Run `npm start`
5. Bot will automatically sleep when night falls

## Deployment
The bot is designed to be deployed on Render.com by connecting a GitHub repository. See README.md for detailed deployment instructions.
