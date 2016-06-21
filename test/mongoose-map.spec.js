const assert = require('assert');
const mongoose = require('mongoose');
const mongooseMap = require('../');

describe('Mongoo Map type', function(){
    var MapType, Test, testSchema;

    before(function(){
        MapType = mongooseMap(mongoose);
        testSchema = new mongoose.Schema({
            test: MapType,
        });
        Test = mongoose.model('Test', testSchema);
    });

    it('Should add Map Type into mongoose', function(){

        assert.ok('MapType' in mongoose.Schema.Types, 'Type exported');
    });

    it('Should not validate new type', function(){
        var t = new Test();
        t.test = 'abc';
        assert.ok(t.validateSync());
        assert.equal(t.validateSync().errors['test'].name, 'CastError');
        assert.ok(t.validateSync().errors['test'].message.match(
            /Cast to MapType failed/
            )
          );
        assert.equal(t.validateSync().errors['test'].reason.message,
          'MapType: Is not an object or map');
    });

    it('Should validate', function(){
        var t = new Test();
        t.test = new Map();

        assert.equal(t.validateSync(), undefined, 'No cast errors');
    });

    it('Should converts from map to object', function(){
        var t = new Test();
        t.test = new Map();

        t.test.set('x', 1);
        t.test.set('y', 2);

        assert.deepEqual({x: 1, y: 2}, t.toObject().test, 'Object valid properties');
    });

    it('Should converts from object to map', function(){
        var t = new Test();
        t.test = {x: 1, y: 2};

        assert.equal(t.validateSync(), undefined, 'No cast errors');
        assert.equal(t.test.get('x'), 1, 'x is 1');
        assert.equal(t.test.get('y'), 2, 'y is 2');
        assert.deepEqual({x: 1, y: 2}, t.toObject().test, 'Object valid properties');
    });
});
