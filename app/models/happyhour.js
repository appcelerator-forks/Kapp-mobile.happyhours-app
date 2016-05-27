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
			"collection_name": 	"happyhour",
			"idAttribute": 		"id",
			"db_name": 			"happyhourdb"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			transform: function transform() {
				var transformed = this.toJSON();
				var dayText = '';

				day = transformed.day.toString();

				if(day.match(/1/)){
					dayText+=' Lundi ';
				}
				if(day.match(/2/)){
					dayText+=' Mardi ';
				}
				if(day.match(/3/)){
					dayText+=' Mercredi ';
				}
				if(day.match(/4/)){
					dayText+=' Jeudi ';
				}
				if(day.match(/5/)){
					dayText+=' Vendredi ';
				}
				if(day.match(/6/)){
					dayText+=' Samedi ';
				}
				if(day.match(/7/)){
					dayText+=' Dimanche ';
				}
				transformed.day = dayText;

				return transformed;
			}
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
