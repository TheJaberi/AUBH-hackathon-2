import React, { useState, useEffect } from 'react';
import './caseStudy.css';
import { AlertModal } from '../../../components/alert/Alert';

interface Slide {
  title: string;
  image: string;
  alt: string;
  description: string;
  buttonText: string;
  alertMessage: string;
  alertType: "info";
}

const slides: Slide[] = [
  {
    title: "🎥 Deepfakes: The Tom Cruise TikTok Mystery 🕵️‍♀️",
    image: "https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/6620ec7544fa3849c3cb27fc_party_wumpus.gif",
    alt: "Tom Cruise Deepfake",
    description:
      "In 2021, a magician named AI created fake videos of Tom Cruise that looked SO real, they fooled everyone on TikTok! 🎩✨ These videos are called deepfakes, and they show how AI can be used to trick people. Always double-check what you see online! 🧐",
    buttonText: "👉 Click here if you can spot a deepfake!",
    alertMessage: "You spotted the fake! 🎉",
    alertType: "info"
  },
  {
    title: "📰 Fake News Alert: The GPT-3 Guardian Article 🚨",
    image: "https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/6620ec7544fa3849c3cb27fc_party_wumpus.gif",
    alt: "GPT-3 Guardian Article",
    description:
      "In 2020, a super-smart AI named GPT-3 wrote an entire article for The Guardian newspaper! 📜🤖 But wait—what if the news isn’t true? This story reminds us to always check our facts and trust reliable sources. 🕵️‍♂️",
    buttonText: "👉 Click here to become a fact-checking detective!",
    alertMessage: "You're a fact-checking pro! 🕶️",
    alertType: "info"
  },
  {
    title: "🕵️‍♂️ Privacy Breach: The Clearview AI Mystery 🕶️",
    image: "https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/6620ec7544fa3849c3cb27fc_party_wumpus.gif",
    alt: "Clearview AI",
    description:
      "Clearview AI was a company that collected billions of photos from the internet without asking. 😱 This story teaches us how important it is to protect our privacy and be careful about what we share online. 🛡️",
    buttonText: "👉 Click here to guard your privacy!",
    alertMessage: "You're a privacy protector! 🛡️",
    alertType: "info"
  }
];

const CaseStudy: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"info" | null>(null);

  // Auto move carousel every 5 seconds.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleButtonClick = (slide: Slide) => {
    setIsOpen(true);
    setAlertMessage(slide.alertMessage);
    setAlertType(slide.alertType);
  };

  return (
    <div className="case-study-container">
      <h1 className="title">🚀 AI Adventures: The Good, the Bad, and the Sneaky! 🕵️‍♂️</h1>
      <p className="intro">
        Hey there, future tech explorers! 🌟 AI is super cool, but sometimes it can be used in sneaky ways. Let’s dive into some real-world stories and learn how to spot the tricky stuff! 🕶️
      </p>

      <div className="carousel">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : "inactive"}`}
          >
            {index === currentSlide && (
              <>
                <h2>{slide.title}</h2>
                <img src={slide.image} alt={slide.alt} className="case-image" />
                <p>{slide.description}</p>
                <button
                  className="fun-button"
                  onClick={() => handleButtonClick(slide)}
                >
                  {slide.buttonText}
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="pagination">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>

      <h2 className="references-title">📚 References</h2>
      <ol className="references-list">
        <li>Curbing AI's Potential Dark Side: A Case Study on Regulating AI Misuse. Futurist Speaker.</li>
        <li>Key AI Ethics Case Studies to Know for AI Ethics. Fiveable.</li>
        <li>7 Examples of AI Misuse in Education. Inspera.</li>
        <li>12 famous AI disasters. CIO.</li>
      </ol>

      {alertMessage && alertType && (
        <AlertModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setAlertMessage(null);
            setAlertType(null);
          }}
          type={alertType}
          message={alertMessage}
          btnText="Close"
        />
      )}
    </div>
  );
};

export default CaseStudy;
