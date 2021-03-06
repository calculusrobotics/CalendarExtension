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
    Messages.createPort();
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

    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];

        if (button.children.length == 1) {
            if (button.children[0].children.length == 1) {
                if (button.children[0].children[0].innerHTML == "Assignments") {
                    IntoAssignments.button = button;
                    return true;
                }
            }
        }
    }

    return false;
}

IntoAssignments.finish = function (succ) {
    finish(succ);
    IntoAssignments.button.click();
    Messages.createPort();
}

IntoAssignments.execute = function() {
    var t0 = new Date();

    if (!IntoAssignments.test()) {
        var int = setInterval(function () {
            var dt = (new Date() - t0) / 1000;

            if (dt > 20) {
                IntoAssignments.finish(false);
                return;
            }
            if (IntoAssignments.test()) {
                clearInterval(int);
                IntoAssignments.finish(true);
            }
        }, 200);
    } else {
        IntoAssignments.finish(true);
    }
}



GetAssignmentsLink = {};

// GetAssignmentsLink.test = function () {
//     var buttons = document.getElementsByClassName("btn btn-default");

//     for (var i = 0; i < buttons.length; i++) {
//         var button = buttons[i];

//         if (button.children.length == 1) {
//             if (button.children[0].children.length == 1) {
//                 if (button.children[0].children[0].innerHTML == "Assignments") {
//                     IntoAssignments.button = button;
//                     return true;
//                 }
//             }
//         }
//     }

//     return false;
// }

GetAssignmentsLink.finish = function (url) {
    finish(url);
}

GetAssignmentsLink.execute = function() {
    GetAssignmentsLink.finish(window.location.href);
}

Tasks.ScanTeams.OpenHome = OpenHome;
Tasks.ScanTeams.IntoClass = IntoClass;
Tasks.ScanTeams.IntoAssignments = IntoAssignments;
Tasks.ScanTeams.GetAssignmentsLink = GetAssignmentsLink;