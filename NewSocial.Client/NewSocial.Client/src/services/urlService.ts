import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
    
    public authenticateLogin : string = "https://localhost:44354/api/Account/login";

    public postsGetAll : string = "https://localhost:44354/api/Posts/GetAll";

    public doesUserLikePost : string = "https://localhost:44354/api/Posts/DoesUserLikePost";

    public likePost : string = "https://localhost:44354/api/Posts/Like";
    
    public commentsAdd : string = "https://localhost:44354/api/Comments/Add";

    public commentsGetAllForPost : string = "https://localhost:44354/api/Comments/GetAllForPost";
}