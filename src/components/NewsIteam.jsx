import React from 'react'

function NewsIteam(props) {

    let { title, description, imageUrl, newsUrl, author, date, source } = props;

    return (
        <div className='my-3'>
            <div className="card">
                <img className='news-img' src={imageUrl ? imageUrl : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...
                        <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                            {source}
                        </span>
                    </h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-outline-success">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsIteam
