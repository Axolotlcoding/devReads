import React from "react";
import Articles from "./articles.jsx";

export default function Feed({handleDeleteClick, feedArticles, handleReadArticleClick}) {

    const articles = [];
    console.log("feedArticles length", feedArticles.length)
    console.log("feed", feedArticles)
    for (let i = 0; i < feedArticles.length; i++) {
      articles.push(
              <Articles 
              key = {`article${i}`}
              handleDeleteClick = {handleDeleteClick}
              handleReadArticleClick = {handleReadArticleClick}
              articleID = {feedArticles[i]._id}
              articleTitle = {feedArticles[i].article_title}
              articleLink = {feedArticles[i].article_link}
              articleUser = {feedArticles[i].username}
              />
          )
    }

    console.log("articles state", articles)

    return (
        <div style={{display: "flex-box", width: "100%", border: "solid 1px"}}>
            <h2 style={{textAlign: "center"}}>Feed</h2>
            { articles }
            
        </div>
    )

}