import { User } from "./user";

export class Comment {
    constructor(public Id : number, public Text : string, public Author : User, public Date : number) {
        
    }
}