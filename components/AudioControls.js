import { useState, useEffect } from 'react';

export const AudioControls = ({ 
  room, 
  isConnected, 
  onToggleMicrophone, 
  getMicrophoneEnabled 
}) => {
  const [isMicEnabled, setIsMicEnabled] = useState(false);

  useEffect(() => {
    if (room) {
      setIsMicEnabled(getMicrophoneEnabled());
    }
  }, [room, getMicrophoneEnabled]);

  const handleToggleMic = async () => {
    if (onToggleMicrophone) {
      const newState = await onToggleMicrophone();
      setIsMicEnabled(newState);
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-600">
          <strong>Audio Status:</strong> Not Connected
        </p>
      </div>
    );
  }

  return (
    <div className="text-center p-6 bg-gray-50 rounded-lg">
      <div className="mb-4">
        <p className="text-gray-700 mb-2">
          <strong>Audio Status:</strong> Connected
        </p>
        <p className="text-sm text-gray-600">
          Microphone: {isMicEnabled ? 'Enabled' : 'Disabled'}
        </p>
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={handleToggleMic}
          className={`px-6 py-3 rounded-full font-medium transition-colors ${
            isMicEnabled 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isMicEnabled ? '🎤 Mute' : '🔇 Unmute'}
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mt-4">
        Click the button above to toggle your microphone
      </p>
    </div>
  );
};
