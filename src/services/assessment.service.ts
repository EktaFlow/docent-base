import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { assessmentQuery, 
				 createAssessmentMutation } from "./gql.service";

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
	console.log(variables);
	
		return await this.apollo.mutate({
			mutation: createAssessmentMutation,
			variables 
		});
	}


}
