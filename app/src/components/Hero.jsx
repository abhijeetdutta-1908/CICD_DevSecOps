import "./Hero.css";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../utils";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 768 ? smallHeroVideo : heroVideo
  );

  const handleVideoSrcSet = () => {
    setVideoSrc(window.innerWidth < 768 ? smallHeroVideo : heroVideo);
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);
    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  }, []);

  useGSAP(() => {
    gsap.to(".hero__title", { opacity: 1, delay: 3  });
  }, []);

  useGSAP(() => {
    gsap.to(".cta", { opacity: 1,y:-50, delay: 3 });
  }, []);

  return (
    <section className="hero">
      <div className="hero__video-background">
        <video
          className="pointer-events-none"
          autoPlay
          muted
          playsInline
          key={videoSrc}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="hero__content">
        <p className="hero__title">iPhone 15 Pro</p>
      </div>

      <div className="cta">
        <a href="#buy" className="buy-button">
          Buy
        </a>
        <p className="buy__text">
          From $41.62/mo. or $1000.00 </p>
      </div>
    </section>
  );
};

export default Hero;
