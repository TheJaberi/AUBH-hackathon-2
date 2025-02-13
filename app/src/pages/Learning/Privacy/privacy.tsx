import React, { useState, useEffect } from 'react';
import { ClaudeInput } from '../../../components/claudeUI/claudeUI';
import { PrivacyQuestions } from '../../../questions/questions';
import { AlertModal } from '../../../components/alert/Alert';
import { useNavigate } from 'react-router-dom';

const PrivacyFlow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  const [username, setUserName] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showedInfo, setShowedInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUserName(localStorage.getItem('userName'));
  }, []);

  const goNext = () => {
    if (currentIndex < PrivacyQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("Module completed. Navigate to the next module.");
      navigate('/learning/bias');
    }
  };

  const checkAnswer = (selected: string) => {
    const currentQuestion = PrivacyQuestions[currentIndex];

    // open the alert modal for feedback
    setIsOpen(true);

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

      return (
        alertMessage && alertType && (
          <AlertModal
            isOpen={isOpen}
            onClose={() => { setIsOpen(false); setAlertMessage(null); setAlertType(null); goNext(); }}
            type={alertType}
            message={alertMessage}
            btnText={currentIndex === PrivacyQuestions.length - 1 ? "Go Next" : "Close"} />
        )
      );

    } else if (currentQuestion.solution.toLowerCase() === selected.toLowerCase()) {
      setAlertMessage(`Correct answer - ${currentQuestion.reason}`);
      setAlertType('success');
    } else {
      setAlertMessage(`Incorrect answer - ${currentQuestion.reason}`);
      setAlertType('error');
    }
  };

  const [cardContent] = useState('When asking for help, be careful not to share too much information. AI is here to help you, but remember to keep your personal information safe.');
  return (
    <>
      {!showedInfo && (
        <AlertModal
          isOpen={true}
          onClose={() => setShowedInfo(true)}
          type="info"
          message={cardContent}
          btnText="Close" />
      )}

      <p className="text-center text-base font-semibold text-purple-600 !my-4 !p-2 bg-gray-800 rounded-lg shadow-md w-4/5 !mx-auto">
        Decide if the AI prompt is responsible enough to send or discard.
      </p>
      <div className="p-4">
        <ClaudeInput
          username={username || "Guest"}
          prompt={PrivacyQuestions[currentIndex].prompt}
          checkAnswer={checkAnswer}
        />
        {alertMessage && alertType && (
          <AlertModal
            isOpen={isOpen}
            onClose={() => { setIsOpen(false); setAlertMessage(null); setAlertType(null); goNext(); }}
            type={alertType}
            message={alertMessage}
            btnText={currentIndex === PrivacyQuestions.length - 1 ? "Go Next" : "Close"} />
        )}
      </div>
    </>
  );
};

export default PrivacyFlow;
