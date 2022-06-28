
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  port : '3306',
  database : 'memo',
  dateStrings:'date'//날짜 시간 출력
});
 
//리스트 전체를 불러오는 함수
function getAllMemos(callback) {
    connection.query('select * from memos ORDER BY id DESC',
    (err, rows, fields) =>{
        if(err) throw err;
        callback(rows);
    })
}

//리스트의 새로운 내용을 추가하는 함수 
function insertMemo(content, callback){
    connection.query(`INSERT INTO memos(content, created, updated) VALUES
    ('${content}',NOW(),NOW())`,(err,result) => {
        if(err) throw err;
        callback();
    })
}

//리스트 중 id값이 일치하는 row만 불러오는 함수
function getMemoById(id,callback){
    connection.query(`select * from memos WHERE ID = ${id}`,
    (err, row, fields) =>{
        if(err) throw err;
        callback(row);
    })
}
//리스트를 수정하고 싶을 사용 id값이 일치하는 부분을 수정하는 함수
function updateMemoById(id, content, callback){
    connection.query(`UPDATE memos set content = '${content}', updated = now() WHERE
    id = ${id}`,(err, result) =>{
        if(err) throw err;
        callback();
    })
}

//리스트 중 id 값이 일치하는 부분을 삭제하는 함수 
function deleteMemoById(id,callback){
    connection.query(`DELETE FROM memos WHERE ID = ${id}`,
    (err, result) =>{
        if(err) throw err;
        callback();
    });
}



// function deleteMemoById(id,callback){
//     connection.query(`DELETE * from memos WHERE ID = ${id}`,
//     (err, result) =>{
//         if(err) throw err;
//         callback();
//     })
// }





module.exports = {
    getAllMemos,
    insertMemo,
    getMemoById,
    updateMemoById,
    deleteMemoById
};