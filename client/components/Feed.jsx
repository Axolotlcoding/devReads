import React from "react";
import Articles from "./articles.jsx";

export default function Feed({handleDeleteClick, feedArticles}) {

    // const articles = feedArticles.map((article, i) => {
    //     <Articles 
    //     key = {`${article+i}`}
    //     handleDeleteClick = {handleDeleteClick}
    //     />
    // })

    return (
        <div style={{display: "flex-box", width: "100%", border: "solid 1px"}}>
            <h2 style={{textAlign: "center"}}>Feed</h2>
            <Articles />
            
        </div>
    )

}