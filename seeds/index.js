const mongoose = require('mongoose');
const cities = require('./cities')
const {descriptors, productNames} = require('./seedHelpers')
const Product = require('../models/product');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/farokht', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
}

const sample = items => items[Math.floor(Math.random()*items.length)];


const seedDB = async ()=>{
    await Product.deleteMany({});
    for(let i = 0; i<50; i++){
        const priceRandom = Math.floor(Math.random()*100)+10;
        const random9 = Math.floor(Math.random() *8);
        const product = new Product ({
            location: `${cities[random9].city}, ${cities[random9].province}`,
            title: `${sample(descriptors)} ${sample(productNames)}`,
            owner: '62677ca617dbcf1a3e011be9',
            image: 'https://source.unsplash.com/collection/3519193',
            description: 'some description about the product',
            price: priceRandom
        })
        await product.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})


