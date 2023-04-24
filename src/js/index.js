// IMPORT_START:

// ---- !Transpiling and Polyfilling Modules!----------------------

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

// ---- External Modules ------------------------------------------

// -
// -
// -

// ---- Internal Modules ------------------------------------------

import appControl from "./modules/appControl";
// -
// -

// IMPORT_END:

// if (module.hot) {
//   module.hot.accept();
// }
appControl();
