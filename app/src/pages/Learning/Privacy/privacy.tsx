import React, { useState, useEffect } from 'react';
import ClaudiInput from '../../../components/claudeUI/claudeUI';
import { PrivacyQuestions } from '../../../questions/questions';
import { Alert } from '../../../components/alert/Alert';

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
      <ClaudiInput
        username={username || "Guest"}
        prompt={PrivacyQuestions[currentIndex].prompt}
        checkAnswer={checkAnswer}
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
    </div>
  );
};

export default PrivacyFlow;
