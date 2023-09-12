import React, { useState, useEffect } from 'react';
import 'src/css/admin/dashboard.css'
import { Link, useLocation } from 'react-router-dom';
import SectionLoading from 'src/components/shared/SectionLoading';
import { JobInterface, UserInterface } from 'src/util/interfaces';
import { getJobs, getUsersById, getFileContent, updateJob, getMonthlyData, sendEmail } from 'src/util/apiFunctions';
import Button from 'src/components/shared/Button';
import 'src/css/admin/viewApplicant.css'



interface ViewApplicantProps {
    adminJwt: string;
}

const ViewApplicant: React.FC<ViewApplicantProps> = ({ adminJwt }) => {



    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [applicantData, setApplicantData] = useState<UserInterface>();
    const [jobData, setJobData] = useState<JobInterface>();
    const [fileContent, setFileContent] = useState<string[]>([]);
    const [selectedFileType, setSelectedFileType] = useState<number>(0);
    const [applicantStatus, setApplicantStatus] = useState<string>('')
    const [monthlyData, setMonthlyData] = useState<any>([{}])


    const fetchMonthlyData = async (): Promise<void> => {
        try {
            const data = await getMonthlyData()
            setMonthlyData(data)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchMonthlyData()
    }, [])


    const location = useLocation();
    const fetchApplicantData = async (): Promise<void> => {
        try {
            const searchParams = new URLSearchParams(location.search);
            const applicantId = searchParams.get('applicantId');
            const jobId = searchParams.get('jobId');
            if (jobId) {
                const jobData = await getJobs({}, [jobId]);
                setJobData(jobData[0]);
                if (applicantId) {
                    const applicantData = await getUsersById({}, adminJwt, '', [applicantId]);
                    setApplicantData(applicantData[0]);
                    if (applicantData[0].attachments.length > 0) {
                        let files: string[] = []
                        for (let i = 0; i < applicantData[0].attachments.length; i++) {
                            const fetchedFile = await getFileContent(applicantData[0].attachments[i]._id);
                            files = [...files, fetchedFile]
                        }
                        setFileContent(files)
                        updateUserStatus()
                    }
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false)
        }
    };


    function updateUserStatus() {
        if (jobData && applicantData?._id) {
            if (jobData.selectedForInterview?.includes(applicantData._id)) {
                setApplicantStatus('Selected For Interview');
            } else if (jobData.rejected?.includes(applicantData._id)) {
                setApplicantStatus('Rejected');
            } else if (jobData.shortlisted?.includes(applicantData._id)) {
                setApplicantStatus('Shortlisted');
            } else if (jobData.selected?.includes(applicantData._id)) {
                setApplicantStatus('Offered Position');
            } else {
                setApplicantStatus('');
            }
        }  
    }


    const applicantAction = async (action: string) => {
        try {
            if (applicantData && applicantData._id && jobData) {
                const updatedJobData: JobInterface = { ...jobData };

                updatedJobData.rejected = updatedJobData.rejected ? updatedJobData.rejected.filter(id => id !== applicantData._id) : [];
                updatedJobData.selectedForInterview = updatedJobData.selectedForInterview ? updatedJobData.selectedForInterview.filter(id => id !== applicantData._id) : [];
                updatedJobData.shortlisted = updatedJobData.shortlisted ? updatedJobData.shortlisted.filter(id => id !== applicantData._id) : [];
                updatedJobData.selected = updatedJobData.selected ? updatedJobData.selected.filter(id => id !== applicantData._id) : [];

                if (action === 'reject') {
                    updatedJobData.rejected.push(applicantData._id);
                } else if (action === 'selectForInterview') {
                    updatedJobData.selectedForInterview.push(applicantData._id);
                } else if (action === 'shortlist') {
                    updatedJobData.shortlisted.push(applicantData._id);
                } else if (action === 'select') {
                    updatedJobData.selected.push(applicantData._id);
                    if (updatedJobData.title && applicantData.email) {
                        sendEmail(adminJwt, updatedJobData.title, applicantData.email)
                    }
                }

                await updateJob(adminJwt, updatedJobData);
                setJobData(updatedJobData);
                updateUserStatus();
            }
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        fetchApplicantData()
    }, [])

    useEffect(() => {
        updateUserStatus()
    }, [jobData, applicantData])


    return (
        <>
            <div className={`sectionLoading column ${!isLoading && 'skele-exit'}`}>
                <SectionLoading />
            </div>
            {!isLoading && (
                <div className='body contentLoaded'>
                    <div className='dashboardTitle row'>
                        <Link to="/admin/job-management"><h2>Job Management</h2></Link>
                        <h2>&nbsp;&nbsp;→&nbsp;&nbsp;</h2>
                        {jobData && <Link to={`/admin/job-management/job?jobId=${jobData?._id}`}><h2>{jobData.title}</h2></Link>}
                        <h2>&nbsp;&nbsp;→&nbsp;&nbsp;</h2>
                        {applicantData && <Link to={location}><h2>{applicantData.firstName} {applicantData.lastName}</h2></Link>}
                    </div>
                    <div className='hr'></div>
                    <section className='jobManagement viewApplicant row'>
                        <div className='prevNext column'>
                            <p>← previous</p>
                            <p>({applicantData?.firstName} {applicantData?.lastName})</p>
                        </div>
                        <div className='prevNext column'>
                            <p>next →</p>
                            <p>({applicantData?.firstName} {applicantData?.lastName})</p>
                        </div>

                        <div className='applicantFiles column'>
                            <div className='applicantFiles-tabs row'>
                                {applicantData?.attachments?.map((file, index) => {
                                    return (<p key={index} onClick={() => setSelectedFileType(index)} className={index === selectedFileType ? 'activeTab' : ''}>{file.fileType}</p>)
                                })}
                            </div>
                            <div className='applicantFiles-file'>
                                <iframe src={fileContent[selectedFileType]}>

                                </iframe>
                            </div>
                        </div>

                        <div className='applicantInfo column'>
                            <div className='row' style={{ justifyContent: 'flex-start', gap: '8px' }}>
                                <p>Status:</p>
                                <h6>{applicantStatus === '' ? 'Pending' : applicantStatus}</h6>
                            </div>
                            <h2>{applicantData?.firstName} {applicantData?.lastName}</h2>
                            <p>{applicantData?.email}</p>
                            <div className='row'>
                                {applicantStatus === '' &&
                                    <>
                                        <Button text="Select for interview" handleClick={() => applicantAction('selectForInterview')} variant='primary' />
                                        <Button text="Shortlist" handleClick={() => applicantAction('shortlist')} variant='primary' />
                                        <Button text="Reject" handleClick={() => applicantAction('reject')} variant='outline' />
                                    </>

                                }
                                {applicantStatus === 'Shortlisted' &&
                                    <>
                                        <Button text="Select for interview" handleClick={() => applicantAction('selectForInterview')} variant='primary' />
                                        <Button text="Unshortlist" handleClick={() => applicantAction('unshortlist')} variant='outline' />
                                    </>
                                }
                                {applicantStatus === 'Offered Position' &&
                                    <Button text="Rescind Offer" handleClick={() => applicantAction('unselect')} variant='outline' />

                                }
                                {applicantStatus === 'Selected For Interview' &&
                                    <>
                                        <Button text="Unselect for interview" handleClick={() => applicantAction('unselectForInterview')} variant='outline' />
                                        <Button text="Offer Position" handleClick={() => applicantAction('select')} variant='primary' />
                                    </>
                                }
                                {applicantStatus === 'Rejected' &&
                                    <>
                                        <Button text="Unreject" handleClick={() => applicantAction('unreject')} variant='outline' />
                                    </>

                                }
                            </div>
                        </div>
                    </section>
                </div>
            )}

        </>
    )
}

export default ViewApplicant