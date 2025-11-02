import React, { useState } from 'react';

const slides = [
  {
    title: 'ESG-Aware Stock Classification for Green Investing',
    description: [
      'Developed a machine learning pipeline to classify stocks as “green” investments by combining ESG scores with financial metrics such as P/E, ROE, and volatility.',
      'Achieved an 85% F1-score and improved the simulated portfolio’s ESG rating by 35% compared to random stock selection.',
      'Maintained financial stability while enhancing sustainability performance.',
      '⚙️ Tech Stack: Python, Pandas, Scikit-learn, yfinance, Matplotlib/Seaborn (for visualisation).',
    ],
  },
  {
    title: 'Customer Sentiment Visualiser Chrome Extension',
    description: [
      'Built and deployed an end-to-end customer sentiment analytics system on Render, combining a Chrome extension, FastAPI backend, and Streamlit dashboard for real-time Amazon review analysis.',
      'Delivered actionable customer intelligence by transforming unstructured review data into visual analytics for business and data science insights, blending NLP, API design, and data visualization.',
      'Implemented VADER sentiment analysis for interpretable, high-speed text classification, enabling live insights across 100+ reviews per page.',
      '⚙️ Tech Stack: JavaScript (MV3), Chrome Storage API, Chart.js, FastAPI.',
    ],
  },
  {
    title: 'DevOps CI/CD Deployment Pipeline',
    description: [
      'Built a full CI/CD pipeline to automatically build, tag, and push Docker images to Docker Hub using GitHub Actions.',
      'Wrote Kubernetes YAML files to deploy and expose a containerized Flask application locally via Minikube.',
      'Demonstrated end-to-end automation from code commit to live deployment using DevOps practices.',
      '⚙️ Tech Stack: Docker, GitHub Actions, Kubernetes, Flask.',
    ],
  },
];

export default function ProjectSlideshow() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((current + 1) % slides.length);

  return (
    <div className="slideshow-card p-4 rounded-2xl shadow-md bg-white max-w-2xl mx-auto">
      <div className="slideshow-header flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold">{slides[current].title}</h3>
        <span className="text-sm text-gray-500">{current + 1} / {slides.length}</span>
      </div>

      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {slides[current].description.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>

      <div className="slideshow-controls flex justify-between mt-4">
        <button
          className="slideshow-btn px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={prevSlide}
        >
          &lt; Prev
        </button>
        <button
          className="slideshow-btn px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={nextSlide}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
}
