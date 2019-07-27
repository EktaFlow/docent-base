import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { tap } from "rxjs/operators";

import { AuthUrl } from "./constants";
import { Storage } from '@ionic/storage';

@Injectable()

export class AuthService {


constructor(private http: HttpClient,
            private storage: Storage) {}

  reset: boolean = false;
  resetToken: string = '';
  resetEmail: string = '';
	registerUrl = AuthUrl + "register";
	loginUrl    = AuthUrl + "login";
        resetUrl    = AuthUrl + 'reset';
				fetchUrl = AuthUrl + 'fetchUser';
				fetchMultipleUrl = AuthUrl + 'fetchMultiple';

	registerUser(user) {
		return this.http.post(this.registerUrl, user)
	}

	login(userCreds) {
		return this.http.post(this.loginUrl, userCreds)
		.pipe( tap( data => this.setSession(data),
		            error => console.log(error)
		          )
		)
	}

  /** purpose: grab info from url.
  *
  *
  */
  public setReset(url) { 
  console.log(url);
    this.reset = true; 
    var tokenRegex = /=.+$/;
    var token = url.match(tokenRegex)[0].substring(1);
    console.log(token);
    this.resetToken = token;
  }

  public doPasswordReset(newPassword) {
    var body = {
      newPassword: newPassword,
      email: this.resetEmail,
      resetToken: this.resetToken
    };

    return this.http.post(AuthUrl + 'doreset', body)
      .subscribe(a => {
      console.log(a);
        if (a == 'Success') {
        console.log('wer succ');
          var userCreds = {
            email: this.resetEmail,
            passwd: newPassword
          }

          this.login(userCreds)
            .subscribe(user => console.log(user));
        }
      });
  }

	public logout() {
    this.storage.remove('docent-token');
	}

	public async currentUser() {
    var item = await this.storage.get('docent-token');
		var ok = JSON.parse(item);
		ok ? ok = ok.user : null
		return ok
	}

  public resetPassword(email) {
    return this.http.post(this.resetUrl, {email})
           .pipe(tap( data => console.log(data),
                      error => console.log(error)
                    ))
           .subscribe(a => console.log('of course'));
  }

	public fetchUser(id){
		return this.http.post(this.fetchUrl, id);
	}

	public fetchMultiple(ids){
		console.log(ids);
		console.log(JSON.stringify(ids));
		var userInfo = {
			"ids": ids
		}
		return this.http.post(this.fetchMultipleUrl, userInfo);
	}

	private setSession(isAuthed) {
		this.storage.set("docent-token", JSON.stringify(isAuthed))
	}

	public unverified = async () => {
		var hasToken = await this.storage.get("docent-token");
		// console.log(JSON.parse(hasToken));
		if (hasToken && JSON.parse(hasToken).user) {
			return !JSON.parse(hasToken).user.verified
		}

	}

	public isLoggedIn = async () => {
		var hasToken = await this.storage.get("docent-token");
		if (hasToken && JSON.parse(hasToken).user) {
			return JSON.parse(hasToken).user.verified
		}

		return false;
	}

	public uploadJSON(jsonFile, userEmail){
		var jsonRoute = AuthUrl + "uploadJSON"
		var fileInfo = {
			file: jsonFile,
			email: userEmail
		}
		console.log(fileInfo);
		console.log(jsonRoute);
		this.http.post(jsonRoute, fileInfo).subscribe(a => console.log("cool"));
	}
}
