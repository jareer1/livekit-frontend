// Validation utilities for LiveKit Voice Agent Demo

export const validateParticipantName = (name) => {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Participant name is required' };
  }
  
  if (name.trim().length < 2) {
    return { valid: false, error: 'Participant name must be at least 2 characters long' };
  }
  
  if (name.trim().length > 50) {
    return { valid: false, error: 'Participant name must be less than 50 characters' };
  }
  
  // Check for valid characters (alphanumeric, spaces, hyphens, underscores)
  if (!/^[a-zA-Z0-9\s\-_]+$/.test(name.trim())) {
    return { valid: false, error: 'Participant name contains invalid characters' };
  }
  
  return { valid: true, error: null };
};

export const validateSessionDuration = (duration) => {
  if (!duration || typeof duration !== 'number') {
    return { valid: false, error: 'Session duration is required' };
  }
  
  if (duration < 1) {
    return { valid: false, error: 'Session duration must be at least 1 minute' };
  }
  
  if (duration > 120) {
    return { valid: false, error: 'Session duration cannot exceed 120 minutes' };
  }
  
  return { valid: true, error: null };
};

export const validateServerUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'Server URL is required' };
  }
  
  // Allow relative URLs for API endpoints
  if (url.startsWith('/')) {
    return { valid: true, error: null };
  }
  
  try {
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { valid: false, error: 'Server URL must use HTTP or HTTPS protocol' };
    }
    return { valid: true, error: null };
  } catch (error) {
    return { valid: false, error: 'Invalid server URL format' };
  }
};

export const validateLiveKitUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'LiveKit URL is required' };
  }
  
  try {
    const urlObj = new URL(url);
    if (!['ws:', 'wss:', 'http:', 'https:'].includes(urlObj.protocol)) {
      return { valid: false, error: 'LiveKit URL must use WS, WSS, HTTP, or HTTPS protocol' };
    }
    return { valid: true, error: null };
  } catch (error) {
    return { valid: false, error: 'Invalid LiveKit URL format' };
  }
};

export const validateFormData = (data) => {
  const errors = {};
  
  const nameValidation = validateParticipantName(data.participantName);
  if (!nameValidation.valid) {
    errors.participantName = nameValidation.error;
  }
  
  const durationValidation = validateSessionDuration(data.sessionDuration);
  if (!durationValidation.valid) {
    errors.sessionDuration = durationValidation.error;
  }
  
  const serverUrlValidation = validateServerUrl(data.serverUrl);
  if (!serverUrlValidation.valid) {
    errors.serverUrl = serverUrlValidation.error;
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};
