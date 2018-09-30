// Enemies Class
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 300;
        this.sprite = "game_images/enemy-bug.png";
        this.spriteReverse = "game_images/enemy-bug-reverse.png";
        this.startingPoint = this.x;
    }
    update(dt) {
        if(this.x <= 505) {
            this.x += this.speed * dt;
        } else {
            this.x = this.startingPoint;
        }  
        if(this.x < player.x + 30 && this.x + 60 > player.x && this.y + 60 > player.y && this.y < player.y + 60){
            gameBoard.playerHitSound.play();
            gameBoard.loseLife();
            player.reset();
        }
    }
    reverse(dt) {
        if(this.x >= -80) {
            this.x -= this.speed * dt;
        } else {
            this.x = this.startingPoint;
        }
        if(this.x < player.x + 30 && this.x + 60 > player.x && this.y + 60 > player.y && this.y < player.y + 60){
            gameBoard.playerHitSound.play();
            gameBoard.loseLife();
            player.reset();
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    reverseRender() {
        ctx.drawImage(Resources.get(this.spriteReverse), this.x, this.y);
    }
     
}
// Gem Class
class Gem {
    constructor() {
        this.sprite = 'game_images/gem-blue-1.png';
        this.x = 2000;
        this.y = 2000;
        this.gemCount = document.querySelector("#gem-count");
        this.gemPickUp = document.querySelector("#gemPickUp");
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    gotGem() {
        this.gemPickUp.play();
    }
    appear() {

        this.x = Math.floor(Math.random() * (420 - 30 + 1)) + 30;
        this.y = Math.floor(Math.random() * (220 - 60 + 1)) + 60;
        setTimeout(() => {
            this.reset();
        }, 4500);
    }
    update() {
        if(this.x < player.x + 80 && this.x + 40 > player.x && this.y + 30 > player.y && this.y < player.y + 80) {
            this.gotGem();
            this.reset();
            this.gemCount.innerHTML++;
            if(this.gemCount.innerHTML === "3") {
                gameBoard.addExtraLife();
                this.gemCount.innerHTML = 0;
            }
        };
    }
    reset() {
        this.x = 2000;
        this.y = 2000;
    }
}

//Player Class
class Player {
    constructor() {
        this.x = 200;
        this.y = 380;
    }
    update(dt) {
        if (player.y < 20) {
            gameBoard.playerScoredSound.play();
            this.reset();
            gameBoard.scored();
        }
    }
    charSelect(elem) {
        let selectedChar = elem;
        selectedChar = selectedChar.substring(selectedChar.length, selectedChar.indexOf('game'));
        this.sprite = selectedChar; 
        console.log(this.sprite)
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(direction) {
        if (direction === "left" && this.x > 0) {
            this.x -= 50; 
        }
        if (direction === "right" && this.x < 400) {
            this.x += 50;  
        }
        if (direction === "up" && this.y >= 20) {
            this.y -= 50;
        }
        if (direction === "down" && this.y < 380) {
            this.y += 50;   
        }
    }
    reset() {
        this.x = 200;
        this.y = 380;
    }
}

const gameBoard = {
    score: document.querySelector("#score"),
    bugNumber: 0,
    completedTrips: 0,
    playerScoredSound: document.getElementById('scored'),
    playerMovementSound: document.getElementById('movement'),
    playerHitSound: document.getElementById('playerHit'),
    gameOver: document.querySelector(".game-over"),
    gameOverNewHighScore: document.querySelector(".high-score"),
    lifeCount: document.querySelector("#life-count"),
    scoreElems: [...document.querySelectorAll('.scoreboard-score')],
    lifeImg: document.querySelector(".life-img"),
    setLifeImage: function(imgSrc) {
        this.lifeImg.src = `${imgSrc}`;
    },
    checkScore: function() {
        const scoreValues = this.scoreElems.map(score => score.innerHTML);
        const score = this.score.innerHTML;
        if(parseInt(score) === this.completedTrips) {  
            if(parseInt(score) > scoreValues[9] ||
                scoreValues.length < 10) {
                displayHighScore.innerHTML = score;
                this.showNewHighScoreScreen(score);
            } else {
                this.showGameOverScreen();
            }
        } else {
            alert("Nice try cheater");
            this.showGameOverScreen();
        }
        this.score.innerHTML = 0;
            
    },
    scored: function() {
        this.score.innerHTML++;
        this.completedTrips++;
         if(Number(this.score.innerHTML) % 5 === 0) {
            gem.appear();
         }
         if(Number(this.score.innerHTML) % 10 === 0) {
            allEnemies.forEach(enemy => enemy.speed += 50);
         }
        this.increaseBugCount();
    },
    increaseBugCount: function() {
        if(this.score.innerHTML % 20 === 0 && allEnemies.length < 6) {
            const extraBugs = [bugFour, bugFive, bugSix];
            allEnemies.push(extraBugs[this.bugNumber]);
            this.bugNumber++;
        } else if(allEnemies.length > 6) {
            return;
        }
    },
    addExtraLife: function() {
        this.lifeCount.innerHTML++;
    },
    loseLife: function() {
       this.lifeCount.innerHTML--;
       
       if(this.lifeCount.innerHTML === "0") {
           this.checkScore();
           this.lifeCount.innerHTML = 3;
       }       
    },
    addPlayerMovement: function() {
        // Get the keycodes for movement and assign the text value to it.
        document.addEventListener("keyup", e => {
        const allowedKeys = {
            37: "left",
            38: "up",
            39: "right",
            40: "down"
        }; 
        // Only add movement sound to allowedkeys    
        for(const [value] of Object.entries(allowedKeys)) {
             if(value === e.keyCode.toString()) {
                this.playerMovementSound.play(); 
                 if(newHighScoreAdd.classList.contains("appear") ||
                     over.classList.contains("appear")) {
                    this.playerMovementSound.src = "";
                    return false;
                }     
             }
        };    
        player.handleInput(allowedKeys[e.keyCode]);   
        })
    },
    showGameOverScreen: function() {
        this.gameOver.classList.add("appear"); 
    },
    showNewHighScoreScreen: function newHighScore(score) {
        const hidden = document.querySelector('.hidden');
        hidden.setAttribute('value', score);
        this.gameOverNewHighScore.classList.add("appear"); 
    }
}

const startMenu = {
    girlChar: document.querySelector("#girl-char"),
    boyChar: document.querySelector("#boy-char"),
    startValue: "",
    // Set the character image and lifes images according to the selected src
    charSelect: function() { 
        document.querySelector('.char-select').addEventListener("click", e => {
            player.charSelect(e.target.src);
            gameBoard.setLifeImage(e.target.src);
            if(this.startValue === false) {
                return;
            }
            this.startValue = true;
            this.startGame(this.startValue);
        })
    },
    startGame: function(value) {
            if(value) {
                allEnemies.push(bugOne, bugTwo, bugThree); 
                engine();
                $('#start-screen').fadeOut(400);
                document.querySelector('.diff-select').play();
                return this.startValue = false;
            }
    }
}

startMenu.charSelect();

const player = new Player();
const bugOne = new Enemy(750, 60);
const bugTwo = new Enemy(-310, 140);
const bugThree = new Enemy(-180, 220);
const bugFour = new Enemy(-800, 60);
const bugFive = new Enemy(-600, 140);
const bugSix = new Enemy(-700, 220);
const allEnemies = [];
const gem = new Gem();
const over = document.querySelector(".game-over");
const newHighScoreAdd = document.querySelector(".high-score");
const displayHighScore = document.querySelector(".new-high-score");



