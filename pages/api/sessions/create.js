import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { participant_name, session_duration_minutes = 30 } = req.body;

  if (!participant_name) {
    return res.status(400).json({ error: 'Missing participant_name' });
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    console.error('Missing LiveKit environment variables');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    // Generate unique session ID and room name
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const roomName = `voice_agent_${sessionId}`;

    // Create access token
    const at = new AccessToken(apiKey, apiSecret, { identity: participant_name });
    
    // Grant permissions
    at.addGrant({ 
      room: roomName, 
      roomJoin: true, 
      canPublish: true, 
      canSubscribe: true 
    });

    const token = await at.toJwt();

    // Create session object similar to your original backend
    const session = {
      session_id: sessionId,
      room_name: roomName,
      participant_name,
      session_duration_minutes,
      token,
      ws_url: wsUrl,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + session_duration_minutes * 60 * 1000).toISOString(),
      status: 'created'
    };

    res.status(200).json(session);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
}
