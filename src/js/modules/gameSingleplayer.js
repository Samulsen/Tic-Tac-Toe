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
  const optionBox = gamefieldParent.querySelector(
    ".singleplayer__gameSection__optionBox"
  );
  const circleOption = optionBox.querySelector(
    ".singleplayer__gameSection__optionBox--circle"
  );
  const crossOption = optionBox.querySelector(
    ".singleplayer__gameSection__optionBox--cross"
  );
  const selector = optionBox.querySelector(
    ".singleplayer__gameSection__optionBox--selector"
  );
  const confirmButton = optionBox.querySelector(
    ".singleplayer__gameSection__optionBox--confirm"
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

  // SECTION: Game logic and state

  const Player = {
    AssignedSymbol: Circle,
    WinCount: 0,
  };
  const Computer = {
    AssignedSymbol: Cross,
    WinCount: 0,
  };

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
    startingEntity: Computer,
    secondEntity: Player,
    currentEntity: "",
    gameStatus: "choice",
    stepStatus: 0,

    buildField() {
      field = [];
      for (let i = 1; i < 10; i++) {
        this.field.push(new Field(i));
      }
    },
    prepStart() {
      if (this.startingEntity === Player) {
        gameMessage.textContent = "Turn: Player!";
      }

      if (this.startingEntity === Computer) {
        gameMessage.textContent = "Turn: Computer!";
      }
    },
    start() {
      this.stepStatus = 0;
      this.gameStatus = "ongoing";
      this.prepStart();
    },
    handleMove() {},
    playerMove() {},
    computerMove() {},
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
              console.log(`${this.startingEntity} WON!`);
              winner = this.startingEntity;
            }
            if (value === 3) {
              console.log(`${this.secondEntity} WON!`);
              winner = this.secondEntity;
            }
          });
        });
      }
      return winner || false;
    },
  };

  //SECTION: Event handling

  //SUB_SECTION: Options selection handling

  gameMessage.addEventListener("click", () => {
    optionBox.style.display = "grid";
  });

  circleOption.addEventListener("click", () => {
    selector.style.gridArea = "cir-s";
    Player.AssignedSymbol = Circle;
    Computer.AssignedSymbol = Cross;
    Game.startingEntity = Computer;
    Game.secondEntity = Player;
  });
  crossOption.addEventListener("click", () => {
    selector.style.gridArea = "cro-s";
    Player.AssignedSymbol = Cross;
    Computer.AssignedSymbol = Circle;
    Game.startingEntity = Player;
    Game.secondEntity = Computer;
  });

  confirmButton.addEventListener("click", () => {
    Game.gameStatus = "ongoing";
    optionBox.style.display = "none";
    //START FUNCTION
    Game.prepStart();
  });

  //SUB_SECTION: Game logic handling, after selection

  //NOTE: Function declaration

  //NOTE: event listening

  gamefieldParent.addEventListener("click", console.log);

  //SUB_SECTION: Replay handling

  replayButton.addEventListener("click", () => {
    Game.field.forEach((sField) => {
      sField.reset();
    });
  });
};

export default gameSingpleplayer;
