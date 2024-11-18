import { useState , useEffect } from "react";
import "./states.css" ;

// https://crio-location-selector.onrender.com/countries

// https://crio-location-selector.onrender.com/country=%7BcountryName%7D/states

// https://crio-location-selector.onrender.com/country=%7BcountryName%7D/state=%7BstateName%7D/cities


function States() {

    const [countryData , setCountryData] = useState([]) ;
    const [countrySelected , setSelectedCountry] = useState("") ;
    
    const [stateData , setStateData] = useState([]) ;
    const [stateSelected , setSelectedState] = useState("") ;
    
    const [cityData , setCityData] = useState([]) ;
    const [citySelected , setSelectedCity] = useState("") ;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://crio-location-selector.onrender.com/countries") ;
                if(!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`) ;
                }
                const result = await response.json() ;
                setCountryData(result) ;
            }catch(error) {
                console.error("Error: " , error) ;
            }
        };
        fetchData() ;
    } , []) ;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://crio-location-selector.onrender.com/country=${encodeURIComponent(
        countrySelected)}/states`) ;
                if(!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`) ;
                }
                const result = await response.json() ;
                setStateData(result) ;
            }catch(error) {
                console.error("Error: " , error) ;
            }
        };
        fetchData() ;
    } , [countrySelected]) ;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://crio-location-selector.onrender.com/country=${encodeURIComponent(
        countrySelected)}/state=${encodeURIComponent(stateSelected)}/cities`) ;
                if(!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`) ;
                }
                const result = await response.json() ;
                setCityData(result) ;
            }catch(error) {
                console.error("Error: " , error) ;
            }
        } ;
        fetchData() ;
    } , [countrySelected , stateSelected])

    const handleCountrySelect = (event) => {
        setSelectedCountry(event.target.value) ;
        console.log(event.target.value) ;
    }

    const handleStateSelect = (event) => {
        setSelectedState(event.target.value) ;
        console.log(event.target.value) ; 
    }

    const handleCitySelected = (event) => {
        setSelectedCity(event.target.value) ;
        console.log(event.target.value) ;
    }

    return (
        <div>
            <h1 style={{textAlign: "center"}} >Select Location</h1>
            <select 
                className="select-country" 
                onChange={handleCountrySelect} 
                value={countrySelected}
            >
                <option value="">Select Country</option>
                { countryData.map((country) => {
                    return (
                        <option value={country}>{country}</option>
                    )
                }) }
            </select>
            <select className="select" 
                    onChange={handleStateSelect} 
                    value={stateSelected}
                    disabled={!countrySelected}
            >
            <option value="">Select State</option>
                { stateData.map((state) => {
                    return (
                        <option value={state}>{state}</option>
                    )
                }) }
            </select>
            <select 
                className="select" 
                onChange={handleCitySelected} 
                value={citySelected}
                disabled={!stateSelected}
            >
            <option value="">Select City</option>
                { cityData.map((city) => {
                    return (
                        <option value={city}>{city}</option>
                    )
                }) }
                {/* <option value="selectedCountry" selected hidden>Select City</option>
                <option value="">New Delhi</option>
                <option value="">NÄ ngloi JÄ t</option>
                <option value="">Karol BÄ gh</option>
                <option value="">BawÄ na</option>
                <option value="">AlÄ«pur</option> */}
            </select>
            { ((countrySelected && stateSelected) && citySelected) && 
            <p style={{textAlign:"center"}}>You selected {citySelected}, {stateSelected}, {countrySelected}</p> }
        </div>
    ) ;
}

export default States ;