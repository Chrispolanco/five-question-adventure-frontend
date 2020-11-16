class Hero {
    constructor(heroJson) {
        this.id = heroJson.id; 
        this.name = heroJson.name;
        this.character_class = heroJson.character_class; 
        this.age = heroJson.age;  
        this.health = heroJson.health; 
    }
}