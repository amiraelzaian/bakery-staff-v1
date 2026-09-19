import { Quote } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";



const ThemeContext=createContext(null);
const STORAGE_KEY = "theme";
const QUERY = "(prefers-color-scheme: dark)";

export function ThemeProvider({children}){

    const [theme,setThemeState]=useState(()=>{
        try{
            return localStorage.getItem(STORAGE_KEY)||'system';
        }catch{
            return 'system'
        }
    })

    //what the os prefers now
    const [systemDark,setSystemDark]=useState(()=>window.matchMedia(QUERY).matches)

    // follow the os if it changes while the app is opening
    useEffect(()=>{
        const media=window.matchMedia(QUERY);
        const handler=(e)=>setSystemDark(e.matches)
        media.addEventListener('change',handler)
        return ()=> media.removeEventListener('change',handler);
    },[]);

    // to make the real theme show : dark or light
    const resolvedTheme=theme==='system'?(systemDark?'dark':'light'):theme;

    // apply it
    useEffect(()=>{
        const root=document.documentElement;
        root.classList.toggle('dark',resolvedTheme==='dark');
        root.style.colorScheme=resolvedTheme;
    },[resolvedTheme])

    const setTheme=(val)=>{
        try{
            localStorage.setItem(STORAGE_KEY,val);
        }catch{}
        setThemeState(val)
    }
    

    return <ThemeContext.Provider value={{theme,resolvedTheme,setTheme}}>
        {children}
    </ThemeContext.Provider>

}

export function useTheme(){
    const ctx=useContext(ThemeContext);
    if(!ctx)throw new Error("useTheme must be used inside <ThemeProvider>");
    return ctx
}