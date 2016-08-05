module.exports = function(mongoose) {
    const SchemaType = mongoose.SchemaType;

    function MapType(key, options) {
        SchemaType.call(this, key, options, 'MapType');
    }

    Object.setPrototypeOf(MapType.prototype, SchemaType.prototype);

    MapType.prototype.cast = function(value) {
        if (! value || typeof value !== 'object') {
            return value;
        }

        var result;
        if (value instanceof Map === false) {
            result = Object.getOwnPropertyNames(value)
            .reduce(function(result, key){
                result.set(key, value[key]);
                return result;
            }, new Map);
        } else {
            result = value;
        }

        result.valueOf = function() {
            var self = this;
            return Array.from(this.keys()).reduce(function(result, key){
                result[key] = self.get(key);
                return result;
            }, {});
        };

        return result;
    };

    mongoose.Schema.Types.MapType = MapType;

    return MapType;
};
