const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60b24a912007654af44c7b90',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo doloribus in repellat itaque pariatur et aliquam similique rerum exercitationem? Dolores dolor aut quidem itaque unde laborum atque magni blanditiis consequatur!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dxcqkmbhd/image/upload/v1622515061/YelpCamp/ctimenc9uvqgj1fhwkcl.jpg',
                    filename: 'YelpCamp/ctimenc9uvqgj1fhwkcl'
                },
                {
                    url: 'https://res.cloudinary.com/dxcqkmbhd/image/upload/v1622515062/YelpCamp/dsci5bff5zmh3kxourht.jpg',
                    filename: 'YelpCamp/dsci5bff5zmh3kxourht'
                },
                {
                    url: 'https://res.cloudinary.com/dxcqkmbhd/image/upload/v1622515064/YelpCamp/yzgz72wj4jw9qpu3ppzx.jpg',
                    filename: 'YelpCamp/yzgz72wj4jw9qpu3ppzx'
                },
                {
                    url: 'https://res.cloudinary.com/dxcqkmbhd/image/upload/v1622515065/YelpCamp/z885shkaudnpvqgjvooo.jpg',
                    filename: 'YelpCamp/z885shkaudnpvqgjvooo'
                },
                {
                    url: 'https://res.cloudinary.com/dxcqkmbhd/image/upload/v1622515065/YelpCamp/bkycp0h4uktrl7gla2lz.jpg',
                    filename: 'YelpCamp/bkycp0h4uktrl7gla2lz'
                }
            ]
        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    })