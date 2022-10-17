import {
    React,
    Swal,
    connect,
    withReactContent,
    DEL_USER_INFO,
    getData,
    postData,
    MONTH_LIST
} from './project.mod';
import type {
    US_projectListState,
    U_projectState,
    T_LocalData_W_DP,
    M_LocalData,
    UL_projectListResponseData,
    UL_projectListPatchData
} from './project.mod';
import '../main.scss';
import './project.scss';


const sample:Array<US_projectListState> = [];

class ProjectPage extends React.Component<T_LocalData_W_DP, U_projectState> {
    constructor(props:T_LocalData_W_DP) {
        super(props);
        this.state = {
            username: this.props.local.username ? this.props.local.username : "Guests",
            itemLists: sample,
            remember: this.props.local.remember,
            overlayContainer:{
                active:false,
                projectName:"",
                isArchived:false
            },
            searchText:'',
            swal: withReactContent(Swal)
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.ToggleManageArchive = this.ToggleManageArchive.bind(this);
        this.ListProjectItem = this.ListProjectItem.bind(this);
        this.LoadListProject = this.LoadListProject.bind(this);
        this.Logout = this.Logout.bind(this);
    }

    /**
     * @mount
     * 
     * mounting essential data
     * 
     */
    componentDidMount(): void {
        this.LoadListProject()
    }

    componentDidUpdate(prevProps: Readonly<T_LocalData_W_DP>, prevState: Readonly<U_projectState>, snapshot?: any): void {}

    /**
     * 
     * some function to manage the projects
     * 
     */
    SearchListProduct = (search:React.ChangeEvent<HTMLInputElement>) =>{
        const {value} = search.target;
        this.setState({searchText:value.toString()});
        this.LoadListProject(value.toString())
    }

    LoadListProject = (search:string='',sortDate:string="dsc") =>{
        const searchParams = new URLSearchParams();
        searchParams.append('search',search);
        searchParams.append('sortDate',sortDate);
        getData('http://localhost:8080/project.list?'+searchParams,this.props.local.token,{}).then((ok:UL_projectListResponseData)=>{
            console.log(ok)
            this.setState({itemLists:ok.data.items,searchText:search});
        }).catch((e:any)=>{});
    }
    
    ToggleManageArchive = (projectId:string,isArchived:boolean) => {
        const authorization:string|null = this.props.local.token;
        const payload = {
            projectId:projectId,
            archived:isArchived
        }
        console.log(payload)
        if(authorization){
            postData('http://localhost:8080/project.data',authorization,payload,'PATCH').then((e:UL_projectListPatchData)=>{
                console.log(e)
                if(e.success){
                    const updateField = this.state.itemLists.map((itm:US_projectListState)=>{
                        if(itm.id===projectId){
                            return {...itm,archived:isArchived}
                        }else{
                            return itm;
                        }
                        
                    })
                    console.log(updateField)
                    this.setState({itemLists:updateField})
                }
            }).catch((e:any)=>{
                console.log(e);
            })
        }
    }

    Logout = () =>{
        const defdata:M_LocalData = {
            username: null,
            token: null,
            remember: false,
            lang: 'EN'
        }
        const loggingOut:Promise<boolean> = new Promise((resolve, reject)=>{
            this.props.resetData(DEL_USER_INFO,defdata);
            localStorage.removeItem("uinfo:data:login");
            resolve(true);
        })
        loggingOut.then((e:boolean)=>{
            this.props.renderCallback();
        }).catch();
    }

    /**
     * 
     * @returns JSX.Element 
     * 
     * can be put into another component file
     * but for simplicity, i let this function
     * stay here.
     * 
     */
    ListProjectItem = () => {
        const dataList = this.state.itemLists;
        /**
         * 
         * this supose to be not like this
         * but for make it quick,
         * this works too!
         * 
         */
        const iconMap:any = {
            "INCOMPLETE":<div className="Icon-Incomplete"></div>,
            "SHOOTING"  :<div className="Icon-Shooting"></div>,
            "COMPLETED" :<div className="Icon-Completed"></div>,
            "FEEDBACK"  :<div className="Icon-FeedBack"></div>,
            "EDITING"   :<div className="Icon-Editing"></div>,
            "DEFAULT"   :<div className="Icon-Default"></div>
        }
        function TableHead(){
            return (
                <div className='Mapped-Title' key="head">
                    <div className='Position'>Name</div>
                    <div className='Position'>Type</div>
                    <div className='Position'>Status</div>
                    <div className='Position Max120'>Created</div>
                    <div className='Position Max120'>Manage</div>
                </div>
            )
        }
        if (dataList.length) {
            return (
                <div className='Container-Mapped'>
                    <TableHead/>
                    {dataList.map((value: US_projectListState, index: number) => {
                        var valueStatus:string = value.status;
                        const date = new Date(value.createdOn);
                        const dateDrawer:string = `${MONTH_LIST[date.getMonth()]} ${date.getDate()},${date.getFullYear()}` 
                        return (
                            <div className='Mapped-Items' key={value.id}>
                                {value.archived?
                                    <div className='Archive'></div>
                                    :
                                    <div></div>
                                }
                                <div className='Position'>{value.name}</div>
                                <div className='Position'>{value.type}</div>
                                <div className='Position2'>
                                    <div className='Flex1'>
                                        {iconMap[valueStatus]?iconMap[value.status]:iconMap["DEFAULT"]}
                                    </div>
                                    <div className='Flex2'>
                                    {value.status}
                                    </div>
                                </div>
                                <div className='Position Max120'>{dateDrawer}</div>
                                <div className='Position-Manage Max120'>
                                    {value.archived?
                                        <span className='Button-Unarchive' onClick={()=>{this.ToggleManageArchive(value.id,value.archived?false:true)}}></span>
                                        :
                                        <span className='Button-Archive' onClick={()=>{this.ToggleManageArchive(value.id,value.archived?false:true)}}></span>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            /**
             * 
             * again this can be put into other folder
             * just to make it simple i put it here.
             * 
             */
            return (
                <div className='Container-Mapped'>
                    <TableHead/>
                    <div className='centerItem'>
                        No Data
                    </div>
                </div>
            )
        }
    }

    render(): React.ReactNode {
        return (
            <div className='Main-Base'>
                <div className='Main-Container'>
                    <div className='Item-Container'>
                        <div className='Container-Title'>
                            <div className='Title'>
                                <h2>
                                    <strong>Hello</strong>&ensp;
                                    <span className='Title-Name'>{this.state.username}</span>    
                                </h2>
                                <p>Here are the list of project you submitted</p>
                            </div>
                            <div className='Manage'>
                                <div className='Logout-Button-Root' onClick={()=>{this.Logout()}}>
                                    <span className='Button-Action'>
                                        Logout
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='Container'>
                            <div className='Container-Header'>
                                <div className='Sub-Title'>
                                    <h2>Recent Projects</h2>
                                </div>
                                <div className='Sub-Search'>
                                    <input 
                                        placeholder='Find something'
                                        value={this.state.searchText}
                                        onChange={(val)=>{this.SearchListProduct(val)}}
                                    ></input>
                                </div>
                                <div className='Sub-Sort'>
                                    <div className="dropdown">
                                        <button className="dropbtn">Sort By</button>
                                        <div className="dropdown-content">
                                            <a href="#" onClick={()=>this.LoadListProject(this.state.searchText,"asc")}>Oldest</a>
                                            <a href="#" onClick={()=>this.LoadListProject(this.state.searchText,"dsc")}>Newest</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <this.ListProjectItem />
                        </div>
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
    resetData:(type:string,data:M_LocalData)=>{
        return {
            type:type,
            payload:data
        }
    },
    setData:(type:string,data:M_LocalData)=>{
        return {
            type:type,
            payload:data
        }
    }
}
export default connect(mapStateToProps,dispatchers)(ProjectPage);