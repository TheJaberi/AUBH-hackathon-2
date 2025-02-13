import React, { useState, useEffect } from 'react';
import { ClaudeInputWithOutput } from '../../../components/claudeUI/claudeUI2';
import { BiasQuestions } from '../../../questions/questions';
import { AlertModal } from '../../../components/alert/Alert';
import { useNavigate } from 'react-router-dom';

const BiasFlow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  const [username, setUserName] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [showedInfo, setShowedInfo] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setUserName(localStorage.getItem('userName'));
  }, []);

  useEffect(() => {
    setIsFirstClick(true);
  }, [currentIndex]);

  useEffect(() => {
    setIsFirstClick(true);
  }, []);

  const goNext = () => {
    if (currentIndex < BiasQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("Module completed. Navigate to the next module.");
      navigate('/learning/manipulation');
    }
  };

  const checkAnswer = (selected: string) => {
    if (isFirstClick) {
      setIsFirstClick(false);
    }
    setIsOpen(true);

    if (selected.trim() === "") {
      console.log("we are emprty")
      return;
    }
    const currentQuestion = BiasQuestions[currentIndex];



    if (currentIndex === BiasQuestions.length - 1) {
      if (currentQuestion.solution.toLowerCase() === selected.toLowerCase()) {
        setAlertMessage(
          `You are correct! the reason is ${currentQuestion.reason}. Good Job! you are an expert in this field! Go next to learn about Manipulating!`

        );
        setAlertType('success');
      } else {
        setAlertMessage(
          `Sadly your answer was incorrect :( the reason is ${currentQuestion.reason}. Go next to learn about Manipulating!`

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
            btnText={currentIndex === BiasQuestions.length - 1 ? "Go Next" : "Close"} />
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

  const [cardContent] = useState('AI is smart, but it can sometimes be unfair. It learns from data, and if that data has mistakes or unfair ideas, AI might repeat them. Always think for yourself and ask questions!');
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
        Let's learn about Bias! Send the AI prompt then decide if the response is biased or not.
      </p>
      <div className="p-4">
        <ClaudeInputWithOutput
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
            type={alertType}
            message={alertMessage}
            btnText={currentIndex === BiasQuestions.length - 1 ? "Go Next" : "Close"} />
        )}
      </div>
    </>
  );
};

export default BiasFlow;
