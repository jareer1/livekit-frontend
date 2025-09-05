import { useState, useEffect } from 'react';
import { useSession } from '../hooks/useSession';

export const SessionsList = ({ onRefresh, autoRefresh = true }) => {
  const [sessions, setSessions] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const { listSessions, loading, error } = useSession();

  const fetchSessions = async () => {
    setRefreshing(true);
    try {
      const data = await listSessions();
      setSessions(data.sessions || []);
      setActiveCount(data.active_sessions || 0);
      if (onRefresh) onRefresh(data);
    } catch (err) {
      console.error('Failed to fetch sessions:', err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSessions();
    
    if (autoRefresh) {
      const interval = setInterval(fetchSessions, 10000); // Refresh every 10 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'created':
        return 'text-green-600 bg-green-50';
      case 'expired':
        return 'text-yellow-600 bg-yellow-50';
      case 'ended':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <span className="text-red-500">❌</span>
          <span className="text-red-800 font-medium">Failed to load sessions</span>
        </div>
        <p className="text-red-700 text-sm mt-1">{error}</p>
        <button
          onClick={fetchSessions}
          disabled={loading || refreshing}
          className="mt-3 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:bg-red-400"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Active Sessions</h3>
          <p className="text-sm text-gray-600">
            {activeCount} active session{activeCount !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={fetchSessions}
          disabled={loading || refreshing}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:bg-blue-400 flex items-center gap-2"
        >
          {(loading || refreshing) && <div className="spinner"></div>}
          Refresh
        </button>
      </div>

      {/* Sessions List */}
      <div className="divide-y divide-gray-200">
        {sessions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <div className="text-4xl mb-2">📭</div>
            <p>No active sessions found</p>
          </div>
        ) : (
          sessions.map((session) => (
            <div key={session.session_id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-gray-900">
                      {session.participant_name || 'Unknown User'}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                      {session.status || 'unknown'}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex gap-4">
                      <span className="font-medium">Room:</span>
                      <span className="font-mono">{session.room_name}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="font-medium">Session ID:</span>
                      <span className="font-mono text-xs">{session.session_id}</span>
                    </div>
                    {session.created_at && (
                      <div className="flex gap-4">
                        <span className="font-medium">Created:</span>
                        <span>{formatDate(session.created_at)}</span>
                      </div>
                    )}
                    {session.expires_at && (
                      <div className="flex gap-4">
                        <span className="font-medium">Expires:</span>
                        <span>{formatDate(session.expires_at)}</span>
                      </div>
                    )}
                    {session.session_duration_minutes && (
                      <div className="flex gap-4">
                        <span className="font-medium">Duration:</span>
                        <span>{session.session_duration_minutes} minutes</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
