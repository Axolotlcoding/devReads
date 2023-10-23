import React from "react";
import { useState, useEffect } from "react";
import AddArticle from "./AddArticle.jsx";
import Feed from "./Feed.jsx";

const App = () => {

/* 
*********************** initializing state ******************************
*/
  const [feedArticles, setFeedArticles] = useState("")
  const [newArticle, setNewArticle] = useState("");
  const [user, setUser] = useState("")

  /* 
*********************** Grabs User Data for display or reference  ******************************
*/  

async function getUser() {
    try {
      const response = await fetch('http://localhost:3000/user') 
      const data = await response.json()
      setUser(data)
    }
    catch (err) {
      console.log(err)
    }
}

useEffect(() => getUser(), [])


/* 
*********************** Grabs Articles for Feed  ******************************
*/  
async function getArticles() {
        try {
          const response = await fetch('http://localhost:3000/articles') 
          const data = await response.json()
          setFeedArticles(data)
        }
        catch (err) {
          console.log(err)
        }
}

useEffect(() => getArticles(), [])

/* 
*********************** Handle Delete Request ******************************
*/
  
const handleDeleteClick = (articleID) => {
    console.log("in delete click")
      fetch('http://localhost:3000/articles', { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({articleID: articleID})
      })
        .then(() => {
          getArticles()
          console.log('Article Deleted!')
        })
        .catch(error => console.log(error));
    console.log("delete request completed");
    }

/* 
*********************** Handle POST REQUEST ******************************
*/

const handleAddClick = () => {
    console.log("inside ADD")
    fetch('http://localhost:3000/articles', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          article: newArticle,
          user: user
        } )
      })
      .then(() => {
        getArticles()
        console.log("article posted and state re-initialized")
      })
      .catch(err => console.log(err))
    console.log("add request completed")
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