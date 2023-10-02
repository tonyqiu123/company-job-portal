import { getJobs } from 'src/util/apiFunctions'
import { useEffect, useState } from 'react';
import Button from '../shared/Button';
import { formatDate } from 'src/util/dateUtils'
import { JobInterface } from 'src/util/interfaces';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../shared/Modal';

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
            <h3>{job?.title}</h3>
            <p>{job?.remote ? `Remote - ${job?.location}` : job?.location}</p>
            <p>{job?.position}</p>
            {job?.requiredEducation && <p>{job?.requiredEducation}</p>}
            {job?.salary && <p>${job?.salary} per year plus any listed benefits</p>}
            <div className='hr' style={{ marginBottom: '12px' }}></div>
            <p>At TD Bank, our goal is to empower individuals and businesses with the financial tools they need to succeed. We're a team of passionate professionals dedicated to shaping the future of banking and delivering innovative solutions.When hiring at TD Bank, we value candidates who thrive in a collaborative and inclusive culture. We seek individuals who embrace feedback, contribute unique perspectives, and are committed to making a positive impact on customers' lives. We prioritize a mission-driven approach, focusing on exceeding customer expectations and supporting their financial goals. We also value curiosity, adaptability, and an eagerness to stay informed about emerging trends in banking. At TD Bank, we welcome talent from around the world and offer remote work opportunities. Join our dynamic organization and be part of shaping the future of banking.</p>
            <h6>Job Description</h6>
            <p>{job?.description}</p>
            <h6>What you will be doing:</h6>
            <ul>
              {job?.responsibilities?.map((responsibility, index) => (
                <li key={index}><p>{responsibility}</p></li>
              ))}
            </ul>
            <h6>What we are looking for:</h6>
            <ul>
              {job?.whatWereLookingFor?.map((whatWereLookingFor, index) => (
                <li key={index}><p>{whatWereLookingFor}</p></li>
              ))}
            </ul>
            <h6>Benefits:</h6>
            <ul>
              {job?.benefits?.map((benefit, index) => (
                <li key={index}><p>{benefit}</p></li>
              ))}
            </ul>
            {!interview ?
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