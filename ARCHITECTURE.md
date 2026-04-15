# Architecture: Dino Run Game

## Technology Stack
- **Framework**: P5.js (JavaScript library for creative coding and graphics)
- **Language**: JavaScript (ES6+)
- **Rendering**: HTML5 Canvas
- **Assets**: Image files (PNG/JPG) for sprites and backgrounds

## File Structure
- `sketch.js`: Main game file containing all P5.js code, classes, and game logic
- `index.html`: Optional HTML wrapper for standalone running (not needed for P5 web editor)
- Assets: `Sky.jpg`, `Desert ground.png`, `Dino/` folder with sprite images

## Key Components
- **Player Class**: Handles dinosaur movement, jumping, ducking, and animations
- **Obstacle Classes**: SmallCactus, LargeCactus, FlyingDino for different enemy types
- **Environment Class**: Manages scrolling background and ground
- **Game State**: Tracks playing, game over, scoring, and speed progression
- **Platform Event**: Special sequence with raised platform and dense obstacles

## Key Decisions
- **Canvas Size**: 800x400 pixels (16:10 aspect ratio, suitable for endless runner)
- **Collision Detection**: Axis-aligned bounding boxes (AABB) for simplicity and performance
- **Animation**: Frame-based cycling through sprite images (run1/run2 for running, crouch1/crouch2 for ducking)
- **Speed System**: Starts at 3, increases by 0.5 every 15 points, capped at 6.5
- **Platform Event**: Triggers randomly after 20+ points, lasts 3-5 seconds with timer
- **Controls**: Arrow keys or WASD for movement, R for restart
- **Scoring**: +1 point per obstacle avoided (jump or duck)

## Dependencies
- P5.js library (loaded via CDN in P5 web editor or index.html)

## Build Output
- `BUILD/sketch.js`: Complete game code ready for P5 web editor