class AdventuresAdapter{

    constructor() {
        this.adventureBaseURL = 'http://localhost:3000/adventures'
    }

    getAdventures() {
        return fetch(this.adventureBaseURL).then(resp => resp.json())
    }
}



