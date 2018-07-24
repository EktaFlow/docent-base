import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import {tap} from "rxjs/operators";

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
	console.log("fire")
		return this.http.post(this.loginUrl, userCreds)
		.pipe( tap( data => this.setSession(data), 
		            error => console.log(error)
		          )
		)
	}

	logout() {
		localStorage.removeItem("docent-token");
	}

	private setSession(isAuthed) {
		console.log(isAuthed);
		localStorage.setItem("docent-token", JSON.stringify(isAuthed))
	}

	public isLoggedIn() {
		!!localStorage.getItem("docent-token");
	}
}
