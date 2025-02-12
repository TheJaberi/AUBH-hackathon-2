import React, { useState, useEffect } from 'react';
import Greeting from '../../../components/claudeUI/claudeUI';
import { BiasQuestions } from '../../../questions/questions';
import { Alert } from '../../../components/alert/Alert';


const BiasFlow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  const [username, setUserName] = useState<string | null>(null);

  useEffect(() => {
    setUserName(localStorage.getItem('userName'));
  }, []);

  const goNext = () => {
    if (currentIndex < BiasQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Add navigation to the next module here, e.g., using react-router.
      console.log("Module completed. Navigate to the next module.");
    }
  };

  const checkAnswer = (selected: string) => {
    const currentQuestion = BiasQuestions[currentIndex];
    // Check if this is the last question.
    if (currentIndex === BiasQuestions.length - 1) {
      if (currentQuestion.solution.toLowerCase() === selected.toLowerCase()) {
        setAlertMessage(
          `Correct answer - ${currentQuestion.reason}. You completed the module Bias, click Go Next to go to the next module`
        );
        setAlertType('success');
      } else {
        setAlertMessage(
          `Incorrect answer - ${currentQuestion.reason}. You completed the module Bias, click Go Next to go to the next module`
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
        prompt={BiasQuestions[currentIndex].prompt}
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
          btnText={currentIndex === BiasQuestions.length - 1 ? "Go Next" : "Close"}
        />
      )}
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={() => checkAnswer('safe')}
          className="px-4 py-2 text-lg bg-white text-black border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
        >
          Safe
        </button>
        <button
          onClick={() => checkAnswer('unsafe')}
          className="px-4 py-2 text-lg bg-white text-black border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
        >
          Unsafe
        </button>
      </div>
    </div>
  );
};

export default BiasFlow;
