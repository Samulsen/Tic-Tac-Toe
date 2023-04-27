let moves = [1, 2, 3, 4, 5, 6];

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
    //SECTION: Field destructuring
    Edge: {
      topLeft: field[0].value,
      bottomLeft: field[6].value,
      topRight: field[2].value,
      bottomRight: field[8].value,
    },
    Side: {
      top: field[1].value,
      bottom: field[7].value,
      left: field[3].value,
      right: field[5].value,
    },
    Middle: field[4].value,
    //SECTION: Methods
    genCheck() {
      let isPolluted = false;
      console.log(field.length);
      field.forEach((sField) => {
        if (sField.value === 4 || sField.value === 1) isPolluted = true;
      });
      console.log("is polluted?= " + isPolluted);
      return isPolluted;
    },
  };
  //SECTION: Testcalls
  Pollution.genCheck();
  // Identity.resolveIdentity();
  //NOTE: Temp return for testing;
  return moves.pop();
};

export default computerAlgo;
