import { getJobs } from 'src/util/apiFunctions'
import { useEffect, useState } from 'react';
import Button from '../shared/Button'; 
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../shared/Modal';
import { formatDate } from 'src/util/dateUtils';
import Badge from '../shared/Badge';
import { JobInterface } from 'src/util/interfaces';

interface JobDetailsCardProps {
  jobId: string
  setShowJobDetailsCard: (show: boolean) => void
  handleJobAction: (jobID: string, action: string, jobTitle: string | undefined) => Promise<void>
  application?: boolean
  shortlist?: boolean
  interview?: boolean
}

const JobDetailsCard: React.FC<JobDetailsCardProps> = ({ jobId, setShowJobDetailsCard, handleJobAction, application, shortlist, interview = false }) => {

  const [errorState, setErrorState] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [job, setJob] = useState<null | JobInterface>(null);
  const [showJoinRoomModal, setShowJoinRoomModal] = useState(false)

  const handleJobFetch = async () => {
    try {
      const data = await getJobs({}, [jobId]);
      setJob(data[0]);
      setLoading(false);
    } catch (error: any) {
      setErrorState(error);
    }
  };

  const getJobStatus = (job: JobInterface) => {
    if (job?.selected && job?.selected?.length > 0) {
      return <Badge variant='destructive' text='Offers sent' />
    }
    if (job?.selectedForInterview && job?.selectedForInterview?.length > 0) {
      return <Badge variant='warning' text='Interviewing stage' />
    }
    return <Badge variant='success' text='Open to applications' />
  }

  useEffect(() => {
    handleJobFetch();
  }, []);

  return (
    <div className="modalContainer">
      <Modal showModal={showJoinRoomModal} setShowModal={setShowJoinRoomModal}>
        <h2>Confirm joining interview room for {job?.title}?</h2>
        <div className='row' style={{ gap: '20px', width: '100%' }}>
          <Button style={{ width: '100%' }} text='Cancel' variant='outline' handleClick={async () => setShowJoinRoomModal(false)}></Button>
          <Link style={{ width: '100%' }} to={`/applicantInterviews/room?roomId=${job?._id}`}>
            <Button style={{ width: '100%' }} text='Join interview room' variant='primary'></Button>
          </Link>
        </div>
      </Modal>

      <div className="modalDarkBackground" onClick={() => setShowJobDetailsCard(false)}></div>

      <div className='modalCard jobDetailsCard column'>
        {!loading &&

          <div className='jobDetailsCard-loadedContainer column'>
            {interview ?
              <Fragment>
                <h4>Interview starts: October 6th, 2023 14:00 EST</h4>
                <Button style={{ maxWidth: '200px' }} text='Join interview room' variant='primary' handleClick={async () => setShowJoinRoomModal(true)}></Button>
                <div className='hr'></div>
              </Fragment>
              : null}
            {job && getJobStatus(job)}
            <h3>{job?.title}</h3>
            <p>Closes {formatDate(job?.deadline || '')}</p>
            <p>{job?.remote ? `Remote - ${job?.location}` : job?.location}</p>
            <p>{job?.position}</p>
            {job?.requiredEducation && <p>{job?.requiredEducation}</p>}
            {job?.salary && <p>${job?.salary} per year plus any listed benefits</p>}
            <div className='hr'></div>
            <h6>Company Description</h6>
            <p>NCR's Waterloo Software Engineering organization is building world-class banking applications used by some of the top financial organizations in the world. We are currently hiring several co-op students for Software Development positions in our Waterloo office. If you're looking for a chance to get hands-on real-world software development experience, helping to solve challenging issues and build high-quality applications used by some of the top banking organizations in the world, consider joining our NCR team. NCR was recently named a "Top 100 Global Tech Leader" by Thomson Reuters. We also won the 2022 FinTech Breakthrough Award for the Best Banking Infrastructure Platform, demonstrating NCR's leadership as an innovator in banking. Our Software Engineering organization uses state of the art technologies along with Agile software development methodologies to deliver innovative solutions to the customers we serve.</p>
            <h6>Job Description</h6>
            <p>{job?.description}</p>
            <h6>What you will be doing:</h6>
            <ul>
              {job?.responsibilities?.map((responsibility, index) => (
                <li key={index}><p>{responsibility}</p></li>
              ))}
            </ul>
            {job?.benefits && job.benefits.length > 0 ?
              <>
                <h6>Benefits:</h6>
                <ul>
                  {job?.benefits?.map((benefit, index) => (
                    <li key={index}><p>{benefit}</p></li>
                  ))}
                </ul>
              </>
              : null}
            <h6>Required Skills:</h6>
            <ul>
              {job?.skills?.map((skill, index) => (
                <li key={index}><p>{skill}</p></li>
              ))}
            </ul>
            {job?.requiredDocuments && job.requiredDocuments.length > 0 ?
              <>
                <h6>Required Files:</h6>
                <ul>
                  {job?.requiredDocuments?.map((document, index) => (
                    <li key={index}><p>{document}</p></li>
                  ))}
                </ul>
              </>
              : null}
            {!interview && job?.selected && job?.selected?.length === 0 && job?.selectedForInterview && job?.selectedForInterview?.length === 0 ?
              <>
                <div className='hr'></div>
                <div className="jobDetailsCard-btnCont row">
                  {!shortlist && !application && <Button text='Shortlist' variant='primary' handleClick={() => handleJobAction(job?._id, "shortlist", job?.title)}></Button>}
                  {shortlist && <Button variant='outline' text='Unshortlist' handleClick={() => handleJobAction(job?._id, "unshortlist", job?.title)}></Button>}
                  {application && <Button variant='outline' text='Unapply' handleClick={() => handleJobAction(job?._id, "unapply", job?.title)}></Button>}
                  {!interview && !application && <Button text='Apply' variant='primary' handleClick={() => handleJobAction(job?._id, "apply", job?.title)}></Button>}
                </div>
              </>
              : null}

          </div>
        }
        <div className={`skele column ${!loading && 'skele-exit'}`}>
          <div className='skele-title'></div>
          <div className='skele-shortText'></div>
          <div className='skele-shortText'></div>
          <div className='skele-longText'></div>
          <div className='skele-title'></div>
          <div className='skele-longText'></div>
          <div className='skele-title'></div>
          <div className='skele-shortText'></div>
          <div className='skele-shortText'></div>
        </div>
        {errorState && <p>{errorState}</p>}
      </div>
    </div>
  );
}

export default JobDetailsCard