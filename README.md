# reactive-bamboo [![Build Status](https://travis-ci.org/defunctzombie/reactive-bamboo.png)](https://travis-ci.org/defunctzombie/reactive-bamboo)

[reactive](https://github.com/component/reactive) adapter for [bamboo](https://github.com/defunctzombie/bamboo) to update the reactive view with real-time bamboo model changes.

```js
var reactive = require('reactive');
var Model = require('bamboo/model');
var ReactiveBamboo = require('reactive-bamboo');

var User = Model({
    email: String,
    name: {
        first: String,
        last: String
    }
});

var user = User();
user.name = {
    first: 'Rob',
    last: 'Zombie'
};

var view = reactive('<p>{name.first} {name.last}</p>', user, {
    adapter: ReactiveBamboo
});

// <p>Rob Zombie</p>

user.name.first = 'Defunct';

// <p>Defunct Zombie</p>
```

## License

MIT
