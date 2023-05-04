// IMPORT_START:
import gameMultiplayer from "./gameMultiplayer";
import gameSingpleplayer from "./gameSingleplayer";
import menuButtons from "./menuButtons";
// IMPORT_END:

const appControl = function () {
  //SECTION: Root Element Selection => passed down as root Arguement inside controlfunction

  const startpageElement = document.querySelector(".startpage");
  const singleplayerElement = document.querySelector(".singleplayer");
  const multiplayerElement = document.querySelector(".multiplayer");

  //NOTE: Comprehended Arguements Array that spreads inside the functions below

  const rootArrayArgs = [
    startpageElement,
    singleplayerElement,
    multiplayerElement,
  ];

  //SECTION: calling controlfunctions
  menuButtons(...rootArrayArgs);
  gameMultiplayer(multiplayerElement);
  gameSingpleplayer(singleplayerElement);
};

export default appControl;
