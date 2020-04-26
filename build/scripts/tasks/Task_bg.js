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
        console.log(this.tabs);
    }

    assignTabStep(id, step, info) {
        var that = this;
        console.log("Before assign " + id);
        console.log("Assigning step to " + JSON.stringify(that.steps));
        console.log(step);
        that.steps[id] = step;

        var ret = new Promise(function (resolve, reject) {
            MessageHandler.onLoad(id, function (id, port) {
                console.log("After assign " + id + " to ");
                console.log(step);
                console.log(JSON.stringify(that.steps));
    
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
                        console.log("Before finish " + id + " --> " + JSON.stringify(that.steps));
                        var func = that.steps[id].onFinish;
                        that.steps[id] = undefined;
                        func(id, that, msg.message);
                    }
                });
    
                resolve();
            });
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