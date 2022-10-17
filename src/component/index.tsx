import {
    React,
    Route,
    Routes,
    connect,
    Navigate,
    AuthPage,
    ProjectPage,
    DEL_USER_INFO,
    SET_USER_INFO
} from './index.mod';
import type {
    U_indexState,
    M_LocalData,
    T_LocalData_W_DP
} from './index.mod';


class Main extends React.Component<T_LocalData_W_DP,U_indexState> {

    constructor(props:T_LocalData_W_DP){
        super(props);
        var loggedin:boolean = false;
        if(props.local.token!==null){
            loggedin=true;
        }
        this.state = {
            isLogin:loggedin
        };
        this.Routers = this.Routers.bind(this);
        this.render = this.render.bind(this);
        this.reRenderCallback = this.reRenderCallback.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<T_LocalData_W_DP>, prevState: Readonly<U_indexState>, snapshot?: any): void {
        if(prevProps.local.token!==null && this.state.isLogin===false){
            this.setState({isLogin:true})
        }
        if(prevProps.local.token===null && this.state.isLogin===true){
            this.setState({isLogin:false})
        }
    }

    componentDidMount(): void {
        /**
         * setting out does this user had saved login or
         * ever login before?
         */
        
        const D_LoginInfo = localStorage.getItem('uinfo:data:login');
        const D_ParseLogin = D_LoginInfo ? JSON.parse(D_LoginInfo) : undefined;
        if (D_ParseLogin) {
            const localData: M_LocalData = {
                username: D_ParseLogin.username,
                token: D_ParseLogin.token,
                remember: D_ParseLogin.remember ? true : false,
                lang: D_ParseLogin.remember ? D_ParseLogin.remember : "EN"
            };
            if (!localData.remember) {
                /**
                 * Remove item only to make sure!
                 */
                // localStorage.removeItem("uinfo:data:login");
            } else {
                /**
                 * 
                 * if it remembered?
                 * put the data back on redux
                 * 
                 */
                this.props.setData(SET_USER_INFO,localData);
                this.setState({isLogin:true});
            };
        }
    }

    reRenderCallback = () =>{
        this.forceUpdate();
    }

    Routers() {
        let isLogin = this.state.isLogin;
        return (
            <div style={{display:'flex',minHeight:'100vh'}}>
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            isLogin?
                                <Navigate to="/project" replace />:
                                <AuthPage renderCallback={this.reRenderCallback}/>
                        } 
                    />
                    <Route
                        path="/project"
                        element={
                            isLogin?
                                <ProjectPage renderCallback={this.reRenderCallback}/>:
                                <Navigate to="/" replace />
                        }
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </div>
        )
    }

    render(): JSX.Element {
        /**
         * MAIN ELEMENT FOR BASE TEMPLATE.
         */
        return <this.Routers/>;
    }
}

const mapStateToProps = (props:T_LocalData_W_DP,ownProps:{}) => ({
    ...props
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
export default connect(mapStateToProps,dispatchers)(Main);