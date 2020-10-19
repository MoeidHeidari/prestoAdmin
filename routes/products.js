var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth');
const VisitModel = require('../models/VisitStatisctic');
const Category = require('../models/category');
const FirstLevelSubCategory = require('../models/firstLevelSubcategory');
const _ = require('lodash');
/* GET users listing. */
router.get('/', auth, async (req, res, next) => {
    res.render('productsDashboard', {page: 'productsDashboard'});
});

router.post('/addNewCategory', auth, async (req, res, next) => {

    const newCategory = new Category.Category({title: req.body.title, dateAdded: Date.now()});
    if (await newCategory.save()) res.send('new category added');
    else res.status(500).send('internal server error');


});

router.get('/getCategories', auth, async (req, res, next) => {

    const categories = Category.Category.find({visibility: true}, async (err, categories) => {
        if (!err) res.send(categories);
        else res.status(400).send(err.message);
    });


});
router.post('/editCategory', auth, async (req, res, next) => {

    const categories = await Category.Category.findOne({_id: req.body.catId});
    categories.title = req.body.title;
    categories.save()
        .then(user => res.send('category has been updated'))
        .catch(err => res.status(400).send(err.message));


});
router.post('/removeCategory', auth, async (req, res, next) => {

    const categories = await Category.Category.findOne({_id: req.body.catId});
    categories.title = req.body.title;
    categories.delete()
        .then(user => res.send('category has been deleted'))
        .catch(err => res.status(400).send(err.message));


});
router.post('/addNewSubCategoryLevelOne', auth, async (req, res, next) => {

    const FirstLevelSubCategory = new FirstLevelSubCategory.FirstLevelSubCategory({});
    if (await FirstLevelSubCategory.save()) res.send('new category added');
    else res.status(500).send('internal server error');


});




module.exports = router;
