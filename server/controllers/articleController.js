const db = require('../model/articleModel');


const articleController = {};
  
  //Github OAuth middleware 
  articleController.authorizeUser = (req, res, next) => {
    console.log('authorizeUser is working');
    return next();
  }

  //Show user's articles middleware
  articleController.getUserPage = async (req, res, next) => {
    console.log('getUserPage with any ID param is working');
    // const { id } = req.query;
    //get username record associated with the id variable passed in as a request parameter
    //look at id variable (imagine it's the number 1) -- select record from user table where _id = 1, and return the username
    try {
      const queryText = `
      SELECT *
      FROM users
      `;

      // const params = [id];
      const result = await db.query(queryText/*, params*/); 
      console.log('result from getuserPage', result.rows);
      res.locals.user = result.rows;
      return next();
    } 
    catch (err) {
      return next ({
        log: `articleController.getUserPage: ERROR : ${err}`,
        message: {
          err:'Error occurred in articleController.getUserPage. Check server logs for more detail'
        },
        status: 500,
      });
    };
  };


  //Add article middleware
  articleController.addArticle = async (req, res, next) => {
    console.log('articleController.addArticle middleware is working');


    try {

    //front end will send a req body with an article link string attached
    
    //get article title programatically by fetching the link inside this middleware and grab the <title> html tag contents

    //store both of the above value in varibles
    const articleLink = ''; //something
    const articleTitle = '';  //something

    //run paramaterized SQL statement adding article to database
    // $1 = articleLink
    // $2 = articleTitle

    //query parameters
    const queryParams = [articleLink, articleTitle];

    //SQL query
    const text = `
    INSERT INTO articles (article_link, article_title, user_id)
    VALUES ($1, $2, 1)
    `;
       
    } catch (err) {
        return next ({
            log: `articleController.addArticle: ERROR : ${err}`,
            message: {
              err:'Error occurred in articleController.addArticle. Check server logs for more detail'
            },
            status: 500,
          });

    };
  };

module.exports = articleController;



// temporary search query test
// SELECT u.username AS submitter, a.article_title, a.article_link
//     FROM articles a
//     INNER JOIN users u
//     ON a.user_id = u._id