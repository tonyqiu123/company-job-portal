import React, { useState, useEffect } from 'react';
import 'src/css/admin/dashboard.css'
import Tooltip from 'src/components/shared/Tooltip';
import { getMonthlyData } from 'src/util/apiFunctions'
import { Link } from 'react-router-dom';
import SectionLoading from 'src/components/shared/SectionLoading';
import MonthlyStat from 'src/components/admin/MonthlyStat';

interface DashboardProps {
    adminJwt: string
}

const Dashboard: React.FC<DashboardProps> = ({ adminJwt }) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
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
                            <MonthlyStat header='Views this month' toolTipText='The total number of views received in this month.' stat={monthlyData[monthlyData.length - 1].views} prevStat={monthlyData.length > 1 ? monthlyData[monthlyData.length - 2].views : 0} />
                            <MonthlyStat header='Applications this month' toolTipText='The total number of applications received in this month.' stat={monthlyData[monthlyData.length - 1].applications} prevStat={monthlyData.length > 1 ? monthlyData[monthlyData.length - 2].applications : 0} />
                            <MonthlyStat header='Active Jobs' toolTipText='The number of currently active job listings.' stat={monthlyData[monthlyData.length - 1].activeJobs} prevStat={monthlyData.length > 1 ? monthlyData[monthlyData.length - 2].activeJobs : 0} />
                            <MonthlyStat header='Application Rate' toolTipText='The percentage of views that resulted in job applications.' stat={parseFloat((monthlyData[monthlyData.length - 1].applicationRate * 100).toFixed(2))} prevStat={monthlyData.length > 1 ? parseFloat((monthlyData[monthlyData.length - 2].applicationRate * 100).toFixed(2)) : 0} />
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

function setMonthlyData(data: any) {
    throw new Error('Function not implemented.');
}
