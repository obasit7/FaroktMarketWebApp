const express = require('express');
const router = express.Router({mergeParams: true});

const catchAsync = require('../utils/catchAsync');
const {validateReview, isLoggedIn, isReviewOwner} = require('../middleware');

const reviews = require('../controllers/review');

router.post('/',isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId',isLoggedIn, isReviewOwner, catchAsync(reviews.deleteReview))

module.exports = router;