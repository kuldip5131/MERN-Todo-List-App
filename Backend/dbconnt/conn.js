const url = "mongodb+srv://kuldiphadiyal11:iNEL3HpQquoEQgDW@cluster0.kv0xu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// Pass :-iNEL3HpQquoEQgDW

const mongoose = require('mongoose');

const dbconnection = async () => {
    await mongoose.connect(url);
};
module.exports = dbconnection;