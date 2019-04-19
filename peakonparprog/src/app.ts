const scores = {
  1: [0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
  2: [20, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
  3: [6, [1, 1, 1, 1, 1, 1]], // incomplete
  4: [18, [1, 1, 6, 4, 3]], // incomplete w/ spare
  5: [150, [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]],
  6: [47, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 10, 9]],
  7: [173, [7, 3, 7, 3, 7, 3, 7, 3, 7, 3, 7, 3, 7, 3, 7, 3, 7, 3, 7, 3, 10]],
  8: [300, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]],
  9: [280, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 5]], // incomplete
  10: [300, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]], // extras
  11: [240, [10, 10, 10, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10]],
  12: [245, [10, 10, 10, 10, 10, 10, 10, 10, 10, 1, 1]]
};

interface IFrame {
  roll?: number;
  roll2?: number;
}

// Frame is 2 numbers in the rolls

class Game {
  private _score: number = 0;
  _currentFrame?: IFrame;
  _bonus = false;
  _frames: IFrame[] = [];

  public roll(pins: number) {
    if (!this._currentFrame) {
      this._currentFrame = {
        roll: pins
      };

      if (this._bonus) {
        this._score += pins;
      }

      if (pins === 10) {
        this._bonus = true;
      }
      this._frames.push(this._currentFrame);
    } else {
      this._currentFrame.roll2 = pins;

      if (this._currentFrame.roll! + pins === 10) {
        this._bonus = true;
      }
    }

    if (this._currentFrame.roll2 || this._currentFrame.roll === 10) {
      this._currentFrame = undefined;
    }
  }

  public score(): number {
    this._frames.forEach(frame => {
      if (!frame.roll) {
        frame.roll = 0;
      }
      if (!frame.roll2) {
        frame.roll2 = 0;
      }

      const sum = frame.roll + frame.roll2;
      this._score += sum;
    });

    return this._score;
  }
}

const game = new Game();

const gameScoresAndRolls = scores[11];
const expectedScore = gameScoresAndRolls[0];
const rolls = gameScoresAndRolls[1] as number[];

rolls.forEach(roll => {
  game.roll(roll);
});

console.info(`Expected score: ${expectedScore} got back score ${game.score()}`);
