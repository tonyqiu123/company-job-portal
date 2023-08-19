import { useState } from 'react'
import { adminLogin } from 'src/util/apiFunctions'
import Button from 'src/components/shared/Button'
import Input from '../shared/Input';

interface LoginProps {
    setAdminJwt: (jwt: string | null) => void;
}

const AdminLogin: React.FC<LoginProps> = ({ setAdminJwt }) => {

    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>('')

    const handleLogin = async (): Promise<void> => {
        try {
            if (!password) {
                setError('Please enter the password')
                throw new Error('Please enter the password');
            }
            const data = await adminLogin(password)
            localStorage.setItem('modernJobPortal_AdminJwt', data.token);
            setAdminJwt(data.token);
            window.location.href = '/admin/dashboard';
        } catch (err: any) {
            setError(err.message)
            throw err
        }
    }

    return (
        <>
            <h3>Login to an admin account</h3>
            <div className='inputCont column'>
                <h6>Password</h6>
                <Input placeHolder='Enter your password' search={password} setSearch={setPassword} />
            </div>
            {error && <div>
                <p className='errorMsg'>{error}</p>
            </div>}
            <Button text='Login' handleClick={handleLogin} variant='primary'></Button>
        </>
    )
}

export default AdminLogin