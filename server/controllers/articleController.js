const db = require('../model/articleModel');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;



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
      SELECT users.username, articles.article_title, articles.article_link
      FROM users
      INNER JOIN articles ON articles.user_id = users._id
      `;

      // const params = [id];
      const result = await db.query(queryText/*, params*/); 
      // console.log('result from getuserPage', result.rows);
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
    try {
        console.log('articleController.addArticle middleware is working');

        //capture article_link value and user value from front end request body
        const { article_link, user } = req.body;
        
        //get article title programatically by fetching the link inside this middleware and grab the <title> html tag contents
        const getTitle = (url) => {
            return fetch(url)
            .then(response => {
              const dom = new JSDOM(response.body);
              console.log(dom.window.document.querySelector('title'));
             // console.log(dom.window.document.querySelectorAll('title'));
            });  
        };

        const article_title = await getTitle(article_link);
        console.log(`article title is: `, article_title);
        
        //define query parameters ($1 = article_link, $2 = user)
        const queryParams = [article_link, article_title,  user];


        //Define SQL query
        const text = `
        INSERT INTO articles (article_link, article_title, user_id)
        VALUES ($1, $2, 1)
        `;


        //Run SQL query
        const result = await db.query(text, queryParams);
        res.locals.article = result;
        return next();
        } 
      catch (err) {
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