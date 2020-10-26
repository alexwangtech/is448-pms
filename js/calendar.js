(function () {

    // CONSTANTS
    const ID = 'calendar';
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];

    // Members
    let mainDiv;
    let header;
    let table;
    let buttonDiv;
    let prevButton;
    let nextButton;
    let currMonth;
    let currDay;
    let currDate;
    let currYear;

    function init() {
        // Create the main layout elements
        mainDiv = document.getElementById(ID);
        header = document.createElement('h2');
        header.classList.add('w-100');
        table = document.createElement('table');
        buttonDiv = document.createElement('div');

        // get the current date,sot hat we can set it on the calendar
        let date = new Date();
        currMonth = date.getMonth() + 1; // REMEMBER: The range is 0-11, so we need to increment
        currDay = date.getDay(); // REMEMBER: THe range is 0-6, NOT 1-7
        currDate = date.getDate();
        currYear = date.getFullYear();

        // create the buttons + event listeners
        prevButton = document.createElement('button');
        prevButton.innerHTML = 'Previous';
        nextButton = document.createElement('button');
        nextButton.innerHTML = 'Next';
        buttonDiv.appendChild(prevButton);
        buttonDiv.appendChild(nextButton);

        prevButton.addEventListener('click', function () {
            if (currMonth == 1) {
                currMonth = 12;
                --currYear;
            } else {
                --currMonth;
            }

            renderCalendar();
        });

        nextButton.addEventListener('click', function () {
            if (currMonth == 12) {
                currMonth = 1;
                ++currYear;
            } else {
                ++currMonth;
            }

            renderCalendar();
        });

        // create the top div using flexbox properties for alignment
        let topDiv = document.createElement('div');
        topDiv.classList.add('d-flex', 'justify-content-center');
        topDiv.appendChild(header);
        let rightDiv = document.createElement('div');
        rightDiv.classList.add('d-flex', 'justify-content-end');
        rightDiv.appendChild(prevButton);
        rightDiv.appendChild(nextButton);
        topDiv.appendChild(rightDiv);

        mainDiv.appendChild(topDiv);
        mainDiv.appendChild(table);
        mainDiv.append(buttonDiv);

        renderCalendar();
    }

    function renderCalendar() {
        // clear everything
        table.innerHTML = '';

        // render the current month
        header.innerHTML = MONTHS[currMonth - 1] + " " + currYear;

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
            table.appendChild(tableHeaderRow);
        }

        // to make sure we render on the right weekday
        let firstDayRendered = false;
        let count = 1;
        let daysInMonth = getDaysInMonth(currMonth, currYear);
        let firstDay = getFirstDay(currYear, currMonth - 1);

        while (count <= daysInMonth) {
            let currRow = document.createElement('tr');

            for (let i = 0; i < 7; i++) {
                let currTd = document.createElement('td');
                currTd.classList.add('border');

                if (!firstDayRendered) {
                    console.log('i value: ' + i);
                    console.log('currDay: ' + currDay);

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

            table.appendChild(currRow);
        }
    }

    /* 
     * Get the number of days in a month
     * Source: https://www.w3resource.com/javascript-exercises/javascript-date-exercise-3.php
     * https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
     */
    function getDaysInMonth(month, year) {
        // Here January is 1 based
        //Day 0 is the last day in the previous month
        return new Date(year, month, 0).getDate();
        // Here January is 0 based
        // return new Date(year, month+1, 0).getDate();
    };

    function getFirstDay(year, monthIndex) {
        return new Date(year, monthIndex, 1).getDay();
    }

    init();
})();