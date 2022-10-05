import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.png'
const Signup = () => {
    const nav = useNavigate()
    const [success, setsuccess] = useState('Sign up')
    const [clicked, setclicked] = useState(0)
    const reg = () => {
        setsuccess('Signing up')
        setclicked(1)
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify(pack);
        var config = {
        method: 'post',
        url: 'https://ubikes-be.pgis.org.ng/api/register',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            setsuccess('Successfully signed up')
            response.status === 200 ? 
                window.setTimeout(function() {
                    nav('/')
                }, 5000)
            : console.log('something went wrong')
            console.log(response.data)
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            error.message === 'Network Error' ?
            setsuccess(error.message) : setsuccess('Kindly complete the form properly')
            setclicked(1)
            console.log(error);
        });

    }
    const [pack, setpack] = useState(
        {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            phone: '' 
        }
    )
    return(
        <div>
            <div className="container">
                    <div className='children'>
                    <div className='mid'>
                        <img src={logo} alt=""/>
                        <p style={{textAlign:'center', paddingTop:'40px', paddingBottom:'40px', fontSize:'2em'}}>FPB Bikes</p>
                        <div className='form'>
                            <input type='text' placeholder='Name' onChange={(e)=>{setpack({...pack, name:e.target.value}); setsuccess('Sign up');setclicked(0)}}/>
                            <input type='text' placeholder='Email' onChange={(e)=>{setpack({...pack, email:e.target.value}); setsuccess('Sign up');setclicked(0)}}/>
                            <input type='password' placeholder='Password' onChange={(e)=>{setpack({...pack, password:e.target.value}); setsuccess('Sign up');setclicked(0)}}/>
                            <input type='password' placeholder='Confirm Password' onChange={(e)=>{setpack({...pack, password_confirmation:e.target.value}); setsuccess('Sign up');setclicked(0)}}/>
                            <input type='number' placeholder='Phone number' onChange={(e)=>{setpack({...pack, phone:e.target.value}); setsuccess('Sign up')}}/>
                            {clicked === 1 ? <button style={{backgroundColor:'grey'}}>{success}</button> : <button onClick={reg}>{success}</button>}
                            
                            <Link to="/" className='link'>Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default Signup