import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserContext} from '../auth/usercontext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import maps from '../maps2.jpg'
const All= ()=>{
    const nav = useNavigate()
    const value = useContext(UserContext)
    const {details:{name, authToken, authlevel, phone, uniqueid}}= value
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
        url: 'https://ubikes-be.pgis.org.ng/api/booking/search/'+uniqueid,
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
                    <Link to={'/book'}><FontAwesomeIcon icon={faIgloo}/></Link>
                    </div>
                    <div className="topic">
                        My bookings
                    </div>
                </div>
                <div className="maps">
                    <img src={maps} alt=""></img>
                </div>
                <div className="main2">
                    <h1>My Bookings</h1>
                    {bookings.map(({id, image, location, destination, status, created_at, vehicle,i})=>(
                        <Link to={'../status/'+id}>
                        <div key={i} className="routes">
                            <div className="sug-img">
                            {vehicle === "1" ? <img src='https://image.made-in-china.com/202f0j00uSgapPNdnJcU/Jincheng-Motorcycle-Model-Ax100-B-Street-Bike.jpg' alt="" /> : vehicle === "2" ? <img src='https://sellatease.com/public-blog/wp-content/uploads/2022/05/DLX-Pet-7783sl.png' alt="" /> : ''}
                            </div>
                            <div className="det">
                                <div className="loc">
                                    <div className="icon"><FontAwesomeIcon icon={faLocationDot} /></div>
                                    <p>From: {location}</p>
                                </div>
                                <div className="destina">
                                    <div className="icon"><FontAwesomeIcon icon={faMapLocation} /></div>
                                    <p>To: {destination}</p>
                                </div>
                                <div className="stat">
                                <span>Status: {status === '1' ? <b style={{color:'#39c3a2'}}>Accepted</b> : 'Pending'}</span>
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
export default All