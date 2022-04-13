import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
      let {title,description,imageUrl,newsUrl,author,publishedAt,source} = this.props;
    return (
      <>
        
        <span className="position-absolute top-0 translate-middle start-100 badge rounded-pill bg-info text-dark">{source}</span>
        <div className="card my-3">

            <img src={imageUrl?imageUrl:'https://images.hindustantimes.com/tech/img/2022/04/10/1600x900/pop01_1647478122884_1649597149361.jpg'} className="card-img-top" alt=""/>
            <div className="card-body">
            <p className="card-text"><small className="text-muted">Published on {new Date(publishedAt).getDate()}/{new Date(publishedAt).getMonth()+1}/{new Date(publishedAt).getFullYear()} by {author?author:"Unknown"}</small></p>
                <h5 className="card-title">{title&&title.slice(0,65)}...</h5>
                <p className="card-text">{description&&description.slice(0,90)}...</p>
                <a href={newsUrl} target="_blank" className="btn btn-dark">Read More</a>
            </div>
        </div>
        
        </>
    )
  }
}
