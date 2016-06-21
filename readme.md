# Mongoose Map

ES2015 Map type support for Mongoose ORM.

## Installation

Install via npm:
```shell
npm i mongoose-map
```

## Usage

```javascript
const mongoose = require('mongoose');
const MongooseMap = require('mongoose-map')(mongoose);

const testSchema = new mongoose.Schema({
    test: MongooseMap,
});

const TestModel = mongoose.model('Test', testSchema);
```

## License

Published under MIT license.
