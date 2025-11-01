import React from 'react';
import ProjectSlideshow from './ProjectSlideshow';

export default function Projects({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="projects-modal">
      <div className="projects-modal-content">
        <button className="aboutme-close" onClick={onClose}>&times;</button>
        <h2>Projects</h2>
        <ProjectSlideshow />
        <p>Check out my <a href="https://github.com/ayushibose" target="_blank" rel="noopener noreferrer">GitHub</a> for more projects.</p>
      </div>
    </div>
  );
}