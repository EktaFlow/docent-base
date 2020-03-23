import { Injectable, NgModule } from "@angular/core";
import { Apollo } from "apollo-angular";
import { AuthService } from "./auth.service";
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { assessmentQuery,
         createAssessmentMutation,
				 questionPageAssessmentQuery,
         updateQuestionMutation,
				 deleteAssessmentMutation,
         getThreadsQuery,
         updateTeamMembersMutation,
         deleteFileMutation   } from "./gql.service";
import gql from 'graphql-tag';
import { AuthUrl } from './constants';
import 'rxjs/add/operator/catch';
import { Observable, of } from 'rxjs';


@NgModule()
@Injectable()
export class AssessmentService {

  providedIn: 'root';
  assessments:         any;
	currentAssessmentId: any = this.getCurrentAssessmentId();
	currentAssessment:   any;

	constructor( private apollo:  Apollo,
	             private auth:    AuthService,
               private storage: Storage,
               private http:    HttpClient) { }

	// getCurrentAssessment() {
  //
	// }

	async setCurrentAssessmentId(assessmentId) {
		this.storage.set('currentAssessmentId', assessmentId);
	}

	async getCurrentAssessmentId() {
		return await this.storage.get('currentAssessmentId');
	}


  async queryQuestion(questionId, assessmentId, query) {
  	var ok = gql`
	   query question($questionId: Int, $assessmentId: String) {
	     ${query}
	   }
	`
	return await this.apollo.watchQuery<any>({
		query: ok,
		fetchPolicy: 'network-only',
                variables: {questionId, assessmentId}
		}).valueChanges;
  }

  async removeTeamMember(assessmentId, teamMemberEmail) {
    console.log(teamMemberEmail);
    var mutation = gql`
      mutation removeTeamMember($assessmentId: String, $teamMemberEmail: String) {
        removeTeamMember(assessmentId: $assessmentId, teamMemberEmail: $teamMemberEmail)  {
          email
        }
      }
    `;

    await this.removeAssessmentFromAuth(assessmentId, teamMemberEmail);

    return await this.apollo.mutate({
      mutation: mutation,
      variables: {
        assessmentId: assessmentId,
        teamMemberEmail: teamMemberEmail
      }
    });
  }

  async removeAssessmentFromAuth(assessmentId, teamMemberEmail) {
    console.log('we in remove assessmen form auth');
    var url = AuthUrl + 'remove-shared';
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        assessmentId: assessmentId,
        teamMemberEmail: teamMemberEmail
      })
      }).then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
  }

  async queryAssessment(assessmentId, query) {
  console.log(query);
    var ok = gql`
      query assessment($_id: String) {
        ${query}
      }
    `

    return await this.apollo.watchQuery<any>({
            query: ok,
            fetchPolicy: 'network-only',
            variables: { _id: assessmentId }
    }).valueChanges;

  }

	async getAssessments(userId) {

		return await this.apollo.watchQuery<any>({
				query: assessmentQuery,
        fetchPolicy: 'network-only',
					variables: {
						userId: this.auth.currentUser()._id
					}
			}).valueChanges;
	}

  /**
  *   The purpose of this function is to [].
  *   @query = a `gql` formatted string that contains a query
  *
  *   return: Observable
  */
  async getAssessment(query, assessmentId: String) {
  // console.log('we in get Assessment');
    //  console.log(query, assessmentId);

    return await this.apollo.watchQuery<any>({
            query: query,
            variables: {
              _id: assessmentId
            }
    }).valueChanges;
  }

	async getSharedAssessments(userId) {
	/*
		return await this.apollo.watchQuery<any>({
			query: sharedAssessmentsQuery,
			variables: {
				userId: userId
			}
		}).valueChanges
		*/
	}

	async createAssessment(variables) {
		console.log(variables);

	return await this.apollo.mutate({
			mutation: createAssessmentMutation,
			variables: variables
		});

	}

	async getQuestionPageAssessment(assessmentId) {

		return await this.apollo.watchQuery<any>({
			query: questionPageAssessmentQuery,
			fetchPolicy: "network-only",
			variables: {
				_id: assessmentId
			}
		}).valueChanges;
	}

	// updateInfo has to be an object with the following properties:
	// updates: an object containing the new values for the question
	// _id    : the assessmentId of the assessment being updated
	// questionId: the questionId of the question being updated

	///how does this need to change? need to send the new answer, but we could just send that as updateInfo

	async updateQuestion(updateInfo) {
		return await this.apollo.mutate<any>({
			mutation: updateQuestionMutation,
			errorPolicy: 'all',
			variables: updateInfo
			})
			.catch(e => {
				// return Observable.throw(e.statusText);
				return of({error: 'network Error!'})
			});
	}

	async updateQuestionSeries(updateArray) {
		var success = true;
		for ( let update of updateArray) {
			await this.apollo.mutate<any>({
				mutation: updateQuestionMutation,
				variables: update
			}).catch(e => {
				console.log('we in error in series');
				success = false;
				return of('error');
			}).subscribe(a => {
				console.log('always with the subscribe');
			})
		}
		return success;
	}

  async deleteAssessment(assessmentId){
    return await this.apollo.mutate<any>({
      mutation: deleteAssessmentMutation,
      variables: {
        _id: assessmentId
      }
    });
  }

  /**
  *   purpose: pull the standard thread names
  *   @input:   none
  *   @output:  Observable
  */
  async getDefaultThreads() {
    return this.http.get('/assets/json/2016.json')
    .map(threads => (<any>threads).map(thread => thread.name))
  }

  /**
  *   purpose:  return thread names arr given a schema
  *   @input:   A valid schema
  *   @output:  Observable
  */
	async getThreads() {
		return await this.apollo.watchQuery<any>({
			query: getThreadsQuery
    }).valueChanges;
	}

  async updateAssessment(assessmentId, assessmentUpdate) {
  return await this.apollo.mutate<any>({
          mutation: gql`
           mutation updateAssessmentMeta(
             $_id: String,
             $assessmentUpdate: AssessmentInput
             ){ updateAssessmentMeta(
              _id: $_id,
              assessmentUpdate: $assessmentUpdate
              ) {
                scope
              }
              }
          `,
          variables: {
            _id: assessmentId,
            assessmentUpdate: assessmentUpdate
          }
          });
  }

	async updateTeamMembers(assessmentId, memberInfo){
		console.log("are we getting to this point?");
    this.emailSharedAssessment(assessmentId, memberInfo.email)
		return await this.apollo.mutate<any>({
			mutation: updateTeamMembersMutation,
			variables: {
				assessmentId: assessmentId,
				teamMember: memberInfo
			}
		});
	}

  async emailSharedAssessment(assessmentId, userEmail) {
    var teamMember = [userEmail];
		var url = AuthUrl + "share";

	// this makes sense in auth b/c we probably do want some user checking here, right?
		fetch(url, {
			method: "POST",
			headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
				},
			body: JSON.stringify({
				recipients: teamMember,
				assessmentId
			})
		})
		.then(a => console.log("okok"))
		.catch(e => console.error(e));
  }

  async deleteFile(assessmentId, fileId) {
    console.log('we in delete file in ass service');
    return await this.apollo.mutate<any>({
      mutation: deleteFileMutation,
      variables: {
        assessmentId: assessmentId,
        fileId:       fileId
      }
    });
  }

}
