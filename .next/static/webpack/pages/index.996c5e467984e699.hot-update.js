"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/components/FillAsk.tsx":
/*!************************************!*\
  !*** ./src/components/FillAsk.tsx ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ FillAsk; }\n/* harmony export */ });\n/* harmony import */ var _Users_bschreck_benshits_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js */ \"./node_modules/next/dist/compiled/regenerator-runtime/runtime.js\");\n/* harmony import */ var _Users_bschreck_benshits_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_bschreck_benshits_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ethers */ \"./node_modules/ethers/lib.esm/index.js\");\n/* harmony import */ var artifacts_contracts_TimeNFT_sol_TimeNFT_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! artifacts/contracts/TimeNFT.sol/TimeNFT.json */ \"./src/artifacts/contracts/TimeNFT.sol/TimeNFT.json\");\n/* harmony import */ var _zoralabs_v3_dist_typechain_factories_AsksV11_factory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @zoralabs/v3/dist/typechain/factories/AsksV11__factory */ \"./node_modules/@zoralabs/v3/dist/typechain/factories/AsksV11__factory.js\");\n/* harmony import */ var _zoralabs_v3_dist_addresses_4_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @zoralabs/v3/dist/addresses/4.json */ \"./node_modules/@zoralabs/v3/dist/addresses/4.json\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _asyncToGenerator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\n\n\n\n\n\n\n\n // Mainnet addresses, 4.json would be Rinkeby Testnet\nvar _s = $RefreshSig$();\nvar erc721TransferHelperAddress = _zoralabs_v3_dist_addresses_4_json__WEBPACK_IMPORTED_MODULE_5__.ERC721TransferHelper;\nvar zoraModuleAddresses = [\n    _zoralabs_v3_dist_addresses_4_json__WEBPACK_IMPORTED_MODULE_5__.AsksV1_1,\n    _zoralabs_v3_dist_addresses_4_json__WEBPACK_IMPORTED_MODULE_5__.OffersV1\n];\nvar formatter = new Intl.NumberFormat(\"en-us\", {\n    minimumFractionDigits: 4,\n    maximumFractionDigits: 4\n});\nvar formatBalance = function(balance) {\n    return formatter.format(parseFloat(ethers__WEBPACK_IMPORTED_MODULE_6__.ethers.BigNumber.from(balance).toHexString()));\n};\nfunction FillAsk(props) {\n    _s();\n    var addressContract = props.addressContract;\n    var currentAccount = props.currentAccount;\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"0x\"), tokenId1 = ref[0], setTokenId = ref[1];\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"0x0\"), fillAmount1 = ref1[0], setFillAmount = ref1[1];\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function() {\n        if (!window.ethereum) return;\n        if (!currentAccount) return;\n    }, [\n        currentAccount\n    ]);\n    function fillAsk(event) {\n        return _fillAsk.apply(this, arguments);\n    }\n    function _fillAsk() {\n        _fillAsk = _asyncToGenerator(_Users_bschreck_benshits_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(event) {\n            var provider, signer, contract, askModuleContract, finder, currency, tx, receipt;\n            return _Users_bschreck_benshits_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n                while(1)switch(_ctx.prev = _ctx.next){\n                    case 0:\n                        if (window.ethereum) {\n                            _ctx.next = 2;\n                            break;\n                        }\n                        return _ctx.abrupt(\"return\");\n                    case 2:\n                        if (currentAccount) {\n                            _ctx.next = 4;\n                            break;\n                        }\n                        return _ctx.abrupt(\"return\");\n                    case 4:\n                        provider = new ethers__WEBPACK_IMPORTED_MODULE_6__.ethers.providers.Web3Provider(window.ethereum);\n                        signer = provider.getSigner();\n                        contract = new ethers__WEBPACK_IMPORTED_MODULE_6__.ethers.Contract(addressContract, artifacts_contracts_TimeNFT_sol_TimeNFT_json__WEBPACK_IMPORTED_MODULE_3__.abi, signer);\n                        askModuleContract = _zoralabs_v3_dist_typechain_factories_AsksV11_factory__WEBPACK_IMPORTED_MODULE_4__.AsksV11__factory.connect(_zoralabs_v3_dist_addresses_4_json__WEBPACK_IMPORTED_MODULE_5__.AsksV1_1, signer);\n                        event.preventDefault();\n                        finder = ethers__WEBPACK_IMPORTED_MODULE_6__.ethers.constants.AddressZero;\n                        currency = ethers__WEBPACK_IMPORTED_MODULE_6__.ethers.constants.AddressZero;\n                        _ctx.next = 13;\n                        return askModuleContract.fillAsk(addressContract, tokenId1, currency, fillAmount1, finder);\n                    case 13:\n                        tx = _ctx.sent;\n                        console.log(\"TransactionResponse TX hash: \".concat(tx.hash));\n                        _ctx.next = 17;\n                        return tx.wait();\n                    case 17:\n                        receipt = _ctx.sent;\n                        console.log(\"transfer receipt\", receipt);\n                    case 19:\n                    case \"end\":\n                        return _ctx.stop();\n                }\n            }, _callee);\n        }));\n        return _fillAsk.apply(this, arguments);\n    }\n    var handleChange = function(tokenId) {\n        if (tokenId !== \"\") {\n            try {\n                tokenId = ethers__WEBPACK_IMPORTED_MODULE_6__.ethers.BigNumber.from(tokenId).toHexString();\n            } catch (e) {\n                tokenId = \"\";\n            }\n        }\n        setTokenId(tokenId);\n    };\n    var handleFillAmountChange = function(fillAmount) {\n        if (fillAmount !== \"\") {\n            try {\n                var weiPrice = 1e18 * parseFloat(fillAmount);\n                fillAmount = ethers__WEBPACK_IMPORTED_MODULE_6__.ethers.BigNumber.from(weiPrice.toString()).toHexString();\n            } catch (e) {\n                fillAmount = \"\";\n            }\n        }\n        setFillAmount(fillAmount);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"form\", {\n        onSubmit: fillAsk,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormControl, {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormLabel, {\n                    htmlFor: \"tokenId\",\n                    children: \"TokenId: \"\n                }, void 0, false, {\n                    fileName: \"/Users/bschreck/benshits/src/components/FillAsk.tsx\",\n                    lineNumber: 94,\n                    columnNumber: 5\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Input, {\n                    id: \"tokenid\",\n                    type: \"text\",\n                    required: true,\n                    onChange: function(e) {\n                        return handleChange(e.target.value);\n                    }\n                }, void 0, false, {\n                    fileName: \"/Users/bschreck/benshits/src/components/FillAsk.tsx\",\n                    lineNumber: 95,\n                    columnNumber: 5\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.FormLabel, {\n                    htmlFor: \"fillAmount\",\n                    children: \"Fill Amount: \"\n                }, void 0, false, {\n                    fileName: \"/Users/bschreck/benshits/src/components/FillAsk.tsx\",\n                    lineNumber: 96,\n                    columnNumber: 5\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.NumberInput, {\n                    defaultValue: fillAmount1,\n                    min: 0.00000001,\n                    onChange: handleFillAmountChange,\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.NumberInputField, {}, void 0, false, {\n                        fileName: \"/Users/bschreck/benshits/src/components/FillAsk.tsx\",\n                        lineNumber: 98,\n                        columnNumber: 7\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/bschreck/benshits/src/components/FillAsk.tsx\",\n                    lineNumber: 97,\n                    columnNumber: 5\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Button, {\n                    type: \"submit\",\n                    isDisabled: !currentAccount,\n                    children: \"Fill Ask\"\n                }, void 0, false, {\n                    fileName: \"/Users/bschreck/benshits/src/components/FillAsk.tsx\",\n                    lineNumber: 101,\n                    columnNumber: 5\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/bschreck/benshits/src/components/FillAsk.tsx\",\n            lineNumber: 93,\n            columnNumber: 5\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/bschreck/benshits/src/components/FillAsk.tsx\",\n        lineNumber: 92,\n        columnNumber: 5\n    }, this);\n};\n_s(FillAsk, \"DQAB0GWO2s7o5IxtYZbudFiJH7c=\");\n_c = FillAsk;\nvar _c;\n$RefreshReg$(_c, \"FillAsk\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9GaWxsQXNrLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFrRDtBQUNzRDtBQUMzRTtBQUVpQztBQUk0QjtBQUNwQixDQUFDLHFEQUFxRDs7QUFHNUgsSUFBTWEsMkJBQTJCLEdBQUdELG9GQUF5QztBQUM3RSxJQUFNRyxtQkFBbUIsR0FBRztJQUFDSCx3RUFBNkI7SUFBRUEsd0VBQTZCO0NBQUM7QUFHMUYsSUFBTU0sU0FBUyxHQUFHLElBQUlDLElBQUksQ0FBQ0MsWUFBWSxDQUFDLE9BQU8sRUFBRTtJQUMvQ0MscUJBQXFCLEVBQUUsQ0FBQztJQUN4QkMscUJBQXFCLEVBQUUsQ0FBQztDQUN6QixDQUFDO0FBRUYsSUFBTUMsYUFBYSxHQUFHLFNBQUNDLE9BQXFDO1dBQzFETixTQUFTLENBQUNPLE1BQU0sQ0FBQ0MsVUFBVSxDQUFDakIseURBQXFCLENBQUNlLE9BQU8sQ0FBQyxDQUFDSyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0NBQUE7QUFVN0QsU0FBU0MsT0FBTyxDQUFDQyxLQUFXLEVBQUM7O0lBQzFDLElBQU1DLGVBQWUsR0FBR0QsS0FBSyxDQUFDQyxlQUFlO0lBQzdDLElBQU1DLGNBQWMsR0FBR0YsS0FBSyxDQUFDRSxjQUFjO0lBQzNDLElBQTJCL0IsR0FBc0IsR0FBdEJBLCtDQUFRLENBQVMsSUFBSSxDQUFDLEVBbkNuRCxRQW1DZ0IsR0FBYUEsR0FBc0IsR0FBbkMsRUFuQ2hCLFVBbUMyQixHQUFFQSxHQUFzQixHQUF4QjtJQUN6QixJQUFrQ0EsSUFBdUIsR0FBdkJBLCtDQUFRLENBQVMsS0FBSyxDQUFDLEVBcEMzRCxXQW9DbUIsR0FBaUJBLElBQXVCLEdBQXhDLEVBcENuQixhQW9Da0MsR0FBRUEsSUFBdUIsR0FBekI7SUFFaENELGdEQUFTLENBQUUsV0FBTTtRQUNmLElBQUcsQ0FBQ3FDLE1BQU0sQ0FBQ0MsUUFBUSxFQUFFLE9BQU07UUFDM0IsSUFBRyxDQUFDTixjQUFjLEVBQUUsT0FBTTtLQUMzQixFQUFFO1FBQUNBLGNBQWM7S0FBQyxDQUFDO2FBRUxPLE9BQU8sQ0FBQ0MsS0FBcUI7ZUFBN0JELFFBQU87O2FBQVBBLFFBQU87UUFBUEEsUUFBTyxHQUF0Qix1S0FBdUJDLEtBQXFCLEVBQUU7Z0JBR3RDQyxRQUFRLEVBQ1JDLE1BQU0sRUFDTkMsUUFBUSxFQUVSQyxpQkFBaUIsRUFHakJDLE1BQU0sRUFDTkMsUUFBUSxFQUNSQyxFQUFFLEVBU0ZDLE9BQU87Ozs7NEJBcEJUWCxNQUFNLENBQUNDLFFBQVE7Ozs7Ozs0QkFDZk4sY0FBYzs7Ozs7O3dCQUNaUyxRQUFRLEdBQUcsSUFBSWpDLGlFQUE2QixDQUFDNkIsTUFBTSxDQUFDQyxRQUFRLENBQUM7d0JBQzdESSxNQUFNLEdBQUdELFFBQVEsQ0FBQ1UsU0FBUyxFQUFFO3dCQUM3QlIsUUFBUSxHQUFZLElBQUluQyxtREFBZSxDQUFDdUIsZUFBZSxFQUFFdEIsNkVBQU8sRUFBRWlDLE1BQU0sQ0FBQzt3QkFFekVFLGlCQUFpQixHQUFHbEMsMkdBQXdCLENBQUNDLHdFQUE2QixFQUFFK0IsTUFBTSxDQUFDLENBQUM7d0JBQzFGRixLQUFLLENBQUNjLGNBQWMsRUFBRTt3QkFFaEJULE1BQU0sR0FBR3JDLGdFQUE0QixDQUFDO3dCQUN0Q3NDLFFBQVEsR0FBR3RDLGdFQUE0QixDQUFDOzsrQkFDN0JvQyxpQkFBaUIsQ0FBQ0wsT0FBTyxDQUN4Q1IsZUFBZSxFQUNmRSxRQUFPLEVBQ1BhLFFBQVEsRUFDUlgsV0FBVSxFQUNWVSxNQUFNLENBQ1A7O3dCQU5LRSxFQUFFLFlBTVA7d0JBRURVLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLCtCQUE4QixDQUFVLE9BQVJYLEVBQUUsQ0FBQ1ksSUFBSSxDQUFFLENBQUMsQ0FBQzs7K0JBQ2pDWixFQUFFLENBQUNhLElBQUksRUFBRTs7d0JBQXpCWixPQUFPLFlBQWtCO3dCQUMvQlMsT0FBTyxDQUFDQyxHQUFHLENBQUMsa0JBQWtCLEVBQUNWLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7U0FDekM7ZUF2QmNULFFBQU87O0lBeUJ0QixJQUFNc0IsWUFBWSxHQUFHLFNBQUM1QixPQUFjLEVBQUs7UUFDdkMsSUFBSUEsT0FBTyxLQUFLLEVBQUUsRUFBRTtZQUNsQixJQUFJO2dCQUNGQSxPQUFPLEdBQUd6Qix5REFBcUIsQ0FBQ3lCLE9BQU8sQ0FBQyxDQUFDTCxXQUFXLEVBQUUsQ0FBQzthQUN4RCxDQUFDLFVBQU07Z0JBQ05LLE9BQU8sR0FBRyxFQUFFO2FBQ2I7U0FDRjtRQUNEQyxVQUFVLENBQUNELE9BQU8sQ0FBQyxDQUFDO0tBQ3JCO0lBQ0QsSUFBTTZCLHNCQUFzQixHQUFHLFNBQUMzQixVQUFpQixFQUFLO1FBQ3BELElBQUlBLFVBQVUsS0FBSyxFQUFFLEVBQUU7WUFDckIsSUFBSTtnQkFDRixJQUFNNEIsUUFBUSxHQUFHLElBQUksR0FBR3RDLFVBQVUsQ0FBQ1UsVUFBVSxDQUFDO2dCQUM5Q0EsVUFBVSxHQUFHM0IseURBQXFCLENBQUN1RCxRQUFRLENBQUNDLFFBQVEsRUFBRSxDQUFDLENBQUNwQyxXQUFXLEVBQUUsQ0FBQzthQUN2RSxDQUFDLFVBQU07Z0JBQ05PLFVBQVUsR0FBRyxFQUFFO2FBQ2hCO1NBQ0Y7UUFDREMsYUFBYSxDQUFDRCxVQUFVLENBQUMsQ0FBQztLQUMzQjtJQUVELHFCQUNFLDhEQUFDOEIsTUFBSTtRQUFDQyxRQUFRLEVBQUUzQixPQUFPO2tCQUN2Qiw0RUFBQ2pDLHlEQUFXOzs4QkFDWiw4REFBQ0MsdURBQVM7b0JBQUM0RCxPQUFPLEVBQUMsU0FBUzs4QkFBQyxXQUFTOzs7Ozt3QkFBWTs4QkFDbEQsOERBQUNoRSxtREFBSztvQkFBQ2lFLEVBQUUsRUFBQyxTQUFTO29CQUFDQyxJQUFJLEVBQUMsTUFBTTtvQkFBQ0MsUUFBUTtvQkFBQ0MsUUFBUSxFQUFFLFNBQUNDLENBQUM7K0JBQUtYLFlBQVksQ0FBQ1csQ0FBQyxDQUFDQyxNQUFNLENBQUNDLEtBQUssQ0FBQztxQkFBQTs7Ozs7d0JBQUc7OEJBQ3pGLDhEQUFDbkUsdURBQVM7b0JBQUM0RCxPQUFPLEVBQUMsWUFBWTs4QkFBQyxlQUFhOzs7Ozt3QkFBWTs4QkFDekQsOERBQUMvRCx5REFBVztvQkFBQ3VFLFlBQVksRUFBRXhDLFdBQVU7b0JBQUV5QyxHQUFHLEVBQUUsVUFBVTtvQkFBRUwsUUFBUSxFQUFFVCxzQkFBc0I7OEJBQ3RGLDRFQUFDekQsOERBQWdCOzs7OzRCQUFHOzs7Ozt3QkFDUjs4QkFFZCw4REFBQ0gsb0RBQU07b0JBQUNtRSxJQUFJLEVBQUMsUUFBUTtvQkFBQ1EsVUFBVSxFQUFFLENBQUM3QyxjQUFjOzhCQUFHLFVBQVU7Ozs7O3dCQUFVOzs7Ozs7Z0JBQzFEOzs7OztZQUNQLENBQ1I7Q0FDRjtHQXhFdUJILE9BQU87QUFBUEEsS0FBQUEsT0FBTyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9GaWxsQXNrLnRzeD82NDRmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge0J1dHRvbiwgSW5wdXQsIE51bWJlcklucHV0LCAgTnVtYmVySW5wdXRGaWVsZCwgRm9ybUNvbnRyb2wsICBGb3JtTGFiZWwgfSBmcm9tICdAY2hha3JhLXVpL3JlYWN0J1xuaW1wb3J0IHtldGhlcnN9IGZyb20gJ2V0aGVycydcbmltcG9ydCB7cGFyc2VFdGhlciB9IGZyb20gJ2V0aGVycy9saWIvdXRpbHMnXG5pbXBvcnQgYWJpIGZyb20gJ2FydGlmYWN0cy9jb250cmFjdHMvVGltZU5GVC5zb2wvVGltZU5GVC5qc29uJ1xuaW1wb3J0IHsgQ29udHJhY3QgfSBmcm9tIFwiZXRoZXJzXCJcbmltcG9ydCB7IFRyYW5zYWN0aW9uUmVzcG9uc2UsVHJhbnNhY3Rpb25SZWNlaXB0IH0gZnJvbSBcIkBldGhlcnNwcm9qZWN0L2Fic3RyYWN0LXByb3ZpZGVyXCJcblxuaW1wb3J0IHsgQXNrc1YxMV9fZmFjdG9yeSB9IGZyb20gXCJAem9yYWxhYnMvdjMvZGlzdC90eXBlY2hhaW4vZmFjdG9yaWVzL0Fza3NWMTFfX2ZhY3RvcnlcIjtcbmltcG9ydCByaW5rZWJ5Wm9yYUFkZHJlc3NlcyBmcm9tIFwiQHpvcmFsYWJzL3YzL2Rpc3QvYWRkcmVzc2VzLzQuanNvblwiOyAvLyBNYWlubmV0IGFkZHJlc3NlcywgNC5qc29uIHdvdWxkIGJlIFJpbmtlYnkgVGVzdG5ldFxuaW1wb3J0IHsgWm9yYU1vZHVsZU1hbmFnZXJfX2ZhY3RvcnkgfSBmcm9tIFwiQHpvcmFsYWJzL3YzL2Rpc3QvdHlwZWNoYWluL2ZhY3Rvcmllcy9ab3JhTW9kdWxlTWFuYWdlcl9fZmFjdG9yeVwiO1xuXG5jb25zdCBlcmM3MjFUcmFuc2ZlckhlbHBlckFkZHJlc3MgPSByaW5rZWJ5Wm9yYUFkZHJlc3Nlcy5FUkM3MjFUcmFuc2ZlckhlbHBlcjtcbmNvbnN0IHpvcmFNb2R1bGVBZGRyZXNzZXMgPSBbcmlua2VieVpvcmFBZGRyZXNzZXMuQXNrc1YxXzEsIHJpbmtlYnlab3JhQWRkcmVzc2VzLk9mZmVyc1YxXTtcblxuXG5jb25zdCBmb3JtYXR0ZXIgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQoXCJlbi11c1wiLCB7XG4gIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNCxcbiAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiA0LFxufSk7XG5cbmNvbnN0IGZvcm1hdEJhbGFuY2UgPSAoYmFsYW5jZTogZXRoZXJzLkJpZ051bWJlciB8IHVuZGVmaW5lZCkgPT5cbiAgZm9ybWF0dGVyLmZvcm1hdChwYXJzZUZsb2F0KGV0aGVycy5CaWdOdW1iZXIuZnJvbShiYWxhbmNlKS50b0hleFN0cmluZygpKSk7XG5cblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgICBhZGRyZXNzQ29udHJhY3Q6IHN0cmluZyxcbiAgICBjdXJyZW50QWNjb3VudDogc3RyaW5nIHwgdW5kZWZpbmVkXG59XG5cbmRlY2xhcmUgbGV0IHdpbmRvdzogYW55O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGaWxsQXNrKHByb3BzOlByb3BzKXtcbiAgY29uc3QgYWRkcmVzc0NvbnRyYWN0ID0gcHJvcHMuYWRkcmVzc0NvbnRyYWN0O1xuICBjb25zdCBjdXJyZW50QWNjb3VudCA9IHByb3BzLmN1cnJlbnRBY2NvdW50O1xuICBjb25zdCBbdG9rZW5JZCxzZXRUb2tlbklkXT11c2VTdGF0ZTxzdHJpbmc+KCcweCcpO1xuICBjb25zdCBbZmlsbEFtb3VudCwgc2V0RmlsbEFtb3VudF09dXNlU3RhdGU8c3RyaW5nPihcIjB4MFwiKTtcblxuICB1c2VFZmZlY3QoICgpID0+IHtcbiAgICBpZighd2luZG93LmV0aGVyZXVtKSByZXR1cm5cbiAgICBpZighY3VycmVudEFjY291bnQpIHJldHVyblxuICB9LCBbY3VycmVudEFjY291bnRdKVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGZpbGxBc2soZXZlbnQ6UmVhY3QuRm9ybUV2ZW50KSB7XG4gICAgaWYoIXdpbmRvdy5ldGhlcmV1bSkgcmV0dXJuXG4gICAgaWYoIWN1cnJlbnRBY2NvdW50KSByZXR1cm5cbiAgICBjb25zdCBwcm92aWRlciA9IG5ldyBldGhlcnMucHJvdmlkZXJzLldlYjNQcm92aWRlcih3aW5kb3cuZXRoZXJldW0pXG4gICAgY29uc3Qgc2lnbmVyID0gcHJvdmlkZXIuZ2V0U2lnbmVyKClcbiAgICBjb25zdCBjb250cmFjdDpDb250cmFjdCA9IG5ldyBldGhlcnMuQ29udHJhY3QoYWRkcmVzc0NvbnRyYWN0LCBhYmkuYWJpLCBzaWduZXIpXG5cbiAgICBjb25zdCBhc2tNb2R1bGVDb250cmFjdCA9IEFza3NWMTFfX2ZhY3RvcnkuY29ubmVjdChyaW5rZWJ5Wm9yYUFkZHJlc3Nlcy5Bc2tzVjFfMSwgc2lnbmVyKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBjb25zdCBmaW5kZXIgPSBldGhlcnMuY29uc3RhbnRzLkFkZHJlc3NaZXJvO1xuICAgIGNvbnN0IGN1cnJlbmN5ID0gZXRoZXJzLmNvbnN0YW50cy5BZGRyZXNzWmVybztcbiAgICBjb25zdCB0eCA9IGF3YWl0IGFza01vZHVsZUNvbnRyYWN0LmZpbGxBc2soXG4gICAgICBhZGRyZXNzQ29udHJhY3QsXG4gICAgICB0b2tlbklkLFxuICAgICAgY3VycmVuY3ksIC8vIGV0aCBzYWxlXG4gICAgICBmaWxsQW1vdW50LFxuICAgICAgZmluZGVyXG4gICAgKTtcblxuICAgIGNvbnNvbGUubG9nKGBUcmFuc2FjdGlvblJlc3BvbnNlIFRYIGhhc2g6ICR7dHguaGFzaH1gKTtcbiAgICBjb25zdCByZWNlaXB0ID0gYXdhaXQgdHgud2FpdCgpO1xuICAgIGNvbnNvbGUubG9nKFwidHJhbnNmZXIgcmVjZWlwdFwiLHJlY2VpcHQpO1xuICB9XG5cbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKHRva2VuSWQ6c3RyaW5nKSA9PiB7XG4gICAgaWYgKHRva2VuSWQgIT09IFwiXCIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRva2VuSWQgPSBldGhlcnMuQmlnTnVtYmVyLmZyb20odG9rZW5JZCkudG9IZXhTdHJpbmcoKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICB0b2tlbklkID0gXCJcIlxuICAgICAgfVxuICAgIH1cbiAgICBzZXRUb2tlbklkKHRva2VuSWQpO1xuICB9XG4gIGNvbnN0IGhhbmRsZUZpbGxBbW91bnRDaGFuZ2UgPSAoZmlsbEFtb3VudDpzdHJpbmcpID0+IHtcbiAgICBpZiAoZmlsbEFtb3VudCAhPT0gXCJcIikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgd2VpUHJpY2UgPSAxZTE4ICogcGFyc2VGbG9hdChmaWxsQW1vdW50KTtcbiAgICAgICAgZmlsbEFtb3VudCA9IGV0aGVycy5CaWdOdW1iZXIuZnJvbSh3ZWlQcmljZS50b1N0cmluZygpKS50b0hleFN0cmluZygpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIGZpbGxBbW91bnQgPSBcIlwiXG4gICAgICB9XG4gICAgfVxuICAgIHNldEZpbGxBbW91bnQoZmlsbEFtb3VudCk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxmb3JtIG9uU3VibWl0PXtmaWxsQXNrfT5cbiAgICA8Rm9ybUNvbnRyb2w+XG4gICAgPEZvcm1MYWJlbCBodG1sRm9yPSd0b2tlbklkJz5Ub2tlbklkOiA8L0Zvcm1MYWJlbD5cbiAgICA8SW5wdXQgaWQ9XCJ0b2tlbmlkXCIgdHlwZT1cInRleHRcIiByZXF1aXJlZCBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZShlLnRhcmdldC52YWx1ZSl9Lz5cbiAgICA8Rm9ybUxhYmVsIGh0bWxGb3I9J2ZpbGxBbW91bnQnPkZpbGwgQW1vdW50OiA8L0Zvcm1MYWJlbD5cbiAgICA8TnVtYmVySW5wdXQgZGVmYXVsdFZhbHVlPXtmaWxsQW1vdW50fSBtaW49ezAuMDAwMDAwMDF9IG9uQ2hhbmdlPXtoYW5kbGVGaWxsQW1vdW50Q2hhbmdlfT5cbiAgICAgIDxOdW1iZXJJbnB1dEZpZWxkIC8+XG4gICAgPC9OdW1iZXJJbnB1dD5cblxuICAgIDxCdXR0b24gdHlwZT1cInN1Ym1pdFwiIGlzRGlzYWJsZWQ9eyFjdXJyZW50QWNjb3VudH0+e1wiRmlsbCBBc2tcIn08L0J1dHRvbj5cbiAgICA8L0Zvcm1Db250cm9sPlxuICAgIDwvZm9ybT5cbiAgKVxufVxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJCdXR0b24iLCJJbnB1dCIsIk51bWJlcklucHV0IiwiTnVtYmVySW5wdXRGaWVsZCIsIkZvcm1Db250cm9sIiwiRm9ybUxhYmVsIiwiZXRoZXJzIiwiYWJpIiwiQXNrc1YxMV9fZmFjdG9yeSIsInJpbmtlYnlab3JhQWRkcmVzc2VzIiwiZXJjNzIxVHJhbnNmZXJIZWxwZXJBZGRyZXNzIiwiRVJDNzIxVHJhbnNmZXJIZWxwZXIiLCJ6b3JhTW9kdWxlQWRkcmVzc2VzIiwiQXNrc1YxXzEiLCJPZmZlcnNWMSIsImZvcm1hdHRlciIsIkludGwiLCJOdW1iZXJGb3JtYXQiLCJtaW5pbXVtRnJhY3Rpb25EaWdpdHMiLCJtYXhpbXVtRnJhY3Rpb25EaWdpdHMiLCJmb3JtYXRCYWxhbmNlIiwiYmFsYW5jZSIsImZvcm1hdCIsInBhcnNlRmxvYXQiLCJCaWdOdW1iZXIiLCJmcm9tIiwidG9IZXhTdHJpbmciLCJGaWxsQXNrIiwicHJvcHMiLCJhZGRyZXNzQ29udHJhY3QiLCJjdXJyZW50QWNjb3VudCIsInRva2VuSWQiLCJzZXRUb2tlbklkIiwiZmlsbEFtb3VudCIsInNldEZpbGxBbW91bnQiLCJ3aW5kb3ciLCJldGhlcmV1bSIsImZpbGxBc2siLCJldmVudCIsInByb3ZpZGVyIiwic2lnbmVyIiwiY29udHJhY3QiLCJhc2tNb2R1bGVDb250cmFjdCIsImZpbmRlciIsImN1cnJlbmN5IiwidHgiLCJyZWNlaXB0IiwicHJvdmlkZXJzIiwiV2ViM1Byb3ZpZGVyIiwiZ2V0U2lnbmVyIiwiQ29udHJhY3QiLCJjb25uZWN0IiwicHJldmVudERlZmF1bHQiLCJjb25zdGFudHMiLCJBZGRyZXNzWmVybyIsImNvbnNvbGUiLCJsb2ciLCJoYXNoIiwid2FpdCIsImhhbmRsZUNoYW5nZSIsImhhbmRsZUZpbGxBbW91bnRDaGFuZ2UiLCJ3ZWlQcmljZSIsInRvU3RyaW5nIiwiZm9ybSIsIm9uU3VibWl0IiwiaHRtbEZvciIsImlkIiwidHlwZSIsInJlcXVpcmVkIiwib25DaGFuZ2UiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJkZWZhdWx0VmFsdWUiLCJtaW4iLCJpc0Rpc2FibGVkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/FillAsk.tsx\n");

/***/ })

});