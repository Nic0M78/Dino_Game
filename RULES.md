# Dino Run - Agent Rules & Guidelines

## Core Principles
1. **Maintain PRD Alignment** — All code and features must strictly follow the requirements in `dino_run_prd (1).md`. Do not add features outside the scope.
2. **Update TASKS.md After Every Action** — Mark tasks as in-progress when starting, completed when finished. Record any new blockers or notes.
3. **Test Before Committing** — All changes must be tested in the P5 web editor before being considered done. Document test results.
4. **Document Changes** — For any modifications to sketch.js or other files, add brief inline comments explaining why.
5. **Preserve Code Quality** — Keep code clean, readable, and well-structured. Follow existing patterns in the codebase.

## Code Standards
- Use consistent naming: camelCase for variables/functions, PascalCase for classes
- Add comments for non-obvious logic
- Keep functions focused and under 50 lines when possible
- Test all game mechanics after modifications

## Testing Requirements
Before marking any task complete:
- [ ] Game starts without errors in P5 web editor
- [ ] All visuals render correctly (images, sprites, colors)
- [ ] All controls respond as expected
- [ ] No console errors or warnings
- [ ] Gameplay feels smooth at various speeds

## File Update Workflow
After completing any task:
1. Test thoroughly in P5 web editor
2. Copy modified sketch.js to BUILD/ folder: `cp sketch.js BUILD/`
3. Update TASKS.md with completion status
4. Add any blockers or notes discovered during testing

## Asset Handling
- Images: Sky.jpg, Desert ground.png, Dino/ sprite folder
- In P5 web editor, use relative paths or upload as assets
- Sprite dimensions may need tweaking for visual balance
- If images don't load, update paths accordingly in sketch.js

## Platform Event Special Rules
- Must trigger randomly after score ≥ 20
- Must last exactly 3-5 seconds (180-300 frames at 60fps)
- Must disable or reduce flying dino spawning during event
- Must increase ground obstacle spawn rate during event
- Player must be able to land on platform and avoid ground obstacles

## Performance & Debugging
- Monitor frame rate in P5 web editor (should target 60fps)
- Use console.log() sparingly; remove debug logs before committing
- If performance drops, optimize collision detection or obstacle rendering
- Report any performance issues in TASKS.md blockers section

## PRD Compliance Checklist
- [ ] Controls match exactly (Arrow/WASD keys, R for restart)
- [ ] Speed system: +0.5 every 15 points, max 6.5
- [ ] Scoring: +1 per obstacle avoided
- [ ] Collision detection: Bounding box AABB
- [ ] Platform event: Random, 3-5 seconds, dense obstacles
- [ ] Game over on first collision (no lives)
- [ ] Endless gameplay until collision
