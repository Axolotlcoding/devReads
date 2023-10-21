import React from "react";

const AddArticle = ({handleAddClick}) => {

    return (
        <div><h1>Add Article</h1>
        <div><button onClick={handleAddClick}>Add Article</button></div>
        </div>
    )
}

export default AddArticle