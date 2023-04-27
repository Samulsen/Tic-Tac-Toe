let moves = [1, 2, 3];

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
        console.log(this.computer, this.player);
        return;
      }

      if (computerObject.AssignedSymbol.name === "Circle") {
        this.computer = this.identCircle;
        this.player = this.identCross;
        console.log(this.computer, this.player);
        return;
      }
    },
  };

  //SECTION: Map Field Pollution
  const Pollution = {
    pollutionStatus: false,

    //SECTION: Field destructuring

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
    Middle: { polVal: field[4].value, fieldVal: field[4].fieldNum },

    //SECTION: Methods

    genCheck() {
      for (const sField of field) {
        if (sField.value === 4 || sField.value === 1) {
          this.pollutionStatus = true;
          break;
        }
      }
    },
  };

  //SECTION: Testcalls
  // console.log(Pollution.Edge.topLeft);
  // Pollution.genCheck();
  // Identity.resolveIdentity();

  //NOTE: Temp return for testing;
  return moves.pop();
};

export default computerAlgo;
