let express = require('express')
let multer = require('multer');
let adminModel = require('../../model/model');
let router = express();



//Storage setting for image upload
let storage = multer.diskStorage({
    destination: 'public/images/',
    filename: (req, file, cb) => {
        //cb(null, Date.now() + file.originalname) // file name setting with current –date
    cb(null ,  file.originalname) // file name setting with original name
    }
})

let upload = multer({
    storage: storage,
    // here image validation
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
            cb(null, true)
        }
        else {
            cb(null, false)
            return cb(new Error('Only Jpg, png, jpeg, allow'))
        }
    }
})    

router.get('/', (req, res)=>{
    adminModel.find({})
    .then((x)=>{
        res.render('./backend/index-file', {x})
    })
    .catch((y)=>{
        console.log(y)
    })
})



router.get('/add-pages',  (req, res)=>{
    res.render('./backend/add-page-file')
})

router.post('/add-pages', upload.any(), (req, res)=>{
    if(req.file){
        //if image option choose then work
        let data ={
            PageUrl : req.body.Page_Url,
            PageTitle :req.body.Page_Title,
            PageMetaDescription :req.body.Page_Meta_Description,
            PageMetaKeyword :req.body.Page_Meta_Keyword,
            PageHeading : req.body.Page_Heading,
            PagePhoto :req.file.filename,
            PageDetails :req.body.Page_Details
        }
        adminModel.create(data)
        .then((x)=>{
            req.flash('sucess', 'Your Data has been sucessfully added in data base')
            res.redirect('/admin/pages/');
            console.log(x)
        })
        .catch((y)=>{
            console.log(y)
        })
    }
    else{
        //if image option not choose then work
        let data ={
            PageUrl : req.body.Page_Url,
            PageTitle :req.body.Page_Title,
            PageMetaDescription :req.body.Page_Meta_Description,
            PageMetaKeyword :req.body.Page_Meta_Keyword,
            PageHeading : req.body.Page_Heading,
            //PagePhoto :req.file.filename,
            PageDetails :req.body.Page_Details
        }
        adminModel.create(data)
        .then((x)=>{
            req.flash('sucess', 'Your Data has been sucessfully added in data base')
            res.redirect('/admin/pages/');
            console.log(x)
        })
        .catch((y)=>{
            console.log(y)
        })
    }
   
})

router.get('/edit/:id', (req, res)=>{
    adminModel.findOne({PageUrl:req.params.id})
    .then((x)=>{
        res.render('./backend/edit-page-file', {x})
    })
    .catch((y)=>{
        console.log(y)
    })    
})

router.put('/edit/:id', upload.single('Page_Photo'),(req, res)=>{
    if(req.file){
        //when need change  image and other
        adminModel.updateOne({PageUrl:req.params.id}, {$set:{
            PageUrl : req.body.Page_Url,
            PageTitle :req.body.Page_Title,
            PageMetaDescription :req.body.Page_Meta_Description,
            PageMetaKeyword :req.body.Page_Meta_Keyword,
            PageHeading : req.body.Page_Heading,
            PagePhoto :req.file.filename,
            PageDetails :req.body.Page_Details
        }})
        .then((x)=>{
           req.flash('sucess', 'Your Data has been sucessfully updated')
            res.redirect('/admin/pages/')
        })
        .catch((y)=>{
            
        })
    }
    else{
        //when not need image change
        adminModel.updateOne({PageUrl:req.params.id}, {$set:{
            PageUrl : req.body.Page_Url,
            PageTitle :req.body.Page_Title,
            PageMetaDescription :req.body.Page_Meta_Description,
            PageMetaKeyword :req.body.Page_Meta_Keyword,
            PageHeading : req.body.Page_Heading,
            //PagePhoto :req.file.filename,
            PageDetails :req.body.Page_Details
        }})
        .then((x)=>{
           req.flash('sucess', 'Your Data has been sucessfully updated')
            res.redirect('/admin/pages/')
        })
        .catch((y)=>{
            console.log(y)
        })
        
    }
    
})


router.delete('/delete/:id', (req, res)=>{
    adminModel.deleteOne({PageUrl:req.params.id})
    .then((x)=>{
        req.flash('sucess', 'Your Data has been sucessfully deleted form data base')
        res.redirect('/admin/pages/')
    })
    .catch((y)=>{
        console.log(y)
    })    
})


module.exports = router
