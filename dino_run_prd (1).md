# PRD.md — Dino Run (P5.js)

## 1. Core Concept
Dino Run is an endless runner game inspired by the classic Google Chrome offline dinosaur game. The player controls a dinosaur that must continuously avoid incoming obstacles. The game progresses indefinitely, with increasing difficulty over time. Players earn points by successfully jumping over or ducking under enemies.

---

## 2. Core Entities

- **Player Character**
  - Dinosaur controlled by the user

- **Obstacles**
  - Small cactus
  - Large cactus
  - Flying dinosaur (airborne enemy)

- **Environment**
  - Ground (scrolling to simulate movement)

---

## 3. Overall Mechanics

- The dinosaur remains horizontally fixed while the environment and obstacles move toward the player.
- The ground scrolls continuously to create the illusion of running.
- Obstacles spawn at intervals and move toward the player.
- The player must:
  - Jump over ground obstacles (cacti)
  - Duck under flying enemies

### Speed System
- Initial speed: **3**
- Every **15 points**, speed increases by **0.5**
- Maximum speed cap: **6.5**

### Scoring System
- Player gains **1 point** for each successful avoidance:
  - Jumping over an obstacle
  - Ducking under a flying enemy

### Game Over
- Collision with any obstacle results in immediate game over

---

## 4. User Interaction

### Controls
- **Move Speed**
  - Left Arrow / A → Slow down
  - Right Arrow / D → Speed up

- **Movement Actions**
  - Up Arrow / W → Jump
  - Down Arrow / S → Duck

- **Restart**
  - Press **R** to restart after losing

---

## 5. Visual Design

- **Art Style**: 8-bit / pixel art
- **Assets**:
  - Background: Use provided sky image (light blue with clouds)
  - Ground: Use provided desert ground image (tileable for scrolling)

- **Color Palette**:
  - Dinosaur: Black and white
  - Cacti: Green
  - Ground: Derived from desert image (sand tones)
  - Background: Sky image (light blue with clouds)

- **Rendering Behavior**:
  - Background image fills the entire canvas
  - Ground image scrolls horizontally to simulate running
  - Ground should loop seamlessly using a tile effect

- **Animation**:
  - Running animation for dinosaur
  - Scrolling ground using image tiling
  - Moving obstacles

---

## 6. Constraints / What Should NOT Happen

- The dinosaur must NOT pass through obstacles
- Collisions must be accurately detected
- No overlapping or glitching through enemies
- Speed must NOT exceed the defined cap (6.5)

---

## 7. Technical Notes (P5.js)

- Use `draw()` loop for continuous rendering
- Use object-oriented structure for:
  - Player
  - Obstacles
  - Environment
- Implement collision detection using bounding boxes
- Maintain game state:
  - Playing
  - Game Over

---

## 8. Special Gameplay Event: Platform Sequence

### Overview
Introduce a random gameplay event where the player must jump onto a raised platform to avoid a dense stretch of ground obstacles.

### Trigger Conditions
- Occurs randomly after the player reaches a minimum score threshold (e.g., 20 points)
- Should not trigger too frequently to maintain novelty

### Event Behavior
- A raised platform appears ahead of the player
- The ground below becomes densely populated with cacti
- The player must jump onto the platform to avoid unavoidable ground obstacles
- While on the platform, the player continues moving forward as usual

### Duration
- Lasts approximately 3–5 seconds
- Controlled via a timer

### End of Event
- Platform disappears or lowers back to ground level
- Obstacle spawning returns to normal behavior

### Mechanics Adjustments During Event
- Increased spawn rate of ground obstacles
- Reduced or disabled spawning of flying enemies for fairness
- Player can land and run on the platform

### Constraints
- Player must not be able to survive by staying on the ground
- Platform must be clearly visible and reachable
- Collision detection must properly support platform landing

---

