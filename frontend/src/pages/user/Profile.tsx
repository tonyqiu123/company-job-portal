import React, { useState } from 'react';
import 'src/css/user/profile.css';
import locationIcon from 'src/assets/images/locationIcon.svg';
import emailIcon from 'src/assets/images/emailIcon.svg';
import phoneIcon from 'src/assets/images/phoneIcon.svg';
import editIcon from 'src/assets/images/editIcon.svg';
import ProfileAttachmentModal from 'src/components/user/userProfileModals/ProfileAttachmentModal';
import ProfileUserModal from 'src/components/user/userProfileModals/ProfileUserModal';
import { UserInterface } from 'src/util/interfaces';

interface ProfileProps {
    storedJwt: string | null
    userData:  UserInterface
    setUserData: (userData: UserInterface) => void
}

const Profile: React.FC<ProfileProps> = ({ storedJwt, userData, setUserData }) => {

    const [showAttachmentModal, setShowAttachmentModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);

    return (
        <>
            {showAttachmentModal && <ProfileAttachmentModal storedJwt={storedJwt} userData={userData} setShowAttachmentModal={setShowAttachmentModal} setUserData={setUserData} />}
            {showUserModal && <ProfileUserModal storedJwt={storedJwt} userData={userData} setShowUserModal={setShowUserModal} setUserData={setUserData} />}
            <div className='body'>
                <div className='dashboardTitle column'>
                    <h2>Profile</h2>
                </div>
                <div className='hr'></div>
                {userData && (
                    <section className='column profile'>
                        <div className='profileCard contacts column'>
                            <img className='edit' src={editIcon} onClick={() => setShowUserModal(true)} />
                            <h3>{userData.firstName} {userData.lastName}</h3>
                            <div className='hr'></div>
                            <div className='row'>
                                <img src={emailIcon} />
                                <p>{userData.email}</p>
                            </div>
                            <div className='row'>
                                <img src={phoneIcon} />
                                <p>{userData.phone === '' ? 'None' : userData.phone}</p>
                            </div>
                            <div className='row'>
                                <img src={locationIcon} />
                                <p>{userData.location === '' ? 'None' : userData.location}</p>
                            </div>
                            <div className='hr'></div>
                            {userData.urls.length === 0 && <p>No URLs added</p>}
                            {userData.urls.map((url, index) => (
                                <a key={index} href={url} target="_blank"><p>{url}</p></a>
                            ))}
                        </div>

                        <div className='profileCard attachments column'>
                            <img className='edit' src={editIcon} onClick={() => {
                                setShowAttachmentModal(true);
                            }} />
                            <h3>Attachments</h3>
                            <div className='hr'></div>
                            {userData.attachments.length === 0 && <p>No attachments added</p>}
                            {userData.attachments.map((attachment, index) => (
                                <a key={index}><p>{attachment.fileType}</p></a>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}

export default Profile