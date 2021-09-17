function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src-app-pages-reset-password-reset-password-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/reset-password/reset-password.page.html":
  /*!*****************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/reset-password/reset-password.page.html ***!
    \*****************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPagesResetPasswordResetPasswordPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<!--\n  Generated template for the ResetPasswordPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-toolbar>\n    <ion-title>reset-password</ion-title>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content class=\"ion-padding\">\n\n</ion-content>\n";
    /***/
  },

  /***/
  "./src/app/pages/reset-password/reset-password.module.ts":
  /*!***************************************************************!*\
    !*** ./src/app/pages/reset-password/reset-password.module.ts ***!
    \***************************************************************/

  /*! exports provided: ResetPasswordPageModule */

  /***/
  function srcAppPagesResetPasswordResetPasswordModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ResetPasswordPageModule", function () {
      return ResetPasswordPageModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
    /* harmony import */


    var _components_components_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../components/components.module */
    "./src/app/components/components.module.ts");
    /* harmony import */


    var _reset_password_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./reset-password.page */
    "./src/app/pages/reset-password/reset-password.page.ts");

    var routes = [{
      path: "",
      component: _reset_password_page__WEBPACK_IMPORTED_MODULE_7__["ResetPasswordPage"]
    }];

    var ResetPasswordPageModule = function ResetPasswordPageModule() {
      _classCallCheck(this, ResetPasswordPageModule);
    };

    ResetPasswordPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"], _components_components_module__WEBPACK_IMPORTED_MODULE_6__["ComponentsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)],
      declarations: [_reset_password_page__WEBPACK_IMPORTED_MODULE_7__["ResetPasswordPage"]],
      exports: [_reset_password_page__WEBPACK_IMPORTED_MODULE_7__["ResetPasswordPage"]]
    })], ResetPasswordPageModule);
    /***/
  },

  /***/
  "./src/app/pages/reset-password/reset-password.page.scss":
  /*!***************************************************************!*\
    !*** ./src/app/pages/reset-password/reset-password.page.scss ***!
    \***************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPagesResetPasswordResetPasswordPageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3Jlc2V0LXBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkLnBhZ2Uuc2NzcyJ9 */";
    /***/
  },

  /***/
  "./src/app/pages/reset-password/reset-password.page.ts":
  /*!*************************************************************!*\
    !*** ./src/app/pages/reset-password/reset-password.page.ts ***!
    \*************************************************************/

  /*! exports provided: ResetPasswordPage */

  /***/
  function srcAppPagesResetPasswordResetPasswordPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ResetPasswordPage", function () {
      return ResetPasswordPage;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");

    var ResetPasswordPage = /*#__PURE__*/function () {
      function ResetPasswordPage(route, activatedRoute) {
        _classCallCheck(this, ResetPasswordPage);

        this.route = route;
        this.activatedRoute = activatedRoute;
        this.userInput = {};
        this.errors = [];
        this.userEmail = activatedRoute.snapshot.paramMap.get("email");
        this.userToken = activatedRoute.snapshot.paramMap.get("token");
      }

      _createClass(ResetPasswordPage, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "submitReset",
        value: function submitReset() {//  if ( this.validateInput() )
          // authservice.sendResetPost
          //    .subscribe(data => {
          //          launchtoast;
          //          set the currentUser stuff to true and log person in.
          //        },
          //        ( error ) => {
          //        'there was a problem'
          //      })
        }
      }, {
        key: "validateInput",
        value: function validateInput() {
          if (!this.userInput.passwd) {
            this.errors.push("passwd");
          }

          if (!this.userInput.passwd2) {
            this.errors.push("passwd2");
          }

          if (this.userInput.passwd && this.userInput.passwd2 && this.userInput.passwd !== this.userInput.passwd2) {
            this.errors.push("no_match");
          }

          if (this.errors.length == 0) {//authservice.validatePasswordStrength
            // { this.errors.push('invalid')}
          }
        }
      }]);

      return ResetPasswordPage;
    }();

    ResetPasswordPage.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }];
    };

    ResetPasswordPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: "reset-password",
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./reset-password.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/reset-password/reset-password.page.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./reset-password.page.scss */
      "./src/app/pages/reset-password/reset-password.page.scss"))["default"]]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])], ResetPasswordPage);
    /***/
  }
}]);
//# sourceMappingURL=src-app-pages-reset-password-reset-password-module-es5.js.map