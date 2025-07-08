/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/manifest.webmanifest/route";
exports.ids = ["app/manifest.webmanifest/route"];
exports.modules = {

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fmanifest.webmanifest%2Froute&page=%2Fmanifest.webmanifest%2Froute&appPaths=&pagePath=private-next-app-dir%2Fmanifest.ts&appDir=%2FUsers%2Ftundergod%2FCoding%2FWebsite-Japan%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ftundergod%2FCoding%2FWebsite-Japan&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fmanifest.webmanifest%2Froute&page=%2Fmanifest.webmanifest%2Froute&appPaths=&pagePath=private-next-app-dir%2Fmanifest.ts&appDir=%2FUsers%2Ftundergod%2FCoding%2FWebsite-Japan%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ftundergod%2FCoding%2FWebsite-Japan&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_metadata_route_loader_filePath_2FUsers_2Ftundergod_2FCoding_2FWebsite_Japan_2Fsrc_2Fapp_2Fmanifest_ts_isDynamicRouteExtension_1_next_metadata_route___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-metadata-route-loader?filePath=%2FUsers%2Ftundergod%2FCoding%2FWebsite-Japan%2Fsrc%2Fapp%2Fmanifest.ts&isDynamicRouteExtension=1!?__next_metadata_route__ */ \"(rsc)/./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?filePath=%2FUsers%2Ftundergod%2FCoding%2FWebsite-Japan%2Fsrc%2Fapp%2Fmanifest.ts&isDynamicRouteExtension=1!?__next_metadata_route__\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/manifest.webmanifest/route\",\n        pathname: \"/manifest.webmanifest\",\n        filename: \"manifest\",\n        bundlePath: \"app/manifest.webmanifest/route\"\n    },\n    resolvedPagePath: \"next-metadata-route-loader?filePath=%2FUsers%2Ftundergod%2FCoding%2FWebsite-Japan%2Fsrc%2Fapp%2Fmanifest.ts&isDynamicRouteExtension=1!?__next_metadata_route__\",\n    nextConfigOutput,\n    userland: next_metadata_route_loader_filePath_2FUsers_2Ftundergod_2FCoding_2FWebsite_Japan_2Fsrc_2Fapp_2Fmanifest_ts_isDynamicRouteExtension_1_next_metadata_route___WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZtYW5pZmVzdC53ZWJtYW5pZmVzdCUyRnJvdXRlJnBhZ2U9JTJGbWFuaWZlc3Qud2VibWFuaWZlc3QlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZtYW5pZmVzdC50cyZhcHBEaXI9JTJGVXNlcnMlMkZ0dW5kZXJnb2QlMkZDb2RpbmclMkZXZWJzaXRlLUphcGFuJTJGc3JjJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRnR1bmRlcmdvZCUyRkNvZGluZyUyRldlYnNpdGUtSmFwYW4maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzhHO0FBQzNMO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJuZXh0LW1ldGFkYXRhLXJvdXRlLWxvYWRlcj9maWxlUGF0aD0lMkZVc2VycyUyRnR1bmRlcmdvZCUyRkNvZGluZyUyRldlYnNpdGUtSmFwYW4lMkZzcmMlMkZhcHAlMkZtYW5pZmVzdC50cyZpc0R5bmFtaWNSb3V0ZUV4dGVuc2lvbj0xIT9fX25leHRfbWV0YWRhdGFfcm91dGVfX1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9tYW5pZmVzdC53ZWJtYW5pZmVzdC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvbWFuaWZlc3Qud2VibWFuaWZlc3RcIixcbiAgICAgICAgZmlsZW5hbWU6IFwibWFuaWZlc3RcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvbWFuaWZlc3Qud2VibWFuaWZlc3Qvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJuZXh0LW1ldGFkYXRhLXJvdXRlLWxvYWRlcj9maWxlUGF0aD0lMkZVc2VycyUyRnR1bmRlcmdvZCUyRkNvZGluZyUyRldlYnNpdGUtSmFwYW4lMkZzcmMlMkZhcHAlMkZtYW5pZmVzdC50cyZpc0R5bmFtaWNSb3V0ZUV4dGVuc2lvbj0xIT9fX25leHRfbWV0YWRhdGFfcm91dGVfX1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fmanifest.webmanifest%2Froute&page=%2Fmanifest.webmanifest%2Froute&appPaths=&pagePath=private-next-app-dir%2Fmanifest.ts&appDir=%2FUsers%2Ftundergod%2FCoding%2FWebsite-Japan%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ftundergod%2FCoding%2FWebsite-Japan&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?filePath=%2FUsers%2Ftundergod%2FCoding%2FWebsite-Japan%2Fsrc%2Fapp%2Fmanifest.ts&isDynamicRouteExtension=1!?__next_metadata_route__":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?filePath=%2FUsers%2Ftundergod%2FCoding%2FWebsite-Japan%2Fsrc%2Fapp%2Fmanifest.ts&isDynamicRouteExtension=1!?__next_metadata_route__ ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _Users_tundergod_Coding_Website_Japan_src_app_manifest_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/app/manifest.ts */ \"(rsc)/./src/app/manifest.ts\");\n/* harmony import */ var next_dist_build_webpack_loaders_metadata_resolve_route_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/webpack/loaders/metadata/resolve-route-data */ \"(rsc)/./node_modules/next/dist/build/webpack/loaders/metadata/resolve-route-data.js\");\n/* harmony import */ var next_dist_build_webpack_loaders_metadata_resolve_route_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_build_webpack_loaders_metadata_resolve_route_data__WEBPACK_IMPORTED_MODULE_2__);\n/* dynamic asset route */\n\n\n\n\nconst contentType = \"application/manifest+json\"\nconst fileType = \"manifest\"\n\n\n  if (typeof _Users_tundergod_Coding_Website_Japan_src_app_manifest_ts__WEBPACK_IMPORTED_MODULE_1__[\"default\"] !== 'function') {\n    throw new Error('Default export is missing in \"/Users/tundergod/Coding/Website-Japan/src/app/manifest.ts\"')\n  }\n  \n\n\nasync function GET() {\n  const data = await (0,_Users_tundergod_Coding_Website_Japan_src_app_manifest_ts__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()\n  const content = (0,next_dist_build_webpack_loaders_metadata_resolve_route_data__WEBPACK_IMPORTED_MODULE_2__.resolveRouteData)(data, fileType)\n\n  return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(content, {\n    headers: {\n      'Content-Type': contentType,\n      'Cache-Control': \"public, max-age=0, must-revalidate\",\n    },\n  })\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LW1ldGFkYXRhLXJvdXRlLWxvYWRlci5qcz9maWxlUGF0aD0lMkZVc2VycyUyRnR1bmRlcmdvZCUyRkNvZGluZyUyRldlYnNpdGUtSmFwYW4lMkZzcmMlMkZhcHAlMkZtYW5pZmVzdC50cyZpc0R5bmFtaWNSb3V0ZUV4dGVuc2lvbj0xIT9fX25leHRfbWV0YWRhdGFfcm91dGVfXyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQzBDO0FBQ3FDO0FBQ2U7O0FBRTlGO0FBQ0E7OztBQUdBLGFBQWEsaUdBQU87QUFDcEI7QUFDQTtBQUNBOzs7QUFHTztBQUNQLHFCQUFxQixxR0FBTztBQUM1QixrQkFBa0IsNkdBQWdCOztBQUVsQyxhQUFhLHFEQUFZO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0giLCJzb3VyY2VzIjpbIj9fX25leHRfbWV0YWRhdGFfcm91dGVfXyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBkeW5hbWljIGFzc2V0IHJvdXRlICovXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcbmltcG9ydCBoYW5kbGVyIGZyb20gXCIvVXNlcnMvdHVuZGVyZ29kL0NvZGluZy9XZWJzaXRlLUphcGFuL3NyYy9hcHAvbWFuaWZlc3QudHNcIlxuaW1wb3J0IHsgcmVzb2x2ZVJvdXRlRGF0YSB9IGZyb20gJ25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbWV0YWRhdGEvcmVzb2x2ZS1yb3V0ZS1kYXRhJ1xuXG5jb25zdCBjb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vbWFuaWZlc3QranNvblwiXG5jb25zdCBmaWxlVHlwZSA9IFwibWFuaWZlc3RcIlxuXG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdEZWZhdWx0IGV4cG9ydCBpcyBtaXNzaW5nIGluIFwiL1VzZXJzL3R1bmRlcmdvZC9Db2RpbmcvV2Vic2l0ZS1KYXBhbi9zcmMvYXBwL21hbmlmZXN0LnRzXCInKVxuICB9XG4gIFxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBoYW5kbGVyKClcbiAgY29uc3QgY29udGVudCA9IHJlc29sdmVSb3V0ZURhdGEoZGF0YSwgZmlsZVR5cGUpXG5cbiAgcmV0dXJuIG5ldyBOZXh0UmVzcG9uc2UoY29udGVudCwge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiBjb250ZW50VHlwZSxcbiAgICAgICdDYWNoZS1Db250cm9sJzogXCJwdWJsaWMsIG1heC1hZ2U9MCwgbXVzdC1yZXZhbGlkYXRlXCIsXG4gICAgfSxcbiAgfSlcbn1cbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?filePath=%2FUsers%2Ftundergod%2FCoding%2FWebsite-Japan%2Fsrc%2Fapp%2Fmanifest.ts&isDynamicRouteExtension=1!?__next_metadata_route__\n");

/***/ }),

/***/ "(rsc)/./src/app/manifest.ts":
/*!*****************************!*\
  !*** ./src/app/manifest.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ manifest)\n/* harmony export */ });\nfunction manifest() {\n    return {\n        name: 'Japan Travel Guide',\n        short_name: 'Japan Travel',\n        description: 'Comprehensive guide to travel across Japan',\n        start_url: '/',\n        display: 'standalone',\n        background_color: '#fdf9f9',\n        theme_color: '#eb5757',\n        icons: [\n            {\n                src: '/icon-192x192.png',\n                sizes: '192x192',\n                type: 'image/png'\n            },\n            {\n                src: '/icon-384x384.png',\n                sizes: '384x384',\n                type: 'image/png'\n            },\n            {\n                src: '/icon-512x512.png',\n                sizes: '512x512',\n                type: 'image/png'\n            },\n            {\n                src: '/icon.svg',\n                sizes: 'any',\n                type: 'image/svg+xml'\n            }\n        ],\n        lang: 'ja',\n        dir: 'ltr',\n        prefer_related_applications: false,\n        related_applications: [],\n        categories: [\n            'travel',\n            'tourism',\n            'japan'\n        ],\n        screenshots: [\n            {\n                src: '/screenshots/homepage.jpg',\n                sizes: '1080x1920',\n                type: 'image/jpeg',\n                form_factor: 'narrow',\n                label: 'Homepage of Japan Travel Guide'\n            },\n            {\n                src: '/screenshots/regions.jpg',\n                sizes: '1080x1920',\n                type: 'image/jpeg',\n                form_factor: 'narrow',\n                label: 'Regions of Japan'\n            }\n        ]\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL21hbmlmZXN0LnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFFZSxTQUFTQTtJQUN0QixPQUFPO1FBQ0xDLE1BQU07UUFDTkMsWUFBWTtRQUNaQyxhQUFhO1FBQ2JDLFdBQVc7UUFDWEMsU0FBUztRQUNUQyxrQkFBa0I7UUFDbEJDLGFBQWE7UUFDYkMsT0FBTztZQUNMO2dCQUNFQyxLQUFLO2dCQUNMQyxPQUFPO2dCQUNQQyxNQUFNO1lBQ1I7WUFDQTtnQkFDRUYsS0FBSztnQkFDTEMsT0FBTztnQkFDUEMsTUFBTTtZQUNSO1lBQ0E7Z0JBQ0VGLEtBQUs7Z0JBQ0xDLE9BQU87Z0JBQ1BDLE1BQU07WUFDUjtZQUNBO2dCQUNFRixLQUFLO2dCQUNMQyxPQUFPO2dCQUNQQyxNQUFNO1lBQ1I7U0FDRDtRQUNEQyxNQUFNO1FBQ05DLEtBQUs7UUFDTEMsNkJBQTZCO1FBQzdCQyxzQkFBc0IsRUFBRTtRQUN4QkMsWUFBWTtZQUFDO1lBQVU7WUFBVztTQUFRO1FBQzFDQyxhQUFhO1lBQ1g7Z0JBQ0VSLEtBQUs7Z0JBQ0xDLE9BQU87Z0JBQ1BDLE1BQU07Z0JBQ05PLGFBQWE7Z0JBQ2JDLE9BQU87WUFDVDtZQUNBO2dCQUNFVixLQUFLO2dCQUNMQyxPQUFPO2dCQUNQQyxNQUFNO2dCQUNOTyxhQUFhO2dCQUNiQyxPQUFPO1lBQ1Q7U0FDRDtJQUNIO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy90dW5kZXJnb2QvQ29kaW5nL1dlYnNpdGUtSmFwYW4vc3JjL2FwcC9tYW5pZmVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXRhZGF0YVJvdXRlIH0gZnJvbSAnbmV4dCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFuaWZlc3QoKTogTWV0YWRhdGFSb3V0ZS5NYW5pZmVzdCB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ0phcGFuIFRyYXZlbCBHdWlkZScsXG4gICAgc2hvcnRfbmFtZTogJ0phcGFuIFRyYXZlbCcsXG4gICAgZGVzY3JpcHRpb246ICdDb21wcmVoZW5zaXZlIGd1aWRlIHRvIHRyYXZlbCBhY3Jvc3MgSmFwYW4nLFxuICAgIHN0YXJ0X3VybDogJy8nLFxuICAgIGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcbiAgICBiYWNrZ3JvdW5kX2NvbG9yOiAnI2ZkZjlmOScsXG4gICAgdGhlbWVfY29sb3I6ICcjZWI1NzU3JyxcbiAgICBpY29uczogW1xuICAgICAge1xuICAgICAgICBzcmM6ICcvaWNvbi0xOTJ4MTkyLnBuZycsXG4gICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3JjOiAnL2ljb24tMzg0eDM4NC5wbmcnLFxuICAgICAgICBzaXplczogJzM4NHgzODQnLFxuICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHNyYzogJy9pY29uLTUxMng1MTIucG5nJyxcbiAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzcmM6ICcvaWNvbi5zdmcnLFxuICAgICAgICBzaXplczogJ2FueScsXG4gICAgICAgIHR5cGU6ICdpbWFnZS9zdmcreG1sJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBsYW5nOiAnamEnLFxuICAgIGRpcjogJ2x0cicsXG4gICAgcHJlZmVyX3JlbGF0ZWRfYXBwbGljYXRpb25zOiBmYWxzZSxcbiAgICByZWxhdGVkX2FwcGxpY2F0aW9uczogW10sXG4gICAgY2F0ZWdvcmllczogWyd0cmF2ZWwnLCAndG91cmlzbScsICdqYXBhbiddLFxuICAgIHNjcmVlbnNob3RzOiBbXG4gICAgICB7XG4gICAgICAgIHNyYzogJy9zY3JlZW5zaG90cy9ob21lcGFnZS5qcGcnLFxuICAgICAgICBzaXplczogJzEwODB4MTkyMCcsXG4gICAgICAgIHR5cGU6ICdpbWFnZS9qcGVnJyxcbiAgICAgICAgZm9ybV9mYWN0b3I6ICduYXJyb3cnLFxuICAgICAgICBsYWJlbDogJ0hvbWVwYWdlIG9mIEphcGFuIFRyYXZlbCBHdWlkZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHNyYzogJy9zY3JlZW5zaG90cy9yZWdpb25zLmpwZycsXG4gICAgICAgIHNpemVzOiAnMTA4MHgxOTIwJyxcbiAgICAgICAgdHlwZTogJ2ltYWdlL2pwZWcnLFxuICAgICAgICBmb3JtX2ZhY3RvcjogJ25hcnJvdycsXG4gICAgICAgIGxhYmVsOiAnUmVnaW9ucyBvZiBKYXBhbidcbiAgICAgIH1cbiAgICBdXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJtYW5pZmVzdCIsIm5hbWUiLCJzaG9ydF9uYW1lIiwiZGVzY3JpcHRpb24iLCJzdGFydF91cmwiLCJkaXNwbGF5IiwiYmFja2dyb3VuZF9jb2xvciIsInRoZW1lX2NvbG9yIiwiaWNvbnMiLCJzcmMiLCJzaXplcyIsInR5cGUiLCJsYW5nIiwiZGlyIiwicHJlZmVyX3JlbGF0ZWRfYXBwbGljYXRpb25zIiwicmVsYXRlZF9hcHBsaWNhdGlvbnMiLCJjYXRlZ29yaWVzIiwic2NyZWVuc2hvdHMiLCJmb3JtX2ZhY3RvciIsImxhYmVsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/manifest.ts\n");

/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fmanifest.webmanifest%2Froute&page=%2Fmanifest.webmanifest%2Froute&appPaths=&pagePath=private-next-app-dir%2Fmanifest.ts&appDir=%2FUsers%2Ftundergod%2FCoding%2FWebsite-Japan%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ftundergod%2FCoding%2FWebsite-Japan&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();