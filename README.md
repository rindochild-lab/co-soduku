[README.md](https://github.com/user-attachments/files/30916745/README.md)
# Co-Sudoku

A collaborative Sudoku game where two people can work on the **same puzzle at the same time** from separate devices.

> **Status:** Early prototype / work in progress

## The Idea

Co-Sudoku turns Sudoku into a cooperative multiplayer experience.

Instead of competing against another player, both players share one puzzle:

- Player 1 enters a number.
- Player 2 sees the move.
- Both players can work on different parts of the same board.
- Each player's moves can eventually be identified by color.
- A shared timer tracks the solve.

The long-term goal is to make solving Sudoku together feel more like collaborating on a shared canvas than playing a traditional single-player puzzle.

## Current Prototype

The current prototype is a browser-based Sudoku game built with:

- HTML
- CSS
- Vanilla JavaScript

Current features include:

- 9×9 Sudoku board
- Multiple built-in puzzles
- Randomly generated puzzles
- Sudoku solution generation
- Number entry
- Erasing entries
- Conflict detection
- Puzzle validation
- Completion detection
- Timer
- Mobile-friendly interface
- Home screen and game screen
- Room-code UI placeholder

## Project Structure

```text
co-sudoku/
├── index.html
├── style.css
├── app.js
└── README.md
```

## Running Locally

No build system is required for the current prototype.

1. Clone or download the repository.
2. Make sure `index.html`, `style.css`, and `app.js` are in the same directory.
3. Open `index.html` in a modern browser.
4. Select **Start a Puzzle**.

For development, a local web server is recommended:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Roadmap

### Phase 1 — Single-player prototype

- [x] Sudoku board
- [x] Puzzle generation
- [x] Number input
- [x] Conflict detection
- [x] Puzzle checking
- [x] Timer
- [x] Mobile layout
- [x] Home → game navigation

### Phase 2 — Real multiplayer

The next major milestone is real-time synchronization between two devices.

- [ ] Create a room
- [ ] Generate unique room code
- [ ] Join a room from another device
- [ ] Real-time board synchronization
- [ ] Shared puzzle state
- [ ] Player IDs
- [ ] Player colors
- [ ] Connection/disconnection handling
- [ ] Shared timer

Planned architecture:

```text
             Device A
                |
                | WebSocket
                v
        +----------------+
        | Multiplayer    |
        | Server         |
        |                |
        | Room: 7K4P     |
        | Puzzle state   |
        | Player moves   |
        +----------------+
                ^
                |
                | WebSocket
                |
             Device B
```

### Phase 3 — Cooperative gameplay

Potential features:

- [ ] Show which player placed each number
- [ ] Show when another player is editing a cell
- [ ] Player cursor/highlight
- [ ] Shared completion animation
- [ ] Player joined notifications
- [ ] Undo/history

### Phase 4 — Game modes

Possible future modes:

**Co-op** — Both players solve one shared puzzle.

**Race** — Both players receive the same puzzle but solve independently.

**Territory** — Each player is responsible for different sections of the board.

**Daily Co-Sudoku** — Everyone receives the same daily puzzle and can invite another player.

## Design Philosophy

The central idea is:

> **Two people, one puzzle.**

The multiplayer interaction should remain simple. Sudoku should still feel like Sudoku.

Features should make the act of solving together more interesting rather than simply adding multiplayer for its own sake.

One interaction worth exploring is showing **who made each move**:

```text
🔵 Player 1 placed 5 at R4 C7
🟠 Player 2 placed 3 at R8 C2
```

Eventually, the board could visually communicate ownership without making the puzzle harder to understand.

## Technology Direction

The first version intentionally uses plain web technologies so the game can be developed quickly and remain easy to understand.

Potential future stack:

### Frontend

- HTML
- CSS
- JavaScript
- Progressive Web App

Possible later migration:

- React
- React Native

### Multiplayer

Potential options:

- WebSockets
- Socket.IO
- Firebase Realtime Database
- Supabase Realtime

The simplest option should be tested first.

### Backend

A small Node.js server is a likely option for the first real-time multiplayer version.

## Development Priorities

The most important upcoming milestone is:

> **Open the game on two different devices, enter the same room code, and see a number entered on one device immediately appear on the other.**

Everything else can come afterward.

## Contributing

This is currently an experimental prototype.

Ideas, gameplay experiments, UI improvements, and technical suggestions are welcome.

## License

No license has been selected yet.

Add an appropriate license before distributing the project publicly.
