class DefaultCollection {

    constructor() {
        this.collection = [];
    }

    update(id, props) {
        if(this.get(parseInt(id))) {
            let item = this.get(parseInt(id));
            Object.keys(props).forEach(key => {
                if(item[key] !== undefined) {
                    item.set(key, props[key]);
                }
            });
        }
    }

    add(id, model) {
        if(!this.get(id)) {
            this.collection.push(model);
        }
    }
    get(id) {
        return this.collection.find(item => item.getId() === id);
    }

    toArray() {
        return this.collection;
    }

    move(from, to) {
        let removedItem = this.collection.splice(from, 1)[0];
        this.collection.splice(to, 0, removedItem);
    }

    sort(key) {
        /*if(this._getFirst().value[1][key] !== undefined) {
            var mapAsc = new Map([...this.collection.entries()].sort((a,b) => {
                a = a[1]; b = b[1];
                if(a[key] > b[key]) {
                    return 1;
                } else if (a[key] < b[key]) {
                    return -1;
                } else {
                    return 0;
                }
            }));
            this.collection = mapAsc;
        }*/
    }

    _getFirst() {
        return this.collection.entries().next();
    }
}

export default DefaultCollection;