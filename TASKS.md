# Dino Run - Task Tracker

## ✅ Completed
- [x] Review PRD and identify all requirements
- [x] Create ARCHITECTURE.md with technology stack and design decisions
- [x] Implement sketch.js with core game mechanics:
  - Player class with jump/duck animations
  - Obstacle classes (SmallCactus, LargeCactus, FlyingDino)
  - Environment class with scrolling ground
  - Game state management (playing, game over, restart)
  - Scoring and speed progression system
  - Platform event system (random trigger, timer-based)
  - Collision detection
  - Control input handling (Arrow keys / WASD)
- [x] Copy sketch.js to BUILD/ folder for P5 web editor
 - [x] Normalize asset filenames (lowercase, hyphens) and update references
 - [x] Fix platform-event collision handling to skip ground obstacles while on platform
 - [x] Run `node --check sketch.js` and verified no syntax errors

## 🔄 In Progress
(None currently)

## 📋 To Do
- [ ] Test game in P5 web editor with assets
  - [ ] Load images correctly (Sky.jpg, Desert ground.png, Dino sprites)
  - [ ] Verify dinosaur animates properly (running, jumping, ducking)
  - [ ] Verify obstacles spawn and move correctly
  - [ ] Verify collision detection works accurately
- [ ] Debug and fix any issues from testing
  - [ ] Image loading paths may need adjustment for web editor
  - [ ] Performance optimization if needed
  - [ ] Animation timing adjustments
- [ ] Verify all controls work correctly:
  - [ ] Jump (W / Up Arrow)
  - [ ] Duck (S / Down Arrow)
  - [ ] Speed up (D / Right Arrow)
  - [ ] Speed down (A / Left Arrow)
  - [ ] Restart (R)
- [ ] Verify game mechanics:
  - [ ] Speed increases every 15 points
  - [ ] Speed capped at 6.5
  - [ ] Platform event triggers after 20+ points
  - [ ] Platform event has proper collision detection
  - [ ] Score increments for each obstacle avoided
  - [ ] Game over on collision
- [ ] Polish and optimize:
  - [ ] Adjust spawning rates
  - [ ] Fine-tune platform event frequency
  - [ ] Ensure smooth gameplay at different speeds
  - [ ] Consider visual improvements (colors vs sprites)

## 🎯 Blockers / Notes
- P5 web editor may require relative paths for image assets
- Asset sprite positioning and sizing may need tweaks after testing
- Platform event collision detection not yet tested with actual gameplay
