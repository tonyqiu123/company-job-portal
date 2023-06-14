import 'src/css/user/profile.css';
import { useEffect, useState } from 'react'
import fileIcon from 'src/assets/images/fileIcon.svg'
import { uploadFile, updateUser } from 'src/util/apiFunctions.js'
import Button from 'src/components/shared/Button'

export default function ProfileAttachmentModal({ storedJwt, userData, setShowAttachmentModal, setUserData }) {

    const [isDragging, setIsDragging] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileType, setFileType] = useState('Resume')
    const [error, setError] = useState('')

    const handleDragEnter = (event) => {
        event.preventDefault()
        setIsDragging(true)
    }
    const handleDragOver = (event) => {
        event.preventDefault()
    }
    const handleDragLeave = () => {
        setIsDragging(false)
    }
    const handleDrop = (event) => {
        event.preventDefault()
        setIsDragging(false)

        const file = event.dataTransfer.files[0]
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file)
        } 
    }

    const handleFileSelect = (event) => {
        const file = event.target.files[0] 
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file)
        }
    }

    const updateAttachment = () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!selectedFile || !fileType) {
                    setError('Please select a file and file name')
                    throw new Error('');
                }
                const fileId = await uploadFile(storedJwt, selectedFile);
                const updatedUserData = { ...userData };
                updatedUserData.attachments.push({
                    _id: fileId.fileType,
                    fileType
                });
                await updateUser(storedJwt, updatedUserData);
                setUserData(updatedUserData);
                setShowAttachmentModal(false);
                resolve();
            } catch (error) {
                reject();
            }
        });
    };



    return (
        <div className='modalContainer'>
            <div className="modalDarkBackground" onClick={() => setShowAttachmentModal(false)}></div>
            <div className="modalCard profileModalContainer column">
                <div className="profileModalContainer-title row" style={{ gap: '16px', justifyContent: 'flex-start' }}>
                    <img alt="Education Icon" src={fileIcon} />
                    <h3>Add Attachment</h3>
                </div>

                <div className="column">
                    <p>Attachment Type</p>
                    <div className='searchJobs-relative dropDown'>
                        <select value={fileType}
                            onChange={event => setFileType(event.target.value)}>
                            <option value='Resume'>Resume</option>
                            <option value='Cover Letter'>Cover Letter</option>
                            <option value='References'>References</option>
                            <option value='Portfolio'>Portfolio</option>
                            <option value='Certificates'>Certificates</option>
                        </select>
                    </div>
                </div>

                <label
                    className={`dragAndDrop column ${isDragging && "draggingStyle"}`}
                    htmlFor="fileInput"
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}>
                    <h6>Drag and drop a PDF file here</h6>
                    <p>or</p>
                    <h6>Click to browse</h6>
                    <input
                        id="fileInput"
                        type="file"
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        onChange={handleFileSelect} />
                    {selectedFile && <p>Selected file: {selectedFile.name}</p>}
                </label>

                {error && <div>
                    <p className='errorMsg'>{error}</p>
                </div>}

                <div className="profileModalBtnContainer row">
                    <button onClick={() => setShowAttachmentModal(false)}><p>Cancel</p></button>
                    <Button text='Update' primary={true} handleClick={updateAttachment}></Button>
                </div>
            </div>
        </div>
    )
}