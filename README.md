# BRUTALIST TIC-TAC-TOE

> **No mercy. No beauty. Just X and O.**

A bold, brutalist-styled Tic-Tac-Toe game built with vanilla HTML, CSS, and JavaScript. Features an **unbeatable AI** opponent powered by the Minimax algorithm, glitch-effect typography, and a raw, unapologetic design aesthetic.

---

## ✦ Features

- **Two Game Modes**
  - **Player vs Player** — Two humans, one board, zero mercy.
  - **Player vs Machine** — Challenge an AI that never loses (Minimax algorithm).
- **Brutalist Design** — Monospaced typography (Space Mono), high-contrast red-on-cream palette, noise texture overlay, and glitch title animations.
- **Score Tracking** — Persistent scoreboard across rounds for X wins, O wins, and draws.
- **Keyboard Controls** — Full keyboard support for accessibility and speed.
- **Responsive Layout** — Adapts cleanly to mobile and desktop viewports.
- **Micro-Animations** — Stamp-in cell marks, status bar flashes, win-cell throbbing, and stepped overlay transitions.

---

## ✦ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Structure | HTML5 (semantic elements)           |
| Styling   | Vanilla CSS (custom properties, grid, `clamp()`) |
| Logic     | Vanilla JavaScript (ES6, IIFE module pattern) |
| Font      | [Space Mono](https://fonts.google.com/specimen/Space+Mono) via Google Fonts |

**Zero dependencies. No build step. No framework.**

---

## ✦ Project Structure

```
TicTacToe/
├── index.html   # Page structure & game layout
├── index.css    # Brutalist design system & animations
├── game.js      # Game engine, AI (Minimax), state management
└── README.md
```

---

## ✦ Getting Started

### Prerequisites

Any modern web browser (Chrome, Firefox, Safari, Edge).

### Run Locally

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TicTacToe
   ```

2. **Open in a browser**
   ```bash
   open index.html
   ```
   Or simply double-click `index.html` — no server required.

---

## ✦ How to Play

1. **Choose a mode** from the title screen:
   - `PLAYER VS PLAYER` — Take turns with a friend.
   - `PLAYER VS MACHINE` — You play as **X**, the AI plays as **O**.
2. **Click a cell** (or use keyboard) to place your mark.
3. Get three in a row (horizontal, vertical, or diagonal) to win.
4. The result overlay announces the winner — hit **PLAY AGAIN** to continue.
5. Use **RESTART** to reset the board or **QUIT** to return to the mode select screen.

---

## ✦ Keyboard Shortcuts

| Key       | Action                                      |
|-----------|---------------------------------------------|
| `1` – `9` | Place mark (numpad layout: 1 = bottom-left) |
| `R`       | Restart the current round                   |
| `Escape`  | Dismiss result overlay / return to menu     |

### Numpad-to-Grid Mapping

```
7 │ 8 │ 9        Cell 0 │ Cell 1 │ Cell 2
──┼───┼──   →    ───────┼────────┼───────
4 │ 5 │ 6        Cell 3 │ Cell 4 │ Cell 5
──┼───┼──        ───────┼────────┼───────
1 │ 2 │ 3        Cell 6 │ Cell 7 │ Cell 8
```

---

## ✦ Architecture

The game engine is encapsulated in a single **IIFE** (`Game`) exposing four public methods:

| Method            | Description                              |
|-------------------|------------------------------------------|
| `Game.setMode(m)` | Start game in `'pvp'` or `'pvc'` mode   |
| `Game.handleClick(i)` | Process a move at cell index `i`     |
| `Game.restart()`  | Reset the board for a new round          |
| `Game.backToMenu()` | Return to the mode selection screen    |

### AI: Minimax Algorithm

In **Player vs Machine** mode, the computer (O) uses the [Minimax algorithm](https://en.wikipedia.org/wiki/Minimax) to evaluate every possible future game state and select the optimal move. The AI is **unbeatable** — the best outcome a human player can achieve is a draw.

---

## ✦ Design System

| Token             | Value                  |
|-------------------|------------------------|
| `--cream`         | `#FFFDD0`             |
| `--red`           | `#D90429`             |
| `--red-dark`      | `#A3031F`             |
| `--black`         | `#1A1A1A`             |
| `--border-thick`  | `6px`                 |
| `--border-cell`   | `5px`                 |
| `--font-mono`     | Space Mono, monospace  |

---
## ✦ weblink
[text](https://morpionna.netlify.app/)

## ✦ License

This project is open source. Feel free to fork, modify, and share.# tic_tac_toe
