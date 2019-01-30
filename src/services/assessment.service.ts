import { Injectable } from "@angular/core";
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

@Injectable()
export class AssessmentService {

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

	setCurrentAssessmentId(assessmentId) {
		this.storage.set('currentAssessmentId', assessmentId);
	}

	async getCurrentAssessmentId() {
		return await this.storage.get('currentAssessmentId');
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

	return await this.apollo.mutate({
			mutation: createAssessmentMutation,
			variables
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
			variables: updateInfo
		});
	}

  async updateAssessment(assessment) {
    return await this.apollo.mutate<any>({
      mutation: gql`

      `
    });
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
      .map(threads => threads.map(thread => thread.name))
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

	async updateTeamMembers(assessmentId, memberEmail){
		return await this.apollo.mutate<any>({
			mutation: updateTeamMembersMutation,
			variables: {
				_id: assessmentId,
				teamMember: memberEmail
			}
		})
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
