  
class UsersAdapter {

    constructor() {
        this.baseUrl = 'http://localhost:3000/users'
    }

    getUsers() {
        return fetch(this.baseUrl).then(resp => resp.json())
    }

    newUser(username, name) {
        const user = {
            username: username, 
            name: name
        }

        return fetch(this.baseUrl, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }, 
            body: JSON.stringify(user)
        })
            .then(resp => resp.json())
    
    }

    editUser(userId, userUpdate) {
        const user = {
            won_adventure_1: userUpdate.won_adventure_1, 
            won_adventure_2: userUpdate.won_adventure_2,
            won_adventure_3: userUpdate.won_adventure_3,
            won_adventure_4: userUpdate.won_adventure_4
        }
        return fetch(`${this.baseUrl}/${userId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(resp => resp.json())
    }

    delete(userInfo){
        return fetch(this.baseUrl+`/${userInfo.id}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
    }

}

