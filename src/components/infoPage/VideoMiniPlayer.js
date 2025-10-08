import { useState } from "react";
import "./VideoMiniPlayer.css";
import videoSrc from "../../assets/teste.mp4";

const VideoMiniPlayer = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="mini-player-container">
      <div className="mini-player-header">
        <span>Vídeo em Reprodução</span>
        <button
          className="close-btn"
          onClick={() => setVisible(false)}
          aria-label="Fechar vídeo"
        >
          &times;
        </button>
      </div>
      <video
        src={videoSrc}
        className="mini-video-element"
        controls
        autoPlay
        muted
      />
    </div>
  );
};

export default VideoMiniPlayer;