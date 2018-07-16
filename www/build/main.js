webpackJsonp([7],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaqsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FaqsPage = /** @class */ (function () {
    function FaqsPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
    }
    FaqsPage.prototype.getFaqInfo = function () {
        var _this = this;
        this.http.get('assets/json/faq.json')
            .subscribe(function (data) {
            console.log(data);
            _this.faqInfoStandalone = _this.filterAppType("standalone", data);
        });
    };
    FaqsPage.prototype.getFeedbackContacts = function () {
        var _this = this;
        this.http.get('assets/json/feedback_contacts.json')
            .subscribe(function (data) { return _this.feedbackContacts = data; });
    };
    // Each type of app will have a different set of FAQ questions
    FaqsPage.prototype.filterAppType = function (type, arr) {
        return arr.filter(function (object) { return object.help_type == type || !object.help_type; });
    };
    FaqsPage.prototype.ionViewDidLoad = function () {
        this.getFaqInfo();
        this.getFeedbackContacts();
    };
    FaqsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-faqs',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/faqs/faqs.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>faqs</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n	<contacts-dropdown [contacts]="feedbackContacts">\n  </contacts-dropdown>\n\n	\n  <div id="faq-questions-container" *ngFor="let faq of faqInfoStandalone">\n    <faq-dropdown [faq]="faq">\n    </faq-dropdown>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/faqs/faqs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], FaqsPage);
    return FaqsPage;
}());

//# sourceMappingURL=faqs.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Page_3Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the Page_3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Page_3Page = /** @class */ (function () {
    function Page_3Page(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    Page_3Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Page_3Page');
    };
    Page_3Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-page-3',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/page-3/page-3.html"*/'<!--\n  Generated template for the Page_3Page page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div class="toolbar-class">\n  <div>\n    <ion-header>\n      <ion-navbar color ="dark" hideBackButton="true">\n        <div class = "container-toolbar">\n          <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n          <div class = "container-tbbuttons">\n            <button ion-button color="dark">\n                Assessment\n            </button>\n            <button ion-button color="dark" (click)="showPopover($event)">\n                Help\n            </button>\n          </div>\n        </div>\n        <hr>\n        <div class="subheader">\n          <div><p>Technology Industrial Base / Industrial Base </p></div>\n          <div style="margin-right:20px">\n            <p>Target MRL: {{targetMRL}}| Target Date: Date</p>\n            <p><u>Show Assessment Scope</u></p>\n          </div>\n        </div>\n      </ion-navbar>\n    </ion-header>\n  </div>\n</div>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/page-3/page-3.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], Page_3Page);
    return Page_3Page;
}());

//# sourceMappingURL=page-3.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_survey_angular__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_survey_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_survey_angular__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import targetMRL1 from "json!../../assets/json/targetMRL1.json";
/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QuestionsPage = /** @class */ (function () {
    function QuestionsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.survey = {
            "showNavigationButtons": false,
            "showQuestionNumbers": "off",
            "pages": [
                {
                    "name": "Technology Maturity",
                    "elements": [
                        {
                            "type": "dropdown",
                            "name": "Technology Maturity",
                            "title": "Is the Technology Readiness at TRL 1 or greater?",
                            "choices": [
                                "Yes",
                                "No",
                                "N/A",
                            ]
                        },
                    ]
                },
                {
                    "name": "Design",
                    "elements": [
                        {
                            "type": "dropdown",
                            "name": "Desing Maturity",
                            "title": "Have manufacturing research opportunities been identified?",
                            "choices": [
                                "Yes",
                                "No",
                                "N/A",
                            ]
                        },
                    ]
                },
                {
                    "name": "Cost & Funding",
                    "elements": [
                        {
                            "type": "dropdown",
                            "name": "Cost Analysis",
                            "title": "Have manufacturing cost implications been identified?",
                            "choices": [
                                "Yes",
                                "No",
                                "N/A",
                            ]
                        },
                    ]
                },
                {
                    "name": "Cost & Funding",
                    "elements": [
                        {
                            "type": "dropdown",
                            "name": "Manufacturing Investment Budget",
                            "title": "Have potential investments been identified?",
                            "choices": [
                                "Yes",
                                "No",
                                "N/A",
                            ]
                        },
                    ]
                },
                {
                    "name": "Materials",
                    "elements": [
                        {
                            "type": "dropdown",
                            "name": "Maturity",
                            "title": "Have material properties been identified for research?",
                            "choices": [
                                "Yes",
                                "No",
                                "N/A",
                            ]
                        },
                    ]
                }
            ]
        };
        this.surveyJS = new __WEBPACK_IMPORTED_MODULE_2_survey_angular__["Model"](this.survey);
        this.surveyValueChanged = function (sender, options) {
            console.log("hek");
            var el = document.getElementById(options.name);
            if (el) {
                el.value = options.value;
            }
        };
        this.mainTitle = this.survey.pages[this.surveyJS.currentPageNo].name;
        this.subTitle = this.survey.pages[this.surveyJS.currentPageNo].elements[0].name;
    }
    QuestionsPage.prototype.surveyChange = function () {
        this.value = this.surveyJS.getValue(this.survey.pages[this.surveyJS.currentPageNo].elements[0].name);
        this.mainTitle = this.survey.pages[this.surveyJS.currentPageNo].name;
        this.subTitle = this.survey.pages[this.surveyJS.currentPageNo].elements[0].name;
    };
    QuestionsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QuestionsPage');
    };
    QuestionsPage.prototype.sendDataToServer = function (survey) {
        var resultAsString = JSON.stringify(survey.data);
        alert(resultAsString); //send Ajax request to your web server.
    };
    QuestionsPage.prototype.ngOnInit = function () {
        this.surveyJS.onComplete.add(this.sendDataToServer);
        __WEBPACK_IMPORTED_MODULE_2_survey_angular__["SurveyNG"].render("surveyElement", { model: this.surveyJS });
    };
    QuestionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-questions',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/questions/questions.html"*/'<!--\n  Generated template for the QuestionsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div class="toolbar-class">\n    <div>\n      <ion-header>\n        <ion-navbar color ="dark" hideBackButton="true">\n          <div class = "container-toolbar">\n            <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n            <div class = "container-tbbuttons">\n              <button ion-button color="dark">\n                  Assessment\n              </button>\n              <button ion-button color="dark" (click)="showPopover($event)">\n                  Help\n              </button>\n            </div>\n          </div>\n          <hr>\n          <div class="subheader">\n            <div><p>{{this.mainTitle}} / {{this.subTitle}}</p></div>\n            <div style="margin-right:20px">\n              <p>Target MRL: {{targetMRL}}| Target Date: Date</p>\n              <p><u>Show Assessment Scope</u></p>\n            </div>\n          </div>\n        </ion-navbar>\n      </ion-header>\n    </div>\n  </div>\n\n\n<ion-content padding>\n  <br><br><br><br><br><br><br><br><br><br>\n  <div class = "nav">\n    <div id=\'surveyElement\' class = "questions" (change)="surveyChange()">\n\n    </div>\n    <div style="margin-top:10px;">\n        <button ion-button color="buttonBlue" (click) = "this.surveyJS.prevPage()"><ion-icon name="arrow-dropleft"></ion-icon>Previous</button>\n        <button ion-button color="buttonBlue" (click) = "this.surveyJS.nextPage()">Next/Skip<ion-icon name="arrow-dropright"></ion-icon></button>\n    </div>\n  </div>\n\n  <div *ngIf="this.value == \'Yes\'" class = "yes">\n      <h6>Objective Evidence</h6>\n      <textarea placeholder="Enter objective evidence here..."></textarea>\n      <h6>Assumptions</h6>\n      <textarea placeholder="Enter any ssumptions here..."></textarea>\n      <h6>Notes</h6>\n      <textarea placeholder="Enter notes here..."></textarea>\n      <div style="width:50%;margin:10px 0px 0px 0px;">\n        <button ion-button color="dark">Attatch File</button>\n      </div>\n    </div>\n  \n  \n  \n    <div *ngIf="value == \'No\'" class = "no">\n      <h3><b>ACTION PLAN</b></h3>\n      <div style="display:flex;flex-direction:row;justify-content:space-between;width:30%;height:60%;">      \n        <button >\n          <label style="color:#32db64;font-size:16px;" (click)="addPerson(who.value)"><b>Add Action Person</b></label>\n          <ion-icon name="add-circle" color = "secondary"></ion-icon>\n        </button>\n        <button>\n          <label style="color:#f53d3d;font-size:16px;" (click)="removePerson()"><b>Remove</b></label>\n          <ion-icon name="remove-circle" color = "danger"></ion-icon>\n        </button>\n      </div>\n      <br>\n      <br>\n      <div class="who-when">\n        <div style="display:flex; flex-direction:column">   \n          <li *ngFor = "let persons of actionPerson">\n            <pre>{{persons}}</pre>\n          </li>\n          <h6>Who</h6>\n          <input style="width: 200%;" #who>\n        </div>\n        <div style="display:flex; flex-direction:column">\n          <h6>When</h6>\n          <input type="date" style="height:100%;">\n        </div>\n      </div>\n      <h6>Risk</h6>\n      <div class="risk">\n        Technical<input type="checkbox"> \n        Cost<input type="checkbox"> \n        Schedule<input type="checkbox"> \n      </div>\n      <h6>What</h6>\n      <textarea placeholder="What needs to be done to meet this objective?"></textarea>\n      <h6>Reason</h6>\n      <textarea placeholder="Reason that criteria is not met..."></textarea>\n      <h6>Assumptions</h6>\n      <textarea placeholder="Enter any assumptions here..."></textarea>\n      <h6>Notes</h6>\n      <textarea placeholder="Enter notes here..."></textarea>\n      <div style="width:50%;margin:10px 0px 0px 0px;">\n          <button ion-button color="dark">Attatch File</button>\n      </div>\n    </div>\n  \n    <br><br>\n  \n    <div *ngIf="value == \'N/A\'" class = "na">\n      <h6>Documentation</h6>\n      <textarea placeholder="Document why this question is not applicable..."></textarea>\n      <hr>\n      <h6>Assumptions</h6>\n      <textarea placeholder="Enter any assumptions here..."></textarea>\n      <h6>Notes</h6>\n      <textarea placeholder="Enter notes here..."></textarea>\n      <div style="width:50%; margin:10px 0px 0px 0px;">\n        <button ion-button color="dark">Attatch File</button>\n      </div>\n    </div>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/questions/questions.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], QuestionsPage);
    return QuestionsPage;
}());

//# sourceMappingURL=questions.js.map

/***/ }),

/***/ 117:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 117;

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/acronyms/acronyms.module": [
		288,
		6
	],
	"../pages/definitions/definitions.module": [
		289,
		5
	],
	"../pages/faqs/faqs.module": [
		290,
		4
	],
	"../pages/page-2/page-2.module": [
		291,
		3
	],
	"../pages/page-3/page-3.module": [
		292,
		2
	],
	"../pages/questions/questions.module": [
		294,
		1
	],
	"../pages/review/review.module": [
		293,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 158;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__acronyms_acronyms__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__definitions_definitions__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_helpmenu_helpmenu__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__questions_questions__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, popOver) {
        this.navCtrl = navCtrl;
        this.popOver = popOver;
        this.acronymsPage = __WEBPACK_IMPORTED_MODULE_2__acronyms_acronyms__["a" /* AcronymsPage */];
        this.definitionsPage = __WEBPACK_IMPORTED_MODULE_3__definitions_definitions__["a" /* DefinitionsPage */];
        this.members = [];
    }
    HomePage.prototype.showPopover = function (myEvent) {
        var popoverClick = this.popOver.create(__WEBPACK_IMPORTED_MODULE_4__components_helpmenu_helpmenu__["a" /* HelpmenuComponent */], {}, { cssClass: 'help-menu' });
        popoverClick.present({
            ev: myEvent
        });
    };
    HomePage.prototype.addMember = function (nameIn, roleIn) {
        var newMember = { name: nameIn, role: roleIn };
        this.members.push(newMember);
    };
    HomePage.prototype.removeMember = function () {
        this.members.pop();
    };
    HomePage.prototype.targetMRLSelect = function (val) {
        console.log(val);
    };
    HomePage.prototype.page_2 = function (targetMRL) {
        console.log(targetMRL);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__questions_questions__["a" /* QuestionsPage */], {
            data: targetMRL
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/home/home.html"*/'<title>Docent</title>\n\n<div class="toolbar-class">\n  <div>\n    <ion-header>\n      <ion-navbar color ="dark" style="height:100px;">\n        <div class = "container-toolbar">\n          <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n          <div class = "container-tbbuttons">\n            <button ion-button color="dark">\n                Assessment\n            </button>\n            <button ion-button color="dark" (click)="showPopover($event)">\n                Help\n            </button>\n          </div>\n        </div>\n        <hr>\n      </ion-navbar>\n    </ion-header>\n  </div>\n</div>\n<ion-content padding>\n  <br>\n  <br>\n  <br>\n  <br>\n  <br>\n  <h1>Start New Assessment</h1>\n  <font color="grey">Use this option to start a new assessment</font>\n  <br><br>\n  <h6>Team Members</h6>\n  <form>\n    <div class="member-list">\n      <li *ngFor = "let member of members">\n        <pre>{{member.name}}:              {{member.role}}</pre>\n      </li>\n    </div>\n    <div class="members">\n      <div style="width:48%">\n      <input type="text" name="memName" placeholder = "Member Name" #memName>\n      </div>\n      <div class="member-role-button" style="width:48%">\n        <input type="text" name="memRole" placeholder = "Member Role" #memRole>\n        <div class = "buttons">\n            <button (click)="removeMember()">\n                <ion-icon name="remove-circle" color = "danger"></ion-icon>\n            </button>\n        </div>\n      </div>\n    </div>\n    <div class = "buttons">\n      <button (click)="addMember(memName.value,memRole.value)">\n          <ion-icon name="add-circle" color = "secondary"></ion-icon>\n      </button>\n    </div>\n  </form>\n  <div class = "mid-first-page">\n    <div class="scope">\n      <h6>Scope</h6>\n      <textarea name="scope" placeholder = "Enter Scope Here"></textarea>\n    </div>\n    <div class ="target-level-date">\n      <div class = "target-level">\n        <div style = "width:45%;">\n          <h6>Target MRL</h6>\n          <select name="targetMRL" (change)="targetMRLSelect(value);">\n            <option value="" disabled selected>Select One...</option>\n            <option value = "1">1</option>\n            <option value = "2">2</option>\n            <option value = "3">3</option>\n            <option value = "4">4</option>\n            <option value = "5">5</option>\n            <option value = "6">6</option>\n            <option value = "7">7</option>\n            <option value = "8">8</option>\n            <option value = "9">9</option>\n            <option value = "10">10</option>\n          </select>\n        </div>\n        <div style = "width:45%;">\n          <div style="display: flex;">\n            <h6>Level Switching</h6>\n            <button style="margin-top:-10px;">\n              <img src="../../assets/imgs/qmark.png" width="15" height="15">\n            </button>\n          </div>\n          <select>\n            <option value="" disabled selected>Select One...</option>\n            <option>On</option>\n            <option>Off</option>\n          </select>\n        </div>\n      </div>\n      <h6>Date to Achieve Target MRL</h6>\n      <input  type="date" name="dateAchieve" placeholder = "mm/dd/yyyy">\n    </div>\n  </div>\n  <div class = "bottom">\n    <div style="width:48%;height:100%;">\n      <h6>Location</h6>\n      <ion-input name="location" placeholder = "Enter Location"></ion-input>\n    </div>\n    <div style="width:48%;">\n      <h6>Deskbook Version</h6>\n      <select name="version">\n        <option value="" disabled selected>Select One...</option>\n        <option>2017</option>\n      </select>\n    </div>\n  </div>\n  <div class = "thread-start">\n    <div class = "choose-threads">\n      <button>\n        <img src="../../assets/imgs/if_icon-arrow-down.png" width="15" height="15">\n      </button>\n      <p><b>Choose Threads</b></p>\n      <button>\n        <img src="../../assets/imgs/qmark.png" width="15" height="15">\n      </button>\n    </div>\n    <div>\n      <button ion-button color ="buttonBlue" (click)="page_2(targetMRL)">\n        Start\n      </button>\n    </div>\n  </div>\n  <br><br>\n  <hr>\n  <br>\n  <div class="existing-assessment">\n    <div>\n      <h1>Continue Existing Assessment</h1>\n      <p>\n        Use this option to start working on an existing assessment. You will be<br> required to import your assessment\n        data\n      </p>\n    </div>\n    <div>\n      <button ion-button color ="buttonBlue">\n        Help Importing\n      </button>\n      <button ion-button color ="buttonBlue">\n        Open Assessment\n      </button>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* PopoverController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpmenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_acronyms_acronyms__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_definitions_definitions__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_faqs_faqs__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the HelpmenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var HelpmenuComponent = /** @class */ (function () {
    function HelpmenuComponent(navCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.acronymsPage = __WEBPACK_IMPORTED_MODULE_2__pages_acronyms_acronyms__["a" /* AcronymsPage */];
        this.definitionsPage = __WEBPACK_IMPORTED_MODULE_3__pages_definitions_definitions__["a" /* DefinitionsPage */];
        this.faqsPage = __WEBPACK_IMPORTED_MODULE_4__pages_faqs_faqs__["a" /* FaqsPage */];
    }
    HelpmenuComponent.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    HelpmenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'helpmenu',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/components/helpmenu/helpmenu.html"*/'<!-- TODO: style this to look more like the dropdown -->\n<!-- move the inline styles to the .scss -->\n<div style="display:flex;flex-direction:column;background-color:black">\n		\n		<button ion-button color="dark">\n			Criteria	\n		</button>\n		<button [navPush]="definitionsPage" ion-button color="dark">\n			Definitions\n		</button>\n		<button [navPush]="acronymsPage" ion-button color="dark">\n			Acronyms\n		</button>\n		<button [navPush]="faqsPage" ion-button color="dark">\n			FAQs\n		</button>\n</div>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/components/helpmenu/helpmenu.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */]])
    ], HelpmenuComponent);
    return HelpmenuComponent;
}());

//# sourceMappingURL=helpmenu.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Page_2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_popover_popover__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_3_page_3__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the Page_2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Page_2Page = /** @class */ (function () {
    function Page_2Page(navCtrl, navParams, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.slectorResponse = true;
        this.actionPerson = [];
        var targetMRL = navParams.get('data');
    }
    Page_2Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Page_2Page');
    };
    Page_2Page.prototype.addPerson = function (personIn) {
        console.log(personIn);
        this.actionPerson.push(personIn);
    };
    Page_2Page.prototype.removePerson = function () {
        this.actionPerson.pop();
    };
    Page_2Page.prototype.pageSelect = function (event) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__components_popover_popover__["a" /* PopoverComponent */]);
        popover.present({
            ev: event
        });
    };
    Page_2Page.prototype.back = function () {
        this.navCtrl.pop();
    };
    Page_2Page.prototype.next = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_3_page_3__["a" /* Page_3Page */]);
    };
    Page_2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-page-2',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/page-2/page-2.html"*/'<!--\n  Generated template for the Page_2Page page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div class="toolbar-class">\n  <div>\n    <ion-header>\n      <ion-navbar color ="dark" hideBackButton="true">\n        <div class = "container-toolbar">\n          <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n          <div class = "container-tbbuttons">\n            <button ion-button color="dark">\n                Assessment\n            </button>\n            <button ion-button color="dark" (click)="showPopover($event)">\n                Help\n            </button>\n          </div>\n        </div>\n        <hr>\n        <div class="subheader">\n          <div><p>Technology Maturity / Technology Maturity</p></div>\n          <div style="margin-right:20px">\n            <p>Target MRL: {{targetMRL}}| Target Date: Date</p>\n            <p><u>Show Assessment Scope</u></p>\n          </div>\n        </div>\n      </ion-navbar>\n    </ion-header>\n  </div>\n</div>\n\n<ion-content padding>\n  <!--\n    ## Stuff that kind of works\n    <button icon-only (click)="pageSelect($event)">\n      <ion-icon name="subway"></ion-icon>\n    </button>\n  -->\n  <br><br><br><br><br><br><br><br><br>\n  <div style="display:flex; justify-content:space-between">\n    <div>\n      <p style="color:grey">MRL FOR THIS QUESTION: TARGET_MRL</p>\n      <h1>Is this at a TRL of # or greater?</h1>\n      <p style="color:darkslateblue"><b>Show Explanation</b></p>\n    </div>\n    <div style="margin-top:10px;">\n      <button ion-button color="buttonBlue" (click) = "back()"><ion-icon name="arrow-dropleft"></ion-icon>Previous</button>\n      <button ion-button color="buttonBlue" (click) = "next()">Next/Skip<ion-icon name="arrow-dropright"></ion-icon></button>\n    </div>\n  </div>\n  <div class = "choose-one">\n    <h6>Answer</h6>\n      <select [(ngModel)]="choice" >\n        <option value=""disabled selected>Select One...</option>\n        <option value="yes">Yes</option>\n        <option value="no">No</option>\n        <option value="na">N/A</option>\n      </select>\n  </div>\n\n\n\n  <div *ngIf="choice == \'yes\'" class = "yes">\n    <h6>Objective Evidence</h6>\n    <textarea placeholder="Enter objective evidence here..."></textarea>\n    <h6>Assumptions</h6>\n    <textarea placeholder="Enter any ssumptions here..."></textarea>\n    <h6>Notes</h6>\n    <textarea placeholder="Enter notes here..."></textarea>\n    <div style="width:50%;margin:10px 0px 0px 0px;">\n      <button ion-button color="dark">Attatch File</button>\n    </div>\n  </div>\n\n\n\n  <div *ngIf="choice == \'no\'" class = "no">\n    <h3><b>ACTION PLAN</b></h3>\n    <div style="display:flex;flex-direction:row;justify-content:space-between;width:30%;height:60%;">      \n      <button >\n        <label style="color:#32db64;font-size:16px;" (click)="addPerson(who.value)"><b>Add Action Person</b></label>\n        <ion-icon name="add-circle" color = "secondary"></ion-icon>\n      </button>\n      <button>\n        <label style="color:#f53d3d;font-size:16px;" (click)="removePerson()"><b>Remove</b></label>\n        <ion-icon name="remove-circle" color = "danger"></ion-icon>\n      </button>\n    </div>\n    <br>\n    <br>\n    <div class="who-when">\n      <div style="display:flex; flex-direction:column">   \n        <li *ngFor = "let persons of actionPerson">\n          <pre>{{persons}}</pre>\n        </li>\n        <h6>Who</h6>\n        <input style="width: 200%;" #who>\n      </div>\n      <div style="display:flex; flex-direction:column">\n        <h6>When</h6>\n        <input type="date" style="height:100%;">\n      </div>\n    </div>\n    <h6>Risk</h6>\n    <div class="risk">\n      Technical<input type="checkbox"> \n      Cost<input type="checkbox"> \n      Schedule<input type="checkbox"> \n    </div>\n    <h6>What</h6>\n    <textarea placeholder="What needs to be done to meet this objective?"></textarea>\n    <h6>Reason</h6>\n    <textarea placeholder="Reason that criteria is not met..."></textarea>\n    <h6>Assumptions</h6>\n    <textarea placeholder="Enter any assumptions here..."></textarea>\n    <h6>Notes</h6>\n    <textarea placeholder="Enter notes here..."></textarea>\n    <div style="width:50%;margin:10px 0px 0px 0px;">\n        <button ion-button color="dark">Attatch File</button>\n    </div>\n  </div>\n\n\n\n  <div *ngIf="choice == \'na\'" class = "na">\n    <h6>Documentation</h6>\n    <textarea placeholder="Document why this question is not applicable..."></textarea>\n    <hr>\n    <h6>Assumptions</h6>\n    <textarea placeholder="Enter any assumptions here..."></textarea>\n    <h6>Notes</h6>\n    <textarea placeholder="Enter notes here..."></textarea>\n    <div style="width:50%; margin:10px 0px 0px 0px;">\n      <button ion-button color="dark">Attatch File</button>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/page-2/page-2.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* PopoverController */]])
    ], Page_2Page);
    return Page_2Page;
}());

//# sourceMappingURL=page-2.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReviewPage = /** @class */ (function () {
    function ReviewPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ReviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReviewPage');
    };
    ReviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-review',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/review/review.html"*/'<!--\n  Generated template for the ReviewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div class="toolbar-class">\n  <div>\n    <ion-header>\n      <ion-navbar color ="dark" hideBackButton="true">\n        <div class = "container-toolbar">\n          <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n          <div class = "container-tbbuttons">\n            <button ion-button color="dark">\n                Assessment\n            </button>\n            <button ion-button color="dark" (click)="showPopover($event)">\n                Help\n            </button>\n          </div>\n        </div>\n        <hr>\n        <div class="subheader">\n          <div><p>Review</p></div>\n          <div style="margin-right:20px">\n            <p>Target MRL: {{targetMRL}}| Target Date: Date</p>\n            <p><u>Show Assessment Scope</u></p>\n          </div>\n        </div>\n      </ion-navbar>\n    </ion-header>\n  </div>\n</div>\n\n\n\n<ion-content padding>\n  <br><br><br><br><br><br><br><br><br>\n  <div class = "page-one-info">\n    <p>\n      <b>Target MRL: </b>{{targetMRL}}<br/><br>\n      <b>Target Date: </b> {{targetDate}}<br/><br>\n      <b>Location: </b>{{location}}<br/><br>\n      <b>Team Members: </b>{{team}}<br/><br>\n    </p>\n    <hr>\n  </div>\n  <div class = "page-two-info">\n    <!--\n      TODO: Need to make this an if section for the most part, and pass appropriate data\n      Also, if skipped, show\n    -->\n    <p>\n      \n    </p>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/review/review.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], ReviewPage);
    return ReviewPage;
}());

//# sourceMappingURL=review.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(227);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_page_2_page_2__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_page_3_page_3__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_acronyms_acronyms__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_definitions_definitions__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_faqs_faqs__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_review_review__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_questions_questions__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_helpmenu_helpmenu__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_contacts_dropdown_contacts_dropdown__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_faq_dropdown_faq_dropdown__ = __webpack_require__(287);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// solo functions

// pages









// components



var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_page_2_page_2__["a" /* Page_2Page */],
                __WEBPACK_IMPORTED_MODULE_9__pages_page_3_page_3__["a" /* Page_3Page */],
                __WEBPACK_IMPORTED_MODULE_14__pages_questions_questions__["a" /* QuestionsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_acronyms_acronyms__["a" /* AcronymsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_definitions_definitions__["a" /* DefinitionsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_faqs_faqs__["a" /* FaqsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_review_review__["a" /* ReviewPage */],
                __WEBPACK_IMPORTED_MODULE_15__components_helpmenu_helpmenu__["a" /* HelpmenuComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_contacts_dropdown_contacts_dropdown__["a" /* ContactsDropdownComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_faq_dropdown_faq_dropdown__["a" /* FaqDropdownComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/acronyms/acronyms.module#AcronymsPageModule', name: 'AcronymsPage', segment: 'acronyms', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/definitions/definitions.module#DefinitionsPageModule', name: 'DefinitionsPage', segment: 'definitions', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/faqs/faqs.module#FaqsPageModule', name: 'FaqsPage', segment: 'faqs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/page-2/page-2.module#Page_2PageModule', name: 'Page_2Page', segment: 'page-2', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/page-3/page-3.module#Page_3PageModule', name: 'Page_3Page', segment: 'page-3', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/review/review.module#ReviewPageModule', name: 'ReviewPage', segment: 'review', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/questions/questions.module#QuestionsPageModule', name: 'QuestionsPage', segment: 'questions', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_page_2_page_2__["a" /* Page_2Page */],
                __WEBPACK_IMPORTED_MODULE_9__pages_page_3_page_3__["a" /* Page_3Page */],
                __WEBPACK_IMPORTED_MODULE_14__pages_questions_questions__["a" /* QuestionsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_acronyms_acronyms__["a" /* AcronymsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_definitions_definitions__["a" /* DefinitionsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_faqs_faqs__["a" /* FaqsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_review_review__["a" /* ReviewPage */],
                __WEBPACK_IMPORTED_MODULE_15__components_helpmenu_helpmenu__["a" /* HelpmenuComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_contacts_dropdown_contacts_dropdown__["a" /* ContactsDropdownComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_faq_dropdown_faq_dropdown__["a" /* FaqDropdownComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var PopoverComponent = /** @class */ (function () {
    function PopoverComponent() {
    }
    PopoverComponent.prototype.choice = function (ans) {
        if (ans == "false") {
        }
        else {
        }
    };
    PopoverComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'popover',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/components/popover/popover.html"*/'<!-- Generated template for the PopoverComponent component -->\n<ion-list>\n  <ion-item (click)="choice(true)">\n    HeckYeah\n  </ion-item>\n  <ion-item (click)="choice(false)">\n    HeckNo\n  </ion-item>\n</ion-list>'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/components/popover/popover.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], PopoverComponent);
    return PopoverComponent;
}());

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactsDropdownComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ContactsDropdownComponent = /** @class */ (function () {
    function ContactsDropdownComponent() {
        this.feedbackOpen = false;
    }
    ContactsDropdownComponent.prototype.toggleFeedback = function () {
        this.feedbackOpen ? this.feedbackOpen = false : this.feedbackOpen = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], ContactsDropdownComponent.prototype, "contacts", void 0);
    ContactsDropdownComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'contacts-dropdown',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/components/contacts-dropdown/contacts-dropdown.html"*/'<!-- TODO -->\n<div class="feedback-dropdown-container">\n		<div class="feedback-dropdown-header">\n			<div *ngIf="!feedbackOpen" class="arrow-down"></div>\n			<div *ngIf="feedbackOpen" class="arrow-up"></div>\n			<h2 (click)="toggleFeedback()">Feedback</h2>\n		</div>\n		<div *ngIf="feedbackOpen" id="feedback-dropdown-content">\n			<ion-grid>\n				<ion-row>\n					<ion-col col-4 *ngFor="let contact of contacts">\n						<p>{{contact.name}}</p>\n						<p>{{contact.organization}}</p>\n						<p>{{contact.email}}</p>\n				  </ion-col>\n				</ion-row>\n      </ion-grid>\n		</div>\n\n\n</div>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/components/contacts-dropdown/contacts-dropdown.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ContactsDropdownComponent);
    return ContactsDropdownComponent;
}());

//# sourceMappingURL=contacts-dropdown.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaqDropdownComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FaqDropdownComponent = /** @class */ (function () {
    function FaqDropdownComponent() {
        this.faqOpen = false;
    }
    FaqDropdownComponent.prototype.toggleFaq = function () {
        this.faqOpen ? this.faqOpen = false : this.faqOpen = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], FaqDropdownComponent.prototype, "faq", void 0);
    FaqDropdownComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'faq-dropdown',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/components/faq-dropdown/faq-dropdown.html"*/'<div class="faq-question-container">	\n  <div (click)="toggleFaq()" class="faq-question-header" >\n		<div *ngIf="!faqOpen" class="arrow-down"></div>\n		<div *ngIf="faqOpen" class="arrow-up"></div>\n		<div class="faq-question-title">{{ faq.help_title }}</div>\n  </div>\n  <div *ngIf="faqOpen">\n    <p>{{ faq.help_text }}</p>\n  </div>\n</div>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/components/faq-dropdown/faq-dropdown.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], FaqDropdownComponent);
    return FaqDropdownComponent;
}());

//# sourceMappingURL=faq-dropdown.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AcronymsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AcronymsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AcronymsPage = /** @class */ (function () {
    function AcronymsPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.acronyms = {};
        this.acronymsKeys = [];
    }
    AcronymsPage.prototype.getAcronyms = function () {
        var _this = this;
        this.http.get('assets/json/acronyms.json')
            .subscribe(function (data) {
            console.log(data);
            _this.acronyms = data;
            _this.acronymsKeys = Object.keys(data);
        });
    };
    AcronymsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AcronymsPage');
        this.getAcronyms();
        console.log(this.acronyms);
    };
    AcronymsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-acronyms',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/acronyms/acronyms.html"*/'<!--\n  Generated template for the AcronymsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>acronyms</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n		<ion-grid>\n			<ion-row *ngFor="let acronym of acronymsKeys; let even = even">\n				<ion-col col-2>\n					<ion-item [color]="even ? \'none\' : \'light\'">{{ acronym }}	</ion-item>\n				</ion-col>\n				<ion-col col-10>\n					<ion-item [color]="even ? \'none\' : \'light\'">{{ acronyms[acronym] }} </ion-item>\n				</ion-col>\n			</ion-row>\n		</ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/acronyms/acronyms.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], AcronymsPage);
    return AcronymsPage;
}());

//# sourceMappingURL=acronyms.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefinitionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the DefinitionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DefinitionsPage = /** @class */ (function () {
    function DefinitionsPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.definitions = [];
    }
    DefinitionsPage.prototype.getDefinitions = function () {
        var _this = this;
        this.http.get('assets/json/definitions.json')
            .subscribe(function (data) {
            _this.definitions = data;
        });
    };
    DefinitionsPage.prototype.ionViewDidLoad = function () {
        this.getDefinitions();
    };
    DefinitionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-definitions',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/definitions/definitions.html"*/'<!--\n  Generated template for the DefinitionsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>definitions</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<ion-grid>\n		<ion-row *ngFor="let definition of definitions">\n			<ion-card>\n				<ion-card-header>\n					{{definition.term}}\n				</ion-card-header>\n				<ion-card-content>\n					{{definition.definition}}\n				</ion-card-content>\n			</ion-card>\n		</ion-row>\n	</ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/definitions/definitions.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], DefinitionsPage);
    return DefinitionsPage;
}());

//# sourceMappingURL=definitions.js.map

/***/ })

},[206]);
//# sourceMappingURL=main.js.map