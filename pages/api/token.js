import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { roomName, participantName } = req.body;

  if (!roomName || !participantName) {
    return res.status(400).json({ error: 'Missing roomName or participantName' });
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    console.error('Missing LiveKit environment variables');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    // Create access token
    const at = new AccessToken(apiKey, apiSecret, { identity: participantName });
    
    // Grant permissions
    at.addGrant({ 
      room: roomName, 
      roomJoin: true, 
      canPublish: true, 
      canSubscribe: true 
    });

    const token = await at.toJwt();

    res.status(200).json({ 
      token,
      wsUrl,
      roomName,
      participantName
    });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
}
