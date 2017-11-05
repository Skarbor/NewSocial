import { User } from "./user";
import { Comment } from "./comment";

export class Post {
    constructor(public Id : number, public Text : string, public Author : User, public Date : number, public Comments : Array<Comment>) {

    }
}