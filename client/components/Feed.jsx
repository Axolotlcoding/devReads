import React from "react";
import Articles from "./articles.jsx";

export default function Feed({handleDeleteClick, feedArticles}) {

    const articles = feedArticles.map((article, i) => (
        <Articles 
        key = {`${article+i}`}
        handleDeleteClick = {handleDeleteClick}
        />
    ))
    console.log("articles state", articles)

    return (
        <div style={{display: "flex-box", width: "100%", border: "solid 1px"}}>
            <h2 style={{textAlign: "center"}}>Feed</h2>
            { articles }
            
        </div>
    )

}