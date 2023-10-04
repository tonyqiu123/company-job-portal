import React, { useState, useEffect } from 'react';
import 'src/css/admin/dashboard.css'
import { Link, useLocation } from 'react-router-dom';
import SectionLoading from 'src/components/shared/SectionLoading';
import { JobInterface, UserInterface } from 'src/util/interfaces';
import { getUsersById, getFileContent, updateJob, sendEmail } from 'src/util/apiFunctions';
import Button from 'src/components/shared/Button';
import 'src/css/admin/viewApplicant.css'
import Modal from 'src/components/shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { updateJobById } from 'src/redux/jobsSlice';

const ViewApplicant: React.FC = () => {

    const adminJwt = useSelector((state: RootState) => state.jwt.adminJwt)

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [applicantData, setApplicantData] = useState<UserInterface>();
    const [fileContent, setFileContent] = useState<string[]>([]);
    const [selectedFileType, setSelectedFileType] = useState<number>(0);
    const [applicantStatus, setApplicantStatus] = useState<string>('')

    const [showModal, setShowModal] = useState(false)
    const [modalText, setModalText] = useState('')
    const [action, setAction] = useState('')

    const dispatch = useDispatch()

    const searchParams = new URLSearchParams(useLocation().search);
    const jobId = searchParams.get('jobId');
    const jobData = useSelector((state: RootState) =>
        state.jobs.find((job) => job._id === jobId)
    );

    const fetchApplicantData = async (): Promise<void> => {
        try {
            const applicantId = searchParams.get('applicantId');
            if (applicantId && adminJwt) {
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


    const applicantAction = async () => {
        try {
            if (applicantData && applicantData._id && jobData && adminJwt) {
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
                dispatch(updateJobById(updatedJobData));
                updateUserStatus();
                setShowModal(false)
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
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <h3>Are you sure you want to {modalText}?</h3>
                <div className='row' style={{ gap: '20px', width: '100%' }}>
                    <Button style={{ width: '100%' }} text="Cancel" handleClick={async () => setShowModal(false)} variant='outline' />
                    <Button style={{ width: '100%' }} text="Confirm" handleClick={applicantAction} variant='primary' />
                </div>
            </Modal>
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
                    <section className='jobManagement viewApplicant row' style={{ justifyContent: 'flex-start' }}>
                        <div className='applicantFiles column'>
                            <div className='applicantFiles-tabs row'>
                                {applicantData?.attachments?.map((file, index) => {
                                    return (<p key={index} onClick={() => setSelectedFileType(index)} className={index === selectedFileType ? 'activeTab' : ''}>{file.fileType}</p>)
                                })}
                            </div>
                            <div className='applicantFiles-file'>
                                {fileContent[selectedFileType] ?
                                    <iframe src={fileContent[selectedFileType]}>

                                    </iframe>
                                    :
                                    <h3 style={{ padding: '24px' }}>User did not upload a file</h3>}
                            </div>
                        </div>

                        <div className='applicantInfo column'>
                            <div className='row' style={{ justifyContent: 'flex-start', gap: '8px' }}>
                                <p>Status:</p>
                                <h6 style={{ whiteSpace: 'nowrap' }}>{applicantStatus === '' ? 'Pending' : applicantStatus}</h6>
                            </div>
                            <h2>{applicantData?.firstName} {applicantData?.lastName}</h2>
                            <p>{applicantData?.email}</p>
                            <div className='row'>
                                {applicantStatus === '' &&
                                    <>
                                        <Button text="Select for interview" handleClick={async () => {
                                            setShowModal(true);
                                            setModalText(`select ${applicantData?.firstName} ${applicantData?.lastName} for the interview`);
                                            setAction('selectForInterview')
                                        }} variant='primary' />
                                        <Button text="Shortlist" handleClick={async () => {
                                            setShowModal(true);
                                            setModalText(`shortlist ${applicantData?.firstName} ${applicantData?.lastName}`);
                                            setAction('shortlist')
                                        }} variant='primary' />
                                        <Button text="Reject" handleClick={async () => {
                                            setShowModal(true);
                                            setModalText(`reject ${applicantData?.firstName} ${applicantData?.lastName}`);
                                            setAction('reject')
                                        }} variant='outline' />
                                    </>

                                }
                                {applicantStatus === 'Shortlisted' &&
                                    <>
                                        <Button text="Select for interview" handleClick={async () => { setShowModal(true); setModalText(`select ${applicantData?.firstName} ${applicantData?.lastName} for the interview`); setAction('selectForInterview') }} variant='primary' />
                                        <Button text="Unshortlist" handleClick={async () => {
                                            setShowModal(true);
                                            setModalText(`unshortlist ${applicantData?.firstName} ${applicantData?.lastName}`);
                                            setAction('unshortlist')
                                        }} variant='outline' />
                                    </>
                                }
                                {applicantStatus === 'Offered Position' &&
                                    <Button text="Rescind Offer" handleClick={async () => {
                                        setShowModal(true);
                                        setModalText(`rescind the offer from ${applicantData?.firstName} ${applicantData?.lastName}`);
                                        setAction('unselect')
                                    }} variant='outline' />

                                }
                                {applicantStatus === 'Selected For Interview' &&
                                    <>
                                        <Button text="Unselect for interview" handleClick={async () => {
                                            setShowModal(true);
                                            setModalText(`unselect ${applicantData?.firstName} ${applicantData?.lastName} from the interview`);
                                            setAction('unselectForInterview')
                                        }} variant='outline' />
                                        <Button text="Offer Position" handleClick={async () => {
                                            setModalText(`offer the position to ${applicantData?.firstName} ${applicantData?.lastName}`)
                                            setShowModal(true);
                                            setAction('select')
                                        }} variant='primary' />
                                    </>
                                }
                                {applicantStatus === 'Rejected' &&
                                    <>
                                        <Button text="Unreject" handleClick={async () => {
                                            setShowModal(true);
                                            setModalText(`unreject ${applicantData?.firstName} ${applicantData?.lastName}`)
                                            setAction('unreject')
                                        }} variant='outline' />
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