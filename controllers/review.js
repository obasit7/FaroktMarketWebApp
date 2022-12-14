const Product = require('../models/product');
const Review = require('../models/review');

module.exports.createReview = async (req,res)=>{
    const product = await Product.findById(req.params.id);
    const review = new Review(req.body.review);
    review.owner = req.user._id;
    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash('success', 'New review created');
    res.redirect(`/products/${product._id}`);
}

module.exports.deleteReview = async(req,res,next)=>{
    const {id, reviewId} = req.params;
    await Product.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully deleted review');
    res.redirect(`/products/${id}`);
}