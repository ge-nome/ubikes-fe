import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserContext} from '../auth/usercontext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import Iframe from 'react-iframe'
import maps from '../maps2.jpg'
import okada from '../okada.webp'
import keke from '../keke.png'

//maps
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'
const Book= ()=>{
    const nav = useNavigate()
    const value = useContext(UserContext)
    const {details:{name, authToken, authlevel, phone, uniqueid}}= value
     useEffect(() => {
        if (authToken === '') {
            nav('/');
        }
    }, [authToken])
    
    const [send, setSend] = useState({
        name:name,
        uniqueid:uniqueid,
        phone:phone,
        location:'',
        destination:'',
        price:'',
        vehicle:'',
        status:0
    })
    const [location, setLocation] = useState([
        {
            id:1,
            point:'Ramatu Dangana'
        },
        {
            id:2,
            point:'Poly Junction'
        },
        {
            id:3,
            point:'Library'
        },
        {
            id:4,
            point:'NCC'
        },
        {
            id:5,
            point:'Lecture Theatre'
        },
        {
            id:6,
            point:'Small Gate'
        },
        {
            id:7,
            point:'Big gate'
        },
        {
            id:8,
            point:'Marketing Department'
        },
        {
            id:9,
            point:'Mechanical'
        },
        {
            id:10,
            point:'OTM'
        },
        {
            id:11,
            point:'Nicon'
        },
        {
            id:12,
            point:'Sheraton'
        }, 
        {
            id:13,
            point:'FPB Hostel Mosque'
        }, 
        {
            id:14,
            point:'Entrepreneurship Center'
        }, 
        {
            id:15,
            point:'Surveying and Geoinformatics lecture hall'
        }, 
        {
            id:16,
            point:'Hostel H'
        }, 
        {
            id:17,
            point:'Foursquare gospel church'
        },
        {
            id:18,
            point:'Polytechnic mosque'
        },
        {
            id:19,
            point:'Federal Polytechnic Auditorium'
        },
        {
            id:20,
            point:'Chapel of Glory'
        },
        {
            id:21,
            point:'Federal Poly Staff School'
        },
        {
            id:22,
            point:'Federal Polytechnic Asup Hall'
        },
        {
            id:23,
            point:'Computer Science Department'
        }
    ])
    const [destination, setDestination] = useState([
        {
            id:1,
            point:'Ramatu Dangana'
        },
        {
            id:2,
            point:'Poly Junction'
        },
        {
            id:3,
            point:'Library'
        },
        {
            id:4,
            point:'NCC'
        },
        {
            id:5,
            point:'Lecture Theatre'
        },
        {
            id:6,
            point:'Small Gate'
        },
        {
            id:7,
            point:'Big gate'
        },
        {
            id:8,
            point:'Marketing Department'
        },
        {
            id:9,
            point:'Mechanical'
        },
        {
            id:10,
            point:'OTM'
        },
        {
            id:11,
            point:'Nicon'
        },
        {
            id:12,
            point:'Sheraton'
        }, 
        {
            id:13,
            point:'FPB Hostel Mosque'
        }, 
        {
            id:14,
            point:'Entrepreneurship Center'
        }, 
        {
            id:15,
            point:'Surveying and Geoinformatics lecture hall'
        }, 
        {
            id:16,
            point:'Hostel H'
        }, 
        {
            id:17,
            point:'Foursquare gospel church'
        },
        {
            id:18,
            point:'Polytechnic mosque'
        },
        {
            id:19,
            point:'Federal Polytechnic Auditorium'
        },
        {
            id:20,
            point:'Chapel of Glory'
        },
        {
            id:21,
            point:'Federal Poly Staff School'
        },
        {
            id:22,
            point:'Federal Polytechnic Asup Hall'
        },
        {
            id:23,
            point:'Computer Science Department'
        }
    ])
    const destroy = () => {
        localStorage.removeItem('logs')
        nav('/')
    }
    const push = () => {
        setbooknow('Booking... please wait')
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify(send);
        var config = {
        method: 'post',
        url: 'https://ubikes-be.pgis.org.ng/api/booking',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            nav('/status/'+response.data.id)
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });

    }
    const [selected, setselected] = useState(0)
    const [booknow, setbooknow] = useState('Book now')
    return(
        <div>
            <div className="container">
                <div className="topbar">
                    <div className="icon">
                       <Link to={'/all'}><FontAwesomeIcon icon={faList}/></Link>
                    </div>
                    <div className="topic">
                        Hi {name}, book a ride
                    </div>
                </div>
                <div className="maps">
                <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.2701222973815!2d6.006135037105107!3d9.039105923753237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104966b7f2e9b195%3A0x18c8eec7a2fae37c!2sFederal%20Polytechnic%20Bida!5e0!3m2!1sen!2sng!4v1662107023865!5m2!1sen!2sng" width="500" height="800" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></Iframe>
                </div>
                <div className="main">
                    <div className="route">
                        <div className="location">
                            <div className="icon"><FontAwesomeIcon icon={faLocationDot}/></div>
                            <select name="location" id="" onChange={(e)=>setSend(}>
                                <option value=''>Pick up location</option>
                                {
                                    location.map(({id, point})=>(
                                        <option value={point}>{point}</option>
                                    ))
                                }
                                
                            </select>
                        </div>
                        <div className="destination">
                            <div className="icon"><FontAwesomeIcon icon={faMapLocation}/></div>
                            <select name="destination" id="" onChange={(e)=>setSend({...send, destination : e.target.value})}>
                            <option value=''>Destination</option>
                            {
                                destination.map(({id, point})=>(
                                    <option value={point}>{point}</option>
                                ))
                            }
                            </select>
                        </div>
                    </div>
                    <div className="ride">
                        <h2>Suggested ride</h2>
                        <div className="sugg">
                            <div className="sug-img">
                                {selected === 1 ? <img  style={{border:'2px solid rgba(9, 154, 250, .4)'}} src='https://image.made-in-china.com/202f0j00uSgapPNdnJcU/Jincheng-Motorcycle-Model-Ax100-B-Street-Bike.jpg' alt=""></img> : <img src='https://image.made-in-china.com/202f0j00uSgapPNdnJcU/Jincheng-Motorcycle-Model-Ax100-B-Street-Bike.jpg' alt="" onClick={(e)=>{setSend({...send, vehicle : 1}); setselected(1) }}></img>}
                            </div>
                            <div className="sug-img">
                                {selected === 2 ? <img  style={{border:'2px solid rgba(9, 154, 250, .4)'}} src='https://sellatease.com/public-blog/wp-content/uploads/2022/05/DLX-Pet-7783sl.png' alt=""></img> : <img src='https://sellatease.com/public-blog/wp-content/uploads/2022/05/DLX-Pet-7783sl.png' alt="" onClick={(e)=>{setSend({...send, vehicle : 2}); setselected(2)}}></img>}
                            </div>
                        </div>
                    </div>
                    <div className="price">
                        <input type="text" placeholder="N100" disabled/>
                        <input type="text" placeholder="Your price" onChange={(e)=>setSend({...send, price : e.target.value})}/>
                    </div>
                    
                </div>
                <div className="book">
                    <button onClick={push}>{booknow}</button>
                </div>
                <div className='float' onClick={destroy}>
                    <FontAwesomeIcon icon={faSignOutAlt}/>
                </div>
            </div> 
        </div>
    )
}
export default Book