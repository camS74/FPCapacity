const express = require('express');
const router = express.Router();
router.get('/', async (req,res)=> {
  const rows = await req.app.locals.pool.query('SELECT * FROM product_process');
  res.json(rows.rows);
});
module.exports = router;