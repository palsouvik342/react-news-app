import React, { Component } from 'react';
import Loader from './Loader';
import NewsItem from './NewsItem';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  articles = [];
  apiKey = "1e4f9c9b7a3a4f2e9f1de2a271c351fe";
  constructor() {
    super()
    this.state = {
      articles: this.articles,
      page: 1,
      totalPages: 0,
      loading: false,
      totalResults : 0, 
    }
  }
  // async componentDidMount(){
  //   let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=98788f55a3d64fa182e3c8dc33fa46ab";
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData.articles);
  //   this.setState({articles:parsedData.articles});
  // }
  //  updateNews=()=>{

  //  }
  componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = fetch(url);
    this.setState({ loading: true })
    data.then((data) => {
      let parsedData = data.json();
      parsedData.then((resp) => {
        // console.log(resp);
        this.setState({ loading: false })
        let totalResults = resp.totalResults;
        let totalarticles = resp.articles.length;
        this.setState({ totalPages: Math.ceil(totalResults / totalarticles) });
        this.setState({ articles: resp.articles, totalResults : totalResults })
      })
    })
  }
  // onNextHandle = () => {
  //   this.setState({ page: this.state.page + 1 });
  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   let data = fetch(url);
  //   this.setState({ loading: true })
  //   data.then((data) => {
  //     let parsedData = data.json();
  //     this.setState({ loading: false })
  //     parsedData.then((resp) => {
  //       this.setState({ articles: resp.articles })
  //     })
  //   })
  // }
  // onPreviousHandle = () => {
  //   this.setState({ page: this.state.page - 1 });
  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   let data = fetch(url);
  //   this.setState({ loading: true })
  //   data.then((data) => {
  //     let parsedData = data.json();
  //     this.setState({ loading: false })
  //     parsedData.then((resp) => {
  //       this.setState({ articles: resp.articles })
  //     })
  //   })
  // }
  fetchMoreData = ()=>{
    this.setState({page : this.state.page + 1});
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = fetch(url);
    this.setState({ loading: true })
    data.then((data) => {
      let parsedData = data.json();
      parsedData.then((resp) => {
        this.setState({ articles: this.state.articles.concat(resp.articles) })
      })
    })
  }

  capitalize = (word)=>{
    return word.charAt(0).toUpperCase()+word.slice(1);
  }

  render() {
    document.title = 'Zee News' + " - " + this.capitalize(this.props.category);
    return (
      <div>
        {<div className="container my-4">
          <h1 className='text-center my-4'>Popular Headlines from - {this.capitalize(this.props.category)}</h1>
            {/* {this.state.loading && <Loader />} */}
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults-10}
              loader={<Loader/>}
            >
              {/* {console.log(this.state.articles.length + " " + this.state.totalResults)} */}
              <div className="container">
                <div className="row">
                    {this.state.articles.map((item) => {
                      return <div className="col-md-4" key={item.url}>
                        <NewsItem title={item.title} description={item.description} imageUrl={item.urlToImage} newsUrl={item.url} author={item.author} publishedAt={item.publishedAt} source={item.source.name} />
                      </div>
                    })}
                </div>
              </div>
            </InfiniteScroll>
        </div>}
        <div className="container d-flex justify-content-between my-3">
          <button className="btn btn-dark btn-sm btn-gh" disabled={this.state.page <= 1} onClick={this.onPreviousHandle} >Previous</button>
          <button className="btn btn-dark btn-sm btn-gh" disabled={this.state.page === this.state.totalPages} onClick={this.onNextHandle}>Next</button>
        </div>
      </div>

    )
  }
}
