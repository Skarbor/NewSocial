import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
    
    public authenticateLogin : string = "https://localhost:44354/api/Account/login";

    public postsGetAll : string = "https://localhost:44354/api/Posts/GetAll";

    public commentsAdd : string = "https://localhost:44354/api/Comments/Add";

    public commentsGetAllForPost : string = "https://localhost:44354/api/Comments/GetAllForPost";
}