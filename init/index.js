const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("Connected to db");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect(MONGO_URL);   
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "684d8a7bc72363a3eda3ea2f"}));
    await Listing.insertMany(initData.data);
    console.log("Data was Saved");
}

initDB();