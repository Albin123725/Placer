# Minecraft Bot for Aternos Server

A Node.js bot that connects to your Minecraft Aternos server and walks in circular patterns while jumping, placing and breaking blocks, with automatic sleep functionality.

## Features

- ✅ Connects to Minecraft servers with Microsoft authentication support
- ✅ Works with Aternos servers (online mode)
- ✅ **Walks in circular paths** (clockwise and anti-clockwise)
- ✅ **Jumps while walking** for realistic movement
- ✅ Places and breaks blocks after each circular pattern
- ✅ **Automatic sleep when night falls** - immediately stops and sleeps
- ✅ **Smart bed placement** from creative inventory (20-block search radius)
- ✅ **Supports all bed colors** (red, blue, white, etc.)
- ✅ Configurable circle size, center point, and walking speed
- ✅ Automatic reconnection on disconnects
- ✅ Creative mode auto-switching and monitoring

## Setup Instructions

### 1. Configure Server Connection

Create a `.env` file with your server details:

**For Aternos Servers (Online Mode - Recommended):**
```
MINECRAFT_HOST=your-server.aternos.me
MINECRAFT_PORT=25565
MINECRAFT_USERNAME=your-email@example.com
MINECRAFT_VERSION=1.21.10
MINECRAFT_AUTH=microsoft
```

**For Cracked/Offline Servers:**
```
MINECRAFT_HOST=your-server.aternos.me
MINECRAFT_PORT=25565
MINECRAFT_USERNAME=BotUsername
MINECRAFT_VERSION=1.21.10
MINECRAFT_AUTH=offline
```

### 2. Configure Bot Behavior

Edit `config.json` to customize the bot's behavior:

```json
{
  "circleCenter": { "x": 245, "y": 87, "z": -708 },
  "radius": 5,
  "pointsPerCircle": 16,
  "blockType": "dirt",
  "jumpWhileWalking": true,
  "walkSpeed": 300,
  "delayBetweenActions": 1000,
  "autoSleep": true,
  "bedSearchRadius": 20
}
```

**Configuration Options:**
- `circleCenter`: Center point for circular walking pattern
- `radius`: Circle size in blocks (5 = small, 10 = medium, 20 = large)
- `pointsPerCircle`: Number of waypoints (16 = smooth)
- `blockType`: Block to place/break (must have in inventory)
- `jumpWhileWalking`: Jump while walking (true/false)
- `walkSpeed`: Delay between waypoints in milliseconds
- `autoSleep`: Enable automatic sleep at night (true/false)
- `bedSearchRadius`: Search radius for nearby beds (default: 20 blocks)

### 3. Run the Bot

```bash
npm install
npm start
```

## How Auto-Sleep Works

When night falls (timeOfDay >= 13000):

1. **Immediate Detection** - Bot stops current activity immediately
2. **Search for Bed** - Looks for any bed within 20 blocks (configurable)
3. **Place Bed from Creative** - If no bed found, automatically places one from creative inventory
4. **Sleep** - Walks to bed and sleeps until morning
5. **Resume** - Automatically resumes circular pattern after waking

**Supported Bed Types:** All colors (red, blue, green, yellow, white, black, brown, cyan, gray, light_blue, light_gray, lime, magenta, orange, pink, purple)

## Important Notes

- ⚠️ **Set bot to creative mode:** `/gamemode creative YourBotName`
- 📦 Bot will automatically get beds from creative inventory
- 🌙 Night detection is immediate - bot will interrupt walking to sleep
- 🔒 Add bot to server whitelist if enabled
- 📍 Configure circle center to valid ground level coordinates

## Troubleshooting

**Bot can't place bed:**
- Ensure bot is in creative mode: `/gamemode creative BotName`
- Check spawn protection settings
- Give OP permissions: `/op BotName`

**Bot doesn't sleep at night:**
- Check `config.json` has `"autoSleep": true`
- Verify `bedSearchRadius` is set (default: 20)
- Check logs for bed placement errors

**Connection issues:**
- Verify Aternos server is running
- Check correct server address and port
- Use Microsoft auth for online mode servers

## License

MIT
