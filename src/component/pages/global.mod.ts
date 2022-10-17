
async function postData(url: string = '', token:string='', data: object = {}, method:string='POST') {
    var headers = {
        'Content-Type': 'application/json'
    }
    if(token!==''){
        headers={...headers,...{
            'Authorization':token
        }}
    }
    const response = await fetch(url, {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

async function getData(url: string = '', token:string|null='', data: object = {}) {
    var headers = {}
    if(token!==''){
        headers={...headers,...{
            'Authorization':token
        }}
    }
    const response = await fetch(url,{
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
    return response.json();
}

export {
    postData,
    getData
}