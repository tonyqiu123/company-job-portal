import { useState } from 'react';
import { updateUser } from 'src/util/apiFunctions';
import profile from 'src/assets/images/profile.svg';
import deleteIcon from 'src/assets/images/deleteIcon.svg';
import Button from 'src/components/shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { overwriteUserData } from 'src/redux/userSlice';

interface ProfileUserModalProps {
    setShowUserModal: (show: boolean) => void;
}

interface UserData {
    firstName: string;
    lastName: string;
    location: string;
    phone: string;
    urls: string[];
}

export default function ProfileUserModal({ setShowUserModal }: ProfileUserModalProps) {

    const userData = useSelector((state: RootState) => state.user)
    const userJwt = useSelector((state: RootState) => state.jwt.userJwt)

    const [firstName, setFirstName] = useState(userData.firstName);
    const [lastName, setLastName] = useState(userData.lastName);
    const [location, setLocation] = useState(userData.location);
    const [phoneNumber, setPhoneNumber] = useState(userData.phone);
    const [url, setUrl] = useState('');
    const [listOfUrls, setListOfUrls] = useState(userData.urls);
    const [error, setError] = useState('');

    const dispatch = useDispatch()

    const addUrl = () => {
        if (listOfUrls?.length === 5) {
            setError("Reached the maximum of 5 URLs");
            return;
        }
        if (listOfUrls?.includes(url)) {
            setError("Duplicate URL");
            return;
        }
        if (!/^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(url)) {
            setError("Not a valid URL");
            return;
        }
        setListOfUrls(prevList => {
            if (prevList) {
                return [...prevList, url];
            } else {
                return [url];
            }
        });
        setError('');
        setUrl('');
    };


    const updateExperience = async () => {
        try {
            if (!firstName || !lastName || !location || !phoneNumber) {
                setError('Please fill in all required fields.');
                throw new Error('');
            }
            const updatedUserData: UserData = {
                ...userData,
                firstName,
                lastName,
                location,
                urls: listOfUrls || [],
                phone: phoneNumber,
            };
            if (userJwt) {
                await updateUser(userJwt, updatedUserData);
            }
            dispatch(overwriteUserData(updatedUserData));
            setShowUserModal(false);
        } catch (err) {
            setError('Failed to update user');
            throw err;
        }
    };


    return (
        <div className="modalContainer">
            <div className="modalDarkBackground" onClick={() => setShowUserModal(false)}></div>
            <div className="modalCard profileModalContainer column">
                <div className='profileModalContainer-title row' style={{ gap: '16px', justifyContent: 'flex-start' }}>
                    <img src={profile} alt="Experience Icon" />
                    <h3>Edit Profile</h3>
                </div>

                <div className='profileModalInformationGrid'>
                    <div className='column'>
                        <p>First Name</p>
                        <input type="text" placeholder='First Name' value={firstName ? firstName : userData.firstName}
                            onChange={event => setFirstName(event.target.value)} />
                    </div>
                    <div className='column'>
                        <p>Last Name</p>
                        <input type="text" placeholder='Last Name' value={lastName ? lastName : userData.lastName}
                            onChange={event => setLastName(event.target.value)} />
                    </div>
                    <div className='column'>
                        <p>Location</p>
                        <input type="text" placeholder='Location' value={location ? location : userData.location}
                            onChange={event => setLocation(event.target.value)} />
                    </div>
                    <div className='column'>
                        <p>Phone Number</p>
                        <input type="text" placeholder='Phone Number' value={phoneNumber ? phoneNumber : userData.phone}
                            onChange={event => setPhoneNumber(event.target.value)} />
                    </div>
                </div>

                <div className='profileModalInformationGrid'>
                    <div className='userModal-url column'>
                        <p>Add URL</p>
                        <div className='row'>
                            <input type="text" placeholder='URL' value={url}
                                onChange={event => setUrl(event.target.value)} />
                            <a onClick={() => addUrl()}><p>Add</p></a>
                        </div>
                        {listOfUrls?.map((url, index) => (
                            <div className='row userModal-url-row' key={index}>
                                <img className='deleteIcon' src={deleteIcon} alt="Delete URL"
                                    onClick={() => {
                                        const updatedUrls = listOfUrls.filter(u => u !== url);
                                        setListOfUrls(updatedUrls);
                                    }} />
                                <p>{url}</p>
                            </div>
                        ))}
                        {error && (
                            <p className='errorMsg row' style={{ marginTop: '12px' }}>{error}</p>
                        )}
                    </div>
                </div>

                <div className="profileModalBtnContainer row">
                    <Button text='Cancel' variant='outline' handleClick={async () => setShowUserModal(false)}></Button>
                    <Button text='Save' variant='primary' handleClick={updateExperience}></Button>
                </div>
            </div>
        </div>
    );
}