var express = require('express');
var router = express.Router();

const {check, validationResult} = require('express-validator');

const db = require('../db.js');

router.get('/',(req, res) => {
    db.getAllMemos((rows) =>{
        res.render('memo',{rows : rows})
    }
    
    )

    //res.send('test')
})


// 공지사항 작성페이지 부르는거
router.get('/newMemo',(req,res)=>{
    res.render('newMemo')
})


// 작성한거 넘기는거
router.post('/store',
    [check('content').isLength({min: 1,max: 300})],
    function(req, res, next) {
    let errs = validationResult(req);
    console.log(errs);//콘솔 에러 출력하기
    if(errs['errors'].length>0){//화면에 에러 출력하기
        res.render('newMemo',{errs:errs['errors']});
    } else{
        let param = JSON.parse(JSON.stringify(req.body));
        db.insertMemo(param['content'],() =>{
            res.redirect('/');

        });
    }
        });

        // 수정페이지로 넘어가는거
router.get('/updateMemo',(req, res) =>{
    let id = req.query.id;

    db.getMemoById(id,(row)=>{
        if(typeof id == 'undefined' || row.length <= 0){
            res.status(404).json({error:'undefined memo'});
        }else {
            res.render('updateMemo',{row:row[0]});
        }
    })
})

// 수정한거 보내는거
router.post('/updateMemo',
    [check('content').isLength({min: 1,max: 300})],
    (req,res) =>{
        let errs = validationResult(req);
        let param = JSON.parse(JSON.stringify(req.body));
        let id = param['id'];
        let content = param['content'];
        if(errs['errors'].length>0){
            db.getMemoById(id, (row)=>{
                res.render('updateMemo',{row:row[0], errs:errs['errors']})
            })
        }else{
            db.updateMemoById(id,content, ()=>{
                res.redirect('/');   
            })
        }
    })

    //삭제하는거
router.get('/deleteMemo', (req, res) =>{
    let id = req.query.id;
    db.deleteMemoById(id, ()=>{
        res.redirect('/');   
    });
});


module.exports = router;
