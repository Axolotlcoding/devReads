import React from "react";
import AddArticle from "./AddArticle.jsx";
import Feed from "./Feed.jsx";

const App = () => {


function handleDeleteClick() {
    console.log("DELETE")
}

function handleAddClick() {
    console.log("AddClick")
}

    return (
        <div>
            <AddArticle 
            handleAddClick = {handleAddClick}
            />
            <Feed 
            handleDeleteClick = {handleDeleteClick}
            />
        </div>
    )
}

export default App