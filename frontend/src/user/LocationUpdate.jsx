import React , { useEffect, useState } from "react";

function useLocation (){
    const [location, setLocation]= useState({
        loaded: false,
        coordinates: {lat:"", long:""}
    });

    const onSucces = location=>{
        setLocation({
            loaded:true,
            coordinates:{
                lat: location.coords.latitute,
                long: location.coords.longitude
            }
        })
    };

    const onError = error=>{
        setLocation({
            loaded:true,
           error,
        })
    }

    useEffect(()=>{
        if (!("geolocation" in navigator)){
            onError({
                code: 0,
                message:"Geolaction is not supported"
            })
           
        }

        navigator.geolocation.getCurrentPosition(onSucces, onError);

    }, []);

    return location;

}

export default useLocation;