var brows;

var isChrome = false;

try {
    brows = browser;
} catch (e) {
    brows = chrome;
    isChrome = true;
}

function createWindow(options, callback) {
    if (!isChrome) {
        brows.windows.create(options).then(callback);
    } else {
        brows.windows.create(options, callback);
    }
}

var times = 0;
function createTab(options, callback) {
    times++;
    if (times > 7) {
        throw new Error("");
    }
    console.log("Creating tab");
    if (!isChrome) {
        brows.tabs.create(options).then(callback);
    } else {
        brows.tabs.create(options, callback);
    }
}

function reloadTab(id, options, callback) {
    if (!isChrome) {
        brows.tabs.reload(id, options).then(callback);
    } else {
        brows.tabs.reload(id, options, callback);
    }
}