var MessageHandler = {};

MessageHandler.ports = [];

MessageHandler.handleMessage = function (msg) {
    if (msg.protocol == Messages.protocols.REQUEST_TEAMS_RESCAN) {
        var task = new ScanTeams();
        task.start();
    }
}

MessageHandler.onDisconnect = function (port) {
    console.log(JSON.stringify(port) + " disconnected");
    // not always from a tab, there are popup ports
    if (port.sender.tab != undefined) {
        var id = port.sender.tab.id;
        console.log(id + " disconnected");
        MessageHandler.ports[id] = undefined;
    }
}

MessageHandler.onConnect = function (port) {
    //console.log(JSON.stringify(port));
    port.postMessage(Messages.form(Messages.protocols.PONG));

    // not always from a tab, there are popup ports
    if (port.sender.tab != undefined) {
        var id = port.sender.tab.id;
        console.log(id + " connected");
        MessageHandler.ports[id] = port;

        var callbacks = MessageHandler.loadCallbacks[id];

        if (callbacks != undefined) {
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i](id, port);
                callbacks.splice(i, 1);
                i--;
            }
        }

        MessageHandler.loadCallbacks[id] = undefined;

        port.onDisconnect.addListener(MessageHandler.onDisconnect);
    }

    port.onMessage.addListener(MessageHandler.handleMessage);
}

MessageHandler.isConnected = function (id) {
    return MessageHandler.ports[id] != undefined;
}

MessageHandler.getPort = function (id) {
    return MessageHandler.ports[id];
}

brows.runtime.onConnect.addListener(MessageHandler.onConnect);



MessageHandler.loadCallbacks = {};
MessageHandler.onLoad = function (id, callback, check) {
    if (check == undefined) {
        check = true;
    }

    var port = MessageHandler.ports[id];

    if (check && port != undefined) {
        console.log("ping");
        port.postMessage(Messages.form(Messages.protocols.PONG));
        callback(id, port);
        port.postMessage(Messages.form(Messages.protocols.PONG));
        console.log("pong");

        return;
    }

    console.log(id + " requested");

    if (MessageHandler.loadCallbacks[id] == undefined) {
        MessageHandler.loadCallbacks[id] = [];
    }

    MessageHandler.loadCallbacks[id].push(callback);
}

MessageHandler.disconnect = function (id) {
    var port = MessageHandler.ports[id];

    if (port != undefined) {
        port.disconnect();
    }
}