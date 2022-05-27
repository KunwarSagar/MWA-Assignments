const mongoClient = require("mongodb").MongoClient;

let _conn = null;

const get = function(){
    return _conn;
}

const open  =  function(){
    if(get() == null){
        mongoClient.connect(process.env.DB_URL, function(err, client){
            if(err){
                console.log("DB connection error.");
                return;
            }

            _conn = client.db(process.env.DB_NAME);
            console.log("Connected to DB", process.env.DB_NAME);
        })
    }
}

module.exports = {
    open,
    get
}