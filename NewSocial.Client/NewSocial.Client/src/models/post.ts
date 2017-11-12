import { User } from "./user";
import { Comment } from "./comment";

export class Post {
    constructor(public id : number, public text : string, public author : User, public date : number, public comments : Array<Comment>) {

    }
}