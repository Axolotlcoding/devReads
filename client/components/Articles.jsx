import React from "react";

const Articles = ({handleDeleteClick, articleID}) => {

    return (
        <div><h3>Articles</h3>
            <button onClick={ () => { handleDeleteClick(articleID) } }>HandleDelete</button>
        </div>
    )
}

export default Articles