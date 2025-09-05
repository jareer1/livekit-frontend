export const StatusMessage = ({ message, type = 'info', visible = true }) => {
  if (!visible || !message) return null;

  const getStatusStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`p-4 rounded-lg border font-medium ${getStatusStyles(type)}`}>
      <div className="flex items-center gap-2">
        <span>{getIcon(type)}</span>
        <span>{message}</span>
      </div>
    </div>
  );
};
