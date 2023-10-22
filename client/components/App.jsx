import React from "react";
import { useState, useEffect } from "react";
import AddArticle from "./AddArticle.jsx";
import Feed from "./Feed.jsx";

const App = () => {

/* 
*********************** initializing state ******************************
*/
  const [feedArticles, setFeedArticles] = useState([])
  const [newArticle, setNewArticle] = useState("");
  const [articleID, setArticleID] = useState("")
  const [user, setUser] = useState("")

/* 
*********************** Grabs Articles for Feed  ******************************
*/  
async function getArticles() {
        try {
          const response = await fetch('http://localhost:8080/articles') 
          const data = await response.json()
          setFeedArticles(data)
        }
        catch (err) {
          console.log(err)
        }
}
console.log("before", feedArticles)
useEffect(() => getArticles(), [])
console.log(feedArticles)
/* 
*********************** Handle Delete Request ******************************
*/
  
function handleDeleteClick() {
    console.log("DELETE")
    useEffect( async () => {
      try { 
      await fetch('http://localhost:8080/', { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {articleID: articleID} )
      })
      getArticles()
    } catch (err) {
        console.log(err)
    }
    }, [])

}

/* 
*********************** Handle POST REQUEST ******************************
*/

function handleAddClick() {
    console.log("ADD")
    useEffect( async () => {
      try { 
      await fetch('http://localhost:8080/', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          articleID: articleID, 
          article: newArticle,
          user: user
        } )
      })
      getArticles()
    } catch (err) {
        console.log(err)
    }
    }, [])

}


/* 
*********************** Handle POST request ******************************
*/


    return (
        <div style={{display: "flex", alignItems: "center", width: "70%", marginLeft: "15%", flexDirection: "column", justifyContent: "center"}}>
            <AddArticle 
            newArticle = {newArticle}
            setNewArticle = {setNewArticle}
            handleAddClick = {handleAddClick}
            />
            <Feed 
            handleDeleteClick = {handleDeleteClick}
            feedArticles = {feedArticles}
            />
        </div>
    )
}

export default App