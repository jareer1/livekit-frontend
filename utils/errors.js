// Error handling utilities for LiveKit Voice Agent Demo

export class SessionError extends Error {
  constructor(message, code = 'SESSION_ERROR') {
    super(message);
    this.name = 'SessionError';
    this.code = code;
  }
}

export class ConnectionError extends Error {
  constructor(message, code = 'CONNECTION_ERROR') {
    super(message);
    this.name = 'ConnectionError';
    this.code = code;
  }
}

export class AudioError extends Error {
  constructor(message, code = 'AUDIO_ERROR') {
    super(message);
    this.name = 'AudioError';
    this.code = code;
  }
}

export const handleApiError = (response, defaultMessage = 'An error occurred') => {
  if (!response.ok) {
    const status = response.status;
    let message = defaultMessage;
    
    switch (status) {
      case 400:
        message = 'Bad request - please check your input';
        break;
      case 401:
        message = 'Unauthorized - invalid credentials';
        break;
      case 403:
        message = 'Forbidden - access denied';
        break;
      case 404:
        message = 'Resource not found';
        break;
      case 500:
        message = 'Server error - please try again later';
        break;
      case 503:
        message = 'Service unavailable - server is temporarily down';
        break;
      default:
        message = `HTTP error ${status}: ${defaultMessage}`;
    }
    
    throw new Error(message);
  }
};

export const getErrorMessage = (error) => {
  if (error instanceof SessionError || error instanceof ConnectionError || error instanceof AudioError) {
    return error.message;
  }
  
  if (error.name === 'NetworkError') {
    return 'Network error - please check your internet connection';
  }
  
  if (error.message.includes('fetch')) {
    return 'Failed to connect to server - please check the server URL';
  }
  
  if (error.message.includes('WebSocket')) {
    return 'WebSocket connection failed - please check LiveKit server URL';
  }
  
  return error.message || 'An unexpected error occurred';
};

export const logError = (error, context = '') => {
  const timestamp = new Date().toISOString();
  const contextStr = context ? ` [${context}]` : '';
  
  console.error(`${timestamp}${contextStr} Error:`, {
    name: error.name,
    message: error.message,
    code: error.code,
    stack: error.stack
  });
};
