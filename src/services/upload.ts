import { Injectable } from "@angular/core";
import * as upload from "./azure-storage.blob.min";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { DocentStorageAccount, SAS } from "./constants";
import { AuthService } from "./auth.service";


var createFileMutation = gql`
	mutation addFile( $assessmentId: String
										$questionId:   Int
										$url:          String
										$name:         String )
    {
			addFile( assessmentId: $assessmentId
               questionId:   $questionId
               url:          $url
               name:         $name )
			{
				caption
			}
		}
`


@Injectable()
export class UploadService {

	accountName: string = DocentStorageAccount;
	sas:         string = SAS;

	constructor(private apollo: Apollo,
											private auth: AuthService) {
												// console.log(auth);
											}



	uploadFile(file, assessmentId, questionId) {
		const blobUri = `https://${this.accountName}.blob.core.windows.net`;
		const blobService = upload.createBlobServiceWithSas(blobUri, this.sas);

		blobService.createBlockBlobFromBrowserFile('test', file.name, file,
		(error, result) => {
				 if (error) {	console.error(error); }
				 else {
						var url = this.generateUrl(file.name);
						this.createGQL(url, assessmentId, Number(questionId), file.name);
				 }
		});
		return {name: file.name, questionId: questionId, url: this.generateUrl(file.name)};
	}

	uploadJSON(file){
		console.log(this);
		var user = this.auth.currentUser();
		this.auth.uploadJSON(JSON.stringify(file), user.email);
	}

	generateUrl(name) {
		return `https://${this.accountName}.blob.core.windows.net/test/${name}`
	}

	createGQL(url, assessmentId, questionId, name) {
		this.apollo.mutate({
			mutation: createFileMutation,
			variables: {
				url,
				assessmentId,
				questionId,
				name
			}
		}).subscribe(a => null);
	}

	// createGQLJSON(url, userId, name) {
	//
	// }

}
