 const { body } = require("express-validator");
 const validationSchema =()=>{
    return [
        body("title").notEmpty().isLength({ min: 2 }),
        body("price").notEmpty().withMessage("price is required")]
 }


module.exports = {validationSchema}; 