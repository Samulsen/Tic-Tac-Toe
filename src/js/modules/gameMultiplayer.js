//IMPORT_START:

import { multiply } from "lodash";
import mulCircle from "../../svg/multiplayer/mulCircle.svg";
import mulCross from "../../svg/multiplayer/mulCross.svg";
//IMPORT_END:

const gameMultiplayer = function (multiplayerElement) {
  //SECTION: OBJECT SELECTION
  const gamefieldParent = multiplayerElement.querySelector(
    ".multiplayer__gameSection"
  );
  const gameMessage = multiplayerElement.querySelector(
    ".multiplayer__menuSection__display__message"
  );
  const countPlayer1 = multiplayerElement.querySelector(
    ".multiplayer__menuSection__control--firstCount"
  );
  const countPlayer2 = multiplayerElement.querySelector(
    ".multiplayer__menuSection__control--secondCount"
  );
  const replayButton = multiplayerElement.querySelector(
    ".multiplayer__menuSection__control--replayButton"
  );

  //SECTION: CLASS DEFINITIONS
  const Cross = class {
    constructor() {
      const newCross = document.createElement("img");
      newCross.classList.add("multiplayer__gameSection__cross");
      newCross.src = mulCross;
      newCross.alt = "mulCross";
      return [newCross, 4];
    }
  };

  const Circle = class {
    constructor() {
      const newCircle = document.createElement("img");
      newCircle.classList.add("multiplayer__gameSection__circle");
      newCircle.src = mulCircle;
      newCircle.alt = "mulCircle";
      return [newCircle, 1];
    }
  };

  const Field = class {
    constructor(fieldNum) {
      this.fieldNum = fieldNum;
      this.attachedField = document.querySelector(
        `.multiplayer__gameSection__fieldBox--${this.fieldNum}`
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
    testLog() {
      console.log(this);
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
        countPlayer1.textContent = `Player 1: ${paddedValue}`;
      }
      if (this.PlayerNum === 2) {
        countPlayer2.textContent = `Player 2: ${paddedValue}`;
      } else {
        console.log(this.PlayerNum);
      }
    }

    resetCount() {}
  };

  const MultiplayerGame = {
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
      return this;
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
      this.switchStatus();
      this.buildField();
    },
    checkDraw() {
      let isDraw;
      const pollution = [];
      for (const sField of this.field) {
        pollution.push(sField.polutted);
      }
      if (pollution.includes(false)) {
        isDraw = false;
      } else {
        isDraw = true;
      }
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

  MultiplayerGame.start();

  //SECTION: Event handling
  gamefieldParent.addEventListener("click", (event) => {
    if (event.target.classList[0].includes("fieldBox")) {
      //SECTION: Insert correct object and switch to other player
      const field = parseInt(event.target.classList[1].slice(-1), 10);
      MultiplayerGame.handleMove(field);
      //SECTION: Check if someone has won or draw!
      const winCheck = MultiplayerGame.checkWin();
      if (typeof winCheck === "object") {
        console.log("WINNER!");
        MultiplayerGame.gameStatus = "won";
        MultiplayerGame.updateMessage(winCheck);
        winCheck.increaseCount();
      } else {
        if (MultiplayerGame.checkDraw()) {
          console.log("DRAW!");
          MultiplayerGame.gameStatus = "draw";
          MultiplayerGame.updateMessage();
        } else {
          console.log("CONTINUE!");
          MultiplayerGame.updateMessage();
        }
      }
    }
  });
};

export default gameMultiplayer;
