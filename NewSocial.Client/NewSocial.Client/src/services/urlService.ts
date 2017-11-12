import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
    
    public authenticateLogin : string = "https://localhost:44354/api/Account/login";

    public postsGetAll : string = "https://localhost:44354/api/Posts/GetAll";
}