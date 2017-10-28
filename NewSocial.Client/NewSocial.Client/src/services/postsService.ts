import { Post } from "../models/post";

export class PostsService {
    getAllPosts()
    {
        var posts : Array<Post> = new Array<Post>(
            new Post(1, 'Dawno dawno temu, za górami, za lasami, za siedmioma morzami i drzewami żył sobie Adam...',null, Date.now()),
            new Post(2, 'post 2',null, Date.now()),
            new Post(3, 'post 3',null, Date.now())
        );

        return posts;
    }
}