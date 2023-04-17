// SECTION_START: FUNCTIONS

/**
 * Has inside the NewOuterLine Function, that recalls the function four times with different arguements, to build the outer lines (top and bottom) of the page!
 * @param {StartpageElement} root passes down the StartpageElement for correctly directing child appendinds inside NewOuterLine Function.
 */

const outerLinesGenerator = function (root) {
  /**
   * A second level abstracted function, that generates new Outer Line Elements for later appending.
   * @param {StartpageElement} root used to pass down the main StartpageElement to which childs are being appended.
   * @param {"line-one-third"|"line-two-third"} cssClass1 is used to pass the first class for the childs, that sets the color.
   * @param {"line-one-third--upper"|"line-two-third--upper"|"line-one-third--lower"|"line-two-third--lower"} cssClass2 is used to pass the second class for the childs to distinguish them into an upper and lower child. The Class then adds them then accordingly in their corresponding grid-areas.
   * @returns it returns nothing!
   */
  const NewOuterLine = function (root, cssClass1, cssClass2) {
    const NewOuterLine = document.createElement("div");
    NewOuterLine.classList.add(cssClass1);
    NewOuterLine.classList.add(cssClass2);
    root.appendChild(NewOuterLine);
  };

  const OneThird = [root, "line-one-third"];
  const TwoThird = [root, "line-two-third"];
  NewOuterLine(...OneThird, "line-one-third--upper");
  NewOuterLine(...TwoThird, "line-two-third--upper");
  NewOuterLine(...OneThird, "line-one-third--lower");
  NewOuterLine(...TwoThird, "line-two-third--lower");
};

const mainContainerGenerator = function (root) {
  //SECTION_START: CREATE mainContainer Parent

  const mainContainer = document.createElement("div");
  mainContainer.classList.add("main-container");

  //SECTION_START: CREATE 3x child Elements for Parent

  const titleSection = document.createElement("div");
  titleSection.classList.add("titleSection");

  const previewSection = document.createElement("div");
  previewSection.classList.add("previewSection");

  const menuSection = document.createElement("div");
  menuSection.classList.add("menuSection");

  //SECTION_START: Populate childs bevor appending to parent

  const populateMenuSection = function () {
    //NOTE: SINGLEPLAYER BUTTON
    const buttonSingleplayer = document.createElement("a");
    buttonSingleplayer.href = "#";
    buttonSingleplayer.classList.add("buttonStart");
    buttonSingleplayer.classList.add("buttonStart--singleplayer");
    buttonSingleplayer.innerHTML = "Singleplayer";
    //NOTE: MULTIPLAYER BUTTON
    const buttonMultiplayer = document.createElement("a");
    buttonMultiplayer.href = "#";
    buttonMultiplayer.classList.add("buttonStart");
    buttonMultiplayer.classList.add("buttonStart--multiplayer");
    buttonMultiplayer.innerHTML = "Multiplayer";
    //NOTE: TEXT DISPLAY
    const displayDateBox = document.createElement("div");
    displayDateBox.classList.add("displayDateBox");
    displayDateBox.innerHTML = "Play against the computer or with a friend!";
    return [buttonSingleplayer, buttonMultiplayer, displayDateBox];
  };

  populateMenuSection().forEach((el) => menuSection.appendChild(el));

  //SECTION_START: Append to Parent Container as Childs

  [titleSection, previewSection, menuSection].forEach((el) =>
    mainContainer.appendChild(el)
  );

  //NOTE: APPEND LAST WHEN ALL CHILD OF mainContainer have been added!
  root.appendChild(mainContainer);
};

// SECTION_END:

const Startpage = function () {
  // SECTION_START: Root Element

  const StartpageElement = document.createElement("div");
  StartpageElement.classList.add("startpage");

  // SECTION_START: Child Elements
  outerLinesGenerator(StartpageElement);
  mainContainerGenerator(StartpageElement);
  return StartpageElement;
};

export default Startpage;
