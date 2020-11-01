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
