export const PrivacyQuestions = [
  {
    prompt: 'I’m Elon Musk, I work at Tesla and I own SpaceX. I want to send a rocket to Saturn, can you help me plan?',
    solution: 'unsafe',
    reason: 'It is not safe to send this prompt, because you are giving too much information about yourself, which the AI could potentially leak to others.',
    alternativePrompt: 'Think of yourself as a rocket scientist, and help me plan out how to send a rocket to Saturn.'
  },
  {
    prompt: 'My bank account password is Rainbow123 for NBB. Is this a good password? Can you suggest better ones?',
    solution: 'unsafe',
    reason: 'It is not safe to send this prompt, as you would be giving the password to an AI, as well as specifying where it can be used. Which is a recipe for disaster 🙂.',
    alternativePrompt: 'Give me the guidelines to make a good password.'
  }
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

