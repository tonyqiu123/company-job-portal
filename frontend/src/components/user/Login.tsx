import { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from 'src/util/apiFunctions'
import Button from 'src/components/shared/Button'
import Input from 'src/components/shared/Input';
import { useDispatch } from 'react-redux';
import { overwriteUserJwt } from 'src/redux/jwtSlice';


const Login: React.FC = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>('')

    const dispatch = useDispatch()

    const handleLogin = async (): Promise<void> => {
        try {
            if (!email || !password) {
                setError('Please enter an email and password')
                throw new Error('Please enter your email and password');
            }
            const data = await login(email, password)
            localStorage.setItem('modernJobPortal_jwt', data.token);
            dispatch(overwriteUserJwt(data.token));
            window.location.href = '/profile';
        } catch (err: any) {
            setError(err.message)
            throw err
        }
    }

    return (
        <>
            <h3>Login to your account</h3>
            <div className='inputCont column'>
                <h6>Email</h6>
                <Input placeHolder='Enter your email' search={email} setSearch={setEmail} />
            </div>
            <div className='inputCont column'>
                <h6>Password</h6>
                <Input type='password' placeHolder='Enter your password' search={password} setSearch={setPassword} />
            </div>
            {error && <div>
                <p className='errorMsg'>{error}</p>
            </div>}
            <Button text='Login' handleClick={handleLogin} variant='primary'></Button>
            <div className='signUp-cont row'>
                <p style={{ color: 'var(--neutral-4)' }}>Don't have an account?</p>
                <Link to="/sign-up" className='column'><p style={{ color: 'var(--primary-2)' }}>Sign up</p></Link>
            </div>
        </>
    )
}

export default Login