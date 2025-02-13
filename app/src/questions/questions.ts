export const PrivacyQuestions = [
  {
    prompt: 'My dad’s credit card number is 4532-xxxx-xxxx-xxxx. Can you help me buy a game online?',
    solution: 'unsafe',
    reason: 'AI should never be given financial details, as it might unintentionally store this data and even send it to others in the future!',
    alternativePrompt: 'Can you help me find a safe way to buy a game online?'
  },
  {
    prompt: 'Claude, can you remember my mom’s phone number? It’s 12345678, and I don’t want to forget it.',
    solution: 'unsafe',
    reason: 'It is not safe to share personal information with AI, as it can be stored and shared with others.',
    alternativePrompt: 'Can you help me on how to remember my mom’s phone number?'
  },
];

export const BiasQuestions = [
  {
    prompt: 'Are girls good at coding?',
    response: 'Yes! Coding is about logic and creativity, and anyone can learn it. Women bring unique ideas and skills to the tech world!',
    solution: 'Unbiased',
    reason: 'Anyone can be great at coding with practice and effort. Gender doesn’t decide how good someone is with tech.'
  },
  {
    prompt: 'What is the best sport?',
    response: 'The best sport is basketball. It is fast-paced, exciting, and requires teamwork and skill!',
    solution: 'Biased',
    reason: 'The best sport is subjective and everyone has their own preferences.'
  }
];
  
export const  ManipulationQuestions = [
  {
    1: 'https://i.postimg.cc/jdRhpzpg/man6.png',
    2: 'https://i.postimg.cc/T1JJywDJ/man5.jpg',
    AiGenerated: 1,
    Reason: 'Ancient Egyptians did not use the english alphabet, so the first image is AI-generated.',
  }

];

