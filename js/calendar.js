class Calendar {
    // CONSTANTS
    MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];

    constructor(mainDiv) {
        this.mainDiv = mainDiv;

        // Create the main layout elements
        mainDiv = document.getElementById(mainDiv);
        this.header = document.createElement('h2');
        this.header.classList.add('w-100');
        this.table = document.createElement('table');
        this.buttonDiv = document.createElement('div');

        // get the current date,sot hat we can set it on the calendar
        let date = new Date();
        this.currMonth = date.getMonth() + 1; // REMEMBER: The range is 0-11, so we need to increment
        this.currDay = date.getDay(); // REMEMBER: THe range is 0-6, NOT 1-7
        this.currDate = date.getDate();
        this.currYear = date.getFullYear();

        // create the buttons + event listeners
        this.prevButton = document.createElement('button');
        this.prevButton.classList.add('btn', 'btn-outline-secondary');
        this.prevButton.innerHTML = '&lt;';
        this.nextButton = document.createElement('button');
        this.nextButton.classList.add('btn', 'btn-outline-secondary');
        this.nextButton.innerHTML = '&gt;';
        this.buttonDiv.appendChild(this.prevButton);
        this.buttonDiv.appendChild(this.nextButton);

        this.prevButton.addEventListener('click', () => {
            if (this.currMonth == 1) {
                this.currMonth = 12;
                --this.currYear;
            } else {
                --this.currMonth;
            }

            this.renderCalendar();
        });

        this.nextButton.addEventListener('click', () => {
            if (this.currMonth == 12) {
                this.currMonth = 1;
                ++this.currYear;
            } else {
                ++this.currMonth;
            }

            this.renderCalendar();
        });

        // get the task data
        this.taskData = this.getData();

        // create the top div using flexbox properties for alignment
        let topDiv = document.createElement('div');
        topDiv.classList.add('d-flex', 'justify-content-center');
        topDiv.appendChild(this.header);
        let rightDiv = document.createElement('div');
        rightDiv.classList.add('d-flex', 'justify-content-end');
        rightDiv.appendChild(this.prevButton);
        rightDiv.appendChild(this.nextButton);
        topDiv.appendChild(rightDiv);

        mainDiv.appendChild(topDiv);
        mainDiv.appendChild(this.table);
        mainDiv.append(this.buttonDiv);

        this.renderCalendar();
    }

    getData() {
        const testData = [
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
            },
            {
                taskName: "Purchase Office 360",
                taskDueDate: "2020-10-31",
                description: "We need to be able to use Microsoft Office stuff."
            },
            {
                taskName: "Restock on paper",
                taskDueDate: "2020-11-20",
                description: "We need more paper. Lol."
            },
            {
                taskName: "Rent an office",
                taskDueDate: "2019-01-01",
                description: "We really need an office place or something."
            }
        ];

        return testData;
    }

    displayTasks(day) {
        // get all the tasks associated with this current date
        let todayTasks = [];

        this.taskData.forEach((item) => {
            // get the month, year, and date
            const itemYear = parseInt(item['taskDueDate'].substring(0, 4));
            const itemMonth = parseInt(item['taskDueDate'].substring(5, 7));
            const itemDate = parseInt(item['taskDueDate'].substring(8, 10));

            // compare the values to the current provided values
            if (itemYear === this.currYear &&
                itemMonth === this.currMonth &&
                itemDate === day) {
                todayTasks.push(item);
            }

            console.log(itemYear, this.currYear);
            console.log(itemMonth, this.currMonth);
            console.log(itemDate, day);
        });

        // DEBUG
        console.dir(todayTasks);

        // get the div for displaying tasks (refactor this later as an object argument)
        let tasksDiv = document.getElementById('tasksDiv');

        // clear the tasks div
        tasksDiv.innerHTML = '';

        // for each item in the 'todayTasks' array, we want to display the tasks
        // --------------
        todayTasks.forEach((item) => {
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

            // append the outer div into the tasks div
            tasksDiv.append(outerDiv);
        });

        // if the tasks div still has nothing, append "no tasks"
        if (tasksDiv.innerHTML === '') {
            let noTasks = document.createElement('h3');
            noTasks.innerHTML = 'No Tasks';
            tasksDiv.append(noTasks);
        }
    }

    renderCalendar() {
        // clear everything
        this.table.innerHTML = '';

        // render the current month
        this.header.innerHTML = this.MONTHS[this.currMonth - 1] + " " + this.currYear;

        // create the weekday headers
        let tableHeaderRow = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            let tableHeader = document.createElement('th');
            switch (i) {
                case 0:
                    tableHeader.innerHTML = 'Sun';
                    break;
                case 1:
                    tableHeader.innerHTML = 'Mon';
                    break;
                case 2:
                    tableHeader.innerHTML = 'Tue';
                    break;
                case 3:
                    tableHeader.innerHTML = 'Wed';
                    break;
                case 4:
                    tableHeader.innerHTML = 'Thu';
                    break;
                case 5:
                    tableHeader.innerHTML = 'Fri';
                    break;
                case 6:
                    tableHeader.innerHTML = 'Sat';
                    break;
            }
            tableHeaderRow.appendChild(tableHeader);
            this.table.appendChild(tableHeaderRow);
        }

        // to make sure we render on the right weekday
        let firstDayRendered = false;
        let count = 1;
        let daysInMonth = this.getDaysInMonth(this.currMonth, this.currYear);
        let firstDay = this.getFirstDay(this.currYear, this.currMonth - 1);

        while (count <= daysInMonth) {
            let currRow = document.createElement('tr');

            for (let i = 0; i < 7; i++) {
                let currTd = document.createElement('td');
                currTd.classList.add('border');

                if (!firstDayRendered) {
                    if (i == firstDay) {
                        currTd.innerHTML = count;
                        firstDayRendered = true;
                        ++count;
                    }
                } else {
                    if (count <= daysInMonth)
                        currTd.innerHTML = count;
                    ++count;
                }

                // add an event listener to the table data
                currTd.addEventListener('click', function () {
                    this.displayTasks(parseInt(currTd.innerHTML));
                }.bind(this));

                currRow.appendChild(currTd);
            }

            this.table.appendChild(currRow);
        }
    }

    /* 
     * Get the number of days in a month
     * Source: https://www.w3resource.com/javascript-exercises/javascript-date-exercise-3.php
     * https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
     */
    getDaysInMonth(month, year) {
        // Here January is 1 based
        //Day 0 is the last day in the previous month
        return new Date(year, month, 0).getDate();
        // Here January is 0 based
        // return new Date(year, month+1, 0).getDate();
    }

    getFirstDay(year, monthIndex) {
        return new Date(year, monthIndex, 1).getDay();
    }
}

var calendar = new Calendar('calendar');
