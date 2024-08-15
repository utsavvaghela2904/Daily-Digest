import React, {useState, useEffect} from 'react'
import NewsItam from './NewsIteam'
// import Loder from './Loder'
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'


function News(props) {
    const[articles, setArticales] = useState([]);
    const[loading, setLoading]= useState(false);
    const[page, setPage] = useState(1);
    const[totalResults, setTotalResults]= useState(0);

    const capitallizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const UpdateNews = async(Page) => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&category=${props.category}&pageSize=${props.pageSize}&page=${Page}`;
        setLoading(true);
        props.setProgress(30);
        let data = await fetch(url);
        props.setProgress(70);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticales(parsedData.articles);
        setTotalResults (parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
        document.title = `${capitallizeFirstLetter(props.category)} - Daily Spark`
    }

    useEffect(()=>{
        UpdateNews();
        document.title = `${capitallizeFirstLetter(props.category)} - Daily Spark`
    }, [])

    const fetchMoreData = async (Page) => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=f815dd45cc694d34896bc78890e29151&category=${props.category}&pageSize=${props.pageSize}&page=${Page}`;
        setPage(page +1)
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticales(parsedData.articles.concat(articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };

  return (
    <div className='container news-headline'>
    {/* This Is News Components */}
    <h1 className='text-center'>Today's Top Headlines About - {capitallizeFirstLetter(props.category)}</h1>
    {/* {state.loading && <Loder />} */}
    <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<h4>Loading...</h4>}
        endMessage={
            <p className='my' style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
            </p>
        }

    >
        <div className='container'>
            <div className="row my-3">
                {articles.map(
                    (element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItam title={element.title ? element.title.slice(0, 55) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        );
                    })}
            </div>
        </div>
    </InfiniteScroll>
    {/* <div className="d-flex justify-content-between my-4">
        <button type="button" disabled={this.state.page <= 1} className="btn btn-outline-dark" onClick={this.handlePreviousPage}>&larr; Previous</button>
        <button type="button" className="btn btn-outline-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.page)} onClick={this.handleNextPage}>Next &rarr;</button>
    </div> */}
</div>
  )
}

News.defaultProps = {
    pageSize: 6,
    country: "us",
    category: "technology"
}

News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
}

export default News
