import 'src/css/shared/loadingBadLogin.css'
import mobileLogo from 'src/assets/images/mobileLogo.svg'

const Loading: React.FC = () => {


    return (
        <div className="loading-screen">
            <div className="loading-animation">
                <img src={mobileLogo} alt="" className="logo" />
                <div className="loading-bar"></div>
            </div>
        </div>
    )
}

export default Loading