import {useTheme} from 'next-themes'
import { Button } from './ui/button'
import { MdOutlineWbSunny } from "react-icons/md";
import { IoIosMoon } from "react-icons/io";
import React from 'react';




export default function Themetoggle(){
    const {theme,setTheme}=useTheme();
    const [mounted,setMounted]=React.useState(false)
    React.useEffect(()=>{
     setMounted(true);
    },[])
    if(!mounted) return
    return(
        <Button size={'icon'} variant={'outline'} className='rounded-full' onClick={(e)=> theme==='dark'?setTheme('light'):setTheme('dark')}>
         {theme==="dark"?<MdOutlineWbSunny className='absolute h-10 w-10 scale-0 rotate-90 dark:rotate-0 dark:scale-100'/>:  <IoIosMoon className='absolute h-10 w-10 scale-100 rotate-0 dark:scale-0 dark:rotate-90'/>

}
        
        </Button>

    )
}