const menuButtons = function (
  startpageElement,
  singleplayerElement,
  multiplayerElement
) {
  //SECTION: root Element selection specification on ".style "later on ".display"

  const viewStartpage = startpageElement.style;
  const viewSingleplayer = singleplayerElement.style;
  const viewMultiplayer = multiplayerElement.style;

  //SECTION: Options

  //SUB_SECTION: Pages

  const SP = "singleplayer";
  const MP = "multiplayer";

  //SUB_SECTION: Views

  const enableView = "grid";
  const disableView = "none";

  //SECTION: Eventhandling

  //SUB_SECTION: STARTPAGE

  const menuSectionStartpage = document.querySelector(".menuSection");
  menuSectionStartpage.addEventListener("click", (event) => {
    try {
      //NOTE: GO TO SINGLEPLAYER
      if (event.target.classList[1].includes(SP)) {
        viewStartpage.display = disableView;
        viewSingleplayer.display = enableView;
      }
      //NOTE: GO TO MULTIPLAYER
      if (event.target.classList[1].includes(MP)) {
        viewStartpage.display = disableView;
        viewMultiplayer.display = enableView;
      }
    } catch (error) {}
  });

  //SUB_SECTION: Menu Buttons in MULTIPLAYER

  const menuSectionMultiplayer = document.querySelector(
    `.${MP}__menuSection__options`
  );
  menuSectionMultiplayer.addEventListener("click", (event) => {
    try {
      //NOTE: GO TO MULTIPLAYER
      if (event.target.classList[1].includes("mode")) {
        viewMultiplayer.display = disableView;
        viewSingleplayer.display = enableView;
      }
      //NOTE: GO TO SINGLEPLAYER
      if (event.target.classList[1].includes("home")) {
        viewStartpage.display = enableView;
        viewMultiplayer.display = disableView;
      }
    } catch (error) {}
  });

  //SUB_SECTION: Menu Buttons in SINGLEPLAYER

  const menuSectionSingleplayer = document.querySelector(
    `.${SP}__menuSection__options`
  );
  menuSectionSingleplayer.addEventListener("click", (event) => {
    try {
      //NOTE: GO TO MULTIPLAYER
      if (event.target.classList[1].includes("mode")) {
        viewSingleplayer.display = disableView;
        viewMultiplayer.display = enableView;
      }
      //NOTE: GO TO SINGLEPLAYER
      if (event.target.classList[1].includes("home")) {
        viewSingleplayer.display = disableView;
        viewStartpage.display = enableView;
      }
    } catch (error) {}
  });
};

export default menuButtons;
