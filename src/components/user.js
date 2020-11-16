class User {
    constructor(userJSON) {
        this.id = userJSON.id; 
        this.username = userJSON.username;
        this.password_digest = userJSON.password_digest;
        this.name = userJSON.name;
        this.won_adventure_1 = userJSON.won_adventure_1;
        this.won_adventure_2 = userJSON.won_adventure_2;
        this.won_adventure_3 = userJSON.won_adventure_3;
        this.won_adventure_4 = userJSON.won_adventure_4;
    }
}
