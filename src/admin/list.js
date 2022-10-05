import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserContext} from '../auth/usercontext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import maps from '../maps2.jpg'
import okada from '../okada.webp'
import keke from '../keke.png'
const List= ()=>{
    const nav = useNavigate()
    const value = useContext(UserContext)
    const {details:{name, authToken, authlevel, phone}}= value
     useEffect(() => {
        if (authToken === '') {
            nav('/');
        }
    }, [authToken])

    useEffect(()=>{
        getbooking()
    }, [])
    const getbooking = () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'https://ubikes-be.pgis.org.ng/api/booking',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            setBookings(response.data)
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });
    }
const [bookings, setBookings] = useState([])
const destroy = () => {
    localStorage.removeItem('logs')
    nav('/')
}
    return(
        <div>
            <div className="container">
                <div className="topbar">
                    <div className="icon">
                        <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
                    </div>
                    <div className="topic">
                        Student bookings
                    </div>
                </div>
                <div className="maps">
                    <img src={maps} alt=""></img>
                </div>
                <div className="main2">
                    <h1>Student Bookings</h1>
                    {bookings.map(({id, image, location, destination, status, created_at, vehicle},i)=>(
                        <Link to={'/accept/'+id}>
                            <div className="routes">
                                <div className="sug-img">
                                {vehicle === "1" ? <img src='https://image.made-in-china.com/202f0j00uSgapPNdnJcU/Jincheng-Motorcycle-Model-Ax100-B-Street-Bike.jpg' alt="" /> : vehicle === "2" ? <img src='https://sellatease.com/public-blog/wp-content/uploads/2022/05/DLX-Pet-7783sl.png' alt="" /> : ''}
                                </div>
                                <div className="det">
                                    <div className="loc">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                                        </div>
                                        <p>{location}</p>
                                    </div>
                                    <div className="destina">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faMapLocation}></FontAwesomeIcon>
                                        </div>
                                        <p>{destination}</p>
                                    </div>
                                    <div className="stat">
                                        <span>Status: {status === '0' ? <b style={{color:'#39c3a2'}}>Available</b> : 'Taken'}</span>
                                        <span>Time: {created_at.substring(11, 16)}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='float' onClick={destroy}>
                <FontAwesomeIcon icon={faSignOutAlt}/>
            </div>
        </div>
    )
}
export default List