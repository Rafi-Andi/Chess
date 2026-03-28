class Bishop {
  constructor(col, row, color) {
    this.col = col;
    this.row = row;
    this.color = color;
    this.img = color === "white" ? whitebishopimg : blackbishopimg;
    this.dir = [
      { dx: -1, dy: -1 },
      { dx: 1, dy: -1 },
      { dx: 1, dy: 1 },
      { dx: -1, dy: 1 },
    ];
  }
}

class Rook {
  constructor(col, row, color) {
    this.col = col;
    this.row = row;
    this.color = color;
    this.img = color === "white" ? whiterookimg : blackrookimg;
    this.dir = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
    ];
  }
}

class Queen {
  constructor(col, row, color) {
    this.col = col;
    this.row = row;
    this.color = color;
    this.img = color === "white" ? whitequeenimg : blackqueenimg;
    this.dir = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: -1 },
      { dx: 1, dy: -1 },
      { dx: 1, dy: 1 },
      { dx: -1, dy: 1 },
    ];
  }
}
class King {
  constructor(col, row, color) {
    this.col = col;
    this.row = row;
    this.color = color;
    this.img = color === "white" ? whitekingimg : blackkingimg;
    this.dir = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
    ];
  }
}

class Pawn {
  constructor(col, row, color) {
    this.col = col;
    this.row = row;
    this.color = color;
    this.img = color === "white" ? whitepawnimg : blackpawnimg;
  }
}

class Knight {
  constructor(col, row, color) {
    this.col = col;
    this.row = row;
    this.color = color;
    this.img = color === "white" ? whiteknightimg : blackknightimg;
    this.dir = [
      { dx: -2, dy: -1 },
      { dx: -2, dy: 1 },
      { dx: -1, dy: -2 },
      { dx: 1, dy: -2 },
      { dx: 2, dy: -1 },
      { dx: 2, dy: 1 },
      { dx: -1, dy: 2 },
      { dx: 1, dy: 2 },
    ];
  }
}
