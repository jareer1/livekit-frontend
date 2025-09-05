import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api-client';

export const BackendStatus = ({ serverUrl }) => {
  const [status, setStatus] = useState('checking'); // 'checking', 'online', 'offline'
  const [lastCheck, setLastCheck] = useState(null);

  const checkBackendHealth = async () => {
    try {
      setStatus('checking');
      const isHealthy = await apiClient.checkHealth();
      setStatus(isHealthy ? 'online' : 'offline');
      setLastCheck(new Date());
    } catch (error) {
      setStatus('offline');
      setLastCheck(new Date());
    }
  };

  useEffect(() => {
    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [serverUrl]);

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'offline':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'checking':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'online':
        return '🟢';
      case 'offline':
        return '🔴';
      case 'checking':
        return '🟡';
      default:
        return '⚪';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'online':
        return 'Backend Online';
      case 'offline':
        return 'Backend Offline';
      case 'checking':
        return 'Checking...';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${getStatusColor()}`}>
      <span>{getStatusIcon()}</span>
      <span className="font-medium">{getStatusText()}</span>
      {lastCheck && status !== 'checking' && (
        <span className="text-xs opacity-75">
          {lastCheck.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
};
