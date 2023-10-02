import '@livekit/components-styles';
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  useTracks,
  RoomAudioRenderer,
  ControlBar,
} from '@livekit/components-react';
import '@livekit/react-components/dist/index.css';
import { useEffect, useState } from 'react';
import 'react-aspect-ratio/aspect-ratio.css';
import { Link, useNavigate } from 'react-router-dom';
import { getInterviewToken, getJobs } from 'src/util/apiFunctions';
import 'src/css/shared/interview.css'
import { Track } from 'livekit-client';
import { JobInterface } from 'src/util/interfaces';

export default function InterviewRoom({ isAdmin = false }) {

  const [token, setToken] = useState(null)
  const [job, setJob] = useState<JobInterface>();

  const url = 'wss://job-portal-w843eb2f.livekit.cloud';

  const navigate = useNavigate();


  const fetchJobData = async (): Promise<void> => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const jobId = searchParams.get('roomId')
      if (jobId) {
        const jobData = await getJobs({}, [jobId]);
        setJob(jobData[0]);
      } else {
        throw new Error('Job doesn\'t exist');
      }
    } catch (err) {
      console.error(err);
    }
  };


  const fetchToken = async () => {
    const data = await getInterviewToken()
    setToken(data)
  }

  useEffect(() => {
    fetchToken()
    fetchJobData()
  }, [])

  return (
    <div className='body' style={{ paddingBottom: '0' }}>
      <div className='dashboardTitle row'>
        {isAdmin ?
          <>
            <Link to="/admin/job-management"><h2>Job Management</h2></Link>
            <h2>&nbsp;&nbsp;→&nbsp;&nbsp;</h2>
            <Link to={`/admin/job-management/job?jobId=${job?._id}`}><h2>{job?.title}</h2></Link>
            <h2>&nbsp;&nbsp;→&nbsp;&nbsp;</h2>
            <Link to={`/applicantInterviews/room?jobId=341324234`}><h2>Room ({job?.title})</h2></Link>
          </>
          :
          <>
            <Link to="/applicantInterviews"><h2>Interviews</h2></Link>
            <h2>&nbsp;&nbsp;→&nbsp;&nbsp;</h2>
            <Link to={`/applicantInterviews/room?jobId=341324234`}><h2>Room ({job?.title})</h2></Link>
          </>
        }
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
            onDisconnected={() => navigate(-1)}
          >
            {/* Your custom component with basic video conferencing functionality. */}
            <MyVideoConference />
            {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
            <RoomAudioRenderer />
            {/* Controls for the user to start/stop audio, video, and screen 
         share tracks and to leave the room. */}
            <ControlBar />
          </LiveKitRoom>
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