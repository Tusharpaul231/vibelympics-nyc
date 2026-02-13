# 🚢 Container Harbour - A Number-Free Idle Game

![Container Harbour]

## 🎮 Game Concept

Welcome to Container Harbour, where you manage a bustling shipping port! Watch your Harbour grow from a quiet dock to a legendary maritime empire - all without seeing a single number.

### Progress Indicators (No Numbers!)
- 📦 **Visual Container Stacks** - See your containers pile up physically
- 🚢 **Ship Fleet** - More ships = more progress
- 🌅 **Day/Night Cycle** - Time passes with beautiful gradients
- ⛈️ **Dynamic Weather** - Conditions change as you play
- 🏆 **Achievements** - Unlock titles as you grow
- 🏗️ **Harbour Expansion** - Visual upgrades to your port
- 🐙 **Linky the Octopus** - Chainguard's mascot appears to help!

### Features
- **Idle Mechanics** - Containers auto-generate over time
- **Click to Load** - Manually load containers by clicking
- **Smart Upgrades** - Unlock cranes, docks, warehouses, and more
- **Prestige System** - Start a new voyage with enhanced capabilities
- **Mood System** - Harbour evolves from "quiet" to "divine"
- **Easter Eggs** - Uber rating, burrito references, Linky love

## 🐳 Built with Chainguard Containers

This project uses **Chainguard's minimal, secure container images**:
- Base image: `cgr.dev/chainguard/node:latest`
- Build stage: `cgr.dev/chainguard/node:latest-dev`
- Zero CVEs, minimal attack surface
- Fully compliant with security best practices

## 🚀 Quick Start

### Prerequisites
- Docker installed
- That's it! (Chainguard Containers handle the rest)

### Running with Docker (Recommended)

```bash
# Build the container
docker build -t container-Harbour .

# Run the game
docker run -p 3000:3000 container-Harbour
```

Then open your browser to `http://localhost:3000` and start vibing! 🎉

### Running Locally (Development)

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The game will open at `http://localhost:3000`

## 🎯 How to Play

1. **Click the Container Area** - Manually load containers onto your dock
2. **Ship Containers** - Click "Ship Containers Out" when you have enough
3. **Buy Upgrades** - Expand your Harbour with cranes, docks, and warehouses
4. **Watch the Magic** - Your Harbour evolves visually as you progress
5. **Unlock Achievements** - Earn titles from "Harbour Apprentice" to "Container Deity"
6. **Summon Linky** - The legendary Chainguard octopus joins your crew!
7. **Prestige** - Start a new voyage with permanent bonuses

### Upgrade Path
- 🏗️ **Cranes** - Increase manual loading power
- ⚓ **Docks** - Auto-generate containers faster
- 🏭 **Warehouses** - Boost automation significantly
- 🗼 **Lighthouse** - Doubles your clicking power
- ⛴️ **Fleet Expansion** - More ships, more throughput
- 👨‍✈️ **Harbour Master** - 50% boost to automation
- 🐙 **Linky** - The ultimate upgrade: 2x everything!

## 🏆 Achievement System

Progress through Harbour tiers:
- Quiet Harbour → Tiny → Small → Modest → Growing
- Busy → Thriving → Massive → Legendary → Divine

Each tier unlocks new visual elements and capabilities!

## 🎨 Visual Vibes

### Time of Day Cycle
The game cycles through six different times:
- 🌅 Dawn (pink/peach gradients)
- ☀️ Morning (light blue)
- 🌞 Noon (bright blue)
- 🌤️ Afternoon (warm orange)
- 🌆 Evening (sunset red)
- 🌙 Night (deep blue/purple)

### Weather System
Random weather patterns affect the atmosphere:
- ☀️ Clear skies
- ☁️ Cloudy
- 🌧️ Rainy (with animation!)
- 🌫️ Foggy
- ⛈️ Stormy (with lightning effects!)

## 🛠️ Technology Stack

- **React 18** - Modern UI framework
- **Chainguard Node Container** - Secure, minimal base image
- **Pure CSS Animations** - No dependencies, just vibes
- **Docker Multi-Stage Build** - Optimized production image

## 🔐 Security Features

- ✅ Zero known CVEs
- ✅ Minimal attack surface
- ✅ Distroless production image
- ✅ No unnecessary packages
- ✅ Following SLSA principles
- ✅ Supply chain security built-in



## 📦 Project Structure

```
container-Harbour/
├── Dockerfile
├── package.json
├── public/
│   └── index.html
└── src/
    ├── App.js
    ├── App.css
    ├── index.js
    └── index.css
```

## 🎯 Competition Requirements Met

✅ **Idle Game** - Containers auto-generate, upgrades improve rates  
✅ **No Numbers Visible** - All progress shown through visuals  
✅ **Chainguard Containers** - Built with cgr.dev/chainguard/node  
✅ **Creative Progress** - Stacks, ships, weather, time, achievements  
✅ **Vibe-Based** - Pure aesthetic progression system  

## 🚀 Deployment

### Building for Production

```bash
docker build -t container-Harbour .
```

### Running in Production

```bash
docker run -d -p 3000:3000 container-Harbour
```

## 🎮 Gameplay Tips

- **Early Game**: Click a lot! Manual loading is your main source
- **Mid Game**: Invest in docks and warehouses for automation
- **Late Game**: Unlock special upgrades (Lighthouse, Harbour Master, Linky!)
- **End Game**: Prestige to start over with permanent bonuses

## 🧪 Development

Want to modify the game?

```bash
# Install dependencies
npm install

# Run in development mode
npm start

# Build for production
npm run build
```

## 🌟 Why This Game?

This project embodies the spirit of "vibe coding":
- ✨ No strict metrics - just feel the growth
- 🎨 Visual storytelling over numerical data
- 🌊 Organic, flowing progression
- 🎵 Rhythm of idle gameplay


## 🙏 Acknowledgments

- **Chainguard** - For amazing secure containers and Linky! 🐙
- **Vibelympics** - For the creative challenge
- **Idle Game Community** - For inspiration from Cookie Clicker, A Dark Room, and Universal Paperclips

---
