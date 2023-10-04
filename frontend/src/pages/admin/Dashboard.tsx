import React, { useState, useEffect } from 'react';
import 'src/css/admin/dashboard.css'
import Tooltip from 'src/components/shared/Tooltip';
import { getMonthlyData } from 'src/util/apiFunctions'
import { Link } from 'react-router-dom';
import SectionLoading from 'src/components/shared/SectionLoading';
// import MonthlyStat from 'src/components/admin/DataCard'; 
import DataCard from 'src/components/admin/DataCard';
import SimpleLineChart from 'src/components/admin/SimpleLineChart';
import { io } from 'socket.io-client';
import { Tabs, TabsContent, TabsTrigger } from 'src/components/shared/Tabs';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';


const Dashboard: React.FC = () => {

    const adminJwt = useSelector((state: RootState) => state.jwt.adminJwt)

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [monthlyData, setMonthlyData] = useState<any[]>([{}])
    const [recentApplications, setRecentApplications] = useState<any[]>([])
    const [socketConnection, setSocketConnection] = useState<any>(null);

    const fetchMonthlyData = async (): Promise<void> => {
        try {
            const data = await getMonthlyData()
            setMonthlyData(data)
            setIsLoading(false)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchMonthlyData()
    }, [])

    useEffect(() => {
        if (!socketConnection) {
            // const socket = io('http://localhost:5000', { transports: ["websocket"] });
            const socket = io('https://company-job-portal-production.up.railway.app', { transports: ["websocket"] });
            socket.on('message', (data) => {
                setRecentApplications(prev => [data, ...prev])
                // Handle the data received from the server here
            });

            setSocketConnection(socket);
        }

        // Clean up the socket connection when the component unmounts
        return () => {
            if (socketConnection) {
                socketConnection.disconnect();
            }
        };
    }, [socketConnection]);



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

                        <div className='row' style={{ alignItems: 'flex-start', gap: '20px' }}>

                            <div style={{ width: '100%' }} className='dashboard-recentStats column'>

                                <Tabs darkMode={false}>
                                    <TabsTrigger value='Applications'><p>Applications</p></TabsTrigger>
                                    <TabsTrigger value='Application Rate'><p>Application Rate</p></TabsTrigger>
                                    <TabsTrigger value='Jobs Posted'><p>Jobs Posted</p></TabsTrigger>
                                    <TabsTrigger value='Signups'><p>Signups</p></TabsTrigger>
                                    <TabsTrigger value='Views'><p>Views</p></TabsTrigger>
                                    <TabsContent value='Applications'>
                                        <div className='dashboard-graph column'>
                                            <Tooltip toolTipText='Number of applications'><h4>Number of Applications</h4></Tooltip>
                                            <SimpleLineChart data={monthlyData} yAxis='applications' />
                                        </div>
                                    </TabsContent>
                                    <TabsContent value='Application Rate'>
                                        <div className='dashboard-graph column'>
                                            <Tooltip toolTipText='Views divided by applications'><h4>Application Rate</h4></Tooltip>
                                            <SimpleLineChart data={monthlyData} yAxis='applicationRate' />
                                        </div>
                                    </TabsContent>
                                    <TabsContent value='Jobs Posted'>
                                        <div className='dashboard-graph column'>
                                            <Tooltip toolTipText='Jobs posted this month'><h4>Jobs Posted</h4></Tooltip>
                                            <SimpleLineChart data={monthlyData} yAxis='jobsPosted' />
                                        </div>
                                    </TabsContent>
                                    <TabsContent value='Signups'>
                                        <div className='dashboard-graph column'>
                                            <Tooltip toolTipText='Signups this month'><h4>Signups</h4></Tooltip>
                                            <SimpleLineChart data={monthlyData} yAxis='signups' />
                                        </div>
                                    </TabsContent>
                                    <TabsContent value='Views'>
                                        <div className='dashboard-graph column'>
                                            <Tooltip toolTipText='Views this month'><h4>Views</h4></Tooltip>
                                            <SimpleLineChart data={monthlyData} yAxis='views' />
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>

                            <div className='dashboard-recentStats column'>
                                <Tooltip toolTipText='Recent Applications'><h4>Recent Applications</h4></Tooltip>
                                <div className='hr' style={{ margin: '8px 0' }}></div>
                                {recentApplications.map((app, index) => {
                                    return (
                                        <p key={index} style={{ margin: '8px 0' }}>{app.email} {app.action} {app.jobTitle}</p>
                                    )
                                })}
                                <p style={{ margin: '-4px 0' }}> </p>
                            </div>
                        </div>

                    </section>

                </div>
            )}
        </>
    )

}

export default Dashboard