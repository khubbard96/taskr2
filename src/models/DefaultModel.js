
class DefaultModel {
    constructor(args) {
        this.id = args.id;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    set(key, val) {
        if(this[key] !== undefined) {
            this[key] = val;
        }
    }
}

export default DefaultModel;