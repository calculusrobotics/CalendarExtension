Tasks.ScanTeams = {}

var OpenHome = {};

OpenHome.test = function() {
    OpenHome.teams = document.getElementsByClassName("team-card");
    return OpenHome.teams.length != 0;
}

OpenHome.finish = function () {
    finish(OpenHome.teams.length);
}

OpenHome.execute = function() {
    if (!OpenHome.test()) {
        var int = setInterval(function () {
            if (OpenHome.test()) {
                clearInterval(int);
                OpenHome.finish();
            }
        }, 200);
    } else {
        OpenHome.finish();
    }
}



var IntoClass = {};

IntoClass.test = function() {
    IntoClass.teams = document.getElementsByClassName("team-card");
    return IntoClass.teams.length != 0;
}

IntoClass.finish = function (index) {
    finish();
    IntoClass.teams[index].click();
}

IntoClass.execute = function(index) {
    if (!IntoClass.test()) {
        var int = setInterval(function () {
            if (IntoClass.test()) {
                clearInterval(int);
                IntoClass.finish(index);
            }
        }, 200);
    } else {
        IntoClass.finish(index);
    }
}



IntoAssignments = {};

IntoAssignments.test = function () {
    var buttons = document.getElementsByClassName("btn btn-default");
    console.log(buttons.length);

    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];

        if (button.children.length == 1) {
            if (button.children[0].children.length == 1) {
                if (button.children[0].children[0].innerHTML == "Assignments") {
                    console.log("Found!");
                    IntoAssignments.button = button;
                    return true;
                }
            }
        }
    }

    return false;
}

IntoAssignments.finish = function () {
    finish();
    IntoAssignments.button.click();
}

IntoAssignments.execute = function() {
    if (!IntoAssignments.test()) {
        var int = setInterval(function () {
            if (IntoAssignments.test()) {
                clearInterval(int);
                IntoAssignments.finish();
            }
        }, 200);
    } else {
        IntoAssignments.finish();
    }
}

Tasks.ScanTeams.OpenHome = OpenHome;
Tasks.ScanTeams.IntoClass = IntoClass;
Tasks.ScanTeams.IntoAssignments = IntoAssignments;