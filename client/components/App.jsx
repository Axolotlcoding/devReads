import React, { useState, useEffect } from "react";
import AddArticle from "./AddArticle.jsx";
import Feed from "./Feed.jsx";

const App = () => {

/* 
*********************** initializing state ******************************
*/
  const [feedArticles, setFeedArticles] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [newArticle, setNewArticle] = useState("");
  const [user, setUser] = useState("")

  /* 
*********************** Grabs User Data for display or reference  ******************************
*/  


// useEffect(() => {
//   async function getUser() {
//       try {
//         const response = await fetch('http://localhost:3000/user') 
//         const data = await response.json()
//         setUser(data)
//       }
//       catch (err) {
//         console.log(err)
//       }
//   }
//   getUser()
// }, [])


/* 
*********************** Grabs Articles for Feed  ******************************
*/  

  async function getArticles() {
          try {
            const response = await fetch('http://localhost:3000/user') 
            const data = await response.json()
            setFeedArticles(data)
          }
          catch (err) {
            console.log(err)
          }
  }
  useEffect(() => {
    getArticles()
  }, [])
  // useEffect(() => {
  //   async function getArticles(){
  //   try {
  //     console.log("hi")
  //     const response = await fetch('http://localhost:3000/article') 
  //     console.log("data", data)
  //     const data = await response.json()
  //     setFeedArticles(data)
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // }
  // getArticles()
  // }, [])
    
 

/* 
*********************** Handle Delete Request ******************************
*/
  
const handleDeleteClick = (articleID) => {
    console.log("in delete click")
      fetch('http://localhost:3000/article', { 
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

    // console.log(title)
    fetch('http://localhost:3000/article', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          article_link: newArticle,
          user: newTitle
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
*********************** Handle Read Article request ******************************
*/

const handleReadArticleClick = (articleLink) => {

    // fetch('http://localhost:3000/readarticle')
    //   .then(() => {
    //     // getArticles()
    //     console.log('Redirected!')
    //   })
    //   .catch(error => console.log(error));
  console.log("Not neede function");
  }



    return (
        <div style={{display: "flex", alignItems: "center", width: "70%", marginLeft: "15%", flexDirection: "column", justifyContent: "center"}}>
            <AddArticle 
            newArticle = {newArticle}
            setNewArticle = {setNewArticle}
            handleAddClick = {handleAddClick}
            newTitle = {newTitle}
            setNewTitle = {setNewTitle}
            />
            <Feed 
            handleReadArticleClick = {handleReadArticleClick}
            handleDeleteClick = {handleDeleteClick}
            feedArticles = {feedArticles}
            />
        </div>
    )
}

export default App