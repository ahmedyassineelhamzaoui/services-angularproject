export class User {
    id : number;
    first_name: string;
    last_name: string;
    status: string;
    email: string;
    password: string;
    
    constructor(){
        this.id = 0;
        this.first_name = "";
        this.last_name = "";
        this.email = "";
        this.status = "offline";
        this.password = "";
    }
}
