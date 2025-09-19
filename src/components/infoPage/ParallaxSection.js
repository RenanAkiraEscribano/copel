import { Parallax } from 'react-parallax';

export default function ParallaxSection({
  id,
  bgImage,
  strength = 300,
  children,
  className = '',
  bgImageStyle = {}, // Adicionado!
}) {
  return (
    <Parallax bgImage={bgImage} strength={strength} bgImageStyle={bgImageStyle}>
      <div id={id} className={`parallax-section ${className || ''}`}>
        <div className="parallax-overlay" />
        <div className="parallax-content fade-blur-transition">
          {children}
        </div>
      </div>
    </Parallax>
  );
}
