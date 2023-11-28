import axios from 'axios'
import React, { createContext, useContext, useState, useEffect } from 'react'
const StateContext = createContext()

const initialState = {
    chat: false,
    chart: false,
    userProfile: false,
    notification: false,
}


export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [isClicked, setIsClicked] = useState(initialState)
    const [screenSize, setScreenSize] = useState(undefined)
    const [currentColor, setCurrentColor] = useState('#03C9D7')
    const [currentMode, setCurrentMode] = useState('Light')
    const [themeSettings, setThemeSettings] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(null);

    const setMode = (e) => {
        setCurrentMode(e.target.value);

        localStorage.setItem('themeMode', e.target.value)
        setThemeSettings(false)

    }
    
    
    const setColor = (e) => {
        setCurrentColor(e.target.value)
        
        localStorage.setItem('colorMode', e.target.value)
        
        setThemeSettings(false)
    }

    const handleClick = (clicked) => {
        setIsClicked({...initialState, [clicked]: true})
    }

    const login = (newToken) => {
        setToken(newToken)
        localStorage.setItem("token", newToken); 
    }





    useEffect(() => {
        // Load the token from localStorage when the component mounts
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        }
      }, []);

    
    

    useEffect(() => {
        
        if (token) {
            axios.get('http://18.191.131.91/', {
                // withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then((response) => {
                setUser(response.headers['set-Cookie']);
                // console.log(response)
            }).catch((error) => {
                console.error("Error fetching user data:", error);
            })
        } else {
            setUser(null);
        }
    }, [token])



    
    
    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick,
                screenSize,
                setScreenSize,
                handleClick,
                initialState,
                currentMode,
                currentColor,
                setCurrentColor, setCurrentMode,
                themeSettings, setThemeSettings,
                setMode, setColor, token, login, user


        }}
        >
{children}
        </StateContext.Provider>

    )
}

export const useStateContext = () => useContext(StateContext)