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
                description: "Our manager is hungry, please cook some past for him!"
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
    }

    renderData() {
        let mainDiv = document.getElementById(this.divId);

        this.testData.forEach((item) => {
            let curr = document.createElement('div');

            for (const property in item) {
                let foo = document.createElement('h3');
                foo.innerHTML = item[property];
                curr.appendChild(foo);
            }

            mainDiv.appendChild(curr);
        });
    }
}

var taskList = new TaskList('taskList');
taskList.renderData();
