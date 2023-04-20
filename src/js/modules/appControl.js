// IMPORT_START:
import controlStartpage from "./pageControlls/controlStartpage";
// IMPORT_END:

const appControl = function () {
  //SECTION: Root Element Selection => passed down as root Arguement inside controlfunction
  const startpageElement = document.querySelector(".startpage");
  const singleplayerElement = document.querySelector(".singleplayer");
  const multiplayerElement = document.querySelector(".multiplayer");
  const rootArrayArg = [
    startpageElement,
    singleplayerElement,
    multiplayerElement,
  ];
  //SECTION: calling controlfunctions
  controlStartpage(...rootArrayArg);
};

export default appControl;
