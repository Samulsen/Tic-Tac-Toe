let moves = [5, 9, 4];

const computerAlgo = function (field, computerObject) {
  //SECTION: Resolve Identity;
  const Identity = {
    identCross: { name: "Cross", value: 4 },
    identCircle: { name: "Circle", value: 1 },
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
    pollutionStatus: false,
    pollutionEdges: false,
    pollutionSides: false,
    pollutionMiddle: false,

    //SECTION: Field destructuring
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
      edgesArr.forEach(([edgeKey, edgeVal]) => {
        const argArr = [place, [edgeKey, edgeVal]];
        if (edgeVal.polVal === Identity.computer.value) {
          this.addToMap(this.computerPollutionMap, ...argArr);
        }
        if (edgeVal.polVal === Identity.player.value) {
          this.addToMap(this.playerPollutionMap, ...argArr);
        }
        if (edgeVal.polVal === 0) {
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

  //SECTION: Testcalls

  Identity.resolveIdentity();
  Pollution.checkEdges();
  Pollution.checkSides();
  Pollution.checkMiddle();

  //NOTE: Debug logs
  console.log("----------------------Computer---------------------");
  console.log(Pollution.computerPollutionMap);
  console.log("-----------------------Player----------------------");
  console.log(Pollution.playerPollutionMap);
  console.log("------------------------Free-----------------------");
  console.log(Pollution.unpollutedFieldsMap);

  //NOTE: Temp return for testing;
  return moves.pop();
};

export default computerAlgo;
