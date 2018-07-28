webpackJsonp([3],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
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
        this.reviewResults = [];
        this.questions = [
            {
                question: "what the heck come after 6?",
                title: "q1",
                answer: "Yes",
            },
            {
                question: "what the heck come after 6?",
                title: "q2",
                answer: "No"
            },
            {
                question: "what the heck come after 6?",
                title: "q3",
                answer: "N/A",
            },
            {
                question: "what the heck come after 6?",
                title: "q4",
                answer: "skipped"
            },
        ];
        // OLD CODE IS OLD
        /*
        this.targetMRL = navParams.get('mrl');
        this.date = navParams.get('date');
        this.location = navParams.get('location');
        this.survey = navParams.get('survey');
        this.surveyResults = navParams.get('surveyResults');
        this.response = navParams.get('response');
        */
        // This will initialize the JSON object used to create the view. Skipped questions are NOT stored
        // in SurveyJS, so this will combat that.
        /*
        for(var i =0; i < this.survey.pages.length; i+=1){
          if(!this.surveyResults[this.survey.pages[i].elements[0].name]){
            this.surveyResults[this.survey.pages[i].elements[0].name] = "skipped";
          }
        }
        */
        // The key value pairs are put in an array so we can use ngFor
        /*
        for(let key in this.surveyResults){
          console.log(key + " " + this.surveyResults[key])
          this.reviewResults.push({key: this.surveyResults[key]});
        }*/
        // END OLD CODE
    }
    ReviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-review',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/review/review.html"*/'<!--\n  Generated template for the ReviewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div class="toolbar-class">\n  <div>\n    <ion-header>\n      <ion-navbar color ="dark" hideBackButton="true">\n        <div class = "container-toolbar">\n          <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n          <div class = "container-tbbuttons">\n            <button ion-button color="dark">\n                Assessment\n            </button>\n            <button ion-button color="dark" (click)="showPopover($event)">\n                Help\n            </button>\n          </div>\n        </div>\n        <hr>\n        <div class="subheader">\n          <div><p>Review</p></div>\n          <div style="margin-right:20px">\n            <p>Target MRL: {{targetMRL}} | Target Date: {{date}}</p>\n            <p><u>Show Assessment Scope</u></p>\n          </div>\n        </div>\n      </ion-navbar>\n    </ion-header>\n  </div>\n</div>\n\n\n\n<ion-content padding>\n  <br><br><br><br><br><br><br><br><br>\n  <div class = "page-one-info">\n    <p>\n      <b>Target MRL: </b>{{targetMRL}}<br/><br>\n      <b>Target Date: </b> {{date}}<br/><br>\n      <b>Location: </b>{{location}}<br/><br>\n      <b>Team Members: </b>{{team}}<br/><br>\n    </p>\n    <hr>\n  </div>\n  <div class = "survey-info">\n    <li *ngFor = "let question of questions">\n      <div *ngIf = "question.answer == \'N/A\'" class = "na">\n        <p style="color:blue;cursor: pointer;">{{question.question}}</p>\n        <p class = "box"><b>N/A</b></p>\n        <p>\n          <b>Attatchements:</b> {{question.attatchements}}\n        </p>\n        <hr>\n      </div>\n      <div *ngIf = "question.answer == \'No\'" class = "no">\n        <p style="color:blue;cursor: pointer;">{{question.question}}</p>\n        <p class = "box"><b>No</b></p>\n        <p>\n          <b>Attatchements:</b> {{question.attatchements}}\n        </p>\n        <hr>\n      </div>\n      <div *ngIf = "question.answer == \'Yes\'" class = "yes">\n        <p style="color:blue;cursor: pointer;">{{question.question}}</p>\n        <p class = "box"><b>Yes</b></p>\n        <p>\n          <b>Evidence:</b> {{question.evidence}}\n        </p>\n        <hr>\n      </div>\n\n      <div *ngIf = "question.answer == \'skipped\'" class = "skipped">\n        <p style="color:#0000EE;cursor: pointer;">{{question.question}}</p>\n        <p class="box"><b>Skipped</b></p>\n        <p>\n          <b>Assumptions:</b> {{question.assumptions}}<br><br>\n          <b>Notes:</b> {{question.notes}}<br><br>\n          <b>Attatchements:</b> {{question.attatchements}}\n        </p>\n        <hr>\n      </div>\n    </li>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/review/review.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], ReviewPage);
    return ReviewPage;
}());

//# sourceMappingURL=review.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_survey_angular__ = __webpack_require__(246);
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



//import targetMRL1 from "json../../assets/json/targetMRL1.json";
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
                },
                {
                    "name": "Materials",
                    "elements": [
                        {
                            "type": "dropdown",
                            "name": "Maturity ",
                            "title": "Dumpster",
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
        this.actionPerson = [];
        this.currentQuestion = [];
        this.answers = [];
        this.surveyJS = new __WEBPACK_IMPORTED_MODULE_2_survey_angular__["Model"](this.survey);
        this.mainTitle = this.survey.pages[this.surveyJS.currentPageNo].name;
        this.subTitle = this.survey.pages[this.surveyJS.currentPageNo].elements[0].name;
        this.targetMRL = navParams.get('mrl');
        this.date = navParams.get('date');
        this.location = navParams.get('location');
    }
    QuestionsPage.prototype.addPerson = function (who) {
        this.actionPerson.push(who);
    };
    QuestionsPage.prototype.removePerson = function () {
        this.actionPerson.pop();
    };
    QuestionsPage.prototype.complete = function () {
        var replace = false;
        for (var i = 0; i < this.answers.length; i += 1) {
            if (this.answers[i].title == this.subTitle) {
                this.answers[i].data = this.currentQuestion;
                replace = true;
            }
        }
        //If a replacement does NOT occur
        if (!replace) {
            this.currentQuestion.push({ title: this.survey.pages[this.surveyJS.currentPageNo].elements[0].title });
            this.answers.push({ title: this.subTitle, data: this.currentQuestion });
        }
        this.currentQuestion = [];
        var resultAsString = JSON.stringify(this.surveyJS.data);
        console.log(resultAsString);
        console.log(this.answers);
    };
    // assumptions = null, notes = null, objectiveEvidence = null, when = null, risk = null, what = null, reason = null, documentation = null
    QuestionsPage.prototype.surveyChange = function () {
        //This will get the values for th header
        this.value = this.surveyJS.getValue(this.survey.pages[this.surveyJS.currentPageNo].elements[0].name);
        this.mainTitle = this.survey.pages[this.surveyJS.currentPageNo].name;
        this.subTitle = this.survey.pages[this.surveyJS.currentPageNo].elements[0].name;
        //This will change the button functionality in the event someone wants to go back and change answers
        if (this.survey.pages.length - 1 == this.surveyJS.currentPageNo) {
            this.nextButton = "Complete";
        }
        else {
            this.nextButton = null;
        }
        //This is where data will be processed
    };
    QuestionsPage.prototype.log = function (type, val) {
        //responses logged
        this.currentQuestion.push({ type: type, answer: val });
    };
    QuestionsPage.prototype.next = function () {
        var replace = false;
        for (var i = 0; i < this.answers.length; i += 1) {
            if (this.answers[i].title == this.subTitle) {
                this.answers[i].data = this.currentQuestion;
                replace = true;
            }
        }
        //If a replacement does NOT occur
        if (!replace) {
            this.currentQuestion.push({ title: this.survey.pages[this.surveyJS.currentPageNo].elements[0].title });
            this.answers.push({ title: this.subTitle, data: this.currentQuestion });
        }
        this.currentQuestion = [];
        this.surveyJS.nextPage();
    };
    QuestionsPage.prototype.prev = function () {
        this.surveyJS.prevPage();
    };
    QuestionsPage.prototype.sendDataToServer = function () {
        var resultAsString = JSON.stringify(this.surveyJS.data);
        alert(resultAsString); //send Ajax request to your web server.
    };
    QuestionsPage.prototype.ngOnInit = function () {
        this.surveyJS.onComplete.add(this.sendDataToServer);
        __WEBPACK_IMPORTED_MODULE_2_survey_angular__["SurveyNG"].render("surveyElement", { model: this.surveyJS });
    };
    QuestionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-questions',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/questions/questions.html"*/'<!--\n  Generated template for the QuestionsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div class="toolbar-class">\n  <div>\n    <ion-header>\n      <ion-navbar color ="dark" hideBackButton="true">\n        <div class = "container-toolbar">\n          <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n          <div class = "container-tbbuttons">\n            <button ion-button color="dark">\n                Assessment\n            </button>\n            <button ion-button color="dark">\n                Help\n            </button>\n          </div>\n        </div>\n        <hr>\n        <div class="subheader">\n          <div><p>{{this.mainTitle}} / {{this.subTitle}}</p></div>\n          <div style="margin-right:20px">\n            <p>Target MRL: {{targetMRL}}| Target Date: {{date}}</p>\n            <p><u>Show Assessment Scope</u></p>\n          </div>\n        </div>\n      </ion-navbar>\n    </ion-header>\n  </div>\n</div>\n\n\n<ion-content padding>\n  <br><br><br><br><br><br><br><br><br><br>\n  <div class = "nav">\n    <div id=\'surveyElement\' class = "questions" (change)="surveyChange()">\n\n    </div>\n    <div style="margin-top:10px;display:flex;">\n        <button ion-button color="buttonBlue" (click) = "prev()"><ion-icon name="arrow-dropleft"></ion-icon>Previous</button>\n        <div *ngIf="this.nextButton == \'Complete\'">\n            <button ion-button color="buttonBlue" (click) = "complete()">Complete<ion-icon name="arrow-dropright"></ion-icon></button>\n        </div>\n        <div *ngIf="this.nextButton != \'Complete\'">\n            <button ion-button color="buttonBlue" (click) = "next()">Next/Skip<ion-icon name="arrow-dropright"></ion-icon></button>\n        </div>\n    </div>\n  </div>\n\n  <div *ngIf="this.value == \'Yes\'" class = "yes">\n    <h6>Objective Evidence</h6>\n    <textarea placeholder="Enter objective evidence here..." (change)="log(\'Evidence\',evidence.value)" #evidence></textarea>\n  </div>\n  \n  \n  \n  <div *ngIf="value == \'No\'" class = "no">\n    <h3><b>ACTION PLAN</b></h3>\n    <form>\n      <div style="display:flex;flex-direction:row;justify-content:space-between;width:30%;">      \n        <button (click)="addPerson(who.value)">\n          <label style="color:#32db64;font-size:16px;cursor:pointer;" ><b>Add Action Person</b></label>\n          <ion-icon name="add-circle" color = "secondary"></ion-icon>\n        </button>\n        <button (click)="removePerson()">\n          <label style="color:#f53d3d;font-size:16px;cursor:pointer;" ><b>Remove</b></label>\n          <ion-icon name="remove-circle" color = "danger"></ion-icon>\n        </button>\n      </div>\n      <br>\n      <br>\n      <div class="who-when">\n        <div style="display:flex; flex-direction:column">   \n          <li *ngFor = "let persons of actionPerson">\n            <pre>{{persons}}</pre>\n          </li>\n          <h6>Who</h6>\n          <input style="width: 200%; margin:0px 0px 0px 10px" (change)="log(\'Who\',who.value)" #who>\n        </div>\n        <div style="display:flex; flex-direction:column;justify-content:space-between;flex-grow:0;">\n          <li *ngFor = "let persons of actionPerson">\n            <pre style="visibility:hidden;">{{persons}}</pre>\n          </li>\n          <h6>When</h6>\n          <input type="date" style ="margin:0px 0px 0px 10px;" (change)="log(\'When\',when.value)" #when>\n        </div>\n      </div>\n    </form>\n    <div style="margin-top:10px;">\n      <h6>Risk</h6>\n      <div class="risk">\n        Technical<input type="checkbox"> \n        Cost<input type="checkbox"> \n        Schedule<input type="checkbox"> \n      </div>\n      <h6>What</h6>\n      <textarea placeholder="What needs to be done to meet this objective?" (change)="log(\'What\',what.value)" #what></textarea>\n      <h6>Reason</h6>\n      <textarea placeholder="Reason that criteria is not met..." (change)="log(\'Reason\',reason.value)" #reason></textarea>\n    </div>\n  </div>\n\n  \n  <div *ngIf="value == \'N/A\'" class = "na">\n    <h6>Documentation</h6>\n    <textarea placeholder="Document why this question is not applicable..." (change)="log(\'Documentation\',documentation.value)" #documentation></textarea>\n    <hr>\n  </div>\n  \n  <br>\n  <hr>\n\n  <div class = "default">\n    <h6>Assumptions</h6>\n    <textarea placeholder="Enter any assumptions here..." (change)="log(\'Assumptions\',assumptions.value)" #assumptions></textarea>\n    <h6>Notes</h6>\n    <textarea placeholder="Enter notes here..." (change)="log(\'Notes\',notes.value)" #notes></textarea>\n    <div style="width:50%; margin:10px 0px 0px 0px;">\n      <button ion-button color="dark">Attatch File</button>\n    </div>\n  </div>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/questions/questions.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], QuestionsPage);
    return QuestionsPage;
}());

//# sourceMappingURL=questions.js.map

/***/ }),

/***/ 111:
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
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/dashboard/dashboard.module": [
		274,
		2
	],
	"../pages/questions/questions.module": [
		276,
		1
	],
	"../pages/review/review.module": [
		275,
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
webpackAsyncContext.id = 153;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__questions_questions__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__review_review__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard__ = __webpack_require__(99);
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
        this.members = [];
    }
    HomePage.prototype.addMember = function (nameIn, roleIn) {
        var newMember = { name: nameIn, role: roleIn };
        this.members.push(newMember);
    };
    HomePage.prototype.removeMember = function () {
        this.members.pop();
    };
    HomePage.prototype.questions = function (date, val, loc) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__questions_questions__["a" /* QuestionsPage */], {
            mrl: val,
            date: date,
            location: loc
        });
    };
    HomePage.prototype.review = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__review_review__["a" /* ReviewPage */]);
    };
    HomePage.prototype.dashboard = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard__["a" /* DashboardPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/home/home.html"*/'<title>Docent</title>\n\n<div class="toolbar-class">\n  <div>\n    <ion-header>\n      <ion-navbar color ="dark" style="height:100px;">\n        <div class = "container-toolbar">\n          <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n          <div class = "container-tbbuttons">\n            <button ion-button color="dark">\n                Assessment\n            </button>\n            <button ion-button color="dark">\n                Help\n            </button>\n          </div>\n        </div>\n        <hr>\n      </ion-navbar>\n    </ion-header>\n  </div>\n</div>\n<ion-content padding>\n  <br>\n  <br>\n  <br>\n  <br>\n  <br>\n  <h1>Start New Assessment</h1>\n  <font color="grey">Use this option to start a new assessment</font>\n  <br><br>\n  <h6>Team Members</h6>\n  <form>\n    <div class="member-list">\n      <li *ngFor = "let member of members">\n        <pre>{{member.name}}:              {{member.role}}</pre>\n      </li>\n    </div>\n    <div class="members">\n      <div style="width:48%">\n      <input type="text" name="memName" placeholder = "Member Name" #memName>\n      </div>\n      <div class="member-role-button" style="width:48%">\n        <input type="text" name="memRole" placeholder = "Member Role" #memRole>\n        <div class = "buttons">\n            <button (click)="removeMember()">\n                <ion-icon name="remove-circle" color = "danger"></ion-icon>\n            </button>\n        </div>\n      </div>\n    </div>\n    <div class = "buttons">\n      <button (click)="addMember(memName.value,memRole.value)">\n          <ion-icon name="add-circle" color = "secondary"></ion-icon>\n      </button>\n    </div>\n  </form>\n  <div class = "mid-first-page">\n    <div class="scope">\n      <h6>Scope</h6>\n      <textarea name="scope" placeholder = "Enter Scope Here"></textarea>\n    </div>\n    <div class ="target-level-date">\n      <div class = "target-level">\n        <div style = "width:45%;">\n          <h6>Target MRL</h6>\n          <select name="targetMRL" #value>\n            <option value="" disabled selected>Select One...</option>\n            <option value = "1">1</option>\n            <option value = "2">2</option>\n            <option value = "3">3</option>\n            <option value = "4">4</option>\n            <option value = "5">5</option>\n            <option value = "6">6</option>\n            <option value = "7">7</option>\n            <option value = "8">8</option>\n            <option value = "9">9</option>\n            <option value = "10">10</option>\n          </select>\n        </div>\n        <div style = "width:45%;">\n          <div style="display: flex;">\n            <h6>Level Switching</h6>\n            <button style="margin-top:-10px;">\n              <img src="../../assets/imgs/qmark.png" width="15" height="15">\n            </button>\n          </div>\n          <select>\n            <option value="" disabled selected>Select One...</option>\n            <option>On</option>\n            <option>Off</option>\n          </select>\n        </div>\n      </div>\n      <h6>Date to Achieve Target MRL</h6>\n      <input  type="date" name="dateAchieve" placeholder = "mm/dd/yyyy" #date>\n    </div>\n  </div>\n  <div class = "bottom">\n    <div style="width:48%;height:100%;">\n      <h6>Location</h6>\n      <ion-input name="location" placeholder = "Enter Location" #location></ion-input>\n    </div>\n    <div style="width:48%;">\n      <h6>Deskbook Version</h6>\n      <select name="version">\n        <option value="" disabled selected>Select One...</option>\n        <option>2017</option>\n      </select>\n    </div>\n  </div>\n  <div class = "thread-start">\n    <div class = "choose-threads">\n      <button>\n        <img src="../../assets/imgs/if_icon-arrow-down.png" width="15" height="15">\n      </button>\n      <p><b>Choose Threads</b></p>\n      <button>\n        <img src="../../assets/imgs/qmark.png" width="15" height="15">\n      </button>\n    </div>\n    <div>\n      <button ion-button color ="buttonBlue" (click)="questions(date.value,value.value,location.value)">\n        Start\n      </button>\n    </div>\n  </div>\n  <br><br>\n  <hr>\n  <br>\n  <div class="existing-assessment">\n    <div>\n      <h1>Continue Existing Assessment</h1>\n      <p>\n        Use this option to start working on an existing assessment. You will be<br> required to import your assessment\n        data\n      </p>\n    </div>\n    <div>\n      <button ion-button color ="buttonBlue">\n        Help Importing\n      </button>\n      <button ion-button color ="buttonBlue">\n        Open Assessment\n      </button>\n    </div>\n  </div>\n  <button (click)="review()">Review</button>\n  <button (click)="dashboard()">Dashboard</button>\n</ion-content>'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* PopoverController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(221);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_review_review__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_questions_questions__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_dashboard_dashboard__ = __webpack_require__(99);
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
                __WEBPACK_IMPORTED_MODULE_9__pages_questions_questions__["a" /* QuestionsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_review_review__["a" /* ReviewPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_dashboard_dashboard__["a" /* DashboardPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/review/review.module#ReviewPageModule', name: 'ReviewPage', segment: 'review', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/questions/questions.module#QuestionsPageModule', name: 'QuestionsPage', segment: 'questions', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_questions_questions__["a" /* QuestionsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_review_review__["a" /* ReviewPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_dashboard_dashboard__["a" /* DashboardPage */],
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

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(197);
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

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
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
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DashboardPage = /** @class */ (function () {
    function DashboardPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.questionSet = [
            {
                header: "Technology Maturity",
                questions: [
                    {
                        subheader: "Technology Maturity",
                        answers: [true, false, null, true, false, null, true, false, null, true],
                    }
                ]
            },
            {
                header: "Technology Maturity & Industrial Base",
                questions: [
                    {
                        subheader: "Industrial Base",
                        answers: [true, false, null, true, false, null, true, false, null, false],
                    },
                    {
                        subheader: "Manfufacturing Technology Development",
                        answers: [false, null, true, false, null, true, false, null, true, null],
                    }
                ]
            },
        ];
    }
    DashboardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DashboardPage');
    };
    DashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dashboard',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/dashboard/dashboard.html"*/'<!--\n  Generated template for the DashboardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div class="toolbar-class">\n  <div>\n    <ion-header>\n      <ion-navbar color ="dark" hideBackButton="true">\n        <div class = "container-toolbar">\n          <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n          <div class = "container-tbbuttons">\n            <button ion-button color="dark">\n                Assessment\n            </button>\n            <button ion-button color="dark">\n                Help\n            </button>\n          </div>\n        </div>\n        <hr>\n        <div class="subheader">\n          <div style="margin-right:20px;color:white;">\n            <p>Target MRL: {{targetMRL}}| Target Date: {{date}}</p>\n            <p><u>Show Assessment Scope</u></p>\n          </div>\n        </div>\n      </ion-navbar>\n    </ion-header>\n  </div>\n</div>\n\n\n<ion-content padding>\n  <br><br><br><br><br><br><br><br><br><br>\n  <div class="top">\n      <p>Completion Date</p>\n      <p>10</p>\n      <p>9</p>\n      <p>8</p>\n      <p>7</p>\n      <p>6</p>\n      <p>5</p>\n      <p>4</p>\n      <p>3</p>\n      <p>2</p>\n      <p>1</p>\n  </div>\n  <br><br><br>\n  <div *ngFor = "let question of questionSet">   \n    <hr>\n      <p><b>{{question.header}}</b></p>\n    <hr>\n    <div *ngFor = "let answer of question.questions" class="questions">\n      <div class="header">\n        <p class = "subtitle">{{answer.subheader}}</p>\n      </div>\n      <div *ngFor ="let response of answer.answers" class="answers">\n        <div *ngIf = "response == true" class = "yes">\n          <img src="../../assets/imgs/check-mark-256.png">\n        </div>\n        <div *ngIf = "response == false" class = "no">\n          <img src="../../assets/imgs/x-mark-256.ico">\n        </div>\n        <div *ngIf = "response == null" class = "na">\n          <img src="../../assets/imgs/x-mark-256.ico" style="visibility:hidden;">\n        </div>\n      </div>\n      <div class = "date">\n        <p>Date</p>\n      </div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/dashboard/dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], DashboardPage);
    return DashboardPage;
}());

//# sourceMappingURL=dashboard.js.map

/***/ })

},[198]);
//# sourceMappingURL=main.js.map