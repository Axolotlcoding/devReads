import React from "react";
import Articles from "./articles.jsx";

export default function Feed({handleDeleteClick}) {

    return (
        <div>
            Feed
            <Articles 
            handleDeleteClick = {handleDeleteClick}
            />
        </div>
    )

}