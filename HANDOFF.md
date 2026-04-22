# Dino Run - Agent Handoff Instructions

## 🎯 Start Here

Welcome! This document guides you through taking over the Dino Run project. Follow these steps to get oriented and continue development.

## Step 1: Read Project Documentation (5 min)

1. **Review the PRD** → [PRD.md](PRD.md)
   - Understand all game mechanics, controls, and requirements
   - Note the Platform Event special rules (Section 8)

2. **Review the Architecture** → [ARCHITECTURE.md](../ARCHITECTURE.md)
   - Understand the technology stack (P5.js)
   - Learn the class structure: Player, Obstacle, Environment
   - Note key design decisions (canvas size: 800x400, collision method: AABB)

3. **Review Project Rules** → [RULES.md](RULES.md)
   - Understand the guidelines for code quality and testing
   - Learn the workflow: test → copy to BUILD/ → update TASKS.md
   - Familiarize yourself with P5 web editor testing requirements

4. **Check Current Status** → [TASKS.md](TASKS.md)
   - Completed work: architecture and core sketch.js implementation
   - Remaining work: testing, debugging, feature verification, and polish
   - Note any blockers or issues

## Step 2: Understand the Current Implementation (5 min)

 - **Main Game File** → [sketch.js](sketch.js)
  - Examine the Player, Obstacle, and Environment classes
  - Review the main draw() and update() loops
  - Study the platform event logic

- **Build Output** → [BUILD/sketch.js](../BUILD/sketch.js)
  - This is the file that gets copied to P5 web editor
  - Always update this after making changes to sketch.js

- **Assets Available**:
  - Sky.jpg → Background image
  - Desert ground.png → Scrolling ground
  - Dino/ folder → Sprite images for animations

## Step 3: Pick Your Next Task (Ongoing)

Review [TASKS.md](TASKS.md) and choose from the "📋 To Do" section:

### Recommended Order:
1. **Testing Phase** — Load the game in P5 web editor and verify:
   - Images load correctly
   - Dinosaur animates and responds to controls
   - Obstacles spawn, move, and cause game-over on collision
   - Scoring and speed systems work as expected

2. **Debugging Phase** — Fix any issues found during testing:
   - Image path adjustments for web editor
   - Animation timing tweaks
   - Control responsiveness fixes

3. **Verification Phase** — Confirm all mechanics match the PRD:
   - All control keys work (jump, duck, speed adjust, restart)
   - Speed progression (15 points = +0.5, max 6.5)
   - Platform event triggers and functions correctly
   - Game over on collision, restart with R

4. **Polish Phase** — Optimize and refine:
   - Adjust spawn rates for better gameplay
   - Fine-tune platform event frequency
   - Improve visual appearance (colors, sizing, positioning)
   - Ensure smooth 60fps gameplay

## Step 4: Execute & Update

For each task:

1. **Plan** — Understand what needs to be done
2. **Implement** — Make code changes to sketch.js
3. **Test** — Load BUILD/sketch.js in P5 web editor and verify
4. **Update Tracking** — Mark task complete in TASKS.md
5. **Copy** — Run `cp sketch.js BUILD/sketch.js` after changes

## Step 5: Testing in P5 Web Editor

1. Go to https://editor.p5js.org/
2. Create a new sketch
3. Paste the contents of BUILD/sketch.js into the editor
4. Upload assets (Sky.jpg, Desert ground.png, Dino/ images) to the web editor
5. Run the sketch and test all features
6. Note any issues in TASKS.md blockers section

## Quick Reference

```
Task Workflow:
1. Read TASKS.md for current status
2. Pick a task from "📋 To Do"
3. Mark as in-progress in TASKS.md
4. Edit sketch.js with changes
5. Local test/validate syntax with: node --check sketch.js
6. Copy to BUILD/: cp sketch.js BUILD/sketch.js
7. Test in P5 web editor with assets
8. Update TASKS.md with result
9. Note any blockers or issues
```

## Useful Files & Paths

| File | Purpose |
|------|---------|
| `PRD.md` | Requirements - **read this first** |
| `ARCHITECTURE.md` | Tech stack & design decisions |
| `RULES.md` | Agent guidelines & standards |
| `TASKS.md` | **Update this after every task** |
| `sketch.js` | Main game code (edit this) |
| `BUILD/sketch.js` | Copy here after changes |
| `Sky.jpg` | Background asset |
| `Desert ground.png` | Ground scrolling asset |
| `Dino/` | Sprite images folder |

## Questions?

If unclear about requirements, refer back to:
- **Game Mechanics** → [PRD.md](PRD.md) Section 3
- **Controls** → [PRD.md](PRD.md) Section 4
- **Technical Details** → [PRD.md](PRD.md) Section 7
- **Platform Event** → [PRD.md](PRD.md) Section 8

---

**Ready?** Start by reading the PRD and ARCHITECTURE.md, then check TASKS.md for your first assignment!
