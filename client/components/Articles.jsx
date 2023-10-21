import React from "react";

const Articles = ({handleDeleteClick}) => {

    return (
        <div><h3>Articles</h3>
            <button onClick={handleDeleteClick}>HandleDelete</button>
        </div>
    )
}

export default Articles