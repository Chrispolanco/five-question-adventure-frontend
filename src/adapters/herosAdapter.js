class HerosAdapter{

    constructor() {
        this.heroBaseURL = 'http://localhost:3000/heros'
    }

    getHeros() {
        return fetch(this.heroBaseURL).then(resp => resp.json())
    }

}
