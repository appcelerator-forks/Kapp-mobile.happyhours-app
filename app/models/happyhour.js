exports.definition = {
	config : {
		"columns": {
			"id"				:  "INTEGER PRIMARY KEY",
			"id_etablishment"	:  "INTEGER",
			"day"				:  "INTEGER",
			"text"				:  "Text",
			"hours"			    :  "INTEGER"
		},
		"defaults": {
			"id_etablishment"	:  0,
			"day"				:  0,
			"text"				:  "",
			"hours"			    :  0
		},
		"adapter": {
			"type": 			"sql",
			"collection_name": 	"happyhours",
			"idAttribute": 		"id",
			"db_name": 			"happyhourdb" 
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
}