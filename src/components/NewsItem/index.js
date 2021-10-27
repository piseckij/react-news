import './style.css';
import React from 'react';

export default class NewsItem extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = props.item;
    }

    render() {
        return (
            <div className="news-item">
                <h2 className="news-item__title">{this.state.title}</h2>
                <p className="news-item__text">{this.state.description}</p>
                <img className="news-item__image" src={this.state.urlToImage} alt={this.state.title}/>
                <a className="news-item__url" rel="noreferrer" href={this.state.url} target="_blank">
                    Read full version on {this.state.source.name}
                </a>
            </div>
        );
    }
}