import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"

@Injectable() 

export class AuthService {

	constructor(private http: HttpClient) {}

	registerUrl = `http://localhost:4002/register`;
	loginUrl    = `http://localhost:4002/login`;

	registerUser(user) {
	console.log(this.http);
		return this.http.post(this.registerUrl, user)
	}

	login(userCreds) {
	console.log("fire in service");
	console.log(userCreds);
		return this.http.post(this.loginUrl, userCreds)
	}
}
