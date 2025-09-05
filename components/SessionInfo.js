export const SessionInfo = ({ session, isConnected, audioStatus }) => {
  if (!session) return null;

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Session Information</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Session ID:</span>
          <span className="font-mono text-gray-900">{session.session_id}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Room Name:</span>
          <span className="font-mono text-gray-900">{session.room_name}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Participant:</span>
          <span className="text-gray-900">{session.participant_name}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Duration:</span>
          <span className="text-gray-900">{session.session_duration_minutes} minutes</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Connection Status:</span>
          <span className={`font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Audio Status:</span>
          <span className={`font-medium ${audioStatus === 'Connected' ? 'text-green-600' : 'text-red-600'}`}>
            {audioStatus}
          </span>
        </div>
        
        {session.created_at && (
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Created:</span>
            <span className="text-gray-900">
              {new Date(session.created_at).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
