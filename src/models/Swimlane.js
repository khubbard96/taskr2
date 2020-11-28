import DefaultModel from "./DefaultModel";

class Swimlane extends DefaultModel {
    constructor({id, name, items}) {
        super({id});
        this.name = name;
        this.items = items;
    }
}