import './style.css';
import React from 'react';

export default class NewsFilters extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            filtersState: props.filtersState,
            q: props.filtersState.q,
            source: props.filtersState.source,
            setFiltersState: props.setFiltersState
        };

        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleSourceChange = this.handleSourceChange.bind(this);
    }

    handleQueryChange(e) {
        e.preventDefault();
        this.state.setFiltersState({...this.state.filtersState, q: e.target.elements.search.value});
    }

    handleSourceChange(e) {
        this.state.setFiltersState({...this.state.filtersState, source: e.target.value});
    }

    render() {
        return (
            <div className="news-filters">
                <form className="news-search" onSubmit={this.handleQueryChange}>
                    <input type="search" name="search"/>
                    <button type="submit">Search</button>
                </form>
                <form className="news-source">
                    <select value={this.state.source} onChange={this.handleSourceChange} name="source" placeholder="Select news sources">
                        <option value>Select news sources</option>
                        <option value="abc-news">ABC News</option>
                        <option value="abc-news-au">ABC News (AU)</option>
                        <option value="al-jazeera-english">Al Jazeera English</option>
                        <option value="ars-technica">Ars Technica</option>
                        <option value="associated-press">Associated Press</option>
                        <option value="australian-financial-review">Australian Financial Review</option>
                        <option value="axios">Axios</option>
                        <option value="bbc-news">BBC News</option>
                        <option value="bbc-sport">BBC Sport</option>
                        <option value="bleacher-report">Bleacher Report</option>
                    </select>
                </form>
            </div>
        );
    }
}