const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    images: [
        {
            url: String,
            filename: String
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

ProductSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({
            _id:{
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Product', ProductSchema);