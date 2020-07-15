"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeclFlag;
(function (DeclFlag) {
    DeclFlag[DeclFlag["External"] = 1] = "External";
    DeclFlag[DeclFlag["DereferencedImport"] = 2] = "DereferencedImport";
    DeclFlag[DeclFlag["Local"] = 4] = "Local";
    DeclFlag[DeclFlag["HoistedToModule"] = 8] = "HoistedToModule";
    DeclFlag[DeclFlag["Callable"] = 16] = "Callable";
    DeclFlag[DeclFlag["ModifiedInLowerScope"] = 32] = "ModifiedInLowerScope";
})(DeclFlag = exports.DeclFlag || (exports.DeclFlag = {}));
exports.hooksNames = [
    'useState',
    'useEffect',
    'useContext',
    'useReducer',
    'useCallback',
    'useMemo',
    'useRef',
    'useImperativeHandle',
    'useLayoutEffect',
    'useDebugValue',
];
