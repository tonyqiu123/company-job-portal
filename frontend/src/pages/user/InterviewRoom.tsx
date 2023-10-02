import '@livekit/components-styles';
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  useTracks,
  RoomAudioRenderer,
  ControlBar,
} from '@livekit/components-react';
import '@livekit/react-components/dist/index.css';
import { useEffect, useState } from 'react';
import 'react-aspect-ratio/aspect-ratio.css';
import { Link } from 'react-router-dom';
import { getInterviewToken } from 'src/util/apiFunctions';
import 'src/css/shared/interview.css'
import { Track } from 'livekit-client';

export default function InterviewRoom() {

  const [token, setToken] = useState(null)
  const url = 'wss://job-portal-w843eb2f.livekit.cloud';

  const fetchToken = async () => {
    const data = await getInterviewToken()
    setToken(data)
  }

  useEffect(() => {
    fetchToken()
  }, [])

  return (
    <div className='body' style={{ paddingBottom: '0' }}>
      <div className='dashboardTitle row'>
        <Link to="/applicantInterviews"><h2>Interviews</h2></Link>
        <h2>&nbsp;&nbsp;→&nbsp;&nbsp;</h2>
        {true && <Link to={`/applicantInterviews/room?jobId=341324234`}><h2>Room (Software Developer)</h2></Link>}
      </div>
      <div className='hr'></div>
      <div className="roomContainer" style={{ marginTop: '-32px' }}>
        {token ?
          <LiveKitRoom
            video={true}
            audio={true}
            token={token}
            connectOptions={{ autoSubscribe: false }}
            serverUrl={url}
            // Use the default LiveKit theme for nice styles.
            data-lk-theme="default"
            style={{ height: 'calc(100dvh - 81px)' }}
          >
            {/* Your custom component with basic video conferencing functionality. */}
            <MyVideoConference />
            {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
            <RoomAudioRenderer />
            {/* Controls for the user to start/stop audio, video, and screen 
         share tracks and to leave the room. */}
            <ControlBar />
          </LiveKitRoom>
          // <LiveKitRoom url={url} token={token} onConnected={room => onConnected(room)} />
          :
          null}
      </div>
    </div >
  );
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - 81px - var(--lk-control-bar-height))' }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}