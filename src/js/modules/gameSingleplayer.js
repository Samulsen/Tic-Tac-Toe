//IMPORT_START:

import computerAlgo from "./computerAlgo";
//SECTION: Ressources
import sinCircle from "../../svg/singleplayer/sinCircle.svg";
import sinCross from "../../svg/singleplayer/sinCross.svg";
//SUB_SECTION: Audio
import clickReplay from "url:../../audio/click-replay.wav";
import clickConfirm from "url:../../audio/confirm.wav";
import clickModeAndBack from "url:../../audio/modeAndBack.wav";
import clickDiffMode from "url:../../audio/diffMode.wav";
import clickObjectChoice from "url:../../audio/crossOrCircle.wav";
import placeObject from "url:../../audio/object-place.wav";
import statusDraw from "url:../../audio/status-draw.wav";
import statusWon from "url:../../audio/status-won.wav";
import statusLost from "url:../../audio/status-lost.wav";
import pageLoaded from "url:../../audio/pageOffLoaded.wav";

//IMPORT_END:

const gameSingpleplayer = function (singleplayerElement) {
  //SECTION: OBJECT SELECTION
  const gamefieldParent = singleplayerElement.querySelector(
    ".singleplayer__gameSection"
  );
  //SUB_SECTION: Difficulty Selection Settings

  const diffOptionBox = gamefieldParent.querySelector(
    ".singleplayer__gameSection__DiffModeBox"
  );
  const easyMode = diffOptionBox.querySelector(
    ".singleplayer__gameSection__DiffModeBox__switcharea__option--one"
  );
  const middleMode = diffOptionBox.querySelector(
    ".singleplayer__gameSection__DiffModeBox__switcharea__option--two"
  );
  const hardMode = diffOptionBox.querySelector(
    ".singleplayer__gameSection__DiffModeBox__switcharea__option--three"
  );
  const diffSwitcharea = diffOptionBox.querySelector(
    ".singleplayer__gameSection__DiffModeBox__switcharea"
  );
  const selectorDiff = diffOptionBox.querySelector(
    ".singleplayer__gameSection__DiffModeBox__switcharea--switcher"
  );
  const backButton = diffOptionBox.querySelector(
    ".singleplayer__gameSection__DiffModeBox--backButton"
  );

  //SUB_SECTION: Symbol Selection Settings

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
  const switchModeButton = optionBox.querySelector(
    ".singleplayer__gameSection__optionBox--switchmode"
  );

  //SUB_SECTION: Rest Settings
  const gameMessage = singleplayerElement.querySelector(
    ".singleplayer__menuSection__display__message"
  );
  const countPlayer = singleplayerElement.querySelector(
    ".singleplayer__menuSection__control--firstCount"
  );
  const countComputer = singleplayerElement.querySelector(
    ".singleplayer__menuSection__control--secondCount"
  );
  const replayButton = singleplayerElement.querySelector(
    ".singleplayer__menuSection__control--replayButton"
  );

  //SECTION: Audio

  const clickReplaySound = new Audio(clickReplay);
  const clickConfirmSound = new Audio(clickConfirm);
  const clickModeAndBackSound = new Audio(clickModeAndBack);
  const clickDiffModeSound = new Audio(clickDiffMode);
  const clickObjectChoiceSound = new Audio(clickObjectChoice);
  const placeObjectSound = new Audio(placeObject);
  const wonSound = new Audio(statusWon);
  const drawSound = new Audio(statusDraw);
  const lostSound = new Audio(statusLost);
  const pageLoadedSound = new Audio(pageLoaded);

  //SECTION: CLASS DEFINITIONS
  const Cross = class {
    constructor() {
      this.name = "Cross";
      const newCross = document.createElement("img");
      newCross.classList.add("singleplayer__gameSection__cross");
      newCross.src = sinCross;
      newCross.alt = "mulCross";
      return [newCross, 4];
    }
  };

  const Circle = class {
    constructor() {
      this.name = "Circle";
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
    Name: "Player",
    AssignedSymbol: Circle,
    WinCount: 0,
    increaseCount() {
      this.WinCount++;
      const paddedValue = this.WinCount.toString().padStart(2, "0");
      countPlayer.textContent = `Player: ${paddedValue}`;
    },
  };

  const Computer = {
    Name: "Computer",
    AssignedSymbol: Cross,
    WinCount: 0,
    increaseCount() {
      this.WinCount++;
      const paddedValue = this.WinCount.toString().padStart(2, "0");
      countComputer.textContent = `Computer: ${paddedValue}`;
    },
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
    rootChoice: 0,
    modeChoice: 3,
    //SECTION: Start methods for start and reset (replay)
    buildField() {
      // console.log("Calling: buildField()");
      this.field = [];
      for (let i = 1; i < 10; i++) {
        this.field.push(new Field(i));
      }
    },
    resetFieldDOM() {
      // console.log("Calling: resetFieldDOM()");
      Game.field.forEach((sField) => {
        sField.reset();
      });
      // console.log(this.field.length);
    },
    prepStart() {
      // console.log("Calling: prepStart()");
      if (this.startingEntity === Player) {
        // gameMessage.textContent = "Turn: Player!";
        this.currentEntity = Player;
      }

      if (this.startingEntity === Computer) {
        // gameMessage.textContent = "Turn: Computer!";
        this.currentEntity = Computer;
      }
    },
    start() {
      console.clear();
      console.log("Calling: start()");
      this.stepStatus = 0;
      this.gameStatus = "ongoing";
      this.resetFieldDOM();
      this.prepStart();
      this.buildField();
      this.firstMove();
    },
    //SECTION: Check methods
    checkDraw() {
      // console.log("Calling: checkDraw()");
      let isDraw = false;
      this.stepStatus++;
      // console.log("Step Status= " + this.stepStatus);
      if (this.stepStatus === 9) isDraw = true;
      gameMessage.textContent = "There is a draw!";
      return isDraw;
    },
    checkWin() {
      // console.log("Calling: checkWin()");
      let winner;
      for (const direction in this.checkOptions) {
        const options = this.checkOptions[direction];
        options.forEach((singleOption) => {
          let value = 0;
          singleOption.forEach((num) => {
            const index = num - 1;
            const fieldValue = this.field[index].value;
            value = value + fieldValue;
          });
          //NOTE: Check if CROSS won!
          if (value === 12) {
            gameMessage.textContent = `${this.startingEntity.Name} WON!`;
            winner = this.startingEntity;
            // console.warn(`Cross WON ---- ${this.startingEntity.Name}`);
          }
          //NOTE: Check if CIRCLE won!
          if (value === 3) {
            gameMessage.textContent = `${this.secondEntity.Name} WON!`;
            winner = this.secondEntity;
            // console.warn(`Circle WON ---- ${this.secondEntity.Name}`);
          }
        });
      }
      return winner || false;
    },
    checkStatus() {
      console.log("Calling: checkStatus()--------------------------------");

      //SECTION: Check for Win

      if (typeof this.checkWin() === "object") {
        this.currentEntity.increaseCount();
        this.gameStatus = "won";
        console.log(`${this.currentEntity.Name} has won the game!`);
        console.log(
          "---------------------------------------------------------------"
        );
        if (this.currentEntity.Name === "Computer") {
          lostSound.play();
        } else {
          wonSound.play();
        }
        return;
      }

      //SECTION: Check for Draw

      if (this.checkDraw()) {
        drawSound.play();
        this.gameStatus = "draw";
        console.log("There is a draw!");
        return;
      }

      //SECTION: Check for Continue

      if (!(this.gameStatus === "draw" || this.gameStatus === "won")) {
        console.log("No Win or no Draw: Continue");
        console.log(
          "---------------------------------------------------------------"
        );
        this.nextMove();
        return;
      }
    },
    //SECTION: Field pollution methods
    placeSymbol(fieldNum) {
      const index = fieldNum - 1;
      const field = this.field[index];
      field.place(this.currentEntity.AssignedSymbol);
    },
    handleMove(fieldNum) {
      this.placeSymbol(fieldNum);
    },
    //SECTION: Entity move methods
    firstMove() {
      // console.log("Calling: firstMove()");
      if (this.currentEntity === Player) this.playerMove();
      if (this.currentEntity === Computer) this.computerMove();
    },
    nextMove() {
      // console.log("Calling: nextMove()");
      // console.log("Check if currentEntity is Player");

      if (this.currentEntity === Player) {
        // console.log(
        //   "currentEntity is Player --> switch to Computer and terminate function"
        // );
        this.currentEntity = Computer;
        this.computerMove();
        return;
      }

      // console.log("Check if currtentEntity is Computer");
      if (this.currentEntity === Computer) {
        // console.log(
        //   "currentEntity is Computer --> switch to Player and terminate function"
        // );
        this.currentEntity = Player;
        this.playerMove();
        return;
      }
    },
    playerMove() {
      console.log("Calling: playerMove()");
      gameMessage.textContent = "Turn: Player!";
      addClickabilityREPLAY();
      addClickability();
    },
    computerMove() {
      // NOTE: Because of async problems, replay button is disabled while computer thinks
      removedClickabilityREPLAY();
      removeClickabilityOPTION();
      removeClickability();
      console.log("Calling: computerMove()");
      gameMessage.textContent = "Turn: Computer!";
      const initChain = new Promise((resolve) => {
        let count = 0;
        let appendString = "Computer thinks.";
        const computerWaiter = setInterval(() => {
          if (count === 3) {
            clearInterval(computerWaiter);
            resolve();
          } else {
            gameMessage.textContent = appendString;
            appendString = appendString + ".";
            count++;
          }
        }, 1000);
      });
      initChain
        .then(() => {
          return new Promise((resolve) => {
            placeObjectSound.play();
            this.handleMove(
              computerAlgo(
                Game.field,
                Computer,
                this.stepStatus,
                this.rootChoice,
                this.modeChoice
              )
            );
            gameMessage.textContent = "Made my Choice!";
            resolve();
          });
        })
        .then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1200);
          });
        })
        .then(() => {
          this.checkStatus();
          addClickabilityREPLAY();
          addClickabilityOPTION();
        });
    },
  };

  // computerAlgo(Game.field, Computer);

  //SECTION: Event handling

  //SUB_SECTION:

  const enableView = "grid";
  const disableView = "none";

  //SUB_SECTION: Options selection handling NOTE: for SYMBOL

  function optionBoxOpener() {
    clickModeAndBackSound.play();
    optionBox.style.display = enableView;
  }

  function addClickabilityOPTION() {
    gameMessage.addEventListener("click", optionBoxOpener);
  }

  function removeClickabilityOPTION() {
    gameMessage.removeEventListener("click", optionBoxOpener);
  }

  singleplayerElement.addEventListener("animationend", (e) => {
    //NOTE: last animation
    if (e.target.classList[0].includes("options")) {
      pageLoadedSound.play();
    }
  });
  gameMessage.addEventListener("click", optionBoxOpener);
  circleOption.addEventListener("click", (e) => {
    clickObjectChoiceSound.play();
    selector.style.gridArea = "cir-s";
    Player.AssignedSymbol = Circle;
    Computer.AssignedSymbol = Cross;
    Game.startingEntity = Computer;
    Game.secondEntity = Player;
    // console.log("SELECT CRIRCLE  " + e.target.classList);
  });
  crossOption.addEventListener("click", (e) => {
    clickObjectChoiceSound.play();
    selector.style.gridArea = "cro-s";
    Player.AssignedSymbol = Cross;
    Computer.AssignedSymbol = Circle;
    Game.startingEntity = Player;
    Game.secondEntity = Computer;
    // console.log("SELECT CROSS  " + e.target.classList);
  });

  confirmButton.addEventListener("click", (e) => {
    clickConfirmSound.play();
    //NOTE: Hide menu
    optionBox.style.display = disableView;
    //NOTE: start the game
    Game.start();
  });

  switchModeButton.addEventListener("click", (e) => {
    clickModeAndBackSound.play();
    optionBox.style.display = disableView;
    diffOptionBox.style.display = enableView;
  });

  //SUB_SECTION: Options selection handling NOTE: for DIFFICULTY

  backButton.addEventListener("click", (e) => {
    clickModeAndBackSound.play();
    optionBox.style.display = enableView;
    diffOptionBox.style.display = disableView;
  });

  diffSwitcharea.addEventListener("click", (e) => {
    if (e.target.classList[0].includes("option")) {
      clickDiffModeSound.play();
      //NOTE: typecoerce from string to number
      const choosenMode = e.target.innerText - 0;

      switch (choosenMode) {
        case 1:
          selectorDiff.style.gridArea = "sel-One";
          Game.modeChoice = 1;
          easyMode.style.backgroundColor = "#1cdc1c";
          middleMode.style.backgroundColor = "";
          hardMode.style.backgroundColor = "";

          break;

        case 2:
          selectorDiff.style.gridArea = "sel-Two";
          Game.modeChoice = 2;
          easyMode.style.backgroundColor = "";
          middleMode.style.backgroundColor = "#f5c710";
          hardMode.style.backgroundColor = "";
          break;

        case 3:
          selectorDiff.style.gridArea = "sel-Three";
          Game.modeChoice = 3;
          easyMode.style.backgroundColor = "";
          middleMode.style.backgroundColor = "";
          hardMode.style.backgroundColor = "#ff0000";
          break;

        default:
          break;
      }
    }
  });

  //SUB_SECTION: Game logic handling, after selection

  //NOTE: Function declaration

  function handlePlayerClick(event) {
    if (event.target.classList[0].includes("fieldBox")) {
      placeObjectSound.play();
      const field = parseInt(event.target.classList[1].slice(-1), 10);
      Game.handleMove(field);
      //NOTE: Add here if condition, that when first move, change root choice to fieldnum
      if (Game.stepStatus === 0) Game.rootChoice = field;
      //NOTE: End with removing clickability
      removeClickability();
      //   console.warn("PlayerClick " + event.target.classList[0]);

      setTimeout(() => {
        Game.checkStatus();
      }, 1300);
    }
    // console.warn("UNWANTEND CLICK   " + event.target.classList);
  }

  function removeClickability() {
    gamefieldParent.removeEventListener("click", handlePlayerClick);
    // console.log("----------------Removed Click!----------------");
  }

  function addClickability() {
    gamefieldParent.addEventListener("click", handlePlayerClick);
    // console.log("------------------Added Click!----------------");
  }

  //SUB_SECTION: Replay handling

  function replayCallback() {
    clickReplaySound.play();
    Game.start();
  }

  function removedClickabilityREPLAY() {
    replayButton.removeEventListener("click", replayCallback);
  }

  function addClickabilityREPLAY() {
    replayButton.addEventListener("click", replayCallback);
  }

  // replayButton.addEventListener("click", replayCallback);
};

export default gameSingpleplayer;
