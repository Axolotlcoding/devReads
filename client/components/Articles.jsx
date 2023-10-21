import React from "react";

const Articles = ({handleDeleteClick}) => {

    return (
        <div>Articles
            <button onClick={handleDeleteClick}>HandleDelete</button>
        </div>
    )
}

export default Articles