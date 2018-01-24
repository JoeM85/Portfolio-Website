
var model = {
    quotesArray: [
        {
            quote: "Fortune favors the bold.",
            author: "Virgil"
    },
        {
            quote: "Reality leaves a lot to the imagination.",
            author: "John Lennon"
    },
        {
            quote: "Whatever the mind of man can conceive and believe, it can achieve.",
            author: "Napoleon Hill"
    },
        {
            quote: "Strive not to be a success, but rather to be of value.",
            author: "Albert Einstein"
    },
        {
            quote: "You miss 100% of the shots you don’t take.",
            author: "Wayne Gretzky"
    },
        {
            quote: "Every strike brings me closer to the next home run.",
            author: "Babe Ruth"
    },
        {
            quote: "We become what we think about.",
            author: "Earl Nightingale"
    },
        {
            quote: "Life is 10% what happens to me and 90% of how I react to it.",
            author: "Charles Swindoll"
    },
        {
            quote: "The mind is everything. What you think you become.",
            author: "Buddha"
    },
        {
            quote: "An unexamined life is not worth living.",
            author: "Socrates"
    },
        {
            quote: "Eighty percent of success is showing up.",
            author: "Woody Allen"
    },
        {
            quote: "I am not a product of my circumstances. I am a product of my decisions.",
            author: "Stephen Covey"
    },
        {
            quote: "Life shrinks or expands in proportion to one's courage.",
            author: "Anais Nin"
    },
        {
            quote: "Believe you can and you’re halfway there.",
            author: "Theodore Roosevelt"
    },
        {
            quote: "Everything you’ve ever wanted is on the other side of fear.",
            author: "George Addair"
    },
        {
            quote: "When I let go of what I am, I become what I might be.",
            author: "Lao Tzu"
    },
        {
            quote: "I didn’t fail the test. I just found 100 ways to do it wrong.",
            author: "Benjamin Franklin"
    },
        {
            quote: "A person who never made a mistake never tried anything new.",
            author: "Albert Einstein"
    },
        {
            quote: "It is never too late to be what you might have been.",
            author: "George Eliot"
    },
        {
            quote: "The question isn’t who is going to let me; it’s who is going to stop me.",
            author: "Ayn Rand"
    }],
    randomNumber: 0,
};


var controller = {
    // Selects random number for the quotes array to use
    getRandomNumber: function () {
        model.randomNumber = Math.floor(Math.random() * model.quotesArray.length);
    },
    // Displays the randomly selected quote
    displayQuote: function () {
        view.quoteDisplay.innerHTML = '" ' + model.quotesArray[model.randomNumber].quote + ' "';
        view.authorDisplay.innerHTML = '- ' + model.quotesArray[model.randomNumber].author;
    },
    // Adds users quote to quotes array
    addUserQuote: function () {
        console.log(model.quotesArray.author);
        model.quotesArray.push({
            quote: view.userQuote.value,
            author: view.userQuote.value
        });
    },
    // Checks if both text fields are filled out and if so clears inputs and closes modal
    checkInputs: function () {
        if (view.userQuote.value === "" || view.userAuthor.value === "") {
            alert("Hey you need to fill out both text fields");
        } else if (typeof (view.userQuote.value) === "string" &&
            typeof (view.userAuthor.value) === "string") {
            this.addUserQuote();
            view.userQuote.value = "";
            view.userAuthor.value = "";
            view.closeModalDisplay();
        }
    },
    initApp: function () {
        view.init();
    }
}

var view = {
    // Set elements to variables and adds click handlers
    init: function () {
        this.quoteDisplay = document.querySelector('.quote');
        // Keeps quote text visible after animation end and removes the animation class
        this.quoteDisplay.addEventListener("webkitAnimationEnd", function () {
            this.style.opacity = 1;
            this.classList.remove("text-appear");
        });
        this.authorDisplay = document.querySelector('.author');
        // Keeps author text visible after animation end and removes the animation class
        this.authorDisplay.addEventListener("webkitAnimationEnd", function () {
            this.style.opacity = 1;
            this.classList.remove("slide-up");
        });
        this.modal = document.querySelector('.modal');
        this.userQuote = document.querySelector('.user-quote');
        this.userAuthor = document.querySelector('.user-author');
        this.userQuoteModal = document.querySelector('.add-quote-btn').addEventListener('click', function () {
            this.openModalDisplay();
        }.bind(this));
        // Makes text invisable and adds animation classes to make the text reappear
        this.quoteBtn = document.querySelector('.quote-btn').addEventListener('click', function () {
            this.quoteDisplay.style.opacity = 0;
            this.authorDisplay.style.opacity = 0;
            controller.getRandomNumber();
            controller.displayQuote();
            this.quoteDisplay.classList.add('text-appear');
            this.authorDisplay.classList.add('slide-up');
        }.bind(this));
        this.xBtn = document.querySelector('.x-button').addEventListener('click', function () {
            this.closeModalDisplay();
        }.bind(this));
        this.addedQuote = document.querySelector('.add-user-quote').addEventListener('click', function () {
            controller.checkInputs();
        })
    },
    // Opens modal
    openModalDisplay: function () {
        this.modal.style.display = "block";
        this.modal.classList.add("modal-slide-down");
    },
    // Closes modal 
    closeModalDisplay: function () {
        this.modal.style.display = "none";
        this.modal.classList.remove("modal-slide-down");
    }
}
controller.initApp();
