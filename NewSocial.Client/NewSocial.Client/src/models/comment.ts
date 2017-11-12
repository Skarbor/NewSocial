import { User } from "./user";

export class Comment {
    constructor(public id : number, public text : string, public author : User, public date : number) {
        
    }
}