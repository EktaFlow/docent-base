webpackJsonp([7],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionitemsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_views_views__ = __webpack_require__(21);
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
 * Generated class for the ActionitemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ActionitemsPage = /** @class */ (function () {
    function ActionitemsPage(navCtrl, navParams, popOver) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popOver = popOver;
        this.schema = [
            {
                header: "Cost & Funding",
                subheader: "Production Cost Knowledge (Cost modeling)",
                mrl: "3",
                question: "Have initial cost targets and risks been identified?",
                reason: "This",
                action: "is",
                assumptions: "an",
                notes: "example",
                risks: "of",
                teamMembers: "the",
                attatchments: "schema"
            }
        ];
    }
    ActionitemsPage.prototype.presentViewsPop = function (event) {
        var popover = this.popOver.create(__WEBPACK_IMPORTED_MODULE_2__components_views_views__["a" /* ViewsComponent */]);
        popover.present({
            ev: event
        });
    };
    ActionitemsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-actionitems',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/actionitems/actionitems.html"*/'<!--\n  Generated template for the ActionitemsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div class="toolbar-class">\n  <div>\n    <ion-header>\n      <ion-navbar color ="dark" hideBackButton="true">\n        <div class = "container-toolbar">\n          <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n          <div class = "container-tbbuttons">\n            <button ion-button (click)="presentViewsPop($event)" color="dark">\n                Assessment\n            </button>\n            <button ion-button color="dark">\n                Help\n            </button>\n          </div>\n        </div>\n        <hr>\n        <div class="subheader">\n          <div><p>Action Items</p></div>\n          <div style="margin-right:20px">\n            <p>Target MRL: {{targetMRL}}| Target Date: {{date}}</p>\n            <p><u>Show Assessment Scope</u></p>\n          </div>\n        </div>\n      </ion-navbar>\n    </ion-header>\n  </div>\n</div>\n\n\n<ion-content padding>\n  <br><br><br><br><br><br><br><br><br><br>\n  <hr>\n  <div *ngFor="let question of schema">\n    <p>\n      <b>{{question.header}}</b> / {{question.subheader}} / {{question.mrl}}\n    </p>\n    <p style="color:darkslateblue"><b>{{question.question}}</b></p>\n    <div style="display:flex;">\n      <div style="width:40%">\n        <p>\n          <b>Reason:</b><br>\n          {{question.reason}}\n        </p>\n        <p>\n          <b>Action:</b><br>\n          {{question.action}}\n        </p>\n        <p>\n          <b>Assumptions:</b><br>\n          {{question.assumptios}}\n        </p>\n      </div>\n      <div style="width:40%;">\n        <p>\n            <b>Risks:</b><br>\n            {{question.risks}}\n          </p>\n          <p>\n            <b>Team Members:</b><br>\n            {{question.teamMembers}}\n          </p>\n          <p>\n            <b>Attatchments:</b><br>\n            {{question.attatchments}}\n          </p>\n      </div>\n    </div>\n    <p><b>Notes:</b></p>\n    {{question.notes}}\n    <hr>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/actionitems/actionitems.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* PopoverController */]])
    ], ActionitemsPage);
    return ActionitemsPage;
}());

//# sourceMappingURL=actionitems.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_survey_angular__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_survey_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_survey_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_views_views__ = __webpack_require__(21);
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
    function QuestionsPage(navCtrl, navParams, popOver) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popOver = popOver;
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
    QuestionsPage.prototype.presentViewsPop = function (event) {
        var popover = this.popOver.create(__WEBPACK_IMPORTED_MODULE_3__components_views_views__["a" /* ViewsComponent */]);
        popover.present({
            ev: event
        });
    };
    QuestionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-questions',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/questions/questions.html"*/'<!--\n  Generated template for the QuestionsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div class="toolbar-class">\n  <div>\n    <ion-header>\n      <ion-navbar color ="dark" hideBackButton="true">\n        <div class = "container-toolbar">\n          <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n          <div class = "container-tbbuttons">\n            <button ion-button (click)="presentViewsPop($event)" color="dark">\n                Assessment\n            </button>\n            <button ion-button color="dark">\n                Help\n            </button>\n          </div>\n        </div>\n        <hr>\n        <div class="subheader">\n          <div><p>{{this.mainTitle}} / {{this.subTitle}}</p></div>\n          <div style="margin-right:20px">\n            <p>Target MRL: {{targetMRL}}| Target Date: {{date}}</p>\n            <p><u>Show Assessment Scope</u></p>\n          </div>\n        </div>\n      </ion-navbar>\n    </ion-header>\n  </div>\n</div>\n\n\n<ion-content padding>\n  <br><br><br><br><br><br><br><br><br><br>\n  <div class = "nav">\n    <div id=\'surveyElement\' class = "questions" (change)="surveyChange()">\n\n    </div>\n    <div style="margin-top:10px;display:flex;">\n        <button ion-button color="buttonBlue" (click) = "prev()"><ion-icon name="arrow-dropleft"></ion-icon>Previous</button>\n        <div *ngIf="this.nextButton == \'Complete\'">\n            <button ion-button color="buttonBlue" (click) = "complete()">Complete<ion-icon name="arrow-dropright"></ion-icon></button>\n        </div>\n        <div *ngIf="this.nextButton != \'Complete\'">\n            <button ion-button color="buttonBlue" (click) = "next()">Next/Skip<ion-icon name="arrow-dropright"></ion-icon></button>\n        </div>\n    </div>\n  </div>\n\n  <div *ngIf="this.value == \'Yes\'" class = "yes">\n    <h6>Objective Evidence</h6>\n    <textarea placeholder="Enter objective evidence here..." (change)="log(\'Evidence\',evidence.value)" #evidence></textarea>\n  </div>\n  \n  \n  \n  <div *ngIf="value == \'No\'" class = "no">\n    <h3><b>ACTION PLAN</b></h3>\n    <form>\n      <div style="display:flex;flex-direction:row;justify-content:space-between;width:30%;">      \n        <button (click)="addPerson(who.value)">\n          <label style="color:#32db64;font-size:16px;cursor:pointer;" ><b>Add Action Person</b></label>\n          <ion-icon name="add-circle" color = "secondary"></ion-icon>\n        </button>\n        <button (click)="removePerson()">\n          <label style="color:#f53d3d;font-size:16px;cursor:pointer;" ><b>Remove</b></label>\n          <ion-icon name="remove-circle" color = "danger"></ion-icon>\n        </button>\n      </div>\n      <br>\n      <br>\n      <div class="who-when">\n        <div style="display:flex; flex-direction:column">   \n          <li *ngFor = "let persons of actionPerson">\n            <pre>{{persons}}</pre>\n          </li>\n          <h6>Who</h6>\n          <input style="width: 200%; margin:0px 0px 0px 10px" (change)="log(\'Who\',who.value)" #who>\n        </div>\n        <div style="display:flex; flex-direction:column;justify-content:space-between;flex-grow:0;">\n          <li *ngFor = "let persons of actionPerson">\n            <pre style="visibility:hidden;">{{persons}}</pre>\n          </li>\n          <h6>When</h6>\n          <input type="date" style ="margin:0px 0px 0px 10px;" (change)="log(\'When\',when.value)" #when>\n        </div>\n      </div>\n    </form>\n    <div style="margin-top:10px;">\n      <h6>Risk</h6>\n      <div class="risk">\n        Technical<input type="checkbox"> \n        Cost<input type="checkbox"> \n        Schedule<input type="checkbox"> \n      </div>\n      <h6>What</h6>\n      <textarea placeholder="What needs to be done to meet this objective?" (change)="log(\'What\',what.value)" #what></textarea>\n      <h6>Reason</h6>\n      <textarea placeholder="Reason that criteria is not met..." (change)="log(\'Reason\',reason.value)" #reason></textarea>\n    </div>\n  </div>\n\n  \n  <div *ngIf="value == \'N/A\'" class = "na">\n    <h6>Documentation</h6>\n    <textarea placeholder="Document why this question is not applicable..." (change)="log(\'Documentation\',documentation.value)" #documentation></textarea>\n    <hr>\n  </div>\n  \n  <br>\n  <hr>\n\n  <div class = "default">\n    <h6>Assumptions</h6>\n    <textarea placeholder="Enter any assumptions here..." (change)="log(\'Assumptions\',assumptions.value)" #assumptions></textarea>\n    <h6>Notes</h6>\n    <textarea placeholder="Enter notes here..." (change)="log(\'Notes\',notes.value)" #notes></textarea>\n    <div style="width:50%; margin:10px 0px 0px 0px;">\n      <button ion-button color="dark">Attatch File</button>\n    </div>\n  </div>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/questions/questions.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* PopoverController */]])
    ], QuestionsPage);
    return QuestionsPage;
}());

//# sourceMappingURL=questions.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_views_views__ = __webpack_require__(21);
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
    function ReviewPage(navCtrl, navParams, popOver) {
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
        // END OLD CODe
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popOver = popOver;
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
    }
    ReviewPage.prototype.presentViewsPop = function (event) {
        var popover = this.popOver.create(__WEBPACK_IMPORTED_MODULE_2__components_views_views__["a" /* ViewsComponent */]);
        popover.present({
            ev: event
        });
    };
    ReviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-review',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/review/review.html"*/'<!--\n  Generated template for the ReviewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div class="toolbar-class">\n  <div>\n    <ion-header>\n      <ion-navbar color ="dark" hideBackButton="true">\n        <div class = "container-toolbar">\n          <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n          <div class = "container-tbbuttons">\n            <button ion-button (click)="presentViewsPop($event)" color="dark">\n                Assessment\n            </button>\n            <button ion-button color="dark" (click)="showPopover($event)">\n                Help\n            </button>\n          </div>\n        </div>\n        <hr>\n        <div class="subheader">\n          <div><p>Review</p></div>\n          <div style="margin-right:20px">\n            <p>Target MRL: {{targetMRL}} | Target Date: {{date}}</p>\n            <p><u>Show Assessment Scope</u></p>\n          </div>\n        </div>\n      </ion-navbar>\n    </ion-header>\n  </div>\n</div>\n\n\n\n<ion-content padding>\n  <br><br><br><br><br><br><br><br><br>\n  <div class = "page-one-info">\n    <p>\n      <b>Target MRL: </b>{{targetMRL}}<br/><br>\n      <b>Target Date: </b> {{date}}<br/><br>\n      <b>Location: </b>{{location}}<br/><br>\n      <b>Team Members: </b>{{team}}<br/><br>\n    </p>\n    <hr>\n  </div>\n  <div class = "survey-info">\n    <li *ngFor = "let question of questions">\n      <div *ngIf = "question.answer == \'N/A\'" class = "na">\n        <p style="color:blue;cursor: pointer;">{{question.question}}</p>\n        <p class = "box"><b>N/A</b></p>\n        <p>\n          <b>Attatchements:</b> {{question.attatchements}}\n        </p>\n        <hr>\n      </div>\n      <div *ngIf = "question.answer == \'No\'" class = "no">\n        <p style="color:blue;cursor: pointer;">{{question.question}}</p>\n        <p class = "box"><b>No</b></p>\n        <p>\n          <b>Attatchements:</b> {{question.attatchements}}\n        </p>\n        <hr>\n      </div>\n      <div *ngIf = "question.answer == \'Yes\'" class = "yes">\n        <p style="color:blue;cursor: pointer;">{{question.question}}</p>\n        <p class = "box"><b>Yes</b></p>\n        <p>\n          <b>Evidence:</b> {{question.evidence}}\n        </p>\n        <hr>\n      </div>\n\n      <div *ngIf = "question.answer == \'skipped\'" class = "skipped">\n        <p style="color:#0000EE;cursor: pointer;">{{question.question}}</p>\n        <p class="box"><b>Skipped</b></p>\n        <p>\n          <b>Assumptions:</b> {{question.assumptions}}<br><br>\n          <b>Notes:</b> {{question.notes}}<br><br>\n          <b>Attatchements:</b> {{question.attatchements}}\n        </p>\n        <hr>\n      </div>\n    </li>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/review/review.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* PopoverController */]])
    ], ReviewPage);
    return ReviewPage;
}());

//# sourceMappingURL=review.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_views_views__ = __webpack_require__(21);
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
    function DashboardPage(navCtrl, navParams, popOver) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popOver = popOver;
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
    DashboardPage.prototype.presentViewsPop = function (event) {
        var popover = this.popOver.create(__WEBPACK_IMPORTED_MODULE_2__components_views_views__["a" /* ViewsComponent */]);
        popover.present({
            ev: event
        });
    };
    DashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dashboard',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/dashboard/dashboard.html"*/'<!--\n  Generated template for the DashboardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div class="toolbar-class">\n  <div>\n    <ion-header>\n      <ion-navbar color ="dark" hideBackButton="true">\n        <div class = "container-toolbar">\n          <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n          <div class = "container-tbbuttons">\n            <button ion-button (click)="presentViewsPop($event)" color="dark">\n                Assessment\n            </button>\n            <button ion-button color="dark">\n                Help\n            </button>\n          </div>\n        </div>\n        <hr>\n        <div class="subheader">\n          <div style="margin-right:20px;color:white;">\n            <p>Target MRL: {{targetMRL}}| Target Date: {{date}}</p>\n            <p><u>Show Assessment Scope</u></p>\n          </div>\n        </div>\n      </ion-navbar>\n    </ion-header>\n  </div>\n</div>\n\n\n<ion-content padding>\n  <br><br><br><br><br><br><br><br><br><br>\n  <div class="top">\n      <p>Completion Date</p>\n      <p>10</p>\n      <p>9</p>\n      <p>8</p>\n      <p>7</p>\n      <p>6</p>\n      <p>5</p>\n      <p>4</p>\n      <p>3</p>\n      <p>2</p>\n      <p>1</p>\n  </div>\n  <br><br><br>\n  <div *ngFor = "let question of questionSet">   \n    <hr>\n      <p><b>{{question.header}}</b></p>\n    <hr>\n    <div *ngFor = "let answer of question.questions" class="questions">\n      <div class="header">\n        <p class = "subtitle">{{answer.subheader}}</p>\n      </div>\n      <div *ngFor ="let response of answer.answers" class="answers">\n        <div *ngIf = "response == true" class = "yes">\n          <img src="../../assets/imgs/check-mark-256.png">\n        </div>\n        <div *ngIf = "response == false" class = "no">\n          <img src="../../assets/imgs/x-mark-256.ico">\n        </div>\n        <div *ngIf = "response == null" class = "na">\n          <img src="../../assets/imgs/x-mark-256.ico" style="visibility:hidden;">\n        </div>\n      </div>\n      <div class = "date">\n        <p>Date</p>\n      </div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/dashboard/dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* PopoverController */]])
    ], DashboardPage);
    return DashboardPage;
}());

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_views_views__ = __webpack_require__(21);
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
 * Generated class for the NavigatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NavigatePage = /** @class */ (function () {
    function NavigatePage(navCtrl, navParams, popOver) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popOver = popOver;
        this.schema = [
            {
                header: "Technology Maturity",
                subheader: [
                    {
                        subheader: "Technology Maturity",
                        questions: [
                            {
                                mrl: "MRL 1",
                                questionSet: [
                                    "Is the Technology Readiness at TRL 1 or greater?",
                                ]
                            },
                            {
                                mrl: "MRL 2",
                                questionSet: [
                                    "Is the Technology Readiness at TRL 2 or greater?",
                                ]
                            },
                            {
                                mrl: "MRL 3",
                                questionSet: [
                                    "Is the Technology Readiness at TRL 3 or greater?",
                                ]
                            }
                        ]
                    }
                ],
            },
            {
                header: "Technology & Industrial Base",
                subheader: [
                    {
                        subheader: "Industrial Base",
                        questions: [
                            {
                                mrl: "MRL 3",
                                questionSet: [
                                    "Test Question One",
                                    "Two",
                                    "Three"
                                ]
                            }
                        ]
                    },
                    {
                        subheader: "Manufacturing Technology Developement",
                        questions: [
                            {
                                mrl: "MRL 2",
                                questionSet: [
                                    "Have new manufacturing concepts and potential solutions been identified?"
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
        this.state = [this.schema.length];
        this.subState = [this.schema.length];
        this.state.fill(false);
        this.create();
    }
    NavigatePage.prototype.changeState = function (index) {
        this.state[index] = !this.state[index];
    };
    NavigatePage.prototype.changeSubState = function (index, subIndex) {
        this.subState[index][subIndex] = !this.subState[index][subIndex];
    };
    NavigatePage.prototype.create = function () {
        // Method to create states for sub headers
        for (var i = 0; i < this.schema.length; i += 1) {
            var newArr = [this.schema[i].subheader.length];
            newArr.fill(false);
            this.subState[i] = new Array(this.schema[i].subheader.length);
        }
    };
    NavigatePage.prototype.presentViewsPop = function (event) {
        var popover = this.popOver.create(__WEBPACK_IMPORTED_MODULE_2__components_views_views__["a" /* ViewsComponent */]);
        popover.present({
            ev: event
        });
    };
    NavigatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-navigate',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/navigate/navigate.html"*/'<!--\n  Generated template for the NavigatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div class="toolbar-class">\n  <div>\n    <ion-header>\n      <ion-navbar color ="dark" hideBackButton="true">\n        <div class = "container-toolbar">\n          <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n          <div class = "container-tbbuttons">\n            <button ion-button (click)="presentViewsPop($event)" color="dark">\n                Assessment\n            </button>\n            <button ion-button color="dark" >\n                Help\n            </button>\n          </div>\n        </div>\n        <hr>\n        <div class="subheader">\n          <div><p>Navigate</p></div>\n          <div style="margin-right:20px">\n            <p>Target MRL: {{targetMRL}} | Target Date: {{date}}</p>\n            <p><u>Show Assessment Scope</u></p>\n          </div>\n        </div>\n      </ion-navbar>\n    </ion-header>\n  </div>\n</div>\n\n\n<ion-content padding>\n  <br><br><br><br><br><br><br><br><br><br>\n  <hr>\n  <div *ngFor="let segment of schema; index as i">\n    <img src="../../assets/imgs/if_icon-arrow-down.png" class= "downArrow" (click)="changeState(i)">\n    {{segment.header}}\n    <div *ngIf="this.state[i] == true">\n      <div *ngFor="let sub of segment.subheader; index as j">\n        <img src="../../assets/imgs/if_icon-arrow-down.png" class= "downArrow" (click)="changeSubState(i,j)" class="subtitle">\n        {{sub.subheader}}\n        <div *ngIf="this.subState[i][j] == true">\n          <div *ngFor="let question of sub.questions" class="mrl">\n            <b>{{question.mrl}}</b>\n            <div *ngFor="let title of question.questionSet" class="question">\n              <p style="color:blue;cursor: pointer;" (click)="getQuestion()">{{title}}</p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <hr>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/navigate/navigate.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* PopoverController */]])
    ], NavigatePage);
    return NavigatePage;
}());

//# sourceMappingURL=navigate.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotapplicablePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_views_views__ = __webpack_require__(21);
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
 * Generated class for the NotapplicablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NotapplicablePage = /** @class */ (function () {
    function NotapplicablePage(navCtrl, navParams, popOver) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popOver = popOver;
        this.schema = [
            {
                header: "Technology Maturity",
                mrl: 4,
                questions: [
                    "Is the Technology Readiness at TRL 4 or greater?"
                ]
            },
            {
                header: "Technology & Industrial Base",
                mrl: 4,
                questions: [
                    "Have industrial base capabilities and gpas/risks been identified for key technologies, components, and/or key processes?",
                    "Have pertinenet Manufacturing Sciene (MS) and Advanced Manufacturing Technology requirements been identified?"
                ]
            }
        ];
    }
    NotapplicablePage.prototype.presentViewsPop = function (event) {
        var popover = this.popOver.create(__WEBPACK_IMPORTED_MODULE_2__components_views_views__["a" /* ViewsComponent */]);
        popover.present({
            ev: event
        });
    };
    NotapplicablePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notapplicable',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/notapplicable/notapplicable.html"*/'<!--\n  Generated template for the NotapplicablePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div class="toolbar-class">\n  <div>\n    <ion-header>\n      <ion-navbar color ="dark" hideBackButton="true">\n        <div class = "container-toolbar">\n          <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n          <div class = "container-tbbuttons">\n            <button ion-button (click)="presentViewsPop($event)" color="dark">\n                Assessment\n            </button>\n            <button ion-button color="dark">\n                Help\n            </button>\n          </div>\n        </div>\n        <hr>\n        <div class="subheader">\n          <div><p>Questions Marked Not Applicable</p></div>\n          <div style="margin-right:20px">\n            <p>Target MRL: {{targetMRL}}| Target Date: {{date}}</p>\n            <p><u>Show Assessment Scope</u></p>\n          </div>\n        </div>\n      </ion-navbar>\n    </ion-header>\n  </div>\n</div>\n\n\n<ion-content padding>\n  <br><br><br><br><br><br><br><br><br><br>\n  <div *ngFor="let segment of schema">\n    <hr>\n    {{segment.header}}\n    <hr>\n    <div *ngFor="let question of segment.questions" class="questions">\n      <p style="width: 20%;">Level {{segment.mrl}}</p>\n      <p style="cursor:pointer; color:blue;">{{question}}</p>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/notapplicable/notapplicable.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* PopoverController */]])
    ], NotapplicablePage);
    return NotapplicablePage;
}());

//# sourceMappingURL=notapplicable.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SkippedquestionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_views_views__ = __webpack_require__(21);
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
 * Generated class for the SkippedquestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SkippedquestionsPage = /** @class */ (function () {
    function SkippedquestionsPage(navCtrl, navParams, popOver) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popOver = popOver;
        this.schema = [
            {
                header: "Technology Maturity",
                mrl: 4,
                questions: [
                    "Is the Technology Readiness at TRL 4 or greater?"
                ]
            },
            {
                header: "Technology & Industrial Base",
                mrl: 4,
                questions: [
                    "Have industrial base capabilities and gpas/risks been identified for key technologies, components, and/or key processes?",
                    "Have pertinenet Manufacturing Sciene (MS) and Advanced Manufacturing Technology requirements been identified?"
                ]
            }
        ];
    }
    SkippedquestionsPage.prototype.presentViewsPop = function (event) {
        var popover = this.popOver.create(__WEBPACK_IMPORTED_MODULE_2__components_views_views__["a" /* ViewsComponent */]);
        popover.present({
            ev: event
        });
    };
    SkippedquestionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-skippedquestions',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/skippedquestions/skippedquestions.html"*/'<!--\n  Generated template for the SkippedquestionsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div class="toolbar-class">\n  <div>\n    <ion-header>\n      <ion-navbar color ="dark" hideBackButton="true">\n        <div class = "container-toolbar">\n          <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n          <div class = "container-tbbuttons">\n            <button ion-button (click)="presentViewsPop($event)" color="dark">\n                Assessment\n            </button>\n            <button ion-button color="dark">\n                Help\n            </button>\n          </div>\n        </div>\n        <hr>\n        <div class="subheader">\n          <div><p>Skipped Questions</p></div>\n          <div style="margin-right:20px">\n            <p>Target MRL: {{targetMRL}}| Target Date: {{date}}</p>\n            <p><u>Show Assessment Scope</u></p>\n          </div>\n        </div>\n      </ion-navbar>\n    </ion-header>\n  </div>\n</div>\n\n\n<ion-content padding>\n  <br><br><br><br><br><br><br><br><br><br>\n  <div *ngFor="let segment of schema">\n    <hr>\n    {{segment.header}}\n    <hr>\n    <div *ngFor="let question of segment.questions" class="questions">\n      <p style="width: 20%;">Level {{segment.mrl}}</p>\n      <p style="cursor:pointer; color:blue;">{{question}}</p>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/skippedquestions/skippedquestions.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* PopoverController */]])
    ], SkippedquestionsPage);
    return SkippedquestionsPage;
}());

//# sourceMappingURL=skippedquestions.js.map

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

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/actionitems/actionitems.module": [
		279,
		6
	],
	"../pages/dashboard/dashboard.module": [
		280,
		5
	],
	"../pages/navigate/navigate.module": [
		281,
		4
	],
	"../pages/notapplicable/notapplicable.module": [
		282,
		3
	],
	"../pages/questions/questions.module": [
		283,
		2
	],
	"../pages/review/review.module": [
		284,
		1
	],
	"../pages/skippedquestions/skippedquestions.module": [
		285,
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
webpackAsyncContext.id = 159;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(226);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_review_review__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_dashboard_dashboard__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_navigate_navigate__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_notapplicable_notapplicable__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_skippedquestions_skippedquestions__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_actionitems_actionitems__ = __webpack_require__(101);
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
 * Generated class for the ViewsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ViewsComponent = /** @class */ (function () {
    function ViewsComponent(navCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.homePage = __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */];
        this.reviewPage = __WEBPACK_IMPORTED_MODULE_3__pages_review_review__["a" /* ReviewPage */];
        this.dashboardPage = __WEBPACK_IMPORTED_MODULE_4__pages_dashboard_dashboard__["a" /* DashboardPage */];
        this.navigatePage = __WEBPACK_IMPORTED_MODULE_5__pages_navigate_navigate__["a" /* NavigatePage */];
        this.notapplicablePage = __WEBPACK_IMPORTED_MODULE_6__pages_notapplicable_notapplicable__["a" /* NotapplicablePage */];
        this.skippedquestionsPage = __WEBPACK_IMPORTED_MODULE_7__pages_skippedquestions_skippedquestions__["a" /* SkippedquestionsPage */];
        this.actionitemsPage = __WEBPACK_IMPORTED_MODULE_8__pages_actionitems_actionitems__["a" /* ActionitemsPage */];
    }
    ViewsComponent.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    ViewsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'views',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/components/views/views.html"*/'<div style="display:flex;flex-direction:column;background-color:black">\n		\n  <button [navPush]="homePage" ion-button color="dark">\n    Home	\n  </button>\n  <button ion-button color="dark">\n    Open\n  </button>\n  <button ion-button color="dark">\n    Continue\n  </button>\n  <button ion-button color="dark">\n    Save\n  </button>\n  <hr>\n  <button [navPush]="dashboardPage" ion-button color="dark">\n    Dashboard\n  </button>\n  <button [navPush]="navigatePage" ion-button color="dark">\n    Navigate\n  </button>\n  <button [navPush]="reviewPage" ion-button color="dark">\n    Review\n  </button>\n  <hr>\n  <button [navPush]="actionitemsPage" ion-button color="dark">\n    Action Items\n  </button>\n  <button [navPush]="skippedquestionsPage" ion-button color="dark">\n    Skipped Questions\n  </button>\n  <button [navPush]="notapplicablePage" ion-button color="dark">\n    N/A Questions\n  </button>\n</div>'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/components/views/views.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */]])
    ], ViewsComponent);
    return ViewsComponent;
}());

//# sourceMappingURL=views.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_review_review__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_questions_questions__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_dashboard_dashboard__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_navigate_navigate__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_notapplicable_notapplicable__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_skippedquestions_skippedquestions__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_actionitems_actionitems__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_views_views__ = __webpack_require__(21);
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
                __WEBPACK_IMPORTED_MODULE_10__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_navigate_navigate__["a" /* NavigatePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_notapplicable_notapplicable__["a" /* NotapplicablePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_skippedquestions_skippedquestions__["a" /* SkippedquestionsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_actionitems_actionitems__["a" /* ActionitemsPage */],
                __WEBPACK_IMPORTED_MODULE_15__components_views_views__["a" /* ViewsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/actionitems/actionitems.module#ActionitemsPageModule', name: 'ActionitemsPage', segment: 'actionitems', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/navigate/navigate.module#NavigatePageModule', name: 'NavigatePage', segment: 'navigate', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/notapplicable/notapplicable.module#NotapplicablePageModule', name: 'NotapplicablePage', segment: 'notapplicable', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/questions/questions.module#QuestionsPageModule', name: 'QuestionsPage', segment: 'questions', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/review/review.module#ReviewPageModule', name: 'ReviewPage', segment: 'review', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/skippedquestions/skippedquestions.module#SkippedquestionsPageModule', name: 'SkippedquestionsPage', segment: 'skippedquestions', priority: 'low', defaultHistory: [] }
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
                __WEBPACK_IMPORTED_MODULE_11__pages_navigate_navigate__["a" /* NavigatePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_notapplicable_notapplicable__["a" /* NotapplicablePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_skippedquestions_skippedquestions__["a" /* SkippedquestionsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_actionitems_actionitems__["a" /* ActionitemsPage */],
                __WEBPACK_IMPORTED_MODULE_15__components_views_views__["a" /* ViewsComponent */]
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

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(78);
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

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__questions_questions__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_views_views__ = __webpack_require__(21);
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
    HomePage.prototype.presentViewsPop = function (event) {
        var popover = this.popOver.create(__WEBPACK_IMPORTED_MODULE_3__components_views_views__["a" /* ViewsComponent */]);
        popover.present({
            ev: event
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/mac/Repos/docent-base/src/pages/home/home.html"*/'<title>Docent</title>\n\n<div class="toolbar-class">\n  <div>\n    <ion-header>\n      <ion-navbar color ="dark" style="height:100px;">\n        <div class = "container-toolbar">\n          <img src="../../assets/imgs/docent-logo-f-n-l-1.jpg">\n          <div class = "container-tbbuttons">\n            <button ion-button (click)="presentViewsPop($event)" color="dark">\n                Assessment\n            </button>\n            <button ion-button color="dark">\n                Help\n            </button>\n          </div>\n        </div>\n        <hr>\n      </ion-navbar>\n    </ion-header>\n  </div>\n</div>\n<ion-content padding>\n  <br>\n  <br>\n  <br>\n  <br>\n  <br>\n  <h1>Start New Assessment</h1>\n  <font color="grey">Use this option to start a new assessment</font>\n  <br><br>\n  <h6>Team Members</h6>\n  <form>\n    <div class="member-list">\n      <li *ngFor = "let member of members">\n        <pre>{{member.name}}:              {{member.role}}</pre>\n      </li>\n    </div>\n    <div class="members">\n      <div style="width:48%">\n      <input type="text" name="memName" placeholder = "Member Name" #memName>\n      </div>\n      <div class="member-role-button" style="width:48%">\n        <input type="text" name="memRole" placeholder = "Member Role" #memRole>\n        <div class = "buttons">\n            <button (click)="removeMember()">\n                <ion-icon name="remove-circle" color = "danger"></ion-icon>\n            </button>\n        </div>\n      </div>\n    </div>\n    <div class = "buttons">\n      <button (click)="addMember(memName.value,memRole.value)">\n          <ion-icon name="add-circle" color = "secondary"></ion-icon>\n      </button>\n    </div>\n  </form>\n  <div class = "mid-first-page">\n    <div class="scope">\n      <h6>Scope</h6>\n      <textarea name="scope" placeholder = "Enter Scope Here"></textarea>\n    </div>\n    <div class ="target-level-date">\n      <div class = "target-level">\n        <div style = "width:45%;">\n          <h6>Target MRL</h6>\n          <select name="targetMRL" #value>\n            <option value="" disabled selected>Select One...</option>\n            <option value = "1">1</option>\n            <option value = "2">2</option>\n            <option value = "3">3</option>\n            <option value = "4">4</option>\n            <option value = "5">5</option>\n            <option value = "6">6</option>\n            <option value = "7">7</option>\n            <option value = "8">8</option>\n            <option value = "9">9</option>\n            <option value = "10">10</option>\n          </select>\n        </div>\n        <div style = "width:45%;">\n          <div style="display: flex;">\n            <h6>Level Switching</h6>\n            <button style="margin-top:-10px;">\n              <img src="../../assets/imgs/qmark.png" width="15" height="15">\n            </button>\n          </div>\n          <select>\n            <option value="" disabled selected>Select One...</option>\n            <option>On</option>\n            <option>Off</option>\n          </select>\n        </div>\n      </div>\n      <h6>Date to Achieve Target MRL</h6>\n      <input  type="date" name="dateAchieve" placeholder = "mm/dd/yyyy" #date>\n    </div>\n  </div>\n  <div class = "bottom">\n    <div style="width:48%;height:100%;">\n      <h6>Location</h6>\n      <ion-input name="location" placeholder = "Enter Location" #location></ion-input>\n    </div>\n    <div style="width:48%;">\n      <h6>Deskbook Version</h6>\n      <select name="version">\n        <option value="" disabled selected>Select One...</option>\n        <option>2017</option>\n      </select>\n    </div>\n  </div>\n  <div class = "thread-start">\n    <div class = "choose-threads">\n      <button>\n        <img src="../../assets/imgs/if_icon-arrow-down.png" width="15" height="15">\n      </button>\n      <p><b>Choose Threads</b></p>\n      <button>\n        <img src="../../assets/imgs/qmark.png" width="15" height="15">\n      </button>\n    </div>\n    <div>\n      <button ion-button color ="buttonBlue" (click)="questions(date.value,value.value,location.value)">\n        Start\n      </button>\n    </div>\n  </div>\n  <br><br>\n  <hr>\n  <br>\n  <div class="existing-assessment">\n    <div>\n      <h1>Continue Existing Assessment</h1>\n      <p>\n        Use this option to start working on an existing assessment. You will be<br> required to import your assessment\n        data\n      </p>\n    </div>\n    <div>\n      <button ion-button color ="buttonBlue">\n        Help Importing\n      </button>\n      <button ion-button color ="buttonBlue">\n        Open Assessment\n      </button>\n    </div>\n  </div>\n  <button (click)="review()">Review</button>\n  <button (click)="dashboard()">Dashboard</button>\n  <button (click)="navigate()">Navigate</button>\n  <button (click)="skipped()">Skipped Questions</button>\n  <button (click)="action()">Action Items</button>\n  <button (click)="na()">N/A Questions</button>\n</ion-content>'/*ion-inline-end:"/Users/mac/Repos/docent-base/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* PopoverController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[203]);
//# sourceMappingURL=main.js.map