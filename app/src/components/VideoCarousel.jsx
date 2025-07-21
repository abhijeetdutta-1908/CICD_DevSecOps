import { use, useEffect, useRef, useState} from "react";
import { hightlightsSlides } from "../constants";
import "./VideoCarousel.css";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video,setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId : 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);

  const {isEnd, startPlay, videoId, isLastVideo, isPlaying} = video;

  useEffect(() => {
    if(loadedData.length > 3){
      if(!isPlaying){
        videoRef.current[videoId].pause();
      }
      else{
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay,videoId, isPlaying, loadedData]);

  useEffect(() => {
    const currentProgress = 0;
    let span = videoSpanRef.current;

    if(span [videoId] ){
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {

        },
        onComplete: () => {
          
          }
        
      }
      )
    }

  }, [videoId , startPlay]);

  return (
    <>
      <div className="video-carousel">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider">
            <div className="video-carousel-container">
              <div className="video-carousel-item">
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted={true}
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={()=>{
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }))
                  }}                 
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="playbar">
                {list.textLists.map((text) => (
                  <p key={text} className="text">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
        <div className="animation">
          <div className="animation-dot">
            {videoRef.current.map(( _,i)=>(
              <span 
              key={i}
              ref={(el) => (videoSpanRef.current[i] = el)}
              className=""
              >

              </span>
            ))}
          </div>
        </div>

    </>
  );
};

export default VideoCarousel;
