class Users {
    constructor() {
        this.users = []
        this.statUsers = []
        this.adapter = new UsersAdapter()
        this.heros = []
        this.herosAdapter = new HerosAdapter()
        this.adventures = []
        this.adventuresAdapter = new AdventuresAdapter()
        this.welcome()
        this.stats()
    }


    musicAdventure() {
        let audio = document.getElementById('audio');
        let audiosource = document.getElementById('audiosource');
        audiosource.src = this.adventureInfo.background_music_1_4; 
        audio.pause(); 
        audio.load();
    }

    musicLoss() {
        let audio = document.getElementById('audio');
        let audiosource = document.getElementById('audiosource');

        audiosource.src = this.adventureInfo.background_music_loss; 
        audio.pause(); 
        audio.load();
    }

    musicWon() {
        let audio = document.getElementById('audio');
        let audiosource = document.getElementById('audiosource');

        audiosource.src = this.adventureInfo.background_music_won; 
        audio.pause(); 
        audio.load();
    }


    startMusic() {
    this.audio = document.getElementById('audio');
    this.audio.mute = false;
    this.audio.play();      
    }
 

    stats() {
        this.statBtn = document.querySelector("li#stats")
        this.statBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            if(document.querySelector("li#stats").innerText === "Display Stats") {
                this.statUsers = [], 
                this.statFetchAndLoadUsers(), 
                document.querySelector(".statBox").style.display = "block",   
                document.querySelector("li#stats").innerText = "Hide Stats"  
            }else{  
                document.querySelector("li#stats").innerText = "Display Stats",    
                document.querySelector(".statBox").style.display = "none"
            }
        })
    }; 

    statFetchAndLoadUsers() {
        this.adapter
            .getUsers()
            .then(users => {
                users.forEach(user => this.statUsers.push(new User(user)))
            })
            .then(() => {
                this.statRenderUsers()
            })
    };

    statRenderUsers() {
 
        this.statBox = document.querySelector(" div.statBox")
        this.statBox.className = "statBox"

        while (this.statBox.firstChild) {
            this.statBox.removeChild(this.statBox.firstChild)
        }; 

        this.statUsers.forEach(user => {
            const statUserInfo = document.createElement('p');
            statUserInfo.className = "nameHeader"
            statUserInfo.innerText =  `${user.name}`
            this.statBox.appendChild(statUserInfo)

            const statWonAdventure1 = document.createElement('li');
            statWonAdventure1.className = "adventureData"
            statWonAdventure1.innerText = `${user.won_adventure_1}`
            if(statWonAdventure1.innerText === "true") {
                statWonAdventure1.innerText = "Completed Adventure 1"
            } else {
                statWonAdventure1.innerText = "Adventure 1 Unfinished"
            }
            const statWonAdventure2 = document.createElement('li');
            statWonAdventure2.className = "adventureData"
            statWonAdventure2.innerText = `${user.won_adventure_2}`
            if(statWonAdventure2.innerText === "true") {
                statWonAdventure2.innerText = "Completed Adventure 2"
            } else {
                statWonAdventure2.innerText = "Adventure 2 Unfinished"
            }
            const statWonAdventure3 = document.createElement('li');
            statWonAdventure3.className = "adventureData"
            statWonAdventure3.innerText = `${user.won_adventure_3}`
            if(statWonAdventure3.innerText === "true") {
                statWonAdventure3.innerText = "Completed Adventure 3"
            } else {
                statWonAdventure3.innerText = "Adventure 3 Unfinished"
            }
            const statWonAdventure4 = document.createElement('li');
            statWonAdventure4.className = "adventureData"
            statWonAdventure4.innerText = `${user.won_adventure_4}`
            if(statWonAdventure4.innerText === "true") {
                statWonAdventure4.innerText = "Completed Adventure 4"
            } else {
                statWonAdventure4.innerText = "Adventure 4 Unfinished"
            }

            statUserInfo.appendChild(statWonAdventure1);
            statUserInfo.appendChild(statWonAdventure2);
            statUserInfo.appendChild(statWonAdventure3);
            statUserInfo.appendChild(statWonAdventure4);
            })

            this.sortButton = document.createElement('Button');
            this.sortButton.className = "buttons"
            this.sortButton.innerText = "Sort by Name"
            this.statBox.appendChild(this.sortButton); 

            this.sortButton.addEventListener('click', (e) => {
                e.preventDefault(); 
                this.statUsers.sort((a, b) => (a.name > b.name) ? 1 : -1);  
                this.statRenderUsers() ; 
            }); 
    };

    welcome() {

        this.topInnerText = document.querySelector(".topInnerText");
        this.topInnerText.classList.add("welcome");
        this.topInnerText.classList.add("welcome:hover");
        this.topInnerText.innerText = "Welcome Hero your journey awaits";
        this.topInnerText.classList.remove("topInnerText");

        setTimeout(this.menuChoice.bind(this), 3500);
    }

    menuChoice() {
        this.topInnerText.classList.remove("welcome");
        this.topInnerText.classList.remove("welcome:hover");
        this.topInnerText.classList.add("selectUser");

        this.topInnerText.innerText = "Is this your first adventure?";

        this.menu_wrapper = document.createElement('div');
        this.menu_wrapper.className = "menu_wrapper"
        this.topInnerText.appendChild(this.menu_wrapper);

        this.menu_choice_one = document.createElement('Button');
        this.menu_choice_one.className = "menu_choice";
        this.menu_choice_one.innerText = "New Adventurer";

        this.menu_choice_two = document.createElement('Button');
        this.menu_choice_two.className = "menu_choice";
        this.menu_choice_two.innerText = "Returning Adventurer";

        this.menu_wrapper.appendChild(this.menu_choice_one);
        this.menu_wrapper.appendChild(this.menu_choice_two);

        this.menu_choice_one.addEventListener('click', this.userSignUp.bind(this));
        this.menu_choice_two.addEventListener('click', this.fetchAndLoadUsers.bind(this));

    };

    userSignUp() { 
        document.querySelector(".signUpForm").style.display = "block"
        this.form = document.querySelector(".signUpForm")
        this.topInnerText.innerText = "What is your name traveler?";
        this.topInnerText.appendChild(this.form);

        this.username = document.querySelectorAll("input")[0]
        this.name = document.querySelectorAll("input")[1]

        this.signUpBtn = document.querySelector("#signUp"); 

        this.signUpBtn.addEventListener('click',this.createUser.bind(this))
    }

    createUser(e) {
        e.preventDefault(); 
        const name = this.name.value
        const username = this.username.value 
        this.adapter.newUser(username, name)
        .then(() => {
            this.fetchAndLoadUsers()
        })
        .catch(function() {
            alert("Username & Name must be filled in");
        });
    }


    fetchAndLoadUsers() {
        this.startMusic()
        this.adapter
            .getUsers()
            .then(users => {
                users.forEach(user => this.users.push(new User(user)))
            })
            .then(() => {
                this.renderUsers()
            })
    };

    renderUsers() {

        while (this.topInnerText.firstChild) {
            this.topInnerText.removeChild(this.topInnerText.firstChild)
        }; 

        this.topInnerText.innerText = "Which Brave Adventurer Might You Be?"

        this.users.forEach(user => {
            const userInfo = document.createElement('button');
            userInfo.className = "buttonUsers"
            userInfo.innerText = `${user.name}`
            userInfo.name = `${user.name}`
            userInfo.username = `${user.username}`
            userInfo.id = `${user.id}`
            userInfo.won_adventure_1 = `${user.won_adventure_1}`
            userInfo.won_adventure_2 = `${user.won_adventure_2}`
            userInfo.won_adventure_3 = `${user.won_adventure_3}`
            userInfo.won_adventure_4 = `${user.won_adventure_4}`

            this.topInnerText.appendChild(userInfo);


            userInfo.addEventListener('click', (e) => {
                e.preventDefault();
                this.topInnerText.innerText = "Hello" + ` ${user.name} ` + "- Select your Hero"
                this.user = userInfo; 
                this.fetchAndLoadHeros();

            })
        }) 
    };

    fetchAndLoadHeros() {
        this.herosAdapter
            .getHeros()
            .then(heros => {
                heros.forEach(hero => this.heros.push(new Hero(hero)))
            })
            .then(() => {
                this.renderHeros()
            })
    };

    renderHeros() {

        this.heros.forEach(hero => {
            const heroInfo = document.createElement('button')
            heroInfo.className = "buttonHeros"
            heroInfo.innerText = `${hero.name}`
            heroInfo.id = `${hero.id}`
            heroInfo.age = `${hero.age}`
            heroInfo.health = `${hero.health}`
            this.topInnerText.appendChild(heroInfo)

            heroInfo.addEventListener('click', (e) => {
                e.preventDefault();
                this.topInnerText.innerText = `${heroInfo.innerText}, ` + "which adventure calls you?"
                this.hero = heroInfo;
                this.fetchAndLoadAdventures(); 
            })
        })
    };


    fetchAndLoadAdventures() {
        this.adventuresAdapter
            .getAdventures()
            .then(adventures => {
                adventures.forEach(adventure => this.adventures.push(new Adventure(adventure)))
            })
            .then(() => {
                this.renderAdventures()
            })
    };

    renderAdventures() {
        this.adventures.forEach(adventure => {
            const adventureInfo = document.createElement('button');
            adventureInfo.className = "buttonHeros"

            adventureInfo.id = `${adventure.id}`; 
            adventureInfo.adventure_number = `${adventure.adventure_number}`; 
            adventureInfo.story = `${adventure.story}`; 
            adventureInfo.questions_1 = `${adventure.questions_1}`; 
            adventureInfo.questions_2 = `${adventure.questions_2}`; 
            adventureInfo.questions_3 = `${adventure.questions_3}`; 
            adventureInfo.questions_4 = `${adventure.questions_4}`; 
            adventureInfo.questions_5 =`${adventure.questions_5}`; 
            adventureInfo.answer_1 = `${adventure.answer_1}`; 
            adventureInfo.answer_2 = `${adventure.answer_2}`; 
            adventureInfo.answer_3 = `${adventure.answer_3}`;
            adventureInfo.answer_4 = `${adventure.answer_4}`;
            adventureInfo.answer_5 = `${adventure.answer_5}`;
            adventureInfo.background_image_questions_1_to_4 = `${adventure.background_image_questions_1_to_4}`;
            adventureInfo.background_music_1_4 = `${adventure.background_music_1_4}`;
            adventureInfo.background_image_question_5 = `${adventure.background_image_question_5}`;
            adventureInfo.background_music_5 = `${adventure.background_music_5}`;
            adventureInfo.background_image_won = `${adventure.background_image_won}`;
            adventureInfo.background_music_won = `${adventure.background_music_won}`;
            adventureInfo.background_image_loss = `${adventure.background_image_loss}`;
            adventureInfo.background_music_loss = `${adventure.background_music_loss}`;
            adventureInfo.background_image_incorrect = `${adventure.background_image_incorrect}`;
            adventureInfo.background_music_incorrect = `${adventure.background_music_incorrect}`;
            adventureInfo.phrase_incorrect = `${adventure.phrase_incorrect}`;
            adventureInfo.background_image_correct = `${adventure.background_image_correct}`;
            adventureInfo.background_music_correct = `${adventure.background_music_correct}`;
            adventureInfo.phrase_correct = `${adventure.phrase_correct}`;
            adventureInfo.q1_c1 = `${adventure.q1_c1}`; 
            adventureInfo.q1_c2 = `${adventure.q1_c2}`; 
            adventureInfo.q1_c3 = `${adventure.q1_c3}`; 
            adventureInfo.q2_c1 = `${adventure.q2_c1}`; 
            adventureInfo.q2_c2 = `${adventure.q2_c2}`; 
            adventureInfo.q2_c3 = `${adventure.q2_c3}`; 
            adventureInfo.q3_c1 = `${adventure.q3_c1}`; 
            adventureInfo.q3_c2 = `${adventure.q3_c2}`; 
            adventureInfo.q3_c3 = `${adventure.q3_c3}`; 
            adventureInfo.q4_c1 = `${adventure.q4_c1}`; 
            adventureInfo.q4_c2 = `${adventure.q4_c2}`; 
            adventureInfo.q4_c3 = `${adventure.q4_c3}`; 
            adventureInfo.q5_c1 = `${adventure.q5_c1}`; 
            adventureInfo.q5_c2 = `${adventure.q5_c2}`; 
            adventureInfo.q5_c3 = `${adventure.q5_c3}`; 
            adventureInfo.hero_id = `${adventure.hero_id}`; 

            adventureInfo.innerText = `${adventure.adventure_number}`; 
            
            if (adventureInfo.hero_id === this.hero.id) {
                this.topInnerText.appendChild(adventureInfo)
            }
        
            adventureInfo.addEventListener('click', (e)=> {
                e.preventDefault();  
                this.adventureInfo = adventureInfo
                this.storyInfo(); 
            })

        })
    };

    storyInfo() {
        this.musicAdventure(); 

        document.querySelector("div.box").style.backgroundImage = "url('./images/InnerBG/2.jpg')";         
        document.querySelector("#header").innerText = "Mini Question Adventure"; 

        this.topInnerText.classList.remove("selectUser");
        this.topInnerText.classList.add("story"); 

        this.topInnerText.innerText = this.adventureInfo.story;
        document.body.style.backgroundImage = this.adventureInfo.background_image_questions_1_to_4;
        this.hero.health = 1

        setTimeout(this.first_question.bind(this), 10000);
    }

    first_question() {

        document.querySelector("div.box").style.display = "block"
        document.querySelector("#header").innerText = "Mini Question Adventure"

        document.body.style.backgroundImage = this.adventureInfo.background_image_questions_1_to_4;
        this.topInnerText.innerText = this.adventureInfo.questions_1;
        this.topInnerText.className = "questions";

        this.wrapper_questions = document.createElement('div');
        this.wrapper_questions.className = "wrapper_questions";
        this.topInnerText.appendChild(this.wrapper_questions);

        this.firstChoice = document.createElement('Button');
        this.firstChoice.className = "buttons";
        this.firstChoice.innerText = this.adventureInfo.q1_c1;
        this.secondChoice = document.createElement('Button');
        this.secondChoice.className = "buttons";
        this.secondChoice.innerText = this.adventureInfo.q1_c2;
        this.thirdChoice = document.createElement('Button');
        this.thirdChoice.className = "buttons";
        this.thirdChoice.innerText = this.adventureInfo.q1_c3;

        this.wrapper_questions.appendChild(this.firstChoice);
        this.wrapper_questions.appendChild(this.secondChoice);
        this.wrapper_questions.appendChild(this.thirdChoice);


        this.wrapper_questions.addEventListener('click', (e)=> {
            e.preventDefault(); 
            if(e.target.innerText === this.adventureInfo.answer_1) {
                this.correctChoiceOne(); 
            } else if (e.target.innerText !== this.adventureInfo.answer_1 && this.hero.health > 0) { 
            this.wrongChoiceOne() 
            this.hero.health = 0 
            } else { 
                this.loss();
            }; 
        })
     };


    second_question() {

        document.querySelector("div.box").style.display = "block"
        document.querySelector("#header").innerText = "Mini Question Adventure"
        document.body.style.backgroundImage = this.adventureInfo.background_image_questions_1_to_4;
        this.topInnerText.innerText = this.adventureInfo.questions_2;

        this.wrapper_questions = document.createElement('div');
        this.wrapper_questions.className = "wrapper_questions";
        this.topInnerText.appendChild(this.wrapper_questions);

        this.firstChoice.innerText = this.adventureInfo.q2_c1;
        this.secondChoice.innerText = this.adventureInfo.q2_c2;
        this.thirdChoice.innerText = this.adventureInfo.q2_c3;

        this.wrapper_questions.appendChild(this.firstChoice);
        this.wrapper_questions.appendChild(this.secondChoice);
        this.wrapper_questions.appendChild(this.thirdChoice);

        this.wrapper_questions.addEventListener('click', (e)=> {
            if(e.target.innerText === this.adventureInfo.answer_2) {
                this.correctChoiceTwo(); 
            } else if (e.target.innerText !== this.adventureInfo.answer_2 && this.hero.health > 0) { 
            this.wrongChoiceTwo() 
            this.hero.health = 0 
            } else { 
                this.loss();
            }; 
        })
     };
    third_question() {

        document.querySelector("div.box").style.display = "block"
        document.querySelector("#header").innerText = "Mini Question Adventure"
        document.body.style.backgroundImage = this.adventureInfo.background_image_questions_1_to_4;
        this.topInnerText.innerText = this.adventureInfo.questions_3;

        this.wrapper_questions = document.createElement('div');
        this.wrapper_questions.className = "wrapper_questions";
        this.topInnerText.appendChild(this.wrapper_questions);

        this.firstChoice.innerText = this.adventureInfo.q3_c1;
        this.secondChoice.innerText = this.adventureInfo.q3_c2;
        this.thirdChoice.innerText = this.adventureInfo.q3_c3;

        this.wrapper_questions.appendChild(this.firstChoice);
        this.wrapper_questions.appendChild(this.secondChoice);
        this.wrapper_questions.appendChild(this.thirdChoice);

        this.wrapper_questions.addEventListener('click', (e)=> {
            if(e.target.innerText === this.adventureInfo.answer_3) {
                this.correctChoiceThree(); 
            } else if (e.target.innerText !== this.adventureInfo.answer_3 && this.hero.health > 0) { 
            this.wrongChoiceThree() 
            this.hero.health = 0 
            } else { 
                this.loss();
            }; 
        })
     };
    
    fourth_question() {

        document.querySelector("div.box").style.display = "block"
        document.querySelector("#header").innerText = "Mini Question Adventure"
        document.body.style.backgroundImage = this.adventureInfo.background_image_questions_1_to_4;
        this.topInnerText.innerText = this.adventureInfo.questions_4;

        this.wrapper_questions = document.createElement('div');
        this.wrapper_questions.className = "wrapper_questions";
        this.topInnerText.appendChild(this.wrapper_questions);

        this.firstChoice.innerText = this.adventureInfo.q4_c1;
        this.secondChoice.innerText = this.adventureInfo.q4_c2;
        this.thirdChoice.innerText = this.adventureInfo.q4_c3;

        this.wrapper_questions.appendChild(this.firstChoice);
        this.wrapper_questions.appendChild(this.secondChoice);
        this.wrapper_questions.appendChild(this.thirdChoice);

        this.wrapper_questions.addEventListener('click', (e)=> {
            if(e.target.innerText === this.adventureInfo.answer_4) {
                this.correctChoiceFour(); 
            } else if (e.target.innerText !== this.adventureInfo.answer_4 && this.hero.health > 0) { 
            this.wrongChoiceFour() 
            this.hero.health = 0 
            } else { 
                this.loss();
            }; 
        })
     };

    fifth_question() {

        document.querySelector("div.box").style.display = "block"
        document.querySelector("#header").innerText = "Mini Question Adventure"
        document.body.style.backgroundImage = this.adventureInfo.background_image_question_5;
        this.topInnerText.innerText = this.adventureInfo.questions_5;

        this.wrapper_questions = document.createElement('div');
        this.wrapper_questions.className = "wrapper_questions";
        this.topInnerText.appendChild(this.wrapper_questions);

        this.firstChoice.innerText = this.adventureInfo.q5_c1;
        this.secondChoice.innerText = this.adventureInfo.q5_c2;
        this.thirdChoice.innerText = this.adventureInfo.q5_c3;

        this.wrapper_questions.appendChild(this.firstChoice);
        this.wrapper_questions.appendChild(this.secondChoice);
        this.wrapper_questions.appendChild(this.thirdChoice);

        this.wrapper_questions.addEventListener('click', (e)=> {
            if(e.target.innerText === this.adventureInfo.answer_5) {
                this.correctChoiceFive(); 
            } else if (e.target.innerText !== this.adventureInfo.answer_5 && this.hero.health > 0) { 
            this.wrongChoiceFive() 
            this.hero.health = 0 
            } else { 
                this.loss();
            }; 
        })
     };

    updateUser() {

        this.userId = this.user.id
        this.number = this.adventureInfo.id

        if (this.number === "1") {
            this.user.won_adventure_1 = "true"
        }
        if (this.number === "2") {
            this.user.won_adventure_2 = "true"
        }
        if (this.number === "3") {
            this.user.won_adventure_3 = "true"
        }
        if (this.number === "4") {
            this.user.won_adventure_4 = "true"
        }
    this.adapter.editUser(this.userId, this.user)
    
        this.won(); 

    }


    wrongChoiceOne() {
        document.body.style.backgroundImage = this.adventureInfo.background_image_loss;
        document.querySelector("div.box").style.display = "none"
        document.querySelector("#header").innerText = "One more chance hero";   

        setTimeout(this.first_question.bind(this), 2000);
    }; 

    wrongChoiceTwo() {

        document.body.style.backgroundImage = this.adventureInfo.background_image_loss;
        document.querySelector("div.box").style.display = "none"
        document.querySelector("#header").innerText = "One more chance hero"; 

        setTimeout(this.second_question.bind(this), 2000);
    }; 

    wrongChoiceThree() {
        document.body.style.backgroundImage = this.adventureInfo.background_image_loss;
        document.querySelector("div.box").style.display = "none"
        document.querySelector("#header").innerText = "One more chance hero"; 

        setTimeout(this.third_question.bind(this), 2000);
    }; 

    wrongChoiceFour() {

        document.body.style.backgroundImage = this.adventureInfo.background_image_loss;
        document.querySelector("div.box").style.display = "none"
        document.querySelector("#header").innerText = "One more chance hero"; 

        setTimeout(this.fourth_question.bind(this), 2000);
    }; 

    wrongChoiceFive() {

        document.body.style.backgroundImage = this.adventureInfo.background_image_loss;
        document.querySelector("div.box").style.display = "none"
        document.querySelector("#header").innerText = "One more chance hero";  

        setTimeout(this.fifth_question.bind(this), 2000);
    }; 

    correctChoiceOne() {
        document.querySelector("#header").innerText = "You're one more step to Victory!!"; 
        document.querySelector("div.box").style.display = "none" 
        setTimeout(this.second_question.bind(this), 2000);
    }; 

    correctChoiceTwo() {
        document.querySelector("#header").innerText = "You're one more step to Victory!!";   
        document.querySelector("div.box").style.display = "none"
        setTimeout(this.third_question.bind(this), 2000);
    }; 

    correctChoiceThree() {
        document.querySelector("#header").innerText = "You're one more step to Victory!!";  
        document.querySelector("div.box").style.display = "none" 
        setTimeout(this.fourth_question.bind(this), 2000);
    }; 

    correctChoiceFour() {
        document.querySelector("#header").innerText = "You're one more step to Victory!!";  
        document.querySelector("div.box").style.display = "none"
        setTimeout(this.fifth_question.bind(this), 2000);
    }; 

    correctChoiceFive() {
        document.body.style.backgroundImage = this.adventureInfo.background_image_won;
        document.querySelector("#header").innerText = "Victory is yours " + `${this.user.name}` + "!!" + "Congratulations";   
        setTimeout(this.updateUser.bind(this), 1);
    }; 

    loss() {
        this.musicLoss();

        this.topInnerText.classList.remove("questions")
        this.topInnerText.classList.add("story"); 
        this.topInnerText.innerText  = this.adventureInfo.phrase_incorrect;   
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "black";
        document.querySelector("div.box").style.backgroundImage = this.adventureInfo.background_image_loss; 

        setTimeout(this.storyInfo.bind(this), 4000);
    }; 

    restart() {
        location.reload()
    }; 

    won() {
        this.musicWon(); 

        this.topInnerText.classList.remove("questions")
        this.topInnerText.classList.add("story"); 
        document.body.style.backgroundImage = this.adventureInfo.background_image_won;
        this.topInnerText.innerText = this.adventureInfo.phrase_correct; 

        setTimeout(this.restart.bind(this), 10000);
    }; 

    restart() {
        location.reload()
    }; 
}


























/*    signin_form() {
        const topInnerText = document.querySelector(".topInnerText")
        topInnerText.classList.add("top_sign_in")
        topInnerText.classList.remove("topInnerText")
        topInnerText.innerText = "How do we know your our brave hero?"
        const signin_form = document.querySelector(".signin_form")
        signin_form.style.display = "block"
        topInnerText.appendChild(signin_form)
        const signin_form_button = document.querySelector('#Login')
        signin_form_button.addEventListener('click', (e) => {
            e.preventDefault()
            topInnerText.innerText = "worked"
        })
    }
*/

/*    login () {
        const topInnerText = document.querySelector(".topInnerText");
        topInnerText.classList.add("login")
        topInnerText.classList.remove("topInnerText");
        topInnerText.innerText = "Welcome Back Hero"
        const divLogin = document.createElement('field')
        divLogin.className = "divlogin"
        topInnerText.appendChild(divLogin)
        const login_username = document.createElement('text_field')
        login_username.className = "login_info"
        login_username.innerText= "Username"
        divLogin.appendChild(login_username)
        const login_password = document.createElement('password')
        login_password.className = "login_info"
        login_password.innerText= "Password"
        divLogin.appendChild(login_password)
    }
*/