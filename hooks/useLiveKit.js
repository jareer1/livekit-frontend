import { useState, useCallback, useRef } from 'react';
import { Room, RoomEvent, Track } from 'livekit-client';

export const useLiveKit = () => {
  const [room, setRoom] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [participants, setParticipants] = useState([]);
  const roomRef = useRef(null);

  const connectToRoom = useCallback(async (wsUrl, token) => {
    if (roomRef.current) {
      await disconnectFromRoom();
    }

    setIsConnecting(true);
    setError(null);

    try {
      const newRoom = new Room({
        adaptiveStream: true,
        dynacast: true,
        publishDefaults: {
          audioPreset: {
            maxBitrate: 20_000,
          },
        },
      });

      // Set up event listeners
      newRoom.on(RoomEvent.Connected, () => {
        console.log('Connected to LiveKit room');
        setIsConnected(true);
        setIsConnecting(false);
      });

      newRoom.on(RoomEvent.Disconnected, (reason) => {
        console.log('Disconnected from LiveKit room:', reason);
        setIsConnected(false);
        setIsConnecting(false);
        setRoom(null);
        roomRef.current = null;
      });

      newRoom.on(RoomEvent.ParticipantConnected, (participant) => {
        console.log('Participant connected:', participant.identity);
        setParticipants(prev => [...prev, participant]);
      });

      newRoom.on(RoomEvent.ParticipantDisconnected, (participant) => {
        console.log('Participant disconnected:', participant.identity);
        setParticipants(prev => prev.filter(p => p.sid !== participant.sid));
      });

      newRoom.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
        console.log('Track subscribed:', track.kind, participant.identity);
        
        if (track.kind === Track.Kind.Audio) {
          const audioElement = track.attach();
          audioElement.autoplay = true;
          document.body.appendChild(audioElement);
        }
      });

      newRoom.on(RoomEvent.TrackUnsubscribed, (track, publication, participant) => {
        console.log('Track unsubscribed:', track.kind, participant.identity);
        track.detach();
      });

      newRoom.on(RoomEvent.ConnectionQualityChanged, (quality, participant) => {
        console.log('Connection quality changed:', quality, participant?.identity);
      });

      newRoom.on(RoomEvent.RoomMetadataChanged, (metadata) => {
        console.log('Room metadata changed:', metadata);
      });

      // Connect to the room
      await newRoom.connect(wsUrl, token);

      // Enable microphone
      await newRoom.localParticipant.enableCameraAndMicrophone(false, true);

      roomRef.current = newRoom;
      setRoom(newRoom);

    } catch (err) {
      console.error('Error connecting to room:', err);
      setError(err.message);
      setIsConnecting(false);
      throw err;
    }
  }, []);

  const disconnectFromRoom = useCallback(async () => {
    if (roomRef.current) {
      await roomRef.current.disconnect();
      roomRef.current = null;
    }
    setRoom(null);
    setIsConnected(false);
    setParticipants([]);
  }, []);

  const toggleMicrophone = useCallback(async () => {
    if (!roomRef.current) return false;

    try {
      const enabled = roomRef.current.localParticipant.isMicrophoneEnabled;
      await roomRef.current.localParticipant.setMicrophoneEnabled(!enabled);
      return !enabled;
    } catch (err) {
      console.error('Error toggling microphone:', err);
      setError(err.message);
      return false;
    }
  }, []);

  const getMicrophoneEnabled = useCallback(() => {
    return roomRef.current?.localParticipant.isMicrophoneEnabled ?? false;
  }, []);

  return {
    room,
    isConnected,
    isConnecting,
    error,
    participants,
    connectToRoom,
    disconnectFromRoom,
    toggleMicrophone,
    getMicrophoneEnabled
  };
};
