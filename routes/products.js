const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Product = require('../models/product');
const products = require('../controllers/product');
const {isLoggedIn, isOwner, validateProduct} = require('../middleware')
const multer  = require('multer')
const {storage} = require('../cloudinary');
const upload = multer({ storage })


router.route('/')
    .get(catchAsync(products.index))
    // .post(upload.array('image'), (req,res)=>{
    //     console.log(req.body, req.files);
    //     res.send("IT WORKED");
    // })
    .post(isLoggedIn, upload.array('image'), validateProduct, catchAsync(products.createProduct))

router.get('/new',isLoggedIn, products.renderNewFrom);

router.route('/:id')
    .get(catchAsync(products.showProduct))
    .put(isLoggedIn, isOwner, validateProduct, catchAsync(products.editProduct))
    .delete(isLoggedIn, isOwner, catchAsync(products.deleteProduct))

//router.get('/', catchAsync(products.index));


//router.post('/',isLoggedIn, validateProduct, catchAsync(products.createProduct));

//router.get('/:id', catchAsync(products.showProduct));

//EDIT product
router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(products.renderEditForm))

//change product info PUT request
//router.put('/:id', isLoggedIn, isOwner, validateProduct, catchAsync(products.editProduct))

//router.delete('/:id', isLoggedIn, isOwner, catchAsync(products.deleteProduct))

module.exports = router;