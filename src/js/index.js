// ----------------------- START OF IMPORTS -----------------------

// ---- !Transpiling and Polyfilling Modules!----------------------

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

// ---- External Modules ------------------------------------------

// -
// -
// -

// ---- Internal Modules ------------------------------------------

import App from "./modules/App";
// -
// -

// ----------------------- END OF IMPORTS -------------------------

const root = document.querySelector(".root");
root.insertAdjacentElement("afterbegin", App());
