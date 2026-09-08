/* ========================================
   BRUTALIST TIC-TAC-TOE — GAME ENGINE
   Unbeatable. Unforgiving. Undecorated.
   ======================================== */

const Game = (() => {
  // --- STATE ---
  let board = Array(9).fill(null);
  let currentPlayer = 'X';
  let isActive = false;
  let mode = null; // 'pvp' | 'pvc'
  let scores = { X: 0, O: 0, draw: 0 };
  let computerThinking = false;

  // Winning combinations (indices)
  const WIN_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],             // diagonals
  ];

  // --- DOM REFS ---
  const $ = (id) => document.getElementById(id);
  const cells = document.querySelectorAll('.cell');
  const modeScreen = $('mode-select');
  const gameScreen = $('game-screen');
  const statusText = $('status-text');
  const statusBar = $('status-bar');
  const modeLabel = $('mode-label');
  const resultOverlay = $('result-overlay');
  const resultText = $('result-text');
  const scoreX = $('score-x');
  const scoreO = $('score-o');
  const scoreDraw = $('score-draw');

  // --- SCREEN MANAGEMENT ---
  function showScreen(screen) {
    modeScreen.classList.remove('active');
    gameScreen.classList.remove('active');
    screen.classList.add('active');
  }

  // --- PUBLIC: SET MODE ---
  function setMode(m) {
    mode = m;
    modeLabel.textContent = m === 'pvp'
      ? '// PLAYER VS PLAYER //'
      : '// PLAYER VS MACHINE //';
    scores = { X: 0, O: 0, draw: 0 };
    updateScoreDisplay();
    showScreen(gameScreen);
    startNewRound();
  }

  // --- START NEW ROUND ---
  function startNewRound() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    isActive = true;
    computerThinking = false;
    resultOverlay.hidden = true;

    cells.forEach((cell) => {
      cell.className = 'cell';
      cell.textContent = '';
    });

    setStatus('X MOVES FIRST');
  }

  // --- STATUS ---
  function setStatus(text) {
    statusText.textContent = text;
    // Flash effect
    statusBar.classList.remove('status--highlight');
    void statusBar.offsetWidth; // force reflow
    statusBar.classList.add('status--highlight');
  }

  // --- PUBLIC: HANDLE CLICK ---
  function handleClick(index) {
    if (!isActive) return;
    if (board[index] !== null) return;
    if (computerThinking) return;

    makeMove(index, currentPlayer);

    if (!isActive) return;

    if (mode === 'pvc' && currentPlayer === 'O') {
      computerThinking = true;
      // Small delay so the human can see their move land
      setTimeout(() => {
        if (!isActive) return;
        const aiMove = minimax(board, 'O').index;
        makeMove(aiMove, 'O');
        computerThinking = false;
      }, 280);
    }
  }

  // --- MAKE MOVE ---
  function makeMove(index, player) {
    board[index] = player;

    const cell = cells[index];
    cell.classList.add('cell--taken', player === 'X' ? 'cell--x' : 'cell--o');

    const winCombo = checkWin(player);
    if (winCombo) {
      endGame(player, winCombo);
      return;
    }

    if (board.every((c) => c !== null)) {
      endGame(null); // draw
      return;
    }

    // Switch turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const turnLabel = mode === 'pvc'
      ? (currentPlayer === 'X' ? 'YOUR TURN (X)' : 'MACHINE THINKS...')
      : `${currentPlayer}'S TURN`;
    setStatus(turnLabel);
  }

  // --- CHECK WIN ---
  function checkWin(player) {
    for (const combo of WIN_COMBOS) {
      if (combo.every((i) => board[i] === player)) {
        return combo;
      }
    }
    return null;
  }

  // --- END GAME ---
  function endGame(winner, winCombo) {
    isActive = false;

    if (winner) {
      scores[winner]++;
      // Highlight winning cells
      winCombo.forEach((i) => cells[i].classList.add('cell--win'));

      const winMsg = mode === 'pvc'
        ? (winner === 'X' ? 'YOU WIN' : 'MACHINE WINS')
        : `${winner} WINS`;
      setStatus(winMsg);

      setTimeout(() => {
        resultText.textContent = winMsg;
        resultOverlay.hidden = false;
      }, 800);
    } else {
      scores.draw++;
      setStatus('DRAW');

      setTimeout(() => {
        resultText.textContent = 'DRAW';
        resultOverlay.hidden = false;
      }, 600);
    }

    updateScoreDisplay();
  }

  // --- SCORE DISPLAY ---
  function updateScoreDisplay() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreDraw.textContent = scores.draw;
  }

  // --- PUBLIC: RESTART ---
  function restart() {
    startNewRound();
  }

  // --- PUBLIC: BACK TO MENU ---
  function backToMenu() {
    isActive = false;
    resultOverlay.hidden = true;
    showScreen(modeScreen);
  }

  // =========================================
  // MINIMAX — THE UNBEATABLE ALGORITHM
  // =========================================
  function minimax(boardState, player) {
    const available = boardState
      .map((v, i) => (v === null ? i : null))
      .filter((v) => v !== null);

    // Terminal checks
    if (checkWinState(boardState, 'X')) return { score: -10 };
    if (checkWinState(boardState, 'O')) return { score: 10 };
    if (available.length === 0) return { score: 0 };

    const moves = [];

    for (const idx of available) {
      const move = { index: idx };
      boardState[idx] = player;

      const result = minimax(
        boardState,
        player === 'O' ? 'X' : 'O'
      );
      move.score = result.score;

      boardState[idx] = null; // undo

      moves.push(move);
    }

    // Pick best move
    let best;
    if (player === 'O') {
      // Maximizer
      let bestScore = -Infinity;
      for (const m of moves) {
        if (m.score > bestScore) {
          bestScore = m.score;
          best = m;
        }
      }
    } else {
      // Minimizer
      let bestScore = Infinity;
      for (const m of moves) {
        if (m.score < bestScore) {
          bestScore = m.score;
          best = m;
        }
      }
    }

    return best;
  }

  function checkWinState(boardState, player) {
    return WIN_COMBOS.some((combo) =>
      combo.every((i) => boardState[i] === player)
    );
  }

  // --- KEYBOARD SUPPORT ---
  document.addEventListener('keydown', (e) => {
    // Numpad / number keys 1-9 map to cells
    const key = parseInt(e.key);
    if (key >= 1 && key <= 9) {
      // Map numpad layout (1=bottom-left) to grid indices
      const numpadMap = [6, 7, 8, 3, 4, 5, 0, 1, 2];
      handleClick(numpadMap[key - 1]);
    }
    // R to restart
    if (e.key === 'r' || e.key === 'R') {
      if (gameScreen.classList.contains('active')) {
        restart();
      }
    }
    // Escape to go back
    if (e.key === 'Escape') {
      if (!resultOverlay.hidden) {
        restart();
      } else if (gameScreen.classList.contains('active')) {
        backToMenu();
      }
    }
  });

  // --- PUBLIC API ---
  return {
    setMode,
    handleClick,
    restart,
    backToMenu,
  };
})();
