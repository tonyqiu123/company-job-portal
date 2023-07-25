import React, { useState, useEffect } from 'react';
import Tooltip from 'src/components/shared/Tooltip';
import Button from 'src/components/shared/Button';
import "src/css/admin/jobManagement.css";
import 'src/css/shared/table.css';
import "src/css/admin/createJob.css";
import SelectDropdown from 'src/components/shared/SelectDropdown';
import Input from 'src/components/shared/Input';
import { createJob } from 'src/util/apiFunctions';
import { JobInterface } from 'src/util/interfaces';
import Table from 'src/components/shared/Table';
import { useNavigate, Link } from "react-router-dom";
import SectionLoading from 'src/components/shared/SectionLoading';
import MonthlyStat from 'src/components/admin/DataCard';

interface CreateJobProps {
    adminJwt: string
}

const requiredFilesOptions: string[] = ['Resume', 'Cover Letter', 'References', 'Portfolio', 'Certificates'];
const positions: string[] = ['All', 'Full Time', 'Part Time', 'Contract', 'Internship'];


const CreateJob: React.FC<CreateJobProps> = ({ adminJwt }) => {
    const [position, setPosition] = useState<'Full Time' | 'Part Time' | 'Contract' | 'Internship'>('Full Time');
    const [jobs, setJobs] = useState<JobInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [salary, setSalary] = useState<number>(0);
    const [requirements, setRequirements] = useState<string>('');
    const [responsibilities, setResponsibilities] = useState<string>('');
    const [skills, setSkills] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('');
    const [requiredFiles, setRequiredFiles] = useState<('resume' | 'coverletter' | 'references' | 'portfolio' | 'certificates')[]>([]);



    const handlePublish = async () => {
        const jobDetails = {
            title,
            description,
            location,
            salary,
            position,
            requirements: [requirements], // Assuming you're entering these as comma separated strings
            responsibilities: [responsibilities],
            skills: [skills],
            deadline,
            requiredFiles
        };

        try {
            const response = await createJob(adminJwt, jobDetails);
            console.log(response); // For now just log the result
        } catch (error) {
            console.error(error); // Handle errors
        }
    };



    useEffect(() => {
        setIsLoading(false)
    }, [])



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
                        <Link to={location}><h2>Create Job</h2></Link>
                    </div>
                    <div className='hr'></div>
                    <section className='createJob column'>

                        <div className='fillFieldsContainer column'>
                            <div className='fillFieldsContainer-input column'>
                                <Tooltip toolTipText='Job Title.' >
                                    <h6>Title<span style={{ color: 'red' }}>*</span></h6>
                                </Tooltip>
                                <Input handleState={setTitle} placeholder='City, Country' />
                            </div>

                            <div className='fillFieldsContainer-input column'>
                                <Tooltip toolTipText='Job Description.' >
                                    <h6>Description<span style={{ color: 'red' }}>*</span></h6>
                                </Tooltip>
                                <Input handleState={setDescription} placeholder='City, Country' />
                            </div>

                            <div className='fillFieldsContainer-input column'>
                                <Tooltip toolTipText='Job location.' >
                                    <h6>Location<span style={{ color: 'red' }}>*</span></h6>
                                </Tooltip>
                                <Input handleState={setLocation} placeholder='City, Country' />
                            </div>

                            <div className='fillFieldsContainer-input column'>
                                <Tooltip toolTipText='Salary for the job.' >
                                    <h6>Salary<span style={{ color: 'red' }}>*</span></h6>
                                </Tooltip>
                                <Input type='number' handleState={setSalary} placeholder='e.g., $60,000 - $80,000' />
                            </div>

                            <div className='fillFieldsContainer-input column'>
                                <Tooltip toolTipText='Job position type (e.g., full time, part time, contract, internship).' >
                                    <h6>Position<span style={{ color: 'red' }}>*</span></h6>
                                </Tooltip>
                                <SelectDropdown values={positions} handleSetState={setPosition} />
                            </div>

                            <div className='fillFieldsContainer-input column'>
                                <Tooltip toolTipText='Job requirements.' >
                                    <h6>Requirements<span style={{ color: 'red' }}>*</span></h6>
                                </Tooltip>
                                <Input handleState={setRequirements} placeholder='Enter job requirements' />
                            </div>

                            <div className='fillFieldsContainer-input column'>
                                <Tooltip toolTipText='Job responsibilities.' >
                                    <h6>Responsibilities<span style={{ color: 'red' }}>*</span></h6>
                                </Tooltip>
                                <Input handleState={setResponsibilities} placeholder='Enter job responsibilities' />
                            </div>

                            <div className='fillFieldsContainer-input column'>
                                <Tooltip toolTipText='Required skills for the job.' >
                                    <h6>Skills<span style={{ color: 'red' }}>*</span></h6>
                                </Tooltip>
                                <Input handleState={setSkills} placeholder='Enter required skills' />
                            </div>

                            <div className='fillFieldsContainer-input column'>
                                <Tooltip toolTipText='Application deadline for the job.' >
                                    <h6>Deadline<span style={{ color: 'red' }}>*</span></h6>
                                </Tooltip>
                                <Input handleState={setDeadline} placeholder='Enter application deadline' />
                            </div>

                            <div className='fillFieldsContainer-input column'>
                                <Tooltip toolTipText='Required files for the job.' >
                                    <h6>Required Files<span style={{ color: 'red' }}>*</span></h6>
                                </Tooltip>
                                <SelectDropdown values={requiredFilesOptions} handleSetState={setRequiredFiles} />
                            </div>
                        </div>

                        <Button text='Publish' primary={true} handleClick={handlePublish} />


                    </section>
                </div>
            )}
        </>
    );
};

export default CreateJob;
