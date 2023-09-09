import { useState, ChangeEvent, DragEvent } from 'react';
import fileIcon from 'src/assets/images/fileIcon.svg';
import { uploadFile, updateUser } from 'src/util/apiFunctions.js';
import Button from 'src/components/shared/Button';

interface Attachment {
    _id: string;
    fileType: string;
}

interface ProfileAttachmentModalProps {
    userJwt: string;
    userData: any;
    setShowAttachmentModal: (show: boolean) => void;
    setUserData: (data: any) => void;
}

export default function ProfileAttachmentModal({
    userJwt,
    userData,
    setShowAttachmentModal,
    setUserData,
}: ProfileAttachmentModalProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileType, setFileType] = useState('Resume');
    const [error, setError] = useState('');

    const handleDragEnter = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        }
    };

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        }
    };

    const updateAttachment = async () => {
        try {
            if (!selectedFile || !fileType) {
                setError('Please select a file');
                throw new Error('');
            }
            const fileId = await uploadFile(userJwt, selectedFile);
            const updatedUserData = { ...userData };
            updatedUserData.attachments.push({
                _id: fileId.fileName,
                fileType,
            } as Attachment);
            await updateUser(userJwt, updatedUserData);
            setUserData(updatedUserData);
            setShowAttachmentModal(false);
        } catch (err) {
            throw err;
        }
    };

    return (
        <div className="modalContainer">
            <div className="modalDarkBackground" onClick={() => setShowAttachmentModal(false)}></div>
            <div className="modalCard profileModalContainer column">
                <div className="profileModalContainer-title row" style={{ gap: '16px', justifyContent: 'flex-start' }}>
                    <img alt="Education Icon" src={fileIcon} />
                    <h3>Add Attachment</h3>
                </div>

                <div className="column">
                    <p>Attachment Type</p>
                    <div className="searchJobs-relative dropDown">
                        <select
                            value={fileType}
                            onChange={(event) => setFileType(event.target.value)}
                        >
                            <option value="Resume">Resume</option>
                            <option value="Cover Letter">Cover Letter</option>
                            <option value="References">References</option>
                            <option value="Portfolio">Portfolio</option>
                            <option value="Certificates">Certificates</option>
                        </select>
                    </div>
                </div>

                <label
                    className={`dragAndDrop column ${isDragging && "draggingStyle"}`}
                    htmlFor="fileInput"
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <h6>Drag and drop a PDF file here</h6>
                    <p>or</p>
                    <h6>Click to browse</h6>
                    <input
                        id="fileInput"
                        type="file"
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        onChange={handleFileSelect}
                    />
                    {selectedFile && <p>Selected file: {selectedFile.name}</p>}
                </label>

                {error && (
                    <div>
                        <p className="errorMsg">{error}</p>
                    </div>
                )}

                <div className="profileModalBtnContainer row">
                    <Button
                        text="Cancel"
                        variant='outline'
                        handleClick={async () => setShowAttachmentModal(false)}
                    />
                    <Button
                        text="Update"
                        variant='primary'
                        handleClick={updateAttachment}
                    ></Button>
                </div>
            </div>
        </div>
    );
}