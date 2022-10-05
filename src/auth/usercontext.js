import { useState, useEffect, createContext} from "react";
export const UserContext = createContext()

const UsedContext = (props) => {
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
        }
    }, [])
    const [details, setDetails] = useState({
        name:'',
        authToken:'',
        phone: '',
        uniqueid:'',
        authlevel: ''
    })
    return(
        <UserContext.Provider value={{details, setDetails}}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UsedContext;