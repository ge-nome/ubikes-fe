import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {UserContext} from '../auth/usercontext'
import logo from '../logo.png'
const Signin = () => {
    const [success, setsuccess] = useState('Sign in')
    const [clicked, setclicked] = useState(0)
    const nav = new useNavigate()
    const {setDetails} = useContext(UserContext)
    useEffect(() => {
        // localStorage.setItem('logs', JSON.stringify(details))
        const truth = localStorage.getItem('logs');
        if(truth){
            const kept = JSON.parse(localStorage.getItem('logs'))
            const {credentials:{name, uniqueid, phone, level}} = kept
            const{ token } = kept
            console.log(name)
            console.log(token)
            setDetails({
                name:name,
                authToken:token,
                phone: phone,
                uniqueid: uniqueid,
                authlevel: level
            })
            if(level === '2'){
                nav('/book')
            }
            else{
                nav('/list')
            }
        }
    }, [])
    const log =  () => {
        setsuccess('Signing in')
        setclicked(1)
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify(pack);
        var config = {
        method: 'post',
        url: 'https://ubikes-be.pgis.org.ng/api/login',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            
            const {name, uniqueid, phone, level} = response.data.credentials
            const { token} = response.data
            setDetails({
                    name:name,
                    authToken:token,
                    phone: phone,
                    uniqueid: uniqueid,
                    authlevel: level
                })
            localStorage.setItem('logs', JSON.stringify(response.data))
            console.log(JSON.stringify(response.data));
                if(level === '2'){
                    nav('/book')
                }
                else{
                    nav('/list')
                }
        })
        .catch(function (error) {
            error.message === 'Network Error' ?
            setsuccess(error.message) : setsuccess('Invalid username or password')
            setclicked(1)
        console.log(error);
        });
    }
    const [pack, setpack] = useState({
        'email': '',
        'password': '' 
    })
    return(
        <div>
            <div className="container">
                    <div className='children'>
                    <div className='mid'>
                        <img src={logo} alt=""/>
                        <p style={{textAlign:'center', paddingTop:'40px', paddingBottom:'40px', fontSize:'2em'}}>FPB Bikes</p>
                        <div className='form'>
                            <input type='text' placeholder='Email' onChange={(e)=>{setpack({...pack, email:e.target.value}); setsuccess('Sign in');setclicked(0)}}/>
                            <input type='password' placeholder='Password' onChange={(e)=>{setpack({...pack, password:e.target.value}); setsuccess('Sign in');setclicked(0)}}/>
                            {clicked === 1 ? <button style={{backgroundColor:'grey'}}>{success}</button> : <button onClick={log} style={{backgroundColor:'rgb(42, 183, 117)'}}>{success}</button>}
                            <Link to="/signup" className='link' style={{color:'rgb(42, 183, 117)'}}>Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default Signin