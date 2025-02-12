import React from 'react';
import './claudeUI.css';
import { IconLucideArrowUp } from '../arrowUp/arrowUp';
import { X } from 'lucide-react';

interface ClaudeInputProps {
    username: string;
    prompt: string;
    response: string;
    checkAnswer: (selected: string) => void;
}

export const ClaudiInputWithOutput: React.FC<ClaudeInputProps> = ({ username, prompt, response, checkAnswer }) => {
    return (
        <div className="claude-container">
            <div className="claude-content">
                <div className="claude-header">
                    <span className="star-icon">✹</span>
                    <h1>Good evening, {username}</h1>
                </div>

                <div className="claude-input-container ">
                    <div className="chat-row">
                        <div className="user-avatar">
                            {username.charAt(0)}
                        </div>
                        <div className="claude-input">
                            {prompt}
                        </div>
                    </div>
                    <div className="chat-row">
                        <div className="claude-ai-input">
                            {response}
                        </div>
                        <div className="user-avatar">
                            AI
                        </div>
                    </div>

                    <div className="claude-footer">
                        <span className="model-name">Claude 3.5 Sonnet</span>
                        <div className="style-selector flex flex-row">
                            <button className="style-button" onClick={() => { checkAnswer('safe') }}>
                                Send
                                <IconLucideArrowUp />
                            </button>
                            <button className='style-button' onClick={() => { checkAnswer('unsafe') }}>
                                Reject
                                <X />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


