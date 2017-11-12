import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticateService {
    url : string = "https://localhost:44354/api/Account/login";
    email : string = "adamwojcik1.programista@gmail.com";
    password : string = "X11235xhipcio!";

    constructor(private http: HttpClient) {}

    login() {
        var body = {
            Email: "adamwojcik1.programista@gmail.com",
            Password: "X11235xhipcio!"
        }
        this.http.post(this.url, body).toPromise().then(()=> {
            console.log("login");
        });
    }
}