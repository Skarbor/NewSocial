import { Injectable } from '@angular/core';
import { Post } from "../models/post";
import { Comment } from "../models/comment";

@Injectable()
export class PostsService {
    getAllPosts()
    {
        var comments : Array<Comment> = new Array<Comment>(
            new Comment(1, "Tys widzio smoka", null, Date.now()),
            new Comment(2, "Widziołem jo smoka", null, Date.now()),
            new Comment(3, "Gowno zes widzol i w dupiezes byl a nie smoka", null, Date.now())
        )

        var posts : Array<Post> = new Array<Post>(
            new Post(1, 'Dawno dawno temu, za górami, za lasami, za siedmioma morzami i drzewami żył sobie Adam...',null, Date.now(), comments),
            new Post(2, 'post 2',null, Date.now(), null),
            new Post(3, 'post 3',null, Date.now(), null)
        );

        return posts;
    }
}