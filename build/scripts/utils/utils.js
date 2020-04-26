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

function createTab(options, callback) {
    if (!isChrome) {
        brows.tabs.create(options).then(callback);
    } else {
        brows.tabs.create(options, callback);
    }
}