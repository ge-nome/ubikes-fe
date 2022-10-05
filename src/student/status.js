
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {UserContext} from '../auth/usercontext'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
import Iframe from 'react-iframe'
import maps from '../maps2.jpg'
import okada from '../okada.webp'
import keke from '../keke.png'

const Status= ()=>{
    const nav = useNavigate()
    const value = useContext(UserContext)
    const {details:{name, authToken, authlevel, phone}}= value
     useEffect(() => {
        if (authToken === '') {
            nav('/');
        }
    }, [authToken])
    
    const {id} = useParams()
    console.log(id)
    useEffect(()=>{
        getbooking()
    }, [])
    const getbooking = () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'https://ubikes-be.pgis.org.ng/api/booking/'+id,
        headers: { }
        };

        axios(config)
        .then(function (response) {
            setDetails(response.data)
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    const completRide = () => {
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
        'status': 2
        });
        var config = {
        method: 'put',
        url: 'https://ubikes-be.pgis.org.ng/api/booking/'+id,
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        setfinished(1)
        // setDetails(response.data)
        })
        .catch(function (error) {
        console.log(error);
        });

    }
    const [details, setDetails] = useState({})
    
    
    const [finished, setfinished] = useState(0)
    return(
        <div>
            <div className="container">
                <div className="topbar">
                    <div className="icon">
                       <Link to={'/book'}><FontAwesomeIcon icon={faIgloo} /> </Link> 
                    </div>
                    <div className="topic">
                        Ride Status
                    </div>
                </div>
                <div className="maps">
                <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.2701222973815!2d6.006135037105107!3d9.039105923753237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104966b7f2e9b195%3A0x18c8eec7a2fae37c!2sFederal%20Polytechnic%20Bida!5e0!3m2!1sen!2sng!4v1662107023865!5m2!1sen!2sng" width="500" height="800" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></Iframe>
                </div>
                <div className="main3">
                    <div className="route">
                        <div className="location">
                            <div className="icon"><FontAwesomeIcon icon={faLocationDot} /></div>
                            <p>{details.location}</p>
                        </div>
                        <div className="destination">
                            <div className="icon"><FontAwesomeIcon icon={faMapLocation} /></div>
                            <p>{details.destination}</p>
                        </div>
                    </div>
                    <div className="ride">
                        <div className="details">
                            <div className="sug-img">
                            {details.vehicle === "1" ? <img src='https://image.made-in-china.com/202f0j00uSgapPNdnJcU/Jincheng-Motorcycle-Model-Ax100-B-Street-Bike.jpg' alt="" /> : details.vehicle === "2" ? <img src='https://sellatease.com/public-blog/wp-content/uploads/2022/05/DLX-Pet-7783sl.png' alt="" /> : ''}
                            </div>
                            <div className="info">
                                Agreed Price
                                <p className="money">N{details.price}</p>
                            </div>
                        </div>
                    </div>
                    <div className="price">
                        {details.status === '1' ? <p>Accepted</p> :  <p></p>}
                    </div>
                </div>
                
                <div className="pending">
                    {details.status === '2' || finished === 1 ? <button  style={{backgroundColor:'rgb(167, 167, 167)'}}>Completed</button> : details.status === '1' ? <button onClick={completRide} style={{backgroundColor:'#1fb01f'}}>Completed?</button>  :  <button>Pending</button> }
                </div>
            </div>
        </div>
    )
}
export default Status