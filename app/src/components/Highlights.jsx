import "./Highlights.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title-bar", { opacity: 1, y: 0, delay: 1, duration: 1 });
    gsap.to("#link", { opacity: 1, y: 0 ,delay:1, duration: 1, stagger: 0.25 });
  }, []);

  return (
    <section className="highlights">
      <div className="highlight-box">
        <h1 id="title-bar">Get The Highlights</h1>
        <div className="text-side">
          <p id="link">
            Watch the Film
            <img src={watchImg} alt="watch" />
          </p>
          <p id="link">
            Watch the Event
            <img src={rightImg} alt="watch" />
          </p>
        </div>
      </div>
      <VideoCarousel />
    </section>
  );
};

export default Highlights;
