const router = require('express').Router()
const { findById } = require('../models/articles')
const Article = require('../models/articles')

router.get( '/' , async (req , res)=> {
    const articles = await Article.find().sort({createdAt : 'desc'})
    res.render('articles/index' , {articles})
})

router.get('/articles/new' , (req , res) => {
    res.render('articles/new' , {article : new Article()})
})

router.get('/articles/:slug' , async(req , res) => {
    const article = await Article.findOne({slug : req.params.slug})
    if(article == null) res.redirect('/')
    res.render('articles/show' , {article})
})

router.get('/articles/edit/:id' , async(req , res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit' , {article})
})

router.post('/articles' , async(req , res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
        createdAt: req.body.createdAt
    })
    try{
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    }catch(e){
        console.log(e)
        res.render('articles/new' , {article})
    }
})

router.put('/articles/:id' , async(req , res) => {
    const article = await Article.findById(req.params.id)
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try{
        await article.save()
        res.redirect('/')
    }catch(e){
        console.log(e)
        res.render('articles/edit')
    }
    
})

router.delete('/articles/:id' , async (req , res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router