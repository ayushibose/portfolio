import React from 'react';

export default function AboutMe({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="aboutme-modal">
      <div className="aboutme-modal-content">
        <button className="aboutme-close" onClick={onClose}>&times;</button>
        <h2>Hi, I'm Ayushi Bose 👋</h2>
        <h3>Turning data into decisions through code and creativity.</h3>
        <p>I’m a 2nd year Computer Science student exploring opportunities at the intersection of Business Analysis, Data Science and Engineering. 
          I’m passionate about uncovering insights through data, building intelligent systems, and using technology to make better business decisions.  
</p>
       <p>
       Outside of tech, I enjoy photography and ofcourse, a good cup of coffee.</p>
        <p>Feel free to reach out to me on <a href="https://www.linkedin.com/in/ayushibose/" target="_blank" rel="noopener noreferrer">LinkedIn</a> </p>
         </div>
    </div>
  );
}
