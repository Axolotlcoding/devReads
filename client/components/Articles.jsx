import React from "react";


const Articles = ({handleDeleteClick, handleReadArticleClick, articleID, articleTitle, articleLink, articleUser}) => {

    // const ExternalLink = ({ onClick, as: Component = 'button'}) => {
    //     return (
    //       <Component onClick={onClick}>
            
    //       </Component>
    //     );
    //   };


    return (
        <div><h3>{articleTitle}</h3>
        <h3>{articleUser}</h3>
        <a href={articleLink} target="_blank"><button>View Article</button></a>
            {/* <ExternalLink as="button" href={articleLink}>Read Article</ExternalLink> */}
            <button onClick={ () => { handleDeleteClick(articleID) } } type="submit">Delete</button>
        </div>
    )
}

export default Articles