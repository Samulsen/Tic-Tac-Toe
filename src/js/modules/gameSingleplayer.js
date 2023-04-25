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
    startingEntity: "",
    gameStatus: "ongoing",
    stepStatus: 0,

    buildField() {
      field = [];
      for (let i = 1; i < 10; i++) {
        this.field.push(new Field(i));
      }
    },
    checkStart() {
      if (this.startingEntity === Player) {
      }

      if (this.startingEntity === Computer) {
      }
    },
  };

  //SECTION: Event handling

  gameMessage.addEventListener("click", () => {
    let state = optionBox.style.display;
    if (state === "") optionBox.style.display = "grid";
    if (state === "none") optionBox.style.display = "grid";
    if (state === "grid") optionBox.style.display = "none";
  });

  circleOption.addEventListener("click", () => {
    selector.style.gridArea = "cir-s";
    Player.AssignedSymbol = Circle;
    Computer.AssignedSymbol = Cross;
    Game.startingEntity = Computer;
  });
  crossOption.addEventListener("click", () => {
    selector.style.gridArea = "cro-s";
    Player.AssignedSymbol = Cross;
    Computer.AssignedSymbol = Circle;
    Game.startingEntity = Player;
  });
};

export default gameSingpleplayer;
