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
                    url: 'https://res.cloudinary.com/dxcqkmbhd/image/upload/v1622460624/YelpCamp/odrg8thq0noty0n3rj7f.jpg',
                    filename: 'YelpCamp/odrg8thq0noty0n3rj7f'
                },
                {
                    url: 'https://res.cloudinary.com/dxcqkmbhd/image/upload/v1622460625/YelpCamp/a1ph3k8jd42qxnqbzine.jpg',
                    filename: 'YelpCamp/a1ph3k8jd42qxnqbzine'
                },
                {
                    url: 'https://res.cloudinary.com/dxcqkmbhd/image/upload/v1622460627/YelpCamp/jwzmjk3tzu9c1u5ns87q.jpg',
                    filename: 'YelpCamp/jwzmjk3tzu9c1u5ns87q'
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