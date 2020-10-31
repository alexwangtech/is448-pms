class TaskList {
    constructor(divId) {
        this.divId = divId;

        this.testData = [
            {
                taskName: "Write a report",
                taskDueDate: "2020-10-30",
                description: "Please write a report about cats."
            },
            {
                taskName: "Cook some pasta",
                taskDueDate: "2020-10-29",
                description: "Our manager is hungry, please cook some pasta for him!"
            },
            {
                taskName: "Buy a gaming laptop",
                taskDueDate: "2020-11-05",
                description: "We want to be able to play Mario Kart!"
            },
            {
                taskName: "Download VSCode",
                taskDueDate: "2020-09-26",
                description: "You need an IDE to program faster, idiot!"
            }
        ];

        this.renderData();
    }

    renderData() {
        // CONSTANTS
        const LINE_LIMIT = 4; // only 4 items per line

        let mainDiv = document.getElementById(this.divId);

        let flexDiv;
        let counter = 1; // start at 1, increment towards "LINE_LIMIT"

        this.testData.forEach((item) => {

            // create the outer div (for margins/spacing)
            let outerDiv = document.createElement('div');
            outerDiv.classList.add('m-3');

            // create the card outline and add class + style
            let card = document.createElement('div');
            card.classList.add('card', 'shadow', 'p-3', 'mb-5', 'bg-white', 'rounded', 'h-100');
            card.style.width = '18rem';

            // create the card body
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            // create the card title
            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.innerHTML = item['taskName'];

            // create the card subtitle
            let cardSubtitle = document.createElement('h6');
            cardSubtitle.classList.add('card-subtitle', 'mb-2', 'text-muted');
            cardSubtitle.innerHTML = item['taskDueDate'];

            // create the card description
            let cardDescription = document.createElement('p');
            cardDescription.classList.add('card-text');
            cardDescription.innerHTML = item['description'];

            // append all of the card body items into the card body
            cardBody.append(cardTitle);
            cardBody.append(cardSubtitle);
            cardBody.append(cardDescription);

            // append the card body into the card
            card.append(cardBody);

            // append the card into the outer div
            outerDiv.append(card);

            // if this is the beginning of the line, create the flex div + append to it + increment
            if (counter === 1) {
                flexDiv = document.createElement('div');
                flexDiv.classList.add('d-flex');
                outerDiv.classList.remove('m-3');
                outerDiv.classList.add('ml-0', 'mr-3', 'mt-3', 'mb-3');
                flexDiv.append(outerDiv);
                counter = counter + 1;
            }
            // if this is the end of the line, append + reset counter
            else if (counter === LINE_LIMIT) {
                flexDiv.append(outerDiv);
                mainDiv.append(flexDiv);
                counter = 1;
            }
            // otherwise, just append it to the flex div normally + increment
            else {
                flexDiv.append(outerDiv);
                counter = counter + 1;
            }
        });
    }
}

var taskList = new TaskList('taskList');
