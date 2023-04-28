import { cloneDeep, identity } from "lodash";

let moves = [3, 4, 8];

const computerAlgo = function (field, computerObject) {
  let calculatedMove;
  //SECTION: Resolve Identity;

  const Identity = {
    identCross: { name: "Cross", value: 4, winValue: 12 },
    identCircle: { name: "Circle", value: 1, winValue: 3 },
    computer: "",
    player: "",
    resolveIdentity() {
      if (computerObject.AssignedSymbol.name === "Cross") {
        this.computer = this.identCross;
        this.player = this.identCircle;
        // console.log(this.computer, this.player);
        return;
      }

      if (computerObject.AssignedSymbol.name === "Circle") {
        this.computer = this.identCircle;
        this.player = this.identCross;
        // console.log(this.computer, this.player);
        return;
      }
    },
  };

  //SECTION: Map Field Pollution

  const Pollution = {
    //SECTION: Pollution States

    pollutionStatus: false,
    // pollutionEdges: false,
    // pollutionSides: false,
    // pollutionMiddle: false,

    //SECTION: Field destructuring of pollution

    generalPollutionMap: {
      Edge: {
        topLeft: { polVal: field[0].value, fieldVal: field[0].fieldNum },
        bottomLeft: { polVal: field[6].value, fieldVal: field[6].fieldNum },
        topRight: { polVal: field[2].value, fieldVal: field[2].fieldNum },
        bottomRight: { polVal: field[8].value, fieldVal: field[8].fieldNum },
      },
      Side: {
        top: { polVal: field[1].value, fieldVal: field[1].fieldNum },
        bottom: { polVal: field[7].value, fieldVal: field[7].fieldNum },
        left: { polVal: field[3].value, fieldVal: field[3].fieldNum },
        right: { polVal: field[5].value, fieldVal: field[5].fieldNum },
      },
      Middle: {
        Middle: { polVal: field[4].value, fieldVal: field[4].fieldNum },
      },
    },
    computerPollutionMap: {
      Edge: {},
      Side: {},
      Middle: {},
    },
    playerPollutionMap: {
      Edge: {},
      Side: {},
      Middle: {},
    },
    unpollutedFieldsMap: {
      Edge: {},
      Side: {},
      Middle: {},
    },

    //SECTION: Methods

    checkGeneral() {
      for (const sField of field) {
        if (sField.value === 4 || sField.value === 1) {
          this.pollutionStatus = true;
          break;
        }
      }
    },
    addToMap(map, place, objectArr) {
      map[place][objectArr[0]] = objectArr[1];
    },
    checkRegion(place) {
      const edgesArr = Object.entries(this.generalPollutionMap[place]);
      edgesArr.forEach(([key, val]) => {
        const argArr = [place, [key, val]];
        if (val.polVal === Identity.computer.value) {
          this.addToMap(this.computerPollutionMap, ...argArr);
        }
        if (val.polVal === Identity.player.value) {
          this.addToMap(this.playerPollutionMap, ...argArr);
        }
        if (val.polVal === 0) {
          this.addToMap(this.unpollutedFieldsMap, ...argArr);
        }
      });
    },
    checkEdges() {
      this.checkRegion("Edge");
    },
    checkSides() {
      this.checkRegion("Side");
    },
    checkMiddle() {
      this.checkRegion("Middle");
    },
  };

  //SECTION: Simulate different outcomes OR strategies

  const Simulation = {
    //SECTION: Simulation States
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
    possibleWin: true,
    possibleLoose: true,
    possibleDraw: true,
    possibleStrategy: false,

    //SECTION: Methods

    //SUB_SECTION: regular Checks

    checkForWin() {
      console.warn("COMPUTER: Checking for = WIN");
      const unconvertedMoves = Object.entries(Pollution.unpollutedFieldsMap);

      const availableMoves = [
        ...Object.entries(unconvertedMoves[0][1]),
        ...Object.entries(unconvertedMoves[1][1]),
        ...Object.entries(unconvertedMoves[2][1]),
      ];
      // console.log(availableMoves);
      for (const [moveKey, moveVal] of availableMoves) {
        const simulator = {
          copyFieldArr: cloneDeep(field),
          insert() {
            const fieldIndex = moveVal.fieldVal - 1;
            const choosenField = this.copyFieldArr[fieldIndex];
            choosenField.polutted = true;
            choosenField.value = Identity.computer.value;
          },
          check() {
            for (const direction in Simulation.checkOptions) {
              const options = Simulation.checkOptions[direction];
              for (const singleOption of options) {
                let value = 0;
                for (const fieldNum of singleOption) {
                  const index = fieldNum - 1;
                  const fieldValue = this.copyFieldArr[index].value;
                  value = value + fieldValue;
                }
                if (value === Identity.computer.winValue) {
                  console.log(
                    `%cCOMPUTER: The field ${moveVal.fieldVal} WILL achieve in the instance of ${singleOption} a win!`,
                    "color: green"
                  );
                  calculatedMove = moveVal.fieldVal;
                  //NOTE: Break the if chain inside CalcMove
                  Simulation.possibleLoose = false;
                  Simulation.possibleDraw = false;
                  Simulation.possibleStrategy = false;
                  return true;
                }
                // else
                //   console.log(
                //     `COMPUTER: The field ${moveVal.fieldVal} will NOT achieve in the instance of ${singleOption} a win!`
                //   );
              }
            }
            console.log(
              "%cFound no way to WIN!, preceed to check if I can loose",
              "color: orange"
            );
            return false;
          },
        };
        simulator.insert();
        if (simulator.check()) break;
      }
      console.log("Finished my check of my possible wins!");
    },
    checkForLoose() {
      console.warn("COMPUTER: Checking for = LOOSE");
      const unconvertedMoves = Object.entries(Pollution.unpollutedFieldsMap);

      const availableMoves = [
        ...Object.entries(unconvertedMoves[0][1]),
        ...Object.entries(unconvertedMoves[1][1]),
        ...Object.entries(unconvertedMoves[2][1]),
      ];
      // console.log(availableMoves);
      for (const [moveKey, moveVal] of availableMoves) {
        const simulator = {
          copyFieldArr: cloneDeep(field),
          insert() {
            const fieldIndex = moveVal.fieldVal - 1;
            const choosenField = this.copyFieldArr[fieldIndex];
            choosenField.polutted = true;
            choosenField.value = Identity.player.value;
          },
          check() {
            for (const direction in Simulation.checkOptions) {
              const options = Simulation.checkOptions[direction];
              for (const singleOption of options) {
                let value = 0;
                for (const fieldNum of singleOption) {
                  const index = fieldNum - 1;
                  const fieldValue = this.copyFieldArr[index].value;
                  value = value + fieldValue;
                }
                if (value === Identity.player.winValue) {
                  console.log(
                    `%cFOR THE PLAYER = The field ${moveVal.fieldVal} WILL achieve in the instance of ${singleOption} a win!`,
                    "color:red"
                  );
                  calculatedMove = moveVal.fieldVal;
                  //NOTE: Break the if chain inside CalcMove
                  Simulation.possibleDraw = false;
                  Simulation.possibleStrategy = false;
                  return true;
                }
                // else
                //   console.log(
                //     `FOR THE PLAYER = The field ${moveVal.fieldVal} will NOT achieve in the instance of ${singleOption} a win!`
                //   );
              }
            }
            console.log(
              "%cFound no way to LOOSE!, preceed to check if I can Draw!",
              "color: orange"
            );
            return false;
          },
        };
        simulator.insert();
        if (simulator.check()) break;
      }
      console.log("Finished my check of possible Player wins!");
    },
    checkForDraw() {
      console.warn("COMPUTER: Checking for = DRAW");
    },

    //SUB_SECTION: Strategies

    checkForStrategy() {
      console.log("COMPUTER: Checking for = STRATEGY");
    },

    //NOTE: Bundler Function
    calcMove() {
      //
      if (this.possibleWin === true) this.checkForWin();

      if (this.possibleLoose === true) this.checkForLoose();

      if (this.possibleDraw === true) this.checkForDraw();

      if (this.possibleStrategy === true) this.checkForStrategy();

      return calculatedMove;
    },
  };

  Identity.resolveIdentity();
  // Pollution.checkGeneral();
  //NOTE: Short circuiting for now checkGeneral
  Pollution.pollutionStatus = true;

  if (Pollution.pollutionStatus) {
    //NOTE: Evaluate field for upcoming Simulations
    Pollution.checkEdges();
    Pollution.checkSides();
    Pollution.checkMiddle();
    //NOTE: Switch Simulation chain
    // Simulation.possibleStrategy = false;
  }

  //SECTION: Testcalls

  //NOTE: Debug logs
  // console.log("----------------------Computer---------------------");
  // console.log(Pollution.computerPollutionMap);
  // console.log("-----------------------Player----------------------");
  // console.log(Pollution.playerPollutionMap);
  // console.log("------------------------Free-----------------------");
  // console.log(Pollution.unpollutedFieldsMap);

  //NOTE: Temp return for testing;
  console.warn("My calculated move = " + Simulation.calcMove());
  return moves.pop();
};

export default computerAlgo;
