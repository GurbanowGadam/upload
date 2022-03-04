const database = require('./../db/indexDB')

const home = async(req,res)=>{
    try {
        const q_text = `select * from languages;`
        const q_prds = `select * from translation_products;`
        const { rows } = await database.query(q_text,[])
        const prds = await database.query(q_prds,[])
        res.json({ status: true, "data": rows, "products":prds.rows })
    } catch (err) {
        res.json({ "status": false, "msg": err.message })
    }
}


const category = async(req,res)=>{
    try {
        const categ = req.params.category
        const lang = req.params.lang

        const q_tp = `
            select * from translation_products where product_id in (
                select id from products where sub_category_id in ( select id from sub_category 
                where category_id in (select id from category where name = '${categ}') )
                and lang_id in (select id from languages where short_name = '${lang}')   );
            `
        const q_sc = `
            select * from translation_sub_category where sub_category_id in ( 
                    select id from sub_category where category_id in ( 
                        select id from category where name = '${categ}') )
                and lang_id in ( select id from languages where short_name = '${lang}');
            `
            
        const products = await database.query(q_tp,[])
        const sub_category = await database.query(q_sc,[])

        res.json({ "lang":lang, "translat_product": products.rows, "sub_categorys": sub_category.rows })
    } catch (err) {
        
    }
}


const sub_category = async(req,res)=>{
    try {
        const categ = req.params.category
        const lang = req.params.lang
        const sub_category = req.params.sub_category
        console.log(categ, lang, sub_category)

        const q_tp = `
        select * from translation_products where product_id in (  
                select id from products where sub_category_id in ( 
                select id from sub_category where category_id in 
                ( select id from category where name = '${categ}' ) and name = '${sub_category}' ) 
            and lang_id in (select id from languages where short_name = '${lang}')  );
        `
        const sub_ctg_prd = await database.query(q_tp,[])

        res.json({ "lang":lang, "sub_ctg_prd": sub_ctg_prd.rows })
    } catch (err) {
        
    }
}


const about = async (req,res)=>{
    try {
        console.log(req.params.lang)
        const q_text = `select * from about;`
        const { rows } = await database.query(q_text,[])
        res.json({ status: true, "data": rows })
    } catch (err) {
        res.json({ "status": false, "msg": err.message })
    }
}


const footer = async (req,res)=>{
    try {
        const q_text = `select * from footer;`
        const { rows } = await database.query(q_text,[])
        res.json({ status: true, "data": rows })
    } catch (err) {
        res.json({ "status": false, "msg": err.message })
    }
}



module.exports = {
    home,
    category,
    sub_category,
    about,
    footer
}





// create or replace function select_sub_category_fc( categ character varying(25))  
// returns table(
//     id1 int,
//     name1 character varying(25),
//     category_id1 int
// )
// language plpgsql
// as
// $$
// begin
//     return query 
//         select id, name, category_id from sub_category where category_id = (select id from category where name = categ );
// end;
// $$;


