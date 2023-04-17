// IMPORT_START:

import Startpage from "./startpage";

// IMPORT_END:

const App = function () {
  const AppElement = document.createElement("div");
  AppElement.classList.add("app");
  AppElement.insertAdjacentElement("afterbegin", Startpage());

  return AppElement;
};

export default App;
