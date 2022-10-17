import {
    React,
    Swal,
    withReactContent,
    postData,
    connect,
    SET_USER_INFO,
    API_AUTH
} from './auth.mod';
import type {
    U_authState,
    UL_loginResponseData,
    T_LocalData_W_DP,
    M_LocalData
} from './auth.mod';
import '../main.scss';
import './auth.scss';


class AuthPage extends React.Component<T_LocalData_W_DP, U_authState> {
    constructor(props: T_LocalData_W_DP) {
        /**
         * does have no props,
         * to make it work i will set to object.
         */
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: true,
            inputEnabled: true,
            swal: withReactContent(Swal)
        }
        this.LoginFunction = this.LoginFunction.bind(this);
        this.UsernameWrite = this.UsernameWrite.bind(this);
        this.PasswordWrite = this.PasswordWrite.bind(this);
        this.LoginFunction = this.LoginFunction.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<T_LocalData_W_DP>, prevState: Readonly<U_authState>): void {
        
    }
    /**
     * @param text 
     * username must be string!
     */
    UsernameWrite = (text: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = text.target;
        const username: string = value.toLowerCase().replace(/[^a-z0-9]/gi, '');
        this.setState({ username: username })
    }

    /**
     * @param text 
     * password must be string!
     */
    PasswordWrite = (text: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = text.target;
        this.setState({ password: value.toString() })
    }

    /**
     * finally a login button!
     */
    LoginFunction = () => {
        if (!this.state.username.length) {
            this.state.swal.fire({
                title: <p className='Swal-Text-Small'>please fill username first!</p>,
                icon: 'info',
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
            return;
        }
        if (!this.state.password.length) {
            this.state.swal.fire({
                title: <p className='Swal-Text-Small'>please fill password first!</p>,
                icon: 'info',
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
            return;
        }
        /**
         * proccess the login
         */
        const authuri: string | undefined = process.env.API_AUTH;
        postData(API_AUTH, '', {
            username: this.state.username,
            password: this.state.password,
            remember: this.state.remember
        }).then((ok: UL_loginResponseData) => {
            const successData: UL_loginResponseData = ok;
            if (!successData.success) {
                this.state.swal.fire({
                    title: <p className='Swal-Text-Small'>Login Failed!</p>,
                    icon: 'error',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                })
                return;
            } else {
                this.state.swal.fire({
                    title: <p className='Swal-Text-Small'>Login Success!</p>,
                    icon: 'success',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                })
                const localAssign:M_LocalData = {
                    username: this.state.username,
                    token: successData.data.token,
                    remember: this.state.remember,
                    lang: "EN"
                }
                try{
                    this.props.setData(SET_USER_INFO,localAssign)
                    localStorage.setItem('uinfo:data:login',JSON.stringify(localAssign));
                    this.props.renderCallback();
                }catch(e){
                    console.log(e)
                }
                return;
            }
        }).catch((err: UL_loginResponseData) => {
            this.state.swal.fire({
                title: <p className='Swal-Text-Small'>Login Failed!</p>,
                icon: 'error',
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
        })

    }

    render(): React.ReactNode {
        return (
            <div className='Main-Base Center-Base'>
                <div className='Login-Box'>
                    <div className='Logo-Root'>
                        <span className='Image-Logo'></span>
                        <p>Personal Login</p>
                    </div>
                    <div className='Input-Root'>
                        <div className='Input-Box'>
                            <span className='Image-User'></span>
                            <input
                                disabled={this.state.inputEnabled ? false : true}
                                value={this.state.username}
                                onChange={(val) => { this.UsernameWrite(val) }}
                                type='text'
                                placeholder='Username : admin'
                                className='Input-General'
                            ></input>
                        </div>
                        <div className='Input-Box'>
                            <span className='Image-Password'></span>
                            <input
                                disabled={this.state.inputEnabled ? false : true}
                                value={this.state.password}
                                onChange={(val) => { this.PasswordWrite(val) }}
                                type='password'
                                placeholder='Password : adminadmin'
                                className='Input-General'
                            ></input>
                        </div>
                    </div>
                    <div className='Login-Button-Root'>
                        <span className='Login-Button-Action' onClick={() => this.LoginFunction()}>
                            Login
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (props:T_LocalData_W_DP,ownProps:{renderCallback:any}) => ({
    ...props,
    ...ownProps
});
const dispatchers = {
    resetData:(data:M_LocalData)=>{},
    setData:(type:string,data:M_LocalData)=>{
        return {
            type:type,
            payload:data
        }
    }
}
export default connect(mapStateToProps,dispatchers)(AuthPage);