const controlStartpage = function (
  startpageElement,
  singleplayerElement,
  multiplayerElement
) {
  //SECTION: root Element selection specification on ".style "later on ".display"

  const viewStartpage = startpageElement.style;
  const viewSingleplayer = singleplayerElement.style;
  const viewMultiplayer = multiplayerElement.style;

  // SECTION: Options

  const enableView = "grid";
  const disableView = "none";

  //SECTION: Eventhandling

  const menuSectionStartpage = document.querySelector(".menuSection");
  menuSectionStartpage.addEventListener("click", (event) => {
    try {
      if (event.target.classList[1].includes("singleplayer")) {
        viewStartpage.display = disableView;
        viewSingleplayer.display = enableView;
      }

      if (event.target.classList[1].includes("multiplayer")) {
        viewStartpage.display = disableView;
        viewMultiplayer.display = enableView;
      }
    } catch (error) {}
  });
};

export default controlStartpage;
