
module.exports = function (app, db) {

    app.get('/api-web/searchProjectType',(req,res) => {
        var queryStr = '';
        var Str = 'Where ';
            
        if(req.query.id){
            Str += `project_type_id  = ${req.query.id} `;
            console.log('search:'+req.query.id);
        }

        if(req.query.search){
            Str += `project_type_name LIKE '${req.query.search}%' `;
            console.log('search:'+req.query.search);
        }
        
        if(req.query.status >= 0){
            if(req.query.search){ Str += ' AND ' }
            Str += `is_active = ${req.query.status} `;
            console.log('status:'+req.query.status);
        }

        if(Str != 'Where '){
            queryStr += Str;
            console.log('queryStr:'+ queryStr);
        }

        db.query(`SELECT * FROM pro_project_type ${queryStr}`,(err,result)=>{
            if(err){
                console.log(err);
                return;
            }else {
                res.send(result);
            }
        });
    });

    app.post('/api-web/deleteProjectType',(req,res) => {

        console.log('id:'+req.query.id);
    
        db.query(`DELETE FROM pro_project_type where project_type_id = ${req.query.id}`,(err,result)=>{
            if(err){
                console.log(err);
                res.send({data:{ success:false }});
            }else {
                res.send(result);
            }
        });
    });
    
    app.post('/api-web/newProjectType',(req,res) => {
    
        console.log(`titleth:${req.query.titleth}
         titleen:${req.query.titleen} 
         status:${req.query.status} 
         createby:${req.query.createby} `);
    
        var query = {
            project_type_code:1,
            project_type_name:req.query.titleth,
            project_type_name_eng:req.query.titleen,
            is_active: req.query.status,
            created_by_id:req.query.createby,
            created_by_name:req.query.createby,
            //created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            updated_by_id:req.query.createby,
            //updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        }
    
        var queryStr = `${query.project_type_code},"${query.project_type_name}","${query.project_type_name_eng}",${query.is_active},${query.created_by_id},"${query.created_by_name}",NOW(),${query.updated_by_id},NOW()`;
        console.log(queryStr)
        db.query(`INSERT INTO pro_project_type(project_type_code,project_type_name,project_type_name_eng,is_active,created_by_id,created_by_name,created_at,updated_by_id,updated_at) VALUES (${queryStr})`,(err,result)=>{
            if(err){
                console.log(err);
            }else {
                res.send(result);
            }
        });   
    });
    
    app.post('/api-web/editProjectType',(req,res) => {
    
        console.log(`id:${req.query.id} 
        ${req.query.titleth} 
        ${req.query.titleen}
        ${req.query.status}
        ${req.query.createby}`);
        
        var queryStr = `project_type_name = "${req.query.titleth}" , is_active = ${req.query.status}`;
    
        if(req.query.titleen){
            queryStr += `,project_type_name_eng = "${req.query.titleen}" `
        }
    
        queryStr += `,updated_by_id = ${req.query.UserID} `
        //queryStr += `,updated_by_name = ${req.query.UserName}`
        queryStr += `,updated_by_name = 'Admin' `
        queryStr += `,updated_at = NOW() `
    
        var querybuild = `UPDATE pro_project_type SET ${queryStr} Where project_type_id = ${req.query.id}`
        console.log('querybuild:'+querybuild);
    
        db.query(querybuild,(err,result)=>{
            if(err){
                console.log(err);
            }else {
                res.send(result);
            }
        });
    });
}