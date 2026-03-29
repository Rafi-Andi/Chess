const canvas = document.getElementById("canvas");

let game;

class Game {
  constructor() {
    this.ctx = canvas.getContext("2d");
    this.frameid = null;
    this.widthGrid = canvas.width / 8;

    this.pieces = [];
    this.moves = [];
    this.clicked = null;
    this.turn = "white";
  }

  start() {
    this.initPieces();
    this.initListener();
    this.render();
  }

  render() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawBg();
    this.drawSuggest();
    this.drawPieces();
    this.frameid = requestAnimationFrame(() => this.render());
  }

  drawBg() {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        this.ctx.beginPath();
        if ((row + col) % 2) {
          this.ctx.fillStyle = "#F5E6CC";
        } else {
          this.ctx.fillStyle = "#A67C52";
        }

        this.ctx.fillRect(
          col * this.widthGrid,
          row * this.widthGrid,
          this.widthGrid,
          this.widthGrid,
        );

        this.ctx.closePath();
      }
    }
  }

  initPieces() {
    this.pieces.push(new Bishop(2, 7, "white"));
    this.pieces.push(new Bishop(5, 7, "white"));
    this.pieces.push(new Bishop(2, 0, "black"));
    this.pieces.push(new Bishop(5, 0, "black"));

    this.pieces.push(new Rook(0, 7, "white"));
    this.pieces.push(new Rook(7, 7, "white"));
    this.pieces.push(new Rook(0, 0, "black"));
    this.pieces.push(new Rook(7, 0, "black"));

    this.pieces.push(new Queen(3, 0, "black"));
    this.pieces.push(new Queen(3, 7, "white"));

    this.pieces.push(new King(4, 0, "black"));
    this.pieces.push(new King(4, 7, "white"));

    for (let i = 0; i < 8; i++) {
      this.pieces.push(new Pawn(i, 6, "white"));
      this.pieces.push(new Pawn(i, 1, "black"));
    }

    this.pieces.push(new Knight(1, 7, "white"));
    this.pieces.push(new Knight(6, 7, "white"));
    this.pieces.push(new Knight(1, 0, "black"));
    this.pieces.push(new Knight(6, 0, "black"));
  }

  drawPieces() {
    this.pieces.forEach((p) => {
      this.ctx.drawImage(
        p.img,
        p.col * this.widthGrid,
        p.row * this.widthGrid,
        this.widthGrid,
        this.widthGrid,
      );
    });
  }

  drawSuggest() {
    this.moves.forEach((m) => {
      this.ctx.beginPath();
      this.ctx.fillStyle = "gray";
      this.ctx.fillRect(
        m.col * this.widthGrid,
        m.row * this.widthGrid,
        this.widthGrid,
        this.widthGrid,
      );
      this.ctx.strokeStyle = "white";
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(
        m.col * this.widthGrid,
        m.row * this.widthGrid,
        this.widthGrid,
        this.widthGrid,
      );
      this.ctx.closePath();
    });
  }

  isOutBoard(col, row) {
    return col < 0 || col > 7 || row < 0 || row > 7;
  }

  isSomePiece(col, row) {
    return this.pieces.some((p) => p.col === col && p.row === row);
  }

  checkMove() {
    if (
      this.clicked instanceof Bishop ||
      this.clicked instanceof Rook ||
      this.clicked instanceof Queen
    ) {
      this.clicked.dir.forEach((d) => {
        for (let i = 1; i <= 7; i++) {
          const newCol = this.clicked.col + d.dx * i;
          const newRow = this.clicked.row + d.dy * i;

          if (this.isOutBoard(newCol, newRow)) break;

          if (this.isSomePiece(newCol, newRow)) {
            const piece = this.pieces.find(
              (p) => p.col === newCol && p.row === newRow,
            );
            if (piece.color !== this.turn) {
              this.moves.push({ col: piece.col, row: piece.row });
            }
            break;
          }

          this.moves.push({
            col: newCol,
            row: newRow,
          });
        }
      });
    }

    if (this.clicked instanceof King) {
      this.clicked.dir.forEach((d) => {
        const newCol = this.clicked.col + d.dx;
        const newRow = this.clicked.row + d.dy;
        console.log(newCol, newRow);
        if (this.isOutBoard(newCol, newRow)) return;

        if (this.isSomePiece(newCol, newRow)) {
          const piece = this.pieces.find(
            (p) => p.col === newCol && p.row === newRow,
          );
          if (piece.color !== this.turn) {
            this.moves.push({ col: piece.col, row: piece.row });
          }
          return;
        }
        this.moves.push({
          col: newCol,
          row: newRow,
        });
      });
    }

    if (this.clicked instanceof Pawn) {
      const dy = this.clicked.color === "white" ? -1 : 1;
      const pieceFront = this.pieces.find(
        (p) =>
          p.col === this.clicked.col &&
          p.row === this.clicked.row + dy &&
          p.color !== this.clicked.color,
      );
      if (!pieceFront) {
        this.moves.push({
          col: this.clicked.col,
          row: this.clicked.row + dy,
        });
        if (this.clicked.color === "white") {
          if (this.clicked.row === 6) {
            if (
              !this.pieces.some(
                (p) =>
                  p.col === this.clicked.col && p.row === this.clicked.row - 2,
              )
            ) {
              this.moves.push({
                col: this.clicked.col,
                row: this.clicked.row - 2,
              });
            }
          }
        } else {
          if (this.clicked.row === 1) {
            if (
              !this.pieces.some(
                (p) =>
                  p.col === this.clicked.col && p.row === this.clicked.row + 2,
              )
            ) {
              this.moves.push({
                col: this.clicked.col,
                row: this.clicked.row + 2,
              });
            }
          }
        }
      }

      const pieceRight = this.pieces.some(
        (p) =>
          p.col === this.clicked.col + 1 &&
          p.row === this.clicked.row + dy &&
          p.color !== this.clicked.color,
      );

      if (pieceRight) {
        this.moves.push({
          col: this.clicked.col + 1,
          row: this.clicked.row + dy,
        });
      }
      const pieceLeft = this.pieces.some(
        (p) =>
          p.col === this.clicked.col - 1 &&
          p.row === this.clicked.row + dy &&
          p.color !== this.clicked.color,
      );

      if (pieceLeft) {
        this.moves.push({
          col: this.clicked.col - 1,
          row: this.clicked.row + dy,
        });
      }
    }

    if (this.clicked instanceof Knight) {
      this.clicked.dir.forEach((d) => {
        const newCol = this.clicked.col + d.dx;
        const newRow = this.clicked.row + d.dy;

        if (this.isOutBoard(newCol, newRow)) return;
        if (this.isSomePiece(newCol, newRow)) {
          const piece = this.pieces.find(
            (p) => p.col === newCol && p.row === newRow,
          );
          if (piece.color !== this.turn) {
            this.moves.push({ col: piece.col, row: piece.row });
          }
          return;
        }

        this.moves.push({ col: newCol, row: newRow });
      });
    }
  }

  initListener() {
    canvas.addEventListener("mousedown", (e) => {
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;

      this.pieces.forEach((p) => {
        if (p.color === this.turn) {
          if (
            mouseX > p.col * this.widthGrid &&
            mouseX < p.col * this.widthGrid + this.widthGrid &&
            mouseY > p.row * this.widthGrid &&
            mouseY < p.row * this.widthGrid + this.widthGrid
          ) {
            if (this.clicked == p) {
              this.clicked = null;
              this.moves = [];
            } else {
              this.moves = [];
              this.clicked = p;
              this.checkMove();
            }
          }
        }
      });

      this.moves.forEach((m) => {
        if (
          mouseX > m.col * this.widthGrid &&
          mouseX < m.col * this.widthGrid + this.widthGrid &&
          mouseY > m.row * this.widthGrid &&
          mouseY < m.row * this.widthGrid + this.widthGrid
        ) {
          const pieceEnemy = this.pieces.find(
            (p, i) =>
              p.col === m.col &&
              p.row === m.row &&
              p.color !== this.clicked.color,
          );
          if (pieceEnemy) {
            const index = this.pieces.indexOf(pieceEnemy);
            this.pieces.splice(index, 1);
            if (pieceEnemy instanceof King) {
              cancelAnimationFrame(this.frameid);
              alert("game over");
            }
          }
          this.clicked.col = m.col;
          this.clicked.row = m.row;
          this.clicked = null;
          this.moves = [];
          this.turn = this.turn === "white" ? "black" : "white";
        }
      });
    });
  }
}

game = new Game();
game.start();
