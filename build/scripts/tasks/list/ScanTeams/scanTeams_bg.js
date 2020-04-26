class ScanTeams_OpenHome extends Step {
    constructor() {
        super("OpenHome");
    }

    onFinish(id, task, teamCount) {
        task.teamCount = teamCount;
        task.assignTabStep(id, new ScanTeams_IntoClass(), 0);
    }
}

class ScanTeams_IntoClass extends Step {
    constructor() {
        super("IntoClass");
    }

    onFinish(id, task) {
        task.removeTab(id);
        task.assignTabStep(id, new ScanTeams_IntoAssignments(), 0);
    }
}

class ScanTeams_IntoAssignments extends Step {
    constructor() {
        super("IntoAssignments");
    }

    onFinish(id, task) {
        task.removeTab(id);
        //task.assignTabStep(id, new ScanTeams_GetAssignmentsLink(), 0);
    }
}

class ScanTeams_GetAssignmentsLink extends Step {
    constructor() {
        super("GetAssignmentsLink");
    }

    onFinish(id, task) {
        task.removeTab(id);
        task.assignTabStep(id, new ScanTeams_GetAssignmentsLink(), 0);
    }
}

class ScanTeams extends Task {
    constructor() {
        super("ScanTeams");
        this.window = undefined;
        this.index = 0;
    }

    start() {
        var that = this;

        createWindow({
            "url": "https://teams.microsoft.com/_#/school//?ctx=teamsGrid" // home page
        }, function (window) {
            that.window = window;

            var id = window.tabs[0].id;

            that.addTab(id);
            that.assignTabStep(id, new ScanTeams_OpenHome);
            that.index = 0;
        });
    }
}