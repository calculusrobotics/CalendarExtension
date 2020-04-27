Tasks.ScanTeams = {};

class ScanTeams_OpenHome extends Step {
    constructor() {
        super("OpenHome");
    }

    onFinish(id, task, teamCount) {
        task.teamCount = teamCount;
        task.assignTabStep(id, Tasks.ScanTeams.IntoClass, 0);

        var j = 1;

        for (var i = 1; i < teamCount; i++) {
            createTab({
                "windowId": task.window.id,
                "url": "https://teams.microsoft.com/_#/school//?ctx=teamsGrid",
                "active": true
            }, function (tab) {
                task.addTab(tab.id);
                task.assignTabStep(tab.id, Tasks.ScanTeams.IntoClass, j);
                j++;
            });
        }
    }
}

class ScanTeams_IntoClass extends Step {
    constructor() {
        super("IntoClass");
    }

    onFinish(id, task) {
        task.removeTab(id);
        task.assignTabStep(id, Tasks.ScanTeams.IntoAssignments);
    }
}

class ScanTeams_IntoAssignments extends Step {
    constructor() {
        super("IntoAssignments");
    }

    onFinish(id, task, succ) {
        task.removeTab(id);
        brows.tabs.remove(id);
        //task.assignTabStep(id, new ScanTeams_GetAssignmentsLink(), 0);
        //console.log(dt);
    }
}

// class ScanTeams_Reload extends Step {
//     constructor() {
//         super("Reload");
//     }

//     onFinish(id, task, succ) {
//         task.removeTab(id);
//         brows.tabs.remove(id);
//         task.assignTabStep(id, new ScanTeams_GetAssignmentsLink(), 0);
//     }
//}

class ScanTeams_GetAssignmentsLink extends Step {
    constructor() {
        super("GetAssignmentsLink");
    }

    onFinish(id, task) {
        console.log(id);
        //task.removeTab(id);
        console.log(id);
        //task.assignTabStep(id, new ScanTeams_GetAssignmentsLink(), 0);
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
            that.assignTabStep(id, Tasks.ScanTeams.OpenHome);
        });
    }
}

Tasks.ScanTeams.OpenHome = new ScanTeams_OpenHome();
Tasks.ScanTeams.IntoClass = new ScanTeams_IntoClass();
Tasks.ScanTeams.IntoAssignments = new ScanTeams_IntoAssignments();