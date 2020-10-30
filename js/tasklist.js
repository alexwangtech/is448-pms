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
        let mainDiv = document.getElementById(this.divId);

        this.testData.forEach((item) => {

            // create the card outline and add class + style
            let card = document.createElement('div');
            card.classList.add('card');
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

            // append the card into the main <div>
            mainDiv.append(card);
        });
    }
}

var taskList = new TaskList('taskList');
