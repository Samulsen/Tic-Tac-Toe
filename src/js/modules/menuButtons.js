import clickNormal from "url:../../audio/click-nor.wav";
import pageLoaded from "url:../../audio/pageOffLoaded.wav";

const menuButtons = function (
  startpageElement,
  singleplayerElement,
  multiplayerElement
) {
  //SECTION: root Element selection specification on ".style "later on ".display"

  const viewStartpage = startpageElement.style;
  const viewSingleplayer = singleplayerElement.style;
  const viewMultiplayer = multiplayerElement.style;

  //SECTION: Button selections

  const singleplayerButton = document.querySelector(
    ".buttonStart--singleplayer"
  );
  const multiplayerButton = document.querySelector(".buttonStart--multiplayer");

  const fromSingleplayerToHome = document.querySelector(
    ".singleplayer__menuSection__options__button--home"
  );

  const fromSingleplayerToMultiplayer = document.querySelector(
    ".singleplayer__menuSection__options__button--mode"
  );

  const fromMultiplayerToHome = document.querySelector(
    ".multiplayer__menuSection__options__button--home"
  );

  const fromMultiplayerToSingleplayer = document.querySelector(
    ".multiplayer__menuSection__options__button--mode"
  );

  //SECTION: Options

  //SUB_SECTION: Pages

  const SP = "singleplayer";
  const MP = "multiplayer";

  //SUB_SECTION: Views

  const enableView = "grid";
  const disableView = "none";

  //SECTION: Audio Objects

  const clickSound = new Audio(clickNormal);
  const pageLoadedSound = new Audio(pageLoaded);

  //SECTION: Eventhandling

  //SUB_SECTION: STARTPAGE

  const menuSectionStartpage = document.querySelector(".menuSection");
  menuSectionStartpage.addEventListener("click", (event) => {
    try {
      //NOTE: GO TO SINGLEPLAYER
      if (event.target.classList[1].includes(SP)) {
        clickSound.play();
        singleplayerButton.classList.add("clickedButtonWhileLoad");
        const initChain = new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });
        initChain
          .then(() => {
            return new Promise((resolve) => {
              startpageElement.classList.add("PageOffLoad");
              startpageElement.classList.remove("PageOnLoad");
              setTimeout(() => {
                resolve();
              }, 1000);
            });
          })
          .then(() => {
            setTimeout(() => {
              pageLoadedSound.play();
            }, 10000);
            viewStartpage.display = disableView;
            viewSingleplayer.display = enableView;
            singleplayerElement.classList.remove("PageOffLoad");
            singleplayerElement.classList.add("PageOnLoad");
            singleplayerButton.classList.remove("clickedButtonWhileLoad");
          });
      }
      //NOTE: GO TO MULTIPLAYER
      if (event.target.classList[1].includes(MP)) {
        multiplayerButton.classList.add("clickedButtonWhileLoad");
        clickSound.play();
        const initChain = new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });

        initChain
          .then(() => {
            return new Promise((resolve) => {
              startpageElement.classList.add("PageOffLoad");
              startpageElement.classList.remove("PageOnLoad");
              setTimeout(() => {
                resolve();
              }, 1000);
            });
          })
          .then(() => {
            setTimeout(() => {
              pageLoadedSound.play();
            }, 10000);
            viewStartpage.display = disableView;
            viewMultiplayer.display = enableView;
            multiplayerElement.classList.remove("PageOffLoad");
            multiplayerElement.classList.add("PageOnLoad");
            multiplayerButton.classList.remove("clickedButtonWhileLoad");
          });
      }
    } catch (error) {}
  });

  //SUB_SECTION: Menu Buttons in MULTIPLAYER

  const menuSectionMultiplayer = document.querySelector(
    `.${MP}__menuSection__options`
  );
  menuSectionMultiplayer.addEventListener("click", (event) => {
    try {
      //NOTE: GO TO SINGLEPLAYER
      if (event.target.classList[1].includes("mode")) {
        clickSound.play();
        fromMultiplayerToSingleplayer.classList.add("clickedButtonWhileLoad");
        const initChain = new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });
        initChain
          .then(() => {
            return new Promise((resolve) => {
              multiplayerElement.classList.add("PageOffLoad");
              multiplayerElement.classList.remove("PageOnLoad");
              setTimeout(() => {
                resolve();
              }, 1000);
            });
          })
          .then(() => {
            setTimeout(() => {
              pageLoadedSound.play();
            }, 10000);
            viewMultiplayer.display = disableView;
            viewSingleplayer.display = enableView;
            singleplayerElement.classList.remove("PageOffLoad");
            singleplayerElement.classList.add("PageOnLoad");
            fromMultiplayerToSingleplayer.classList.remove(
              "clickedButtonWhileLoad"
            );
          });
      }
      //NOTE: GO TO STARTPAGE
      if (event.target.classList[1].includes("home")) {
        clickSound.play();
        fromMultiplayerToHome.classList.add("clickedButtonWhileLoad");
        const initChain = new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });
        initChain
          .then(() => {
            return new Promise((resolve) => {
              multiplayerElement.classList.add("PageOffLoad");
              multiplayerElement.classList.remove("PageOnLoad");
              setTimeout(() => {
                resolve();
              }, 1000);
            });
          })
          .then(() => {
            viewStartpage.display = enableView;
            viewMultiplayer.display = disableView;
            startpageElement.classList.remove("PageOffLoad");
            startpageElement.classList.add("PageOnLoad");
            fromMultiplayerToHome.classList.remove("clickedButtonWhileLoad");
          });
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
        clickSound.play();
        fromSingleplayerToMultiplayer.classList.add("clickedButtonWhileLoad");
        const initChain = new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });

        initChain
          .then(() => {
            return new Promise((resolve) => {
              singleplayerElement.classList.add("PageOffLoad");
              singleplayerElement.classList.remove("PageOnLoad");
              setTimeout(() => {
                resolve();
              }, 1000);
            });
          })
          .then(() => {
            setTimeout(() => {
              pageLoadedSound.play();
            }, 10000);
            viewSingleplayer.display = disableView;
            viewMultiplayer.display = enableView;
            multiplayerElement.classList.remove("PageOffLoad");
            multiplayerElement.classList.add("PageOnLoad");
            fromSingleplayerToMultiplayer.classList.remove(
              "clickedButtonWhileLoad"
            );
          });

        //
      }
      //NOTE: GO TO STARTPAGE
      if (event.target.classList[1].includes("home")) {
        clickSound.play();
        fromSingleplayerToHome.classList.add("clickedButtonWhileLoad");
        const initChain = new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });
        initChain
          .then(() => {
            return new Promise((resolve) => {
              singleplayerElement.classList.add("PageOffLoad");
              singleplayerElement.classList.remove("PageOnLoad");
              setTimeout(() => {
                resolve();
              }, 1000);
            });
          })
          .then(() => {
            viewSingleplayer.display = disableView;
            viewStartpage.display = enableView;
            startpageElement.classList.remove("PageOffLoad");
            startpageElement.classList.add("PageOnLoad");
            fromSingleplayerToHome.classList.remove("clickedButtonWhileLoad");
          });

        //
      }
    } catch (error) {}
  });
};

export default menuButtons;
