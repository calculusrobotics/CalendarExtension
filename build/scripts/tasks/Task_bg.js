class Task {
    constructor(name) {
        this.tabs = [];
        this.steps = {};
        this.connected = 0;
        this.completed = 0;
        this.total = 0;
        this.progress = 0;
        this.name = name;
    }

    start() {

    }


    addTab(id) {
        this.tabs.push(id);
    }

    removeTab(id) {
        this.tabs.splice(this.tabs.indexOf(id), 1);
        MessageHandler.disconnect(id);
    }

    assignTabStep(id, step, info) {
        var that = this;
        that.steps[id] = step;
        console.log(id + " --> " + step.step);

        var check = true;
        if (this.tabs.indexOf(id) == -1) {
            check = false;
        }

        var ret = new Promise(function (resolve, reject) {
            MessageHandler.onLoad(id, function (id1, port) {
                port.postMessage(Messages.form(
                    Messages.protocols.STEP_INIT,
                    {
                        "task": that.name,
                        "step": step.step,
                        "info": info
                    }
                ));
    
                port.onMessage.addListener(function (msg) {
                    if (msg.protocol == Messages.protocols.STEP_END) {
                        console.log(id1 + " <-- " + msg.message.step);
                        //var func = that.steps[id1].onFinish;
                        that.steps[id1] = undefined;
                        Tasks[that.name][msg.message.step].onFinish(id1, that, msg.message.info);
                    }
                });
    
                resolve();
            }, check);
        });

        return ret;
    }
}

class Step {
    constructor(step) {
        this.step = step;
    }

    onFinish(id, task, info) {

    }
}

var Tasks = {};