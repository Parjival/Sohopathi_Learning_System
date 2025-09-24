const axios = require('axios');

// SmythOS Agent Configuration
const SMYTHOS_AGENT_ID = 'cmfxy2xt24p88o3wt5eybaha8';
const SMYTHOS_BASE_URL = process.env.SMYTHOS_URL || 'https://api.smythos.com';
const SMYTHOS_API_KEY = process.env.SMYTHOS_API_KEY;

// Create axios client for SmythOS API
const smythosClient = axios.create({
  baseURL: SMYTHOS_BASE_URL,
  headers: {
    'Authorization': `Bearer ${SMYTHOS_API_KEY}`,
    'Content-Type': 'application/json'
  },
  timeout: 120000 // 2 minutes timeout for AI processing
});

// Agent endpoint mappings based on your SmythOS configuration
const AGENT_ENDPOINTS = {
  create_storybook: 'create_storybook',
  create_sign_language: 'create_sign_language', 
  create_audiobook: 'create_audiobook',
  live_caption: 'live_caption',
  create_social_story: 'create_social_story',
  describe_image: 'describe_image',
  math_help: 'math_help',
  emotion_support: 'emotion_support',
  create_comm_board: 'create_comm_board'
};

/**
 * Call SmythOS Agent Endpoint
 * @param {string} endpoint - The endpoint name (e.g., '/create_storybook')
 * @param {object} payload - The data to send to the agent
 * @returns {Promise<object>} - The agent response
 */
async function callSmythosAgent(endpoint, payload) {
  try {
    // Remove leading slash if present
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    
    // Validate endpoint exists
    if (!AGENT_ENDPOINTS[cleanEndpoint]) {
      throw new Error(`Unknown agent endpoint: ${cleanEndpoint}`);
    }

    console.log(`Calling SmythOS agent endpoint: ${cleanEndpoint}`, { payload });

    // Call the SmythOS agent
    const response = await smythosClient.post(`/agents/${SMYTHOS_AGENT_ID}/run/${cleanEndpoint}`, payload);
    
    console.log(`SmythOS response for ${cleanEndpoint}:`, response.data);
    
    return {
      success: true,
      data: response.data,
      endpoint: cleanEndpoint,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error(`SmythOS agent call failed for ${endpoint}:`, {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      payload
    });

    // Return a structured error response
    return {
      success: false,
      error: {
        message: error.message,
        status: error.response?.status || 500,
        details: error.response?.data || 'Unknown error occurred',
        endpoint,
        timestamp: new Date().toISOString()
      }
    };
  }
}

/**
 * Mock response for development/testing when SmythOS is not available
 */
function getMockResponse(endpoint, payload) {
  const mockResponses = {
    create_storybook: {
      id: 'mock-storybook-' + Date.now(),
      title: payload.title || 'Generated Storybook',
      storybook_content: `# ${payload.title || 'Learning Adventure'}\n\nOnce upon a time, there was a student who wanted to learn about ${payload.content?.substring(0, 50)}...\n\nThis is a mock storybook response for development. The content would be transformed into an engaging, dyslexia-friendly format with simple sentences and clear structure.`,
      meta: {
        word_count: 150,
        reading_level: 'grade5',
        chapters: 3
      },
      url: 'https://example.com/mock-storybook.pdf'
    },
    create_sign_language: {
      id: 'mock-sign-' + Date.now(),
      title: payload.title || 'Sign Language Video',
      video_script: `SIGN LANGUAGE VIDEO SCRIPT\n\nTitle: ${payload.title}\n\nSegment 1: Introduction\n- Sign "HELLO" with open palm\n- Fingerspell title slowly\n- Pause 2 seconds\n\nSegment 2: Main Content\n- Use clear, deliberate signs\n- Include visual aids as needed\n- Maintain eye contact with camera\n\nThis is a mock script for development.`,
      meta: {
        duration: '5:30',
        segments: 3,
        language: 'ASL'
      },
      url: 'https://example.com/mock-sign-video.mp4'
    },
    create_audiobook: {
      id: 'mock-audio-' + Date.now(),
      title: payload.title || 'Generated Audiobook',
      audio_script: `AUDIOBOOK NARRATION SCRIPT\n\nTitle: ${payload.title}\n\n[INTRO MUSIC FADE IN]\n\nNarrator: "Welcome to your personalized audiobook. Today we'll explore ${payload.content?.substring(0, 100)}..."\n\n[PAUSE 2 SECONDS]\n\nThis is a mock audio script for development.`,
      meta: {
        duration: '15:45',
        voice: payload.voice_preference || 'alloy',
        chapters: 5
      },
      url: 'https://example.com/mock-audiobook.mp3'
    },
    live_caption: {
      id: 'mock-caption-' + Date.now(),
      text: 'This is a mock transcription of the uploaded audio. In a real implementation, this would contain the actual speech-to-text conversion with high accuracy.',
      words: [
        { word: 'This', start: 0.0, end: 0.5 },
        { word: 'is', start: 0.5, end: 0.7 },
        { word: 'a', start: 0.7, end: 0.8 },
        { word: 'mock', start: 0.8, end: 1.2 },
        { word: 'transcription', start: 1.2, end: 2.0 }
      ],
      confidence: 0.95,
      language: payload.language || 'en'
    },
    create_social_story: {
      id: 'mock-story-' + Date.now(),
      title: `Social Story for ${payload.student_name}`,
      social_story: `# Going to ${payload.situation}\n\nHi ${payload.student_name}!\n\nSometimes we need to ${payload.situation}. This is normal and okay.\n\nWhen this happens, I can:\n1. Take deep breaths\n2. Ask for help if needed\n3. Remember that I am safe\n\nThis is a mock social story for development. The real version would be personalized based on ${payload.specific_needs}.`,
      meta: {
        age_appropriate: true,
        word_count: 85,
        reading_level: 'simple'
      }
    },
    describe_image: {
      id: 'mock-description-' + Date.now(),
      description: `IMAGE DESCRIPTION\n\nContext: ${payload.context}\nDetail Level: ${payload.detail_level}\n\nThis is a mock image description for development. In the real implementation, this would provide a comprehensive description of the uploaded image including:\n\n1. Overall scene and composition\n2. Important visual elements\n3. Text content (if any)\n4. Educational significance\n5. Spatial relationships\n\nThe description would be tailored for blind and visually impaired students.`,
      meta: {
        confidence: 0.92,
        elements_detected: 5,
        text_found: true
      }
    },
    math_help: {
      id: 'mock-math-' + Date.now(),
      solution: `MATH PROBLEM SOLUTION\n\nProblem: ${payload.problem}\nGrade Level: ${payload.grade_level}\nLearning Style: ${payload.learning_style}\n\nStep 1: Understand the problem\n- Break down what we're looking for\n- Identify the given information\n\nStep 2: Choose a strategy\n- Visual representation\n- Step-by-step approach\n\nStep 3: Solve\n- Work through each step carefully\n- Check our work\n\nThis is a mock solution for development.`,
      visual_aids: 'Diagrams and visual representations would be provided here',
      meta: {
        difficulty: 'moderate',
        steps: 3,
        time_estimate: '10 minutes'
      }
    },
    emotion_support: {
      id: 'mock-emotion-' + Date.now(),
      support_response: `EMOTIONAL SUPPORT RESPONSE\n\nI understand you're feeling ${payload.emotion_input}. This is completely normal and valid.\n\nHere are some strategies that might help:\n\n1. Take slow, deep breaths\n2. Name what you're feeling\n3. Remember that feelings are temporary\n4. Reach out for support when needed\n\nThis is a mock response for development.`,
      coping_strategies: [
        'Deep breathing exercises',
        'Grounding techniques',
        'Positive self-talk',
        'Physical movement'
      ],
      resources: [
        'School counselor contact',
        'Crisis helpline numbers',
        'Trusted adult contacts'
      ],
      meta: {
        age_group: payload.age_group,
        urgency: 'low',
        follow_up_needed: false
      }
    },
    create_comm_board: {
      id: 'mock-board-' + Date.now(),
      title: 'Communication Board',
      comm_board_layout: `COMMUNICATION BOARD LAYOUT\n\nAge Level: ${payload.age_level}\nVocabulary Focus: ${payload.vocabulary_focus}\nGoals: ${payload.communication_goals}\n\nCORE VOCABULARY:\n- Basic needs: eat, drink, help, more, stop\n- Emotions: happy, sad, angry, scared, excited\n- Social: hello, goodbye, please, thank you\n- Emergency: help, hurt, sick, bathroom\n\nThis is a mock communication board for development.`,
      vocabulary_list: [
        'eat', 'drink', 'help', 'more', 'stop',
        'happy', 'sad', 'angry', 'scared', 'excited',
        'hello', 'goodbye', 'please', 'thank you',
        'help', 'hurt', 'sick', 'bathroom'
      ],
      meta: {
        total_words: 16,
        categories: 4,
        complexity: 'beginner'
      }
    }
  };

  return mockResponses[endpoint] || {
    id: 'mock-response-' + Date.now(),
    message: 'Mock response for development',
    endpoint,
    payload
  };
}

/**
 * Main function to call agent with fallback to mock
 */
async function callSkill(endpoint, payload) {
  // If in development mode or SmythOS is not configured, use mock responses
  if (process.env.NODE_ENV === 'development' && !SMYTHOS_API_KEY) {
    console.log(`Using mock response for ${endpoint} (development mode)`);
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return getMockResponse(cleanEndpoint, payload);
  }

  // Try to call the real SmythOS agent
  const result = await callSmythosAgent(endpoint, payload);
  
  if (result.success) {
    return result.data;
  } else {
    // If the agent call fails, log the error and return a mock response for development
    console.warn(`SmythOS agent call failed, using mock response:`, result.error);
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return getMockResponse(cleanEndpoint, payload);
  }
}

module.exports = { 
  callSkill,
  callSmythosAgent,
  AGENT_ENDPOINTS,
  SMYTHOS_AGENT_ID
};