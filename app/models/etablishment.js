exports.definition = {
    config: {
        "columns": {
            "id": "INTEGER PRIMARY KEY",
            "name": "Text",
            "adress": "Text",
            "gps": "Text",
            "yelp_id": "Text",
            "city": "Text",
            "haveHappy": "Text",
            "now": "Text",
            "description_2": "Text",
            "image": "Text"
        },
        "defaults": {
            "name": "",
            "adress": "",
            "gps": "",
            "yelp_id": 0,
            "city": "",
            "description": "",
            "haveHappy": "",
            "description": "",
            "now": "",
            "image": "",

        },
        "adapter": {
            "type": "sql",
            "collection_name": "etablishment",
            "idAttribute": "id",
            "db_name": "etablishmentdb"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {

        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            deleteAll: function() {
                var collection = this;

                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();

                collection.trigger('sync');
            },

            count: function() {

                var collection = this;

                var sql = "SELECT * FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var count = db.execute(sql);
                count = count.getRowCount();
                db.close();

                return count;
            },

            // Implement the comparator method.
            comparator: function(collection) {
                return collection.get("now");
            },

            //*** Override sortBy to allow sort on any field, either direction
            sortBy: function(iterator, context) {
                var obj = this.models;

                return _.pluck(_.map(obj, function(value, index, list) {
                    return {
                        value: value,
                        index: index,
                        criteria: iterator.call(context, value, index, list)
                    };
                }).sort(function(left, right) {


                    if (left.criteria !== right.criteria) {
                        if (left.criteria == "En ce moment") {
                            return -1;
                        } else if (right.criteria == "En ce moment") {
                            return 1;
                        } else if (left.criteria == "Dans 30 min") {
                            return -1;
                        } else if (right.criteria == "Dans 30 min") {
                            return 1;
                        } else if (left.criteria == "Dans 1h") {
                            return -1;
                        } else if (right.criteria == "Dans 1h") {
                            return 1;
                        }

                        return 1;

                    }

                    return 1;

                }), 'value');
            }

        });
        return Collection;
    }
};
