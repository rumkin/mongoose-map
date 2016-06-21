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
const MapType = require('mongoose-map')(mongoose);

const testSchema = new mongoose.Schema({
    test: MapType,
});

const TestModel = mongoose.model('Test', testSchema);
```

## License

Published under MIT license.
