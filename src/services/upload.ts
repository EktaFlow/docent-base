import { Injectable } from "@angular/core";
import * as upload from "./azure-storage.blob.min";

@Injectable()

export class UploadService {
	constructor() {}

	uploadFile(file) {
	const account = {
		name: "docenttest",
		sas: process.env.AZ_SAS
	}

	const blobUri = `https://${account.name}.blob.core.windows.net`;
	const blobService = upload.createBlobServiceWithSas(blobUri, account.sas); 


	blobService.createBlockBlobFromBrowserFile('test', 
                                                file.name, 
                                                file, 
                                                (error, result) => {
                                                    if(error) {
                                                        console.error(error);
                                                    } else {
                                                        console.log('Upload is successful');
                                                    }
                                                });
	
	}



}
