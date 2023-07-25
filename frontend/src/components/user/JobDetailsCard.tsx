import { getJobs } from 'src/util/apiFunctions'
import { useEffect, useState } from 'react';
import Button from '../shared/Button';
import { formatDate } from 'src/util/dateUtils'
import { JobInterface } from 'src/util/interfaces';

interface JobDetailsCardProps {
  jobId: string
  setShowJobDetailsCard: (show: boolean) => void
  handleJobAction: (jobID: string, action: string) => Promise<void>
  application?: boolean
  shortlist?: boolean
}

const JobDetailsCard: React.FC<JobDetailsCardProps> = ({ jobId, setShowJobDetailsCard, handleJobAction, application, shortlist }) => {

  const [errorState, setErrorState] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [job, setJob] = useState<null | JobInterface>(null);




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

      <div className="modalDarkBackground" onClick={() => setShowJobDetailsCard(false)}></div>

      <div className='modalCard jobDetailsCard column'>
        {!loading &&

          <div className='jobDetailsCard-loadedContainer column'>
            <h3>{job?.title}</h3>
            <p>Posted {job && job.date && formatDate(job.date)}</p>
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
            <div className='hr'></div>
            <div className="jobDetailsCard-btnCont row">

              {!shortlist && !application && <Button text='Shortlist' primary={true} handleClick={() => handleJobAction(job?._id, "shortlist")}></Button>}
              {shortlist && <Button text='Unshortlist' handleClick={() => handleJobAction(job?._id, "unshortlist")}></Button>}
              {application && <Button text='Unapply' handleClick={() => handleJobAction(job?._id, "unapply")}></Button>}
              {!application && <Button text='Apply' primary={true} handleClick={() => handleJobAction(job?._id, "apply")}></Button>}
            </div>

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