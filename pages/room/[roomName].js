import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  LiveKitRoom,
  ControlBar,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  useParticipants,
} from '@livekit/components-react';
import { Track } from 'livekit-client';

export default function RoomPage() {
  const router = useRouter();
  const { roomName, token, participantName } = router.query;
  const [connectionError, setConnectionError] = useState(null);

  if (!token || !roomName) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Invalid Room Access</h2>
          <p className="text-gray-600 mb-4">Missing token or room name.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>LiveKit Room - {roomName}</title>
        <meta name="description" content={`LiveKit voice chat room: ${roomName}`} />
      </Head>
      
      <div className="h-screen bg-gray-900">
        <LiveKitRoom
          video={false}
          audio={true}
          token={token}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          data-lk-theme="default"
          style={{ height: '100%' }}
          onError={(error) => {
            console.error('LiveKit connection error:', error);
            setConnectionError(error.message);
          }}
          onConnected={() => {
            console.log('Successfully connected to room:', roomName);
            setConnectionError(null);
          }}
        >
          <VoiceRoomContent roomName={roomName} participantName={participantName} />
          <RoomAudioRenderer />
        </LiveKitRoom>
        
        {connectionError && (
          <div className="fixed top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
            <strong>Connection Error:</strong> {connectionError}
          </div>
        )}
      </div>
    </>
  );
}

function VoiceRoomContent({ roomName, participantName }) {
  const participants = useParticipants();
  const tracks = useTracks([
    { source: Track.Source.Microphone, withPlaceholder: true }
  ], {
    onlySubscribed: false,
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">🎤 Voice Chat</h1>
            <p className="text-sm text-gray-300">Room: {roomName}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-300">
              {participantName && `Welcome, ${participantName}`}
            </p>
            <p className="text-sm text-gray-400">
              {participants.length} participant{participants.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Participants List */}
        <div className="bg-gray-700 text-white p-4">
          <h3 className="text-sm font-medium mb-3">Participants:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {participants.map((participant) => (
              <div
                key={participant.sid}
                className="flex items-center gap-2 bg-gray-600 rounded-lg p-2"
              >
                <div className={`w-2 h-2 rounded-full ${
                  participant.isSpeaking ? 'bg-green-400' : 'bg-gray-400'
                }`}></div>
                <span className="text-sm truncate">
                  {participant.identity}
                  {participant.identity.includes('agent') && ' 🤖'}
                  {participant.isLocal && ' (You)'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Visualization Area */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🎵</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Voice-Only Chat</h2>
            <p className="text-gray-600">
              This is an audio-only room. Use the controls below to manage your microphone.
            </p>
          </div>
        </div>

        {/* Control Bar */}
        <div className="bg-gray-800">
          <ControlBar 
            controls={{
              camera: false,
              screenShare: false,
              chat: false,
            }}
          />
        </div>
      </div>
    </div>
  );
}
