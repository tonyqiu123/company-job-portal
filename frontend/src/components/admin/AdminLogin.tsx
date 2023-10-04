import { useState } from 'react'
import { adminLogin } from 'src/util/apiFunctions'
import Button from 'src/components/shared/Button'
import Input from '../shared/Input';
import { useDispatch } from 'react-redux';
import { overwriteAdminJwt } from 'src/redux/jwtSlice';


const AdminLogin: React.FC = () => {

    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>('')

    const dispatch = useDispatch()

    const handleLogin = async (): Promise<void> => {
        try {
            if (!password) {
                setError('Please enter the password')
                throw new Error('Please enter the password');
            }
            const data = await adminLogin(password)
            localStorage.setItem('modernJobPortal_AdminJwt', data.token);
            dispatch(overwriteAdminJwt(data.token));
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
                <h6>Password ("abc123")</h6>
                <Input type='password' placeHolder='Enter your password' search={password} setSearch={setPassword} />
            </div>
            {error && <div>
                <p className='errorMsg'>{error}</p>
            </div>}
            <Button text='Login' handleClick={handleLogin} variant='primary'></Button>
        </>
    )
}

export default AdminLogin