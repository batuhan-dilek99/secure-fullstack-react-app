//import React from "react";

function verifyToken(){
    
    const token = sessionStorage.getItem('token');
    var userData;
    fetch('http://127.0.0.1:8081/verifyToken', {
        method:'GET',
        headers: {
            'jwt-token': token,
        },
    })
    .then((res) => res.json)
    .then((data) => console.log(data))
    console.log(token);
    // const [userData, setUserData] = useState({});
    // const [token, setToken] = useState('');
    // useEffect(() => {
    //     const token = sessionStorage.getItem('token')
    //     setToken(token)
    //     console.log(token);
    //     fetch('http://127.0.0.1:8081/verifyToken', {
    //         method:'GET',
    //         headers: {
    //         'jwt-token': token,
    //         },
    //     })
    //         .then((res) => res.json())
    //         .then((data) => setUserData(data))
    //     }, []);
    if(token){
        return [userData, 1];
    }
    else{
        return [null, 0];
    }
}


export default verifyToken;