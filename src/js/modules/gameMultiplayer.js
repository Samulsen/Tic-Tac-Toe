//IMPORT_START:
import mulCircle from "../../svg/multiplayer/mulCircle.svg";
import mulCross from "../../svg/multiplayer/mulCircle.svg";
//IMPORT_END:

const gameMultiplayer = function (multiplayerElement) {
  const CrossObject = class {
    constructor() {}
  };

  const CircleObject = class {
    constructor() {}
  };

  const Player = class {
    constructor(PlayerNum) {
      this.WinCount = 0;
      this.PlayerNum = PlayerNum;
    }
    increaseCount() {}

    resetCount() {}
  };
};

export default gameMultiplayer;
