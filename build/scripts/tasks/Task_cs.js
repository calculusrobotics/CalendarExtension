var stepInfo;

var Tasks = {};

var step;

Messages.on(Messages.protocols.STEP_INIT, function (msg) {
    stepInfo = msg.info;
    step = msg.step;
    //alert("executing " + step);
    console.log("Assigned " + step);
    Tasks[msg.task][msg.step].execute(stepInfo);
});

function finish(info) {
    console.log("Finished " + step);
    //alert("finishing " + step);
    port.postMessage(Messages.form(Messages.protocols.STEP_END, {
        "info": info,
        "step": step
    }));
}