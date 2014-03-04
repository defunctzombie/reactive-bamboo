var assert = require('assert');
var Model = require('bamboo/model');

var Adapter = require('../');

var User = Model({
    email: String,
    name: {
        first: String,
        last: String
    }
});

test('should subscribe to property changes', function(done) {
    var model = User();
    model.email = 'sally@gmail';

    var adapter = Adapter(model);
    adapter.subscribe('email', function(value) {
        assert('tom@gmail' == value);
        done();
    });
    model.email = 'tom@gmail';
});

test('should unsubscribe from changes', function() {
    var model = User();
    model.email = 'sally@gmail';

    var adapter = Adapter(model);
    var count = 0;
    var fn = function() {
        count++;
    };
    adapter.subscribe('email', fn);
    model.email = 'tom@gmail';
    adapter.unsubscribe('email', fn);
    model.email = 'sally@gmail';
    assert(count == 1);
});

test('should unsubscribe all', function() {
    var model = User();
    model.email = 'sally@gmail';

    var adapter = Adapter(model);
    var count = 0;
    var fn = function() {
        count++;
    };
    adapter.subscribe('email', fn);
    model.email = 'tom@gmail';
    adapter.unsubscribeAll();
    model.email = 'sally@gmail';
    assert(count == 1);
});

test('should subscribe to nested property changes', function(done) {
    var model = User();
    model.name = {
        first: 'Tom',
        last: 'Hanks'
    };

    var adapter = Adapter(model);
    adapter.subscribe('name.last', function(val) {
        assert(val == 'Brady');
        done();
    });

    model.name.last = 'Brady';
});

test('should subscribe to parent property when nested properties used', function(done) {
    var model = User();
    model.name = {
        first: 'Tom',
        last: 'Hanks'
    };

    var adapter = Adapter(model);
    adapter.subscribe('name.last', function(val) {
        assert(val == 'Jones');
        done();
    });

    // change the entire name field should cause sub-properties to update
    model.name = {
        first: 'Edward',
        last: 'Jones'
    };
});
