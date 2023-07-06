import React, { useState, useEffect } from 'react';
import 'src/css/admin/dashboard.css'
import Tooltip from 'src/components/shared/Tooltip';
import { Link } from 'react-router-dom';
import SectionLoading from 'src/components/shared/SectionLoading';

interface DashboardProps {
    adminJwt: string
}

const Dashboard: React.FC<DashboardProps> = ({ adminJwt }) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(false)
    }, [])

    return (
        <>
            <div className={`sectionLoading column ${!isLoading && 'skele-exit'}`}>
                <SectionLoading />
            </div>
            {!isLoading && adminJwt && (
                <div className='body contentLoaded'>
                    <div className='dashboardTitle row'>
                        <Link to="/admin/dashboard"><h2>Dashboard</h2></Link>
                    </div>
                    <div className='hr'></div>
                    <section className='dashboard column'>

                        <div className='dashboard-overviewStats row'>
                            <div className='dashboard-overviewStat column'>
                                <Tooltip toolTipText='Total Users'><h6>Total Site Visits</h6></Tooltip>
                                <h2>+43,231</h2>
                                <p>+20.1% from last month</p>
                            </div>
                            <div className='dashboard-overviewStat column'>
                                <Tooltip toolTipText='Total Users'><h6>Monthly Active Users</h6></Tooltip>
                                <h2>43,231</h2>
                                <p>+20.1% from last month</p>
                            </div>
                            <div className='dashboard-overviewStat column'>
                                <Tooltip toolTipText='Total Users'><h6>Total Job Applications</h6></Tooltip>
                                <h2>+43,231</h2>
                                <p>+20.1% from last month</p>
                            </div>
                            <div className='dashboard-overviewStat column'>
                                <Tooltip toolTipText='Total Users'><h6>Total User Signups</h6></Tooltip>
                                <h2>+43,231</h2>
                                <p>+20.1% from last month</p>
                            </div>
                            <div className='dashboard-overviewStat column'>
                                <Tooltip toolTipText='Total applications: 2000'><h6>Active Job Postings</h6></Tooltip>
                                <h2>+162</h2>
                                <p>+2.1% from last month</p>
                            </div>
                            <div className='dashboard-overviewStat column'>
                                <Tooltip toolTipText='Total applications: 2000'><h6>Average Time to Fill a Job</h6></Tooltip>
                                <h2>+162</h2>
                                <p>+2.1% from last month</p>
                            </div>
                            <div className='dashboard-overviewStat column'>
                                <Tooltip toolTipText='Total applications: 2000'><h6>Active Job Postings</h6></Tooltip>
                                <h2>+162</h2>
                                <p>+2.1% from last month</p>
                            </div>
                            <div className='dashboard-overviewStat column'>
                                <Tooltip toolTipText='Total applications: 2000'><h6>Average Time to Fill a Job</h6></Tooltip>
                                <h2>+162</h2>
                                <p>+2.1% from last month</p>
                            </div>
                        </div>

                        <div className='dashboard-below row'>

                            <div className='dashboard-graphs column'>
                                <div className='dashboard-graph column'>
                                    <Tooltip toolTipText='Traffic Source'><h4>Traffic Source</h4></Tooltip>
                                    <img src="https://cdn.discordapp.com/attachments/715319623637270638/1117560252573962351/Group_56.png" />
                                </div>
                                <div className='dashboard-graph column'>
                                    <Tooltip toolTipText='Traffic Source'><h4>Traffic Source</h4></Tooltip>
                                    <img src="https://cdn.discordapp.com/attachments/715319623637270638/1117560252573962351/Group_56.png" />
                                </div>
                                <div className='dashboard-graph column'>
                                    <Tooltip toolTipText='Traffic Source'><h4>Traffic Source</h4></Tooltip>
                                    <img src="https://cdn.discordapp.com/attachments/715319623637270638/1117560252573962351/Group_56.png" />
                                </div>

                            </div>

                            <div className='dashboard-recentStats column'>
                                <Tooltip toolTipText='Recent Applications'><h4>Recent Applications</h4></Tooltip>
                                <p>You have 256 job applications this month.</p>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <img src="https://ui.shadcn.com/avatars/01.png" />
                                    <div className='column'>
                                        <p>Olivia Martin applied for Software Developer</p>
                                        <p>olivia.martin@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </section>

                </div>
            )}
        </>
    )

}

export default Dashboard