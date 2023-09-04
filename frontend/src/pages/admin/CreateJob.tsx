import React, { useState, useEffect } from 'react';
import Tooltip from 'src/components/shared/Tooltip';
import Button from 'src/components/shared/Button';
import "src/css/admin/jobManagement.css";
import 'src/css/shared/table.css';
import "src/css/admin/createJob.css";
import { createJob } from 'src/util/apiFunctions';
// import { JobInterface } from 'src/util/interfaces';
// import Table from 'src/components/shared/Table';
import { Link } from "react-router-dom";
import SectionLoading from 'src/components/shared/SectionLoading';
import MultiSelect from 'src/components/shared/MultiSelect';
import Input from 'src/components/shared/Input';
import Select from 'src/components/shared/Select';
// import MonthlyStat from 'src/components/admin/DataCard';

interface CreateJobProps {
    adminJwt: string
}


const CreateJob: React.FC<CreateJobProps> = ({ adminJwt }) => {
    const [position, setPosition] = useState<'Full Time' | 'Part Time' | 'Contract' | 'Internship'>('Full Time');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [salary, setSalary] = useState<string>('');
    const [requirements, setRequirements] = useState<string[]>([]);
    const [responsibilities, setResponsibilities] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);
    const [deadline] = useState<string>('');
    const [requiredFiles, setRequiredFiles] = useState<string[]>([]);
    const [error, setError] = useState('')


    const handlePublish = async () => {
        const jobDetails = {
            title,
            description,
            location,
            salary: Number(salary),
            position,
            requirements: requirements, // Assuming you're entering these as comma separated strings
            responsibilities: responsibilities,
            skills: skills,
            deadline,
            requiredFiles
        };

        try {
            const response = await createJob(adminJwt, jobDetails);
            console.log(response)
        } catch (error: any) {
            setError(error.message)
        }
    };

    const employmentTypes = ['Full Time', 'Part Time', 'Contract', 'Internship'];
    const documentTypes = ['resume', 'coverletter', 'references', 'portfolio', 'certificates'];

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
                            <div className='column'>
                                <Tooltip toolTipText='Title'>
                                    <p>Title <span style={{ color:"red" }}>*</span></p>
                                </Tooltip>
                                <Input placeHolder='Title' search={title} setSearch={setTitle} />
                            </div>
                            <div className='column'>
                                <Tooltip toolTipText='Description'>
                                    <p>Description <span style={{ color:"red" }}>*</span></p>
                                </Tooltip>
                                <Input placeHolder='Description' search={description} setSearch={setDescription} />
                            </div>
                            <div className='column'>
                                <Tooltip toolTipText='Location'>
                                    <p>Location <span style={{ color:"red" }}>*</span></p>
                                </Tooltip>
                                <Input placeHolder='Location' search={location} setSearch={setLocation} />
                            </div>
                            <div className='column'>
                                <Tooltip toolTipText='Salary'>
                                    <p>Salary <span style={{ color:"red" }}>*</span></p>
                                </Tooltip>
                                <Input placeHolder='Salary' search={salary} setSearch={setSalary} />
                            </div>
                            <div className='column'>
                                <Tooltip toolTipText='Position'>
                                    <p>Position <span style={{ color:"red" }}>*</span></p>
                                </Tooltip>
                                <Select queries={employmentTypes} selected={position} setSelected={setPosition} />
                            </div>
                            <div className='column'>
                                <Tooltip toolTipText='Requirements'>
                                    <p>Requirements <span style={{ color:"red" }}>*</span></p>
                                </Tooltip>
                                <MultiSelect placeholder='Requirements' selected={requirements} setSelected={setRequirements} />
                            </div>
                            <div className='column'>
                                <Tooltip toolTipText='Responsibilities'>
                                    <p>Responsibilities <span style={{ color:"red" }}>*</span></p>
                                </Tooltip>
                                <MultiSelect placeholder='Responsibilities' selected={responsibilities} setSelected={setResponsibilities} />
                            </div>
                            <div className='column'>
                                <Tooltip toolTipText='Skills'>
                                    <p>Skills <span style={{ color:"red" }}>*</span></p>
                                </Tooltip>
                                <MultiSelect placeholder='Skills' selected={skills} setSelected={setSkills} />
                            </div> 
                            <div className='column'>
                                <Tooltip toolTipText='Files'>
                                    <p>Files <span style={{ color:"red" }}>*</span></p>
                                </Tooltip>
                                <MultiSelect placeholder='Files' selected={requiredFiles} setSelected={setRequiredFiles} queries={documentTypes} />
                            </div>
                        </div>

                        <Button text='Publish' variant='primary' handleClick={handlePublish} />
                        <p style={{ color: 'red' }}>{error}</p>

                    </section>
                </div>
            )}
        </>
    );
};

export default CreateJob;
