//IMPORT_START:
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
      return [newCross, 3];
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
    attachField() {
      this.attachedField = document.querySelector(
        `.multiplayer__gameSection__fieldBox--${this.fieldNum}`
      );
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

    increaseCount() {}

    resetCount() {}
  };

  const MultiplayerGame = {
    field: [],
    Player1: new Player(1, Cross),
    Player2: new Player(2, Circle),
    currentPlayer: "this.Player1",
    gameStatus: "ongoing",

    buildField() {
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
    start() {
      this.switchStatus();
      this.buildField();
    },
  };

  //SECTION: INVOKING START SET UP

  MultiplayerGame.start();

  //SECTION: Event handling
  gamefieldParent.addEventListener("click", (event) => {
    if (event.target.classList[0].includes("fieldBox")) {
      const field = parseInt(event.target.classList[1].slice(-1), 10);
      MultiplayerGame.handleMove(field);
    } else {
    }
  });
};

export default gameMultiplayer;
