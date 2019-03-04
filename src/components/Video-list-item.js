import React from 'react'


const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";
const a = "aa"

const VideoListItem = (props) => {
     const { movie } = props;



     return (
          <div>
               <li className="list-group-item" onClick={handleOnClick}>
                    <div className="media">
                         <div className="media-left">
                              <img className="media-object img-rounded" height="100px" width="100px" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} />
                         </div>

                         <div className="media-body">
                              <h5 className="title_list_item">{movie.title}</h5>
                         </div>
                    </div>
               </li>
          </div>


     )

     function handleOnClick() {
          console.log(props.callback(movie))
     }

}

export default VideoListItem;