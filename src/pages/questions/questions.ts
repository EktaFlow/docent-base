import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Survey from 'survey-angular';
import targetMRL1 from "json!../../assets/json/targetMRL1.json";


/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {

  survey = new Survey.Model( {
      "pages":[
        {
          "name":"MRL 1",
          "elements":[
            {
              "type":"dropdown",
              "name":"technology maturity",
              "title":"Is the Technology Readiness at TRL 1 or greater?",
              "choices":[
                "Yes",
                "No"
              ]
            },
            {
              "type":"dropdown",
              "name":"design maturity",
              "title":"Have manufacturing research opportunities been identified?",
              "choices":[
                "Yes",
                "No"
              ]
            },
            {
              "type":"dropdown",
              "name":"cost analysis",
              "title":"Have manufacturing cost implications been identified?",
              "choices":[
                "Yes",
                "No"
              ]
            },
            {
              "type":"dropdown",
              "name":"manufacturing investment budget",
              "title":"Have potential investments been identified?",
              "choices":[
                "Yes",
                "No"
              ]
            },
            {
              "type":"dropdown",
              "name":"maturity",
              "title":"Have material properties been identified for research?",
              "choices":[
                "Yes",
                "No"
              ]
            },
          ]
        },
        {
          "name":"MRL 2",
          "elements":[
            {
              "type":"dropdown",
              "name":"technology maturity",
              "title":"Is the Technology Readiness at TRL 2 or greater?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"manufacturing technology development",
              "title":"Have new manufacturing concepts and potential solutions been identified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"design maturity",
              "title":"Have applications been defined?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"design maturity",
              "title":"Have broad performance goals been identified that may drive manufacturing options?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"production cost knowledge (cost modeling)",
              "title":"Has the cost model approach been defined?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"cost analysis",
              "title":"have cost elements been identified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Manufacturing Investment Budget",
              "title":"Do the program/projects have reasonable budget estimates for reaching MRL 3 through experiment?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Maturity",
              "title":"Have material properties and characteristics been predicted?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Availabilty",
              "title":"Have material scale-up issues been identified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Special Handling",
              "title":"Has an initial evaluation of potential regulatroy requirements and special handling concerns been completed?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Modeling & Simulation",
              "title":"Have initial models been developed, if applicable?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Manufacturing Process Maturity",
              "title":"Have material and/or process approaches been identified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"",
              "title":"",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            }
          ]
        },
        {
          "name":"MRL 3",
          "elements":[
            {
              "type":"dropdown",
              "name":"Technology Maturity",
              "title":"Is the Technology Readiness at TRL 3 or greater?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Industrial Base",
              "title":"Have potential manufacturing sources been indentified for technology needs (Unsderstand state of the art)?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Manufacturing Technology Development",
              "title":"Have manufacturing technology concepts been identified through experiments/models?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Producibility Program",
              "title":"Have relevant materials/processes been evaluated for manufacturability using experiments/models?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design Maturity",
              "title":"Have top level performance requirements been defined?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design Maturity",
              "title":"Have trade-offs in design options been assessed based on experiments?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design Maturity",
              "title":"Are product lifecycle requirements and technical requirements being evaluated?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Production Cost Knowledge (Cost modeling)",
              "title":"Have initial cost targets and risks been indentified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Production Cost Knowledge (Cost modeling)",
              "title":"Has a high level process chart model been developed?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Production Cost Knowledge (Cost modeling)",
              "title":"Have technology cost models been developed for new process steps and materials based on experiments?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Cost Analysis",
              "title":"Has a sensitivity analysis been conducted to define cost drivers and production development strategy (ie. lab to pilot factory)?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Cost & Funding / Manufacturing Investment Budget",
              "title":"Do the program/projects have reasonable budget estiamtes for reaching MRL 4 by Milestone A?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Materials / Maturity",
              "title":"Have material properties been validated and assessed for basic manufacturability using experiments?",
              "choices":[
                "Yes",
                "No",
                "na"
              ]
            },
            {
              "type":"dropdown",
              "name":"Materials / Availabilty",
              "title":"Have material scale-up issues been identified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Materials / Supply Chain Management",
              "title":"Has an initial assessment of potential supply chain capability been completed?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Materials / Special Handling",
              "title":"Has a list of hazardous materials been indentified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Materials / Special Handling",
              "title":"Have potential special handling procedures been applied in the lab?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Materials / Special Handling",
              "title":"Have special handling concerns been assessed?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Process Capability & Control / Modeling & Simulation",
              "title":"Have proposed manufacturing concepts or producibility needs been identified based on high-level process flow chart models?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Process Capability & Control / Manufacturing Process Maturity",
              "title":"Have high level manufacturing processes been documented?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Process Capability & Control / Manufacturing Process Maturity",
              "title":"Have critical manufacturing processes been identified through experimentation?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Process Capability & Control / Process Yields and Rates",
              "title":"Have initial estimates of yields and rates based on experiments or state of the art been completed?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Manufacturing Workforce / Manufacturing Workforce",
              "title":"Have new manufacturing skills been identified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Facilities / Facilities",
              "title":"Have specialized facility requirements/needs been identified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            }
          ]
        },
        {
          "name":"MRL 4",
          "elements":[
            {
              "type":"dropdown",
              "name":"Technology Maturity / Technology Maturity",
              "title":"Is the Technology Readiness at TRL 4 or greater?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Technology & Industrial Base / Industrial Base",
              "title":"Have industrial base capabilities and gaps/risks been identified for key technologies, components, and/or key processes?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Technology & Industrial Base / Manufacturing Technology Development",
              "title":"Have pertinent Manufacturing Science (MS) and Advanced Manufacturing Technology requirements been identified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design / Producibility Program",
              "title":"Are initial Producibility and manufacturability assessments of preferred systems concepts completed?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design / Producibility Program",
              "title":"Are the results of the producibility and manufacturability assessment being considered in the selection of preferred design concepts?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design / Producibility Program",
              "title":"Are the results of the producibility and manufacturability assessment being refelected in the Technology Development Strategy key componenets/technologies?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design / Design Maturity",
              "title":"Do the Systems Engineering Plan (SEP) and the Test and Evaluation Strategy recognize the need for the establishment/validation of manufacturing capability and management of manufacturing risk for the product lifecycle?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design / Design Maturity",
              "title":"Have initial potential Key Performance Parameters (KPPs) been identified for the preferred systems concept?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design / Design Maturity",
              "title":"Are system characteristics and measures to support required capabilities identified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design / Design Maturity",
              "title":"Are form, fit, and function constraints and manufacturing capabilities identified for the preferred system concepts?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Cost & Funding / Production Cost Knowledge (Cost Modeling)",
              "title":"Have key manufacturing, material and specialized requirement cost drivers been identified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Cost & Funding / Production Cost Knowledge (Cost Modeling)",
              "title":"Are detailed process chart cost models driven by process variables?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Cost & Funding / Production Cost Knowledge (Cost Modeling)",
              "title":"Has cost driver uncertainty been quantified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Cost & Funding / Cost Analysis",
              "title":"Have producibility cost risks been assessed?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Cost & Funding / Cost Analysis",
              "title":"Do initial cost models support Analysis of Alternatives (AoA) and Alternative Systems Review (ASR)?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Cost & Funding / Manufacturing Investment Budget",
              "title":"Have manufacturing technology initiatives been identified to reduce costs?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Cost & Funding / Manufacturing Investment Budget",
              "title":"Does the program have a reasonable budget estimate to reach MRL 6 by Milestone B?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Cost & Funding / Manufacturing Investment Budget",
              "title":"Does the cost esitmate include capital investment for production-relevant equipment?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Cost & Funding / Manufacturing Investment Budget",
              "title":"Are all outstanding MRL 4 risk areas understood with approved mitigation plans in place?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Materials / Maturity",
              "title":"Have projected materials been produced in a laboratory environment?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Materials / Availabilty",
              "title":"Have projected lead times been identified for all difficult to obtain, difficult to process, or hazardous materials?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Materials / Availabilty",
              "title":"Have material quantities and lead times been estiamted?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Materials / Supply Chain Management",
              "title":"Has a survey for potential supply chain sources been completed?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Materials / Special Handling",
              "title":"Has a list of hazardous materials been updated?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Materials / Special Handling",
              "title":"Have special handling requirements been identified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Materials / Special Handling",
              "title":"Have the special handling procedures been applied in the lab?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Process Capability & Control / Modeling & Simulation",
              "title":"Have production modeling and simulation approaches for process or product been identified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Process Capability & Control  / Manufacturing Process Maturity",
              "title":"Has a survey been completed to determine the current state of critical processes?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Process Capability & Control / Process Yields and Rates",
              "title":"Has a yield and rates assessment on proposed/similar processes been completed?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Process Capability & Control / Process Yields and Rates",
              "title":"Has a yield and rates assessment on proposed/similar processes been applied within the Analysis of Alternatives (AoA)?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Quality Management / Quality Management Including Supplier Quality",
              "title":"Has a qulaity strategy been identified as part of the Acquisition Strategy (AS)?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Quality Management / Quality Management Including Supplier Quality",
              "title":"Is the updated quality strategy included in the System Engineering Plan (SEP)?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Quality Management / Product Quality",
              "title":"Has a product inspection and acceptance testing strategy been identified as part of thq Acquisition Strategy (AS)",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Quality Management / Product Quality",
              "title":"Has a product inspection and acceptance testing strategy been indluded in the Systems Engineering Plan (SEP)?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Quality Management / Supplier Management",
              "title":"Are potential supplier base quality capabilities and risks identified, to include subtier supplier quality management?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Manufacturing Workforce / Manufacturing Workforce",
              "title":"Have manufacturing skills been identified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Manufacturing Workforce / Manufacturing Workforce",
              "title":"Have production workforce requirements (technical and operational) been evaluated as part of AoA?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Manufacturing Workforce / Manufacturing Workforce",
              "title":"Has the availabilty of process development workforce for the Technology Maturation and Risk Reduction Phase been determined?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Facilities / Tooling/Special Test and Inspection Equipment (STE/SIE)",
              "title":"Are tooling/Special Test Equipment (STE)/Special Inspection Equipment (SIE) requirements being considered as part of AoA?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Facilities / Facilities",
              "title":"Has the availabilty of manufacturing facilities for prototype development and production been evaluated as part of the Analysis of Alternatives (AoA)?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Manufacturing Management / Mfg Planning & Scheduling",
              "title":"Has a manufacturing strategy been developed and integrated with an acquisition strategy?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Manufacturing Management / Mfg Planning & Scheduling",
              "title":"Have prototype schedule risk mitigation efforts been incorportated into the Acquisition Strategy (AS)?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Manufacturing Management / Materials Planning",
              "title":"Has the technology development article component list been developed with associated lead time estimates?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            }
          ]
        },
        {
          "name":"MRL 5",
          "elements":[
            {
              "type":"dropdown",
              "name":"Technology Maturity / Technology Maturity",
              "title":"Is the Technology Readiness at TRL 5 or greater?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Technology & Industrial Base / Industrial Base",
              "title":"Has the industrial base capabilities assessment been initiated to identify potential manufacturing sources to produce the required capability?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Technology & Industrial Base / Industrial Base",
              "title":"Have sole/single/foreign source vendors and vendors of technologies with potential obsolescene issues been identified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Technology & Industrial Base / Industrial Base",
              "title":"Has planning begun to minimize the risks associated with sole/single/foreign source vendors",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Technology & Industrial Base / Manufacturing Technology Development",
              "title":"Have the required manufacturing technology developement efforts been initiated as applicable?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design / Producibility Program",
              "title":"Have producibility & manufacturability assessments of key technologies and components been initiated as appropriate?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design / Producibility Program",
              "title":"Do ongoing design trades consider manufacturing processes and industrial base capability constraints?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design / Producibility Program",
              "title":"Have the manufacturing processes been assessed for capability to test and verify in production and their influence on Operations and support (O&S)?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design / Design Maturity",
              "title":"Are lower level performance requirements sufficient to proceed to the preliminary design?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design / Design Maturity",
              "title":"Are all enabling/critical technologies and components identified?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design / Design Maturity",
              "title":"Do enabling/critical technologies and components consider the product lifecycle?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design / Design Maturity",
              "title":"Have the evaluation of design Key Characteristics (KC) been initiated?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Design / Design Maturity",
              "title":"Have product data required for prototype component manufacturing been released?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Cost & Funding / Production Cost Knowledge (Cost Modeling)",
              "title":"Do prototype components or simulations produced in a production relevant environment drive the formulation of the final production cost model",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Cost & Funding / Production Cost Knowledge (Cost Modeling)",
              "title":"Is there a realistic cost model that includes materials, labor, equipment, tooling/Special Test Equipment (STE), setup, yield/scrap/rework, Work In Progress (WIP), and capability/capacity constraints?",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
            {
              "type":"dropdown",
              "name":"Cost & Funding / Production Cost Knowledge (Cost Modeling)",
              "title":"",
              "choices":[
                "Yes",
                "No",
                "N/A"
              ]
            },
          ]
        },
        {
          "name":"MRL 6",
          "elements":[
    
          ]
        },
        {
          "name":"MRL 7",
          "elements":[
    
          ]
        },
        {
          "name":"MRL 8",
          "elements":[
    
          ]
        },
        {
          "name":"MRL 9",
          "elements":[
    
          ]
        },
        {
          "name":"MRL 10",
          "elements":[
    
          ]
        }
      ]
    }
    
  )

  constructor(public navCtrl: NavController, public navParams: NavParams) {   
    this.survey.showQuestionNumbers = 'off';
  }

  surveyValueChanged = function (sender, options) {
    console.log("hek")
    var el = (<HTMLInputElement>document.getElementById(options.name));
    if (el) {
        el.value = options.value;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');
  }

  sendDataToServer(survey) {
    var resultAsString = JSON.stringify(survey.data);
    alert(resultAsString); //send Ajax request to your web server.
  }

  ngOnInit() {
    this.survey.onComplete.add(this.sendDataToServer);
    Survey.SurveyNG.render("surveyElement", {model:this.survey});
  }
}
