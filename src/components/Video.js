import React from 'react'


const Video = ({ videoID }) => {

    return (
        <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive" src={`https://www.youtube.com/embed/${videoID}`} />

        </div>
    )
}

export default Video