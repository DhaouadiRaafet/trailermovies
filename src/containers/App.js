import React, { Component } from 'react';
import SearchBar from '../components/Search-bar'
import VideoDetail from '../components/video-detail'
import VideList from './Video-list'

import axios from 'axios'
import Video from '../components/Video';
import Image from '../components/Image';


const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "e4dfc96e3773def7e1fef3d853b4cf96";
const Search_URL = "search/movie?language=fr&include_adult=false"


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {

            movieList: {},
            currentMovie: {}
        }

    }

    componentWillMount() {
        this.initMovies();


    }

    initMovies() {
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&api_key=${API_KEY}`)
            .then(function (response) {
                this.setState({ movieList: response.data.results.slice(1, 6), currentMovie: response.data.results[0] }, function () {
                    this.applyVideoToCurrentMovie();
                });


            }.bind(this));
    }


    applyVideoToCurrentMovie() {

        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?api_key=${API_KEY}&append_to_response=videos&include_adult=false`)
            .then(function (response) {
                const youtubeKey = response.data.videos.results[0].key;
                let newCurrentMovieState = this.state.currentMovie;
                newCurrentMovieState.videoID = youtubeKey;

                this.setState({ currentMovie: newCurrentMovieState });

            }.bind(this));

    }

    onClickListItem(movie) {
        this.setState({ currentMovie: movie }, function () {
            this.applyVideoToCurrentMovie();
            this.setRecommendation()
        })
    }

    setRecommendation() {
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?api_key=${API_KEY}&append_to_response=videos&include_adult=false`)
            .then(function (response) {

                this.setState({ movieList: response.data.results.slice(0, 5) });

            }.bind(this));
    }

    onClickSearch(searchText) {

        if (searchText) {
            axios.get(`${API_END_POINT}${Search_URL}&api_key=${API_KEY}&query=${searchText}`)
                .then(function (response) {
                    if (response.data && response.data.results[0]) {

                        if (response.data.results[0].id != this.state.currentMovie.id) {

                            this.setState({ currentMovie: response.data.results[0] }, function () {
                                this.applyVideoToCurrentMovie();
                                this.setRecommendation();
                            });
                        }


                    }



                }.bind(this));
        }


    }
    render() {

        const renderVideoList = () => {
            if (this.state.movieList.length >= 5) {
                return <VideList movieList={this.state.movieList} callback={this.onClickListItem.bind(this)} />
            }

        }
        return (
            <div>
                <div className="search_bar">
                    <div className="row">
                        <div className="col-md-8">

                            <SearchBar callback={this.onClickSearch.bind(this)} />
                        </div>
                        <div className="col-md-4">
                            <Image />
                        </div>
                    </div>
                    <div className="row">
                        <br></br>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <Video videoID={this.state.currentMovie.videoID} />
                            <VideoDetail title={this.state.currentMovie.title} overview={this.state.currentMovie.overview} />
                        </div>
                        <div className="col-md-4">
                            {renderVideoList()}
                        </div>
                    </div>




                </div>
            </div>
        )
    }
}

export default App;