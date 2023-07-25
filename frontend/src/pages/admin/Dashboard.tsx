import React, { useState, useEffect } from 'react';
import 'src/css/admin/dashboard.css'
import Tooltip from 'src/components/shared/Tooltip';
import { getMonthlyData } from 'src/util/apiFunctions'
import { Link } from 'react-router-dom';
import SectionLoading from 'src/components/shared/SectionLoading';
import MonthlyStat from 'src/components/admin/DataCard'; 
import DataCard from 'src/components/admin/DataCard';

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
            console.log(data)
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

                        <DataCard data={monthlyData} />


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
                            <div className='dashboard-graph column'>
                                <Tooltip toolTipText='Traffic Source'><h4>Traffic Source</h4></Tooltip>
                                <img src="https://cdn.discordapp.com/attachments/715319623637270638/1117560252573962351/Group_56.png" />
                            </div>

                        </div>


                    </section>

                </div>
            )}
        </>
    )

}

export default Dashboard