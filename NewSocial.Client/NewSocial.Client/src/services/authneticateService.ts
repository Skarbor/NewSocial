import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './urlService'

@Injectable()
export class AuthenticateService {
    email : string = "adamwojcik1.programista@gmail.com";
    password : string = "X11235xhipcio!";

    constructor(private http: HttpClient, private urlService : UrlService) {}

    login() {
        var body = this.createBody();

        this.http.post(this.urlService.authenticateLogin, body).toPromise().then(()=> {
            console.log("login");
        });
    }

    createBody() {
        return {
            Email: "adamwojcik1.programista@gmail.com",
            Password: "X11235xhipcio!"
        }
    }
}