import React, { Component } from 'react'
import VideoListItem from '../components/Video-list-item'


const VideoList = (props) => {

    const { movieList } = props;

    return (
        <div>
            <ul>
                {

                    movieList.map(movie => {
                        return <VideoListItem key={movie.id} movie={movie} callback={recieveCallBack} />
                    })
                }


            </ul>
        </div>
    )
    function recieveCallBack(movie) {
        props.callback(movie);

    }
}

export default VideoList