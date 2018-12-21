import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { AuthService } from "./auth.service";
import { Storage } from '@ionic/storage';
import { assessmentQuery,
         createAssessmentMutation,
				 questionPageAssessmentQuery,
         updateQuestionMutation,
				 deleteAssessmentMutation,
         getThreadsQuery,
         updateTeamMembersMutation	 } from "./gql.service";

@Injectable()
export class AssessmentService {

	assessments:         any;
	currentAssessmentId: any = this.getCurrentAssessmentId();
	currentAssessment:   any;

	constructor( private apollo:  Apollo,
	             private auth:    AuthService,
	             private storage: Storage) { }

	// getCurrentAssessment() {
  //
	// }

	setCurrentAssessmentId(assessmentId) {
		this.storage.set('currentAssessmentId', assessmentId);
	}

	async getCurrentAssessmentId() {
		return await this.storage.get('currentAssessmentId');
	}



	async getAssessments(userId) {

		return await this.apollo.watchQuery<any>({
				query: assessmentQuery,
					variables: {
						userId: this.auth.currentUser()._id
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
	async updateQuestion(updateInfo) {
		return await this.apollo.mutate<any>({
			mutation: updateQuestionMutation,
			variables: updateInfo
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

}
