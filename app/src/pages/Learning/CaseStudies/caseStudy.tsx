import React, { useState } from 'react';
import './caseStudy.css';
import { AlertModal } from '../../../components/alert/Alert';
import chatai from '../../../assets/chatai.webp';
import tom from '../../../assets/tom.webp';
import danger from '../../../assets/danger.webp';

const CaseStudy: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "info" | null>(null);

  return (
    <div className="case-study-container">
      <h1 className="title">🚀 AI Adventures: The Good, the Bad, and the Sneaky! 🕵️‍♂️</h1>
      <p className="intro">
        Hey there, future tech explorers! 🌟 AI is super cool, but sometimes it can be used in sneaky ways. Let’s dive into some real-world stories and learn how to spot the tricky stuff! 🕶️
      </p>

      <div className="case-card">
        <h2>🎥 Deepfakes: The Tom Cruise TikTok Mystery 🕵️‍♀️</h2>
        <img 
          src={tom}
          alt="Tom Cruise Deepfake" 
          className="case-image"
        />
        <p>
          In 2021, a magician named AI created fake videos of Tom Cruise that looked SO real, they fooled everyone on TikTok! 🎩✨ These videos are called <strong>deepfakes</strong>, and they show how AI can be used to trick people. Always double-check what you see online! 🧐
        </p>
        <button 
          className="fun-button" 
          onClick={() => { 
            setIsOpen(true); 
            setAlertMessage("You spotted the fake! 🎉"); 
            setAlertType("info"); 
          }}>
          👉 Click here if you can spot a deepfake!
        </button>
      </div>

      <div className="case-card">
        <h2>📰 Fake News Alert: The GPT-3 Guardian Article 🚨</h2>
        <img 
          src={chatai}
          alt="GPT-3 Guardian Article" 
          className="case-image"
        />
        <p>
          In 2020, a super-smart AI named GPT-3 wrote an entire article for The Guardian newspaper! 📜🤖 But wait—what if the news isn’t true? This story reminds us to always check our facts and trust reliable sources. 🕵️‍♂️
        </p>
        <button 
          className="fun-button" 
          onClick={() => { 
            setIsOpen(true); 
            setAlertMessage("You're a fact-checking pro! 🕶️"); 
            setAlertType("info"); 
          }}>
          👉 Click here to become a fact-checking detective!
        </button>
      </div>

      <div className="case-card">
        <h2>🕵️‍♂️ Privacy Breach: The Clearview AI Mystery 🕶️</h2>
        <img 
          src={danger} 
          alt="Clearview AI" 
          className="case-image"
        />
        <p>
          Clearview AI was a company that collected billions of photos from the internet without asking. 😱 This story teaches us how important it is to protect our privacy and be careful about what we share online. 🛡️
        </p>
        <button 
          className="fun-button" 
          onClick={() => { 
            setIsOpen(true); 
            setAlertMessage("You're a privacy protector! 🛡️"); 
            setAlertType("info"); 
          }}>
          👉 Click here to guard your privacy!
        </button>
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
