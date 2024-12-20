const {Pool}=require("pg")
 
const pool = new Pool({
  host: 'localhost',
  user: 'asheque33',
  port:5432,
  database:"bookdb",//!database name must be lowercase & without whitespace

})
module.exports=pool;