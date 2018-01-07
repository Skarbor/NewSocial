import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './urlService'
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticateService {
    constructor(private http: HttpClient, private urlService : UrlService) {}

    login() {
        var body = this.createBody();

        this.http.post(this.urlService.authenticateLogin, body, {responseType: 'text'}).subscribe();
    }

    createBody() {
        return {       
            Email: "adamwojcik1.programista@gmail.com",
            Password: "X11235xhipcio!"           
        }
    }
}