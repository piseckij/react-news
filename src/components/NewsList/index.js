import './style.css';
import React from 'react';
import NewsItem from '../NewsItem'
import NewsFilters from "../NewsFilters";

const thereAreNoArticles = 'There are no news matching your request.';
const pageSize = 5;
const newsLimit = 40;
const apiKey = '4dd8d2c3142f4ecb9db93008de1f2a22';
const loadArticles = async ({page, pageSize, source, q}) => {
    let url = encodeURI(`https://newsapi.org/v2/top-headlines?` +
        `language=en&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}&q=${q || ''}&sources=${source || ''}`);
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error('Error ' + response.statusText);
    }
    let json = await response.json();
    if (json.status === 'error') {
        throw new Error(json.message);
    }

    return {
        total: json.totalResults,
        items: json.articles
    }
}

export default class NewsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageSize: pageSize,
            source: '',
            q: '',
            items: [],
            loadMore: true,
        };
        this.loadMore = this.loadMore.bind(this);
        this.handleFiltersChange = this.handleFiltersChange.bind(this);
    }

    componentDidMount() {
        loadArticles({
            ...this.state
        })
            .then(data => {
                this.setState({items: data.items});
            })
            .catch(e => alert(e.message));
    }

    handleFiltersChange(filtersState) {
        const page = 1;
        loadArticles({...this.state, page, ...filtersState})
            .then(data => {
                const items = data.items;
                const loadMore = items.length < Math.min(data.total, newsLimit);
                this.setState({page, items, loadMore, ...filtersState});
            })
            .catch(e => alert(e.message));
    }

    loadMore() {
        const page = this.state.page + 1;
        const params = {...this.state, page};
        loadArticles(params)
            .then(data => {
                const items = [...this.state.items, ...data.items];
                const loadMore = items.length < Math.min(data.total, newsLimit);
                this.setState({page, items, loadMore});
            })
            .catch(e => alert(e.message));
    }

    render() {
        return (
            <div className="news-list">
                <NewsFilters filtersState={{source: this.state.source, q: this.state.q}}
                             setFiltersState={this.handleFiltersChange}/>
                {this.state.items.length > 0
                    ? this.state.items.map(item => <NewsItem key={item.url} item={item}/>)
                    : thereAreNoArticles
                }
                {this.state.loadMore && <span className="news-list__load-more" onClick={this.loadMore}>Load more</span>}
            </div>
        );
    }
}