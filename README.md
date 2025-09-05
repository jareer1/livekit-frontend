# LiveKit Voice Agent Demo - Next.js

A modern Next.js implementation of a LiveKit voice agent demo application. This application provides a clean, user-friendly interface for creating and managing voice chat sessions with LiveKit.

## Features

- 🎤 **Voice-Only Chat**: Audio-only communication optimized for voice agents
- 🚀 **Modern UI**: Built with Next.js, React, and Tailwind CSS
- 🔧 **Session Management**: Create, join, and manage voice chat sessions
- 🎛️ **Audio Controls**: Microphone mute/unmute functionality
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Real-time**: Built on LiveKit's real-time communication platform
- 🛡️ **Error Handling**: Comprehensive error handling and validation
- 🎨 **Professional Styling**: Clean, modern interface with status indicators

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn
- LiveKit server instance (cloud or self-hosted)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd livekit-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   
   Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your backend URL:
   ```env
   # Backend API URL - Your LiveKit Voice Agent Backend
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```
   
   **Note:** This frontend is designed to work with your existing backend server at `http://localhost:8000`. Make sure your backend is running before using the frontend.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Creating a Voice Session

1. **Enter your details:**
   - Participant Name: Your display name in the session
   - Session Duration: How long the session should last (1-120 minutes)
   - Server URL: API endpoint for session management

2. **Create Session:**
   Click "Create Session" to generate a new voice chat room

3. **Join Voice Chat:**
   Click "Join Voice Chat" to connect to the LiveKit room

4. **Manage Audio:**
   Use the microphone controls to mute/unmute your audio

5. **End Session:**
   Click "End Session" to clean up and close the room

### Backend Integration

The application integrates with your existing backend server at `http://localhost:8000` using these endpoints:

- `POST /api/sessions/create` - Create a new voice session
- `GET /api/sessions/{session_id}` - Get session information  
- `DELETE /api/sessions/{session_id}` - End a voice session
- `GET /api/sessions` - List all active sessions

The frontend includes:
- **Typed API Client** (`lib/api-client.js`) - Clean interface to backend endpoints
- **Session Management** - Create, join, and manage sessions
- **Live Sessions List** - View all active sessions with auto-refresh
- **Backend Status** - Real-time backend connectivity indicator
- **Error Handling** - Comprehensive error handling for API calls

## Project Structure

```
livekit-frontend/
├── components/           # React components
│   ├── AudioControls.js     # Microphone controls
│   ├── SessionInfo.js       # Session information display
│   ├── StatusMessage.js     # Status message component
│   └── VoiceAgentDemo.js    # Main demo component
├── hooks/               # Custom React hooks
│   ├── useLiveKit.js       # LiveKit room management
│   └── useSession.js       # Session management
├── pages/               # Next.js pages
│   ├── api/                # API routes
│   ├── room/              # Room pages
│   ├── _app.js            # App configuration
│   └── index.js           # Home page
├── styles/              # CSS styles
│   └── globals.css        # Global styles with Tailwind
├── utils/               # Utility functions
│   ├── errors.js          # Error handling utilities
│   └── validation.js      # Form validation utilities
└── ...config files
```

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `LIVEKIT_API_KEY` | Your LiveKit API key | Yes |
| `LIVEKIT_API_SECRET` | Your LiveKit API secret | Yes |
| `NEXT_PUBLIC_LIVEKIT_URL` | LiveKit server WebSocket URL | Yes |
| `NEXT_PUBLIC_BACKEND_URL` | Backend API URL (if separate) | No |

### LiveKit Setup

1. **Get LiveKit credentials:**
   - Sign up at [LiveKit Cloud](https://cloud.livekit.io)
   - Or set up a [self-hosted server](https://docs.livekit.io/deploy/)

2. **Configure your server:**
   - Note your server URL (WebSocket endpoint)
   - Generate API key and secret

3. **Update environment variables** as shown above

## Customization

### Styling

The application uses Tailwind CSS for styling. You can customize:

- Colors and themes in `tailwind.config.js`
- Global styles in `styles/globals.css`
- Component-specific styles in individual component files

### Features

You can extend the application by:

- Adding video support (modify LiveKit configuration)
- Implementing chat features
- Adding screen sharing capabilities
- Integrating with voice AI services
- Adding user authentication

## Troubleshooting

### Common Issues

1. **"LiveKit client failed to load"**
   - Ensure you're serving the app via HTTP/HTTPS (not file://)
   - Check browser console for network errors

2. **"Server misconfigured"**
   - Verify environment variables are set correctly
   - Check LiveKit credentials

3. **Connection failures**
   - Verify LiveKit server URL is correct
   - Check firewall settings for WebSocket connections
   - Ensure HTTPS is used in production

4. **Audio not working**
   - Grant microphone permissions in browser
   - Check browser audio settings
   - Verify microphone hardware

### Browser Support

- Chrome 76+
- Firefox 78+
- Safari 14+
- Edge 79+

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:

- Check the [LiveKit documentation](https://docs.livekit.io)
- Review the [Next.js documentation](https://nextjs.org/docs)
- Open an issue in this repository

## Acknowledgments

- [LiveKit](https://livekit.io) for the real-time communication platform
- [Next.js](https://nextjs.org) for the React framework
- [Tailwind CSS](https://tailwindcss.com) for the styling system