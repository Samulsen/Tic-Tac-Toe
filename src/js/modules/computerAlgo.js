import { cloneDeep, identity } from "lodash";

let moves = [2, 6, 1, 7, 8];

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
    moveSolutionDetermined: false,

    //SECTION: Methods

    //SUB_SECTION: regular Checks

    //NOTE: Only for Win or Loose
    checkState(entity, stringArr, preecedState) {
      // SECTION: convert possible field options for following simulation
      const unconvertedMoves = Object.entries(Pollution.unpollutedFieldsMap);
      const availableMoves = [
        ...Object.entries(unconvertedMoves[0][1]),
        ...Object.entries(unconvertedMoves[1][1]),
        ...Object.entries(unconvertedMoves[2][1]),
      ];
      // SECTION: simulate weather possible fields will have certain outcome
      for (const [moveKey, moveVal] of availableMoves) {
        const simulator = {
          copyFieldArr: cloneDeep(field),
          insert() {
            const fieldIndex = moveVal.fieldVal - 1;
            const choosenField = this.copyFieldArr[fieldIndex];
            choosenField.polutted = true;
            choosenField.value = entity.value;
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
                if (value === entity.winValue) {
                  console.log(
                    `%c${stringArr[0]} = The field ${moveVal.fieldVal} WILL achieve in the instance of ${singleOption} a ${stringArr[4]}!`,
                    stringArr[2]
                  );
                  calculatedMove = moveVal.fieldVal;
                  Simulation.moveSolutionDetermined = true;
                  //NOTE: Break the if chain inside CalcMove
                  Simulation[preecedState] = false;
                  Simulation.possibleStrategy = false;
                  return true;
                }
                // else
                //   console.log(
                //     `FOR THE PLAYER = The field ${moveVal.fieldVal} will NOT achieve in the instance of ${singleOption} a ${stringArr[1]}!`
                //   );
              }
            }
            return false;
          },
        };
        simulator.insert();
        if (simulator.check()) break;
      }
      if (!Simulation.moveSolutionDetermined) {
        console.log(
          `%cFound no way to ${stringArr[1]}!, preceed to check if I can ${stringArr[3]}!`,
          "color: orange"
        );
      }
    },
    checkForWin() {
      console.warn("COMPUTER: Checking for possible WIN");
      this.checkState(
        Identity.computer,
        ["COMPUTER", "WIN", "color:green", "LOOSE"],
        "possibleLoose"
      );
    },
    checkForLoose() {
      console.warn("COMPUTER: Checking for possible LOOSE");
      this.checkState(
        Identity.player,
        ["FOR THE PLAYER", "LOOSE", "color:red", "DRAW", "WIN"],
        "possibleDraw"
      );
    },
    checkForDraw() {
      console.warn("COMPUTER: Checking for possible DRAW");
      //SECTION: convert possible field options for following simulation
      const unconvertedMoves = Object.entries(Pollution.unpollutedFieldsMap);
      const availableMoves = [
        ...Object.entries(unconvertedMoves[0][1]),
        ...Object.entries(unconvertedMoves[1][1]),
        ...Object.entries(unconvertedMoves[2][1]),
      ];
      console.log(availableMoves);
      //SECTION: Check if the possible options are greater then one, thus if we are in last round or NOT
      if (availableMoves.length === 1) {
        const lastFieldIndex = availableMoves[0][1].fieldVal;
        calculatedMove = lastFieldIndex;
        console.log(
          `%cThere will be a DRAW, when placing on ${lastFieldIndex}!`,
          "color: yellow"
        );
        this.possibleStrategy = false;
      } else {
        console.log(
          `%cFound no way to DRAW!, preceed to calculate STRATEGY!`,
          "color: orange"
        );
        this.possibleStrategy = true;
      }
    },

    //SUB_SECTION: Strategies

    checkForStrategy() {
      console.warn("COMPUTER: Checking for possible STRATEGY");
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

  //SECTION: Callarea and flow controll

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
