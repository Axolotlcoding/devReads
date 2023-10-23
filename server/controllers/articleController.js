const db = require("../model/articleModel");

const articleController = {};

//Github OAuth middleware
articleController.authorizeUser = (req, res, next) => {
  console.log("authorizeUser is working");
  return next();
};

//Show user's articles middleware
articleController.getUserPage = async (req, res, next) => {
  console.log("getUserPage with any ID param is working");
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
    const result = await db.query(queryText /*, params*/);
    // console.log('result from getuserPage', result.rows);
    res.locals.user = result.rows;
    return next();
  } catch (err) {
    return next({
      log: `articleController.getUserPage: ERROR : ${err}`,
      message: {
        err: "Error occurred in articleController.getUserPage. Check server logs for more detail",
      },
      status: 500,
    });
  }
};

// Update and publish Feed Articles
articleController.feedArticles = async (req, res, next) => {
  console.log("entered articleController.feedArticles middleware");
  try {
    const queryText = `
        SELECT *
        FROM articles
        `;

    // const params = [id];
    const result = await db.query(queryText /*, params*/);
    console.log("result from feedArticles", result.rows);
    res.locals.articles = result.rows;
    return next();
  } catch (err) {
    return next({
      log: `articleController.feedArticles: ERROR : ${err}`,
      message: {
        err: "Error occurred in articleController.feedArticles. Check server logs for more detail",
      },
      status: 500,
    });
  }
};

//Add article middleware
articleController.addArticle = async (req, res, next) => {
  try {
    console.log("articleController.addArticle middleware is working");

    //capture article_link value and user value from front end request body
    const { article_link, user } = req.body;

    //define query parameters ($1 = article_link, $2 = user)
    const queryParams = [article_link, user];

    //Define SQL query
    const text = `
        INSERT INTO articles (article_link, article_title, user_id)
        VALUES ($1, $2, 1)
        `;

    //Run SQL query
    const result = await db.query(text, queryParams);
    res.locals.article = result;
    return next();
  } catch (err) {
    return next({
      log: `articleController.addArticle: ERROR : ${err}`,
      message: {
        err: "Error occurred in articleController.addArticle. Check server logs for more detail",
      },
      status: 500,
    });
  }
};

articleController.deleteArticle = async (req, res, next) => {
  try {
    const { articleID } = req.body;
    const queryParams = [articleID];
    const text = `
        DELETE FROM articles WHERE _id = $1
        `;
    db.query(text, queryParams);
    return next();
  } catch (err) {
    return next({
      log: `articleController.deleteArticle: ERROR : ${err}`,
      message: {
        err: "Error occurred in deleteController.addArticle. Check server logs for more detail",
      },
      status: 500,
    });
  }
};

module.exports = articleController;

// temporary search query test
// SELECT u.username AS submitter, a.article_title, a.article_link
//     FROM articles a
//     INNER JOIN users u
//     ON a.user_id = u._id
