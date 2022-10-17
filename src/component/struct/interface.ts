interface U_indexState {
    isLogin:boolean
}

interface U_authState {
    username:string,
    password:string,
    remember:boolean,
    inputEnabled:boolean,
    swal:any
}

interface UL_loginResponseData {
    success:boolean,
    meta:{
        code:string,
        message:string
    },
    data:{
        token:string
    }
}

interface UL_projectListResponseData {
    success:boolean,
    meta:{
        code:string,
        message:string
    },
    data:{
        items:Array<US_projectListState>,
        item_count:Number,
        item_max:Number,
        page_before:Array<Number>,
        page_after:Array<Number>
    }
}

interface UL_projectListPatchData {
    success:boolean,
    meta:{
        code:string,
        message:string
    },
    data:{
        success:boolean,
    }
}

interface US_projectListState {
    id:string,
    name:string,
    type:string,
    status:string,
    createdOn:string,
    archived:boolean
}

interface U_projectState {
    username:string,
    itemLists:Array<US_projectListState>,
    remember:boolean,
    searchText:string,
    overlayContainer:{
        active:boolean,
        projectName:string,
        isArchived:boolean
    },
    swal:any
}

export type {
    U_indexState,
    U_authState,
    U_projectState,
    US_projectListState,
    UL_loginResponseData,
    UL_projectListResponseData,
    UL_projectListPatchData
};