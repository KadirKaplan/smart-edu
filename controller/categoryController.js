const Category = require('../models/Category');


exports.createCategory = async (req, res) => {

    try {
    const category = await Category.create(req.body);
    res.status(201).json({
        status: 'succes',
        category
    });
    }
    catch(error) {
        res.status(404).json({
            status: 'fail',
            error
        });
    }



};

exports.getAllCategory = async (req,res) => {
    try {
        const categories = await Category.find();
        res.status(200).render('courses', {
            status: 'succes',
            categories
        })
    } catch (error)
    {
        res.status(404).render('courses', {
            status:'failed',
            error
        })
    }
};