import DefaultModel from "./DefaultModel";

class TaskrItem extends DefaultModel {
    constructor(args) {
        super(args);
        if(args.title) {
            this.title = args.title;
        }
        this.swimlane = args.swimlane;
    }

    getTitle() {
        return this.title;
    }
    setSwimlane(lane) {
        this.swimlane = lane;
    }
    getSwimlane() {
        return this.swimlane;
    }
}

export default TaskrItem;