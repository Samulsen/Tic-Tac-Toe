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
        const initChain = new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 700);
        });

        initChain
          .then(() => {
            return new Promise((resolve) => {
              startpageElement.classList.add("PageOffLoad");
              setTimeout(() => {
                resolve();
              }, 1000);
            });
          })
          .then(() => {
            viewStartpage.display = disableView;
            viewSingleplayer.display = enableView;
            singleplayerElement.classList.add("PageOnLoad");
          });
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
    setTimeout(() => {
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
    }, 700);
  });

  //SUB_SECTION: Menu Buttons in SINGLEPLAYER

  const menuSectionSingleplayer = document.querySelector(
    `.${SP}__menuSection__options`
  );
  menuSectionSingleplayer.addEventListener("click", (event) => {
    setTimeout(() => {
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
    }, 700);
  });
};

export default menuButtons;
