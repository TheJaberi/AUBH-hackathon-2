import React, { useState, useEffect } from 'react';
import Greeting from '../../../components/claudeUI/claudeUI';
import { PrivacyQuestions } from '../../../questions/questions';

interface AlertProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  btnText?: string;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose, btnText = "Close" }) => {
  // Alert always uses a light (white) background with black text.
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="p-6 w-full max-w-md rounded shadow bg-white border border-gray-200 text-center">
        <div className="mb-4 text-lg text-black">
          {message}
        </div>
        <button 
          onClick={onClose} 
          className="px-4 py-2 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};

const PrivacyFlow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  const [username, setUserName] = useState<string | null>(null);

  useEffect(() => {
    setUserName(localStorage.getItem('userName'));
  }, []);

  const goNext = () => {
    if (currentIndex < PrivacyQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Here you can add navigation logic to the next module, e.g., using react-router.
      console.log("Module completed. Navigate to the next module.");
    }
  };

  const checkAnswer = (selected: string) => {
    const currentQuestion = PrivacyQuestions[currentIndex];
    // Check if this is the last question.
    if (currentIndex === PrivacyQuestions.length - 1) {
      if (currentQuestion.solution.toLowerCase() === selected.toLowerCase()) {
        setAlertMessage(
          `Correct answer - ${currentQuestion.reason}. You completed the module Privacy, click Go Next to go to the next module`
        );
        setAlertType('success');
      } else {
        setAlertMessage(
          `Incorrect answer - ${currentQuestion.reason}. You completed the module Privacy, click Go Next to go to the next module`
        );
        setAlertType('error');
      }
    } else if (currentQuestion.solution.toLowerCase() === selected.toLowerCase()) {
      setAlertMessage(`Correct answer - ${currentQuestion.reason}`);
      setAlertType('success');
    } else {
      setAlertMessage(`Incorrect answer - ${currentQuestion.reason}`);
      setAlertType('error');
    }
  };

  return (
    <div className="p-4">
      <Greeting
        username={username || "Guest"}
        prompt={PrivacyQuestions[currentIndex].prompt}
      />
      {alertMessage && alertType && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={() => {
            setAlertMessage(null);
            setAlertType(null);
            goNext();
          }}
          btnText={currentIndex === PrivacyQuestions.length - 1 ? "Go Next" : "Close"}
        />
      )}
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={() => checkAnswer('safe')}
          className="px-4 py-2 text-lg bg-white border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
        >
          Safe
        </button>
        <button
          onClick={() => checkAnswer('unsafe')}
          className="px-4 py-2 text-lg bg-white border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
        >
          Unsafe
        </button>
      </div>
    </div>
  );
};

export default PrivacyFlow;
