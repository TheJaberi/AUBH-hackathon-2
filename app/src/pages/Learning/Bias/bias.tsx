import React, { useState, useEffect } from 'react';
import { ClaudiInputWithOutput } from '../../../components/claudeUI/claudeUI2';
import { BiasQuestions } from '../../../questions/questions';
import { AlertModal } from '../../../components/alert/Alert';
// import { AlertModal } from '../../../components/alert/Alert';


const BiasFlow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  const [username, setUserName] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);

  useEffect(() => {
    setUserName(localStorage.getItem('userName'));
  }, []);

  useEffect(() => {
    setIsFirstClick(true);
  }, [currentIndex]);

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

    if (isFirstClick) {
      setIsFirstClick(false);
    }
    setIsOpen(true);

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
      <ClaudiInputWithOutput
        username={username || "Guest"}
        prompt={BiasQuestions[currentIndex].prompt}
        response={BiasQuestions[currentIndex].response}
        checkAnswer={checkAnswer}
        isFirstClick={isFirstClick}
      />
      {alertMessage && alertType && (
        <AlertModal
          isOpen={isOpen}
          onClose={() => { setIsOpen(false); setAlertMessage(null); setAlertType(null); goNext(); }}
          type="success"
          message="Operation completed successfully!"
          btnText={currentIndex === BiasQuestions.length - 1 ? "Go Next" : "Close"} />
      )}
    </div>
  );
};

export default BiasFlow;
