import React from "react";

const AddArticle = ({handleAddClick, newArticle, setNewArticle}) => {

console.log(newArticle)

    return (
        <div style={{display: "flex-box", width: "100%", justifyContent: "center", border: "solid 1px"}}><h1 style={{textAlign: "center"}}>Add Article</h1>
           <form>
                <label>Article Link Here: 
                    <input type="text" 
                    value = { newArticle }
                    onChange={(e) => setNewArticle(e.target.value)}
                    />
                </label>
            </form><div style={{display: "block", justifyContent: "center"}}><button onClick={handleAddClick}>Add Article</button></div>
        </div>
    )
}

export default AddArticle