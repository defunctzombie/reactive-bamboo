var Adapter = function(model) {
    if (!(this instanceof Adapter)) {
        return new Adapter(model);
    }

    var self = this;
    self.model = model;
};

Adapter.prototype.subscribe = function(prop, fn) {
    var model = this.model;

    if (!model.on) {
        return;
    }

    // also subscribe to parent property
    var parts = prop.split('.');
    if (parts.length > 1) {
        // get the property from the new value
        model.on('change ' + parts[0], function(val) {
            fn(val[parts[1]]);
        });
    }

    model.on('change ' + prop, fn);
};

Adapter.prototype.unsubscribe = function(prop, fn) {
    var model = this.model;
    if (!model.off) {
        return;
    }

    var parts = prop.split('.');
    if (parts.length > 1) {
        model.off('change ' + parts[0], fn);
    }
    model.off('change ' + prop, fn);
};

Adapter.prototype.unsubscribeAll = function() {
    var model = this.model;
    if (!model.off) {
        return;
    }

    this.model.off();
};

Adapter.prototype.set = function(prop, val) {
    var obj = this.model;
    if ('function' == typeof obj[prop]) {
        obj[prop](val);
    } else {
        obj[prop] = val;
    }
};

Adapter.prototype.get = function(prop) {
    var self = this;

    var parts = prop.split('.');
    var obj = self.model;
    var part = parts.shift();
    do {
        if (typeof obj[part] === 'function') {
            obj = obj[part].call(obj);
        }
        else {
            obj = obj[part];
        }

        if (!obj) {
            return undefined;
        }

        part = parts.shift();
    } while(part);

    return obj;
};

module.exports = Adapter;
