import React, { useState, useEffect } from 'react';
import { IconLucideArrowUp } from '../arrowUp/arrowUp';
import { X } from 'lucide-react';

interface ClaudeInputProps {
    username: string;
    prompt: string;
    response: string;
    checkAnswer: (selected: string) => void;
    isFirstClick: boolean;
}

export const ClaudeInputWithOutput: React.FC<ClaudeInputProps> = ({
    username,
    prompt,
    response,
    checkAnswer,
    isFirstClick
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isFirstClick) {
            setIsVisible(true);
            let currentText = '';
            const textArray = response.split('');
            let currentIndex = 0;

            const typingInterval = setInterval(() => {
                if (currentIndex < textArray.length) {
                    currentText += textArray[currentIndex];
                    setDisplayedText(currentText);
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 30); // Adjust typing speed here

            return () => clearInterval(typingInterval);
        }
        if (isFirstClick){
            setDisplayedText("");
        }
    }, [isFirstClick, response]);

    const handleCheckAnswer = (selected: string) => {
        checkAnswer(selected);
    };

    return (
        <div className="claude-container">
            <div className="claude-content">
                <div className="claude-header">
                    <span className="star-icon">✹</span>
                    <h1>Good evening, {username}</h1>
                </div>

                <div className="claude-input-container">
                    <div className="chat-row">
                        <div className="user-avatar">
                            {username.charAt(0)}
                        </div>
                        <div className="claude-input">
                            {prompt}
                        </div>
                    </div>
                    <div className="chat-row claude-ai-chat-container">
                        {!isFirstClick && (
                            <div 
                                className={`claude-ai-input transform transition-all duration-300 ease-out
                                    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                                `}
                            >
                                {displayedText}
                                <span className="animate-pulse">|</span>
                            </div>
                        )}
                    </div>

                    <div className="claude-footer">
                        <span className="model-name">Claude 3.5 Sonnet</span>
                        <div className="style-selector flex flex-row">
                            <button 
                                className="style-button"
                                onClick={() => handleCheckAnswer(isFirstClick ? '' : 'safe')}
                            >
                                {isFirstClick ? "Send" : "Biased"}
                                <IconLucideArrowUp />
                            </button>
                            <button 
                                className="style-button"
                                onClick={() => checkAnswer(isFirstClick ? '' : 'unsafe')}
                            >
                                {isFirstClick ? "Reject" : "Not Biased"}
                                <X />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
