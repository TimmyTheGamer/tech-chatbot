var MongoClient = require('mongodb').MongoClient;


function dbConnection(query) {
	var url = "mongodb://localhost:27017/chatbot";
	return new Promise(function(resolve, reject) {
		MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
			if ( err ) {
				reject(err);
			} else {
				var dbo = db.db("chatbot");

				var res = dbo.collection(query.collection)[query.method](query.options).toArray()
				resolve(res)
			}
		})
	});
	// return MongoClient.connect(url, {useNewUrlParser: true});
}

function findUserRecord(userRecord) {
  console.log(url);
  MongoClient.connect(url, {native_parser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("chatbot");
    dbo.collection("users").findOne({ userName: userRecord }, function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
};

// var queryOb = {
// 	collection: "value",
// 	method: "valuehere",
// 	options: {}
// }


function findAllUserRecords() {
	// var db = null;
	var queryOb = {
		collection: "users",
		method: "find",
		options: {}
	}

	return dbConnection(queryOb).then((users) => {
	// return dbConnection().then((dby) => {
	// 	db = dby.dbx;
	// 	// console.log(db)
	// 	return dby.dbo.collection("users").find({}).toArray();
	// }).then((users) => {
		//console.log(users)
		// db.close();
		return Promise.resolve(users);
	})
};


// function findAllUserRecords() {
//   MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("chatbot");
//     dbo.collection("users").find({}).toArray().then((result) => {
//       if (err) throw reject(err);
//       //console.log(result);
//       return result;
//     });
//     db.close();
//   });
// };

findAllUserRecords();

module.exports = {
  findAllUserRecords: findAllUserRecords,
  findUserRecord: findUserRecord
};
