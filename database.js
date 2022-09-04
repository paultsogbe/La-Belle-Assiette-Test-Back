const mongoose = require("mongoose");

class PrivateDatabase {
    constructor() {
        async function main() {
            await mongoose.connect('mongodb://localhost:27017/lba_usecase');

        }

        // connect to mongodb
        main().catch(err => console.log(err));
        this.mongoose = mongoose;
    }
}

class Database {
    constructor() {
        throw new Error('Use Database.getInstance()');
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new PrivateDatabase();
        }
        return Database.instance;
    }
}

module.exports = Database;