//IMPORT_START:

import computer from "./computerAlgo";
import sinCircle from "../../svg/singleplayer/sinCircle.svg";
import sinCross from "../../svg/singleplayer/sinCross.svg";

//IMPORT_END:

const gameSingpleplayer = function (singleplayerElement) {
  //SECTION: OBJECT SELECTION
  const gamefieldParent = singleplayerElement.querySelector(
    ".singleplayer__gameSection"
  );
  const gameMessage = singleplayerElement.querySelector(
    ".singleplayer__menuSection__display__message"
  );
  const countPlayer1 = singleplayerElement.querySelector(
    ".singleplayer__menuSection__control--firstCount"
  );
  const countPlayer2 = singleplayerElement.querySelector(
    ".singleplayer__menuSection__control--secondCount"
  );
  const replayButton = singleplayerElement.querySelector(
    ".singleplayer__menuSection__control--replayButton"
  );

  //SECTION: CLASS DEFINITIONS
  const Cross = class {
    constructor() {
      const newCross = document.createElement("img");
      newCross.classList.add("singleplayer__gameSection__cross");
      newCross.src = sinCross;
      newCross.alt = "mulCross";
      return [newCross, 4];
    }
  };

  const Circle = class {
    constructor() {
      const newCircle = document.createElement("img");
      newCircle.classList.add("singleplayer__gameSection__circle");
      newCircle.src = sinCircle;
      newCircle.alt = "sinCircle";
      return [newCircle, 1];
    }
  };

  const Field = class {
    constructor(fieldNum) {
      this.fieldNum = fieldNum;
      this.attachedField = document.querySelector(
        `.singleplayer__gameSection__fieldBox--${this.fieldNum}`
      );
      this.polutted = false;
      this.pollution = "";
      this.value = 0;
    }

    place(gameObject) {
      if (!this.polutted) {
        this.attachedField.appendChild(new gameObject()[0]);
        this.value = new gameObject()[1];
        this.polutted = true;
        this.pollution = new gameObject()[0].alt;
        // console.log("added pollution on field");
        return true;
      } else {
        // console.log("already polluted field!");
        return false;
      }
    }

    reset() {
      this.attachedField.innerHTML = "";
      this.pollution = "";
      this.polutted = false;
      this.value = 0;
    }
  };

  const Player = class {
    constructor(PlayerNum, AssignedSymbol) {
      this.WinCount = 0;
      this.PlayerNum = PlayerNum;
      this.AssignedSymbol = AssignedSymbol;
    }

    symbol() {
      return this.AssignedSymbol;
    }

    increaseCount() {
      this.WinCount = this.WinCount + 1;
      const paddedValue = this.WinCount.toString().padStart(2, "0");
      if (this.PlayerNum === 1) {
        countPlayer1.textContent = `PLAYER: ${paddedValue}`;
      }
      if (this.PlayerNum === 2) {
        countPlayer2.textContent = `COMPUTER: ${paddedValue}`;
      } else {
        console.log(this.PlayerNum);
      }
    }

    resetCount() {}
  };

  //SECTION: GAME LOGIC
  const Game = {
    field: [],
    checkOptions: {
      hor: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      ver: [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ],
      dia: [
        [1, 5, 9],
        [3, 5, 7],
      ],
    },
    Player1: new Player(1, Cross),
    Player2: new Player(2, Circle),
    currentPlayer: "this.Player1",
    gameStatus: "ongoing",
    stepStatus: 0,

    buildField() {
      field = [];
      for (let i = 1; i < 10; i++) {
        this.field.push(new Field(i));
      }
    },
    place(fieldNum) {
      const index = fieldNum - 1;
      const field = this.field[index];
      field.place(this.currentPlayer.symbol());
    },
    switchStatus() {
      this.currentPlayer === this.Player1
        ? (this.currentPlayer = this.Player2)
        : (this.currentPlayer = this.Player1);
    },
    handleMove(fieldNum) {
      this.place(fieldNum);
      this.switchStatus();
    },
    updateMessage(winner) {
      if (this.gameStatus === "ongoing") {
        this.currentPlayer === this.Player1
          ? (gameMessage.textContent = "TURN: PLAYER 1")
          : (gameMessage.textContent = "TURN: PLAYER 2");
      }

      if (this.gameStatus === "won") {
        gameMessage.textContent = `Player ${winner.PlayerNum} has won!`;
      }

      if (this.gameStatus === "draw") {
        gameMessage.textContent = "There is a draw!";
      }
    },
    start() {
      this.currentPlayer = this.Player1;
      this.gameStatus = "ongoing";
      this.stepStatus = 0;
      this.updateMessage();
      this.buildField();
    },
    checkDraw() {
      let isDraw = false;
      this.stepStatus++;
      console.log(this.stepStatus);
      if (this.stepStatus === 9) isDraw = true;
      return isDraw;
    },
    checkWin() {
      let winner;
      for (const direction in this.checkOptions) {
        const options = this.checkOptions[direction];
        options.forEach((singleOption) => {
          let value = 0;
          singleOption.forEach((num) => {
            const index = num - 1;
            const fieldValue = this.field[index].value;
            value = value + fieldValue;
            if (value === 12) {
              console.log("PLAYER 1 WON!");
              winner = this.Player1;
            }
            if (value === 3) {
              console.log("PLAYER 2 WON!");
              winner = this.Player2;
            }
          });
        });
      }
      return winner || false;
    },
  };

  //SECTION: INVOKING START SET UP

  Game.start();

  //SECTION: Event handling

  //SUB_SECTION: Handler Function defintions

  //NOTE: Both functions have to be declarations because of calling order!

  function removeClickability() {
    gamefieldParent.removeEventListener("click", handleGamelogic);
  }

  function handleGamelogic(event) {
    if (event.target.classList[0].includes("fieldBox")) {
      //SECTION: Insert correct object and switch to other player
      const field = parseInt(event.target.classList[1].slice(-1), 10);
      Game.handleMove(field);
      //SECTION: Check if someone has won or draw!
      const winCheck = Game.checkWin();
      if (typeof winCheck === "object") {
        console.log("WINNER!");
        Game.gameStatus = "won";
        Game.updateMessage(winCheck);
        winCheck.increaseCount();
        removeClickability();
        // gamefieldParent.remove
      } else {
        if (Game.checkDraw()) {
          console.log("DRAW!");
          Game.gameStatus = "draw";
          Game.updateMessage();
          removeClickability();
        } else {
          console.log("CONTINUE!");
          Game.updateMessage();
        }
      }
    }
  }

  //SUB_SECTION: Handle Placements Reqs!

  gamefieldParent.addEventListener("click", handleGamelogic);

  //SUB_SECTION: Handle Replays Reqs!

  replayButton.addEventListener("click", () => {
    Game.field.forEach((sField) => {
      sField.reset();
    });
    Game.start();
    gamefieldParent.addEventListener("click", handleGamelogic);
  });
};

export default gameSingpleplayer;