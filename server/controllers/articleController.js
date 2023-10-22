const db = require('../model/articleModel');


const articleController = {};
    
  articleController.authorizeUser = (req, res, next) => {
    console.log('authorizeUser is working');
    return next();
  }

  articleController.getUserPage = async (req, res, next) => {
    console.log('getUserPage with any ID param is working');
    const { id } = req.query;
    //get username record associated with the id variable passed in as a request parameter
    
    //look at id variable (imagine it's the number 1) -- select record from user table where _id = 1, and return the username
    try {
      const queryText = `
      SELECT _id, username
      FROM users
      WHERE _id = $1
      `;

      const params = [id];
      const result = await db.query(queryText, params); 
      console.log('result from getuserPage', result.rows[0].username);
      res.locals.user = result.rows[0];
      return next();
    } catch (err) {
      return next ({
        log: `articleController.getUserPage: ERROR : ${err}`,
        message: {
          err:'Error occurred in articleController.getUserPage. Check server logs for more detail'
        },
        status: 500,
      });
    }
    
  };

module.exports = articleController;