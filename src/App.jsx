import { useRef, useEffect, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html } from '@react-three/drei'
import AboutMe from './AboutMe.jsx';
import Projects from './Projects.jsx';
import Contact from './Contact.jsx';
import './App.css'
import cafeMusic from './assets/cafemusic.mp3';

//const defaultModelPos = [0.7, 1.6, 3];
const defaultModelPos = [0, 0, 0];

function CameraAnimation({ onFinish }) {
  const { camera } = useThree();
  const frame = useRef(0);
  const totalFrames = 240; // slower animation

  useFrame(() => {
    if (frame.current < totalFrames) {
      const t = frame.current / totalFrames;
      const radius = 6;
      camera.position.x = Math.sin(t * Math.PI * 2) * radius;
      camera.position.z = Math.cos(t * Math.PI * 2) * radius;
      camera.position.y = 1.5 + Math.sin(t * Math.PI) * 0.5;
      camera.lookAt(0, 0, 0);
      frame.current += 1;
      if (frame.current === totalFrames && onFinish) onFinish();
    }
  });
  return null;
}

function WelcomeOverlay({ show }) {
  if (!show) return null;
  return (
    <div className="welcome-overlay">
      Welcome to Ayushi’s Space!<br />Hover around to explore☕
    </div>
  );
}

function CoffeeShopModel(props) {
  const { scene } = useGLTF('/src/assets/mycafe2.glb')
  const [aboutMeshHover, setAboutMeshHover] = useState(false);
  const [aboutButtonHover, setAboutButtonHover] = useState(false);
  const [projectsMeshHover, setProjectsMeshHover] = useState(false);
  const [projectsButtonHover, setProjectsButtonHover] = useState(false);
  const [contactMeshHover, setContactMeshHover] = useState(false);
  const [contactButtonHover, setContactButtonHover] = useState(false);
  const aboutPos = [-0.68, 1.6, 3];
  const projectsPos = [0.7, 1.6, 3];
  const contactPos = [-0.5, 0.1, 2.5]; // in front and above the table

  const aboutButtonVisible = props.showAllButtons || aboutMeshHover || aboutButtonHover;
  const projectsButtonVisible = props.showAllButtons || projectsMeshHover || projectsButtonHover;
  const contactButtonVisible = props.showAllButtons || contactMeshHover || contactButtonHover;

  return (
    <>
      {/* About Me Hover Area */}
      <mesh
        position={aboutPos}
        scale={[1.2, 0.6, 0.2]}
        onPointerOver={() => setAboutMeshHover(true)}
        onPointerOut={() => setAboutMeshHover(false)}
        visible={true}
      >
        <boxGeometry />
        <meshStandardMaterial color="red" transparent opacity={0} />
      </mesh>
      {aboutButtonVisible && (
        <Html position={aboutPos} center distanceFactor={4}>
          <button
            className="aboutme-btn"
            onClick={props.onAboutOpen}
            onMouseEnter={() => setAboutButtonHover(true)}
            onMouseLeave={() => setAboutButtonHover(false)}
          >
            About Me
          </button>
        </Html>
      )}
      {/* Projects Hover Area (Coffee sign) */}
      <mesh
        position={projectsPos}
        scale={[1.2, 0.6, 0.2]}
        onPointerOver={() => setProjectsMeshHover(true)}
        onPointerOut={() => setProjectsMeshHover(false)}
        visible={true}
      >
        <boxGeometry />
        <meshStandardMaterial color="blue" transparent opacity={0} />
      </mesh>
      {projectsButtonVisible && (
        <Html position={projectsPos} center distanceFactor={4}>
          <button
            className="aboutme-btn"
            onClick={props.onProjectsOpen}
            onMouseEnter={() => setProjectsButtonHover(true)}
            onMouseLeave={() => setProjectsButtonHover(false)}
          >
            Projects
          </button>
        </Html>
      )}
      {/* Contact Me Hover Area (above table) */}
      <mesh
        position={contactPos}
        scale={[1.5, 2, 0.2]}
        onPointerOver={() => setContactMeshHover(true)}
        onPointerOut={() => setContactMeshHover(false)}
        visible={true}
      >
        <boxGeometry />
        <meshStandardMaterial color="green" transparent opacity={0} />
      </mesh>
      {contactButtonVisible && (
        <Html position={contactPos} center distanceFactor={4}>
          <button
            className="aboutme-btn"
            onClick={props.onContactOpen}
            onMouseEnter={() => setContactButtonHover(true)}
            onMouseLeave={() => setContactButtonHover(false)}
          >
            Contact Me
          </button>
        </Html>
      )}
      <primitive object={scene} scale={0.062} position={props.modelPosition}
        rotation={[Math.PI / 2.7, 0, 0]} />
    </>
  );
}

function DynamicSunsetBackground() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const bgRef = useRef(null);

  useEffect(() => {
    function handleMove(e) {
      let x, y, w, h;
      if (bgRef.current) {
        const rect = bgRef.current.getBoundingClientRect();
        w = rect.width;
        h = rect.height;
        x = ((e.clientX - rect.left) / w) * 100;
        y = ((e.clientY - rect.top) / h) * 100;
      } else {
        x = 50; y = 50;
      }
      setPos({ x, y });
    }
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const gradient = `radial-gradient(circle at ${pos.x}% ${pos.y}%, #fff8fc 0%, #fde6ed 7%, #e0b3ff 25%, #aeefff 100%)`;

  return (
    <div ref={bgRef} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
      background: gradient,
      transition: 'background 0.2s',
    }} />
  );
}

export default function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [showAllButtons, setShowAllButtons] = useState(false);
  const [modelPosition, setModelPosition] = useState(defaultModelPos);
  const controlsRef = useRef();
  const [isCameraAnimationFinished, setIsCameraAnimationFinished] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleMusic = () => {
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {});
    }
  };

  const handleReset = () => {
    setModelPosition(defaultModelPos);
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <>
      <DynamicSunsetBackground />
      {/* Cafe Sign Board and Buttons (show only after animation) */}
      {isCameraAnimationFinished && (
        <div className="cafe-sign-board">
          <div className="cafe-sign-text">☕ Welcome ☕</div>
          <button
            className="reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="show-btn"
            onClick={() => setShowAllButtons(v => !v)}
          >
            {showAllButtons ? "Explore" : "Explore or Click Me"}
          </button>
          <button
            className="music-btn"
            onClick={handleMusic}
          >
            {musicPlaying ? 'Pause Music' : 'Play Music'}
          </button>
          <audio ref={audioRef} src={cafeMusic} loop />
        </div>
      )}
      <AboutMe open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <Projects open={projectsOpen} onClose={() => setProjectsOpen(false)} />
      <Contact open={contactOpen} onClose={() => setContactOpen(false)} />
      <WelcomeOverlay show={!isCameraAnimationFinished} />
      <div className="canvas-container largest">
        <Canvas camera={{ position: [0, 1.5, 6], fov: 50 }} shadows>
          <CameraAnimation onFinish={() => setIsCameraAnimationFinished(true)} />
          <ambientLight intensity={0.9} />
          <directionalLight position={[50, 100, 50]} intensity={1.2} castShadow />
          <CoffeeShopModel 
            onAboutOpen={() => setAboutOpen(true)}
            onProjectsOpen={() => setProjectsOpen(true)}
            onContactOpen={() => setContactOpen(true)}
            showAllButtons={showAllButtons}
            modelPosition={modelPosition}
          />
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            minDistance={7}
            maxDistance={20}
          />
        </Canvas>
      </div>
    </>
  )
}
