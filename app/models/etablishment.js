exports.definition = {
	config : {
		"columns": {
			"id"			:  "INTEGER PRIMARY KEY",
			"name"			:  "Text",
			"adress"		:  "Text",
			"gps"			:  "Text",
			"yelp_id"		:  "Text",
			"city"			:  "Text",
			"description"	:  "Text",
			"haveHappy"		:  "Text",
			"now"			:  "Text"
		},
		"defaults": {
			"name"			:  "",
			"adress"		:  "",
			"gps"			:  "",
			"yelp_id"		:  0,
			"city"			:  "",
			"description"	:  "",
			"haveHappy"		:  "",
			"now"			:  ""

		},
		"adapter": {
			"type": 			"sql",
			"collection_name": 	"etablishment",
			"idAttribute": 		"id",
			"db_name": 			"etablishmentdb"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {

		});
		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			deleteAll : function() {
				var collection = this;

				var sql = "DELETE FROM " + collection.config.adapter.collection_name;
				db = Ti.Database.open(collection.config.adapter.db_name);
				db.execute(sql);
				db.close();

				collection.trigger('sync');
			},

			count : function() {

				var collection = this;

				var sql = "SELECT * FROM " + collection.config.adapter.collection_name;
				db = Ti.Database.open(collection.config.adapter.db_name);
				var count = db.execute(sql);
				count = count.getRowCount();
				db.close();

				return count;
			}

		});
		return Collection;
	}
};
