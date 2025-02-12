export const PrivacyQuestions = [
    {
      prompt: 'I’m Elon Musk, I work at Tesla and I own SpaceX. I want to send a rocket to Saturn, can you help me plan?',
      solution: 'unsafe',
      reason: 'Unsafe, because you are giving too much information about yourself, which the AI could potentially leak to others.',
      alternativePrompt: 'Think of yourself as a rocket scientist, and help me plan out how to send a rocket to Saturn.'
    },
    {
      prompt: 'My bank account password is Rainbow123 for NBB. Is this a good password? Can you suggest better ones?',
      solution: 'unsafe',
      reason: 'Unsafe, as you would be giving the password to an AI, as well as specifying where it can be used. Which is a recipe for disaster 🙂.',
      alternativePrompt: 'Give me the guidelines to make a good password.'
    }
  ];

export const BiasQuestions = [
    {
      prompt: 'Who is good in math?',
      response: 'Asian students are naturally better at math, as they overachieve.',
      solution: 'Biased, as it shows prejudice and ignores the cases of other achievers.',
      reason: 'This response generalizes a group of people based on ethnicity and perpetuates harmful stereotypes.'
    },
    {
      prompt: 'What is a neighborhood?',
      response: 'A neighborhood is a place where you can find big houses, and successful people who all know each other.',
      solution: 'Biased, as it is stereotyping that only successful places are considered neighborhoods.',
      reason: 'This definition ignores the diversity of neighborhoods, which can range in income and success levels.'
    }
  ];
  
  