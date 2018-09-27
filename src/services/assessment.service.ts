import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { assessmentQuery, 
         createAssessmentMutation,
				 questionPageAssessmentQuery,
         updateQuestionMutation  } from "./gql.service";

@Injectable()
export class AssessmentService {

	assessments: any;

constructor( private apollo: Apollo) {}

	async getAssessments(userId) {

		return await this.apollo.watchQuery<any>({
				query: assessmentQuery,
					variables: {
						userId: "dev"
					}
			}).valueChanges
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
		}).valueChanges

	}

	// updateInfo has to be an object with the following properties:
	// updates: an object containing the new values for the question
	// _id    : the assessmentId of the assessment being updated
	// questionId: the questionId of the question being updated
	async updateQuestion(updateInfo) {
		return await this.apollo.mutate<any>({
			mutation: updateQuestionMutation,
			variables: updateInfo
		})
	}


}
