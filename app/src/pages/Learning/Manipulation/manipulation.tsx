import React, { useState } from 'react';
import { AlertModal } from '../../../components/alert/Alert';
import { ManipulationQuestions } from '../../../questions/questions';
import Confetti from 'react-confetti';

const ManipulationFlow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showedInfo, setShowedInfo] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [cardContent] = useState('Be mindful about the information you encounter. Always question the source and authenticity, especially when dealing with AI-generated content. Critical thinking is your best tool against manipulation.');


  const goNext = () => {
    if (currentIndex < ManipulationQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("Hurray you finished all modules!!");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const checkAnswer = (selected: number) => {
    const currentQuestion = ManipulationQuestions[currentIndex];
    // Open the alert modal for feedback
    setIsOpen(true);
    if (currentIndex === ManipulationQuestions.length - 1) {
      if (currentQuestion.AiGenerated === selected) {
        setAlertMessage(
          `Correct answer - ${currentQuestion.Reason}. You completed the module Manipulation, click Go Next to go to the next module`
        );
        setAlertType('success');
      } else {
        setAlertMessage(
          `Incorrect answer - ${currentQuestion.Reason}. You completed the module Manipulation, click Go Next to go to the next module`
        );
        setAlertType('error');
      }
    } else {
      if (currentQuestion.AiGenerated === selected) {
        setAlertMessage(`Correct answer - ${currentQuestion.Reason}`);
        setAlertType('success');
      } else {
        setAlertMessage(`Incorrect answer - ${currentQuestion.Reason}`);
        setAlertType('error');
      }
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}
      {!showedInfo && (
        <AlertModal
          isOpen={true}
          onClose={() => setShowedInfo(true)}
          type="info"
          message={cardContent}
          btnText="Close"
        />
      )}
      <p className="text-center text-base font-semibold text-purple-600 !my-4 !p-2 bg-gray-800 rounded-lg shadow-md w-4/5 !mx-auto">
        Click on the image you think is AI-generated ;)
      </p>
      <div className="text-center text-base font-semibold text-purple-600 !my-4 !p-2 bg-gray-800 rounded-lg shadow-md w-4/5 !mx-auto">
        <div className="flex justify-center space-x-4 image-full-width-container">
          <img
            src={ManipulationQuestions[currentIndex][1]}
            alt="Image 1"
            className="w-1/2 cursor-pointer image-full-width"
            onClick={() => checkAnswer(1)}
            style={{ animation: alertType === 'error' ? 'shake 0.5s' : 'none' }}
          />
          <img
            src={ManipulationQuestions[currentIndex][2]}
            alt="Image 2"
            className="w-1/2 cursor-pointer image-full-width"
            onClick={() => checkAnswer(2)}
            style={{ animation: alertType === 'error' ? 'shake 0.5s' : 'none' }}
          />
        </div>
        {alertMessage && alertType && (
          <AlertModal
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
              setAlertMessage(null);
              setAlertType(null);
              goNext();
            }}
            type={alertType}
            message={alertMessage}
            btnText={currentIndex === ManipulationQuestions.length - 1 ? "Go Next" : "Close"}
          />
        )}
      </div>
    </>
  );
};

export default ManipulationFlow;
