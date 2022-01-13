let express = require('express')
let multer = require('multer');
let adminModel = require('../../model/model');
let router = express();

// send data in header after find data
router.use((req, res, next) => {
    adminModel.find({})
        .then((x) => {
            res.locals.navdata = x; //here set local variable  and then value
            //console.log(x)
        })
        .catch((y) => {
            console.log(y)
        })
    next()
})

router.get('/', (req, res) => {
    adminModel.findOne({PageHeading:'Home'})
        .then((x) => {
            res.render('./frontent/index-file',{x})
        })
        .catch((y) => {
            console.log(y)
        })
})


router.get('/:id', (req, res) => {
    let query = req.params.id;
    if(query=='home'){
        res.redirect('/')
    }
    else{
        adminModel.findOne({PageUrl: query})
    .then((x) => {
        if(!x){                
            res.redirect('/')
        }
        else{
            res.render('./frontent/page-view', {x})
        }
        
    })
    .catch((y) => {
        console.log(y)
    })
    }
    
})



module.exports = router
