import { useState,useEffect } from "react";
 
import { Link } from "react-router-dom";

import {motion} from "framer-motion";
import { useAuth } from "@/context/Authcontext";


const Navigation = ()=>{
const [scrolled,setIsScrolled]= useState(false);
const {isAuthenticated} = useAuth();


useEffect(()=>{
 const handleScroll = ()=>{
  setIsScrolled(window.scrollY>10)
 } 
 window.addEventListener('Scroll',handleScroll)
 return ()=> removeEventListener('Scroll',handleScroll)
},[])

const sectionScroll =(id: string)=>{  
    const element = document.getElementById(id);
    element?.scrollIntoView({behavior:'smooth'})
}

  return (

    <motion.nav
     initial={{y:-100}}
      animate={{y:0}}
      transition={{duration:0.5}}
      className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
  }`}
    >
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div  className="flex justify-between items-center h-20">
       {/* logo  */}
       <motion.div
       initial={{opacity:0,x:-20}}
       animate= {{opacity:1,x:0}}
       transition={{delay:0.2}}
       className="flex items-center"
       >
     <Link to = "/" className="flex items-center space-x-2 ">
        <div className="w-15 h-15 bg-gradient-to-br from-emerald-500 to-slate-900 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-xl">M</span>
        </div>
        <span className={`text-2xl font-bold  bg-graident-r  from-emerald-500 to-white bg-clip-text text-transparent  ${!scrolled && 'text-white'}' `}>Meeting Mind</span>

     </Link> 
       </motion.div>

       {/* next line  */}
       <motion.div
       initial={{opacity: 0}}
       animate={{opacity:1}}
      transition={{delay:0.3}}
      className="hidden md:block"
       >
        <div className="ml-10 flex items-center space-x-8 text-white">
          <button onClick={()=>sectionScroll('features')} className={`${scrolled? 'text-gray-700': 'text-white'} hover:text-green-600 transition  font-medium`}>
            Features 
           </button>
              
              <button onClick={()=>sectionScroll('pricing')} className={`${scrolled ? 'text-gray-700': 'text-white'} hover:text-green-600 font-medium transition`}>
              Pricing 
              </button>
              <button onClick={()=>sectionScroll('testimontial')} className={`${scrolled ? 'text-gray-700':'text-white'} hover:text-green-600 font-medium transition` }>
                Testimonial 
              </button>
              {isAuthenticated ? (
               <Link to = "/dashboard" className="bg-gradient-to-r from-green-600 to-slate-800 text-white px-6 py-3 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 ">   
                Dashboard 
               </Link>
               ):(
                <>
                 <Link to = "/login" className={`${scrolled ? "bg-gray-700": 'bg-slate-700'} hover:text-green-600 font-medium transition`}>
                  Sign in 
                 </Link>
                 <Link to = "/signup" className="bg-gradient-to-r from-green-600 to-slate-800 text-white px-6 py-3 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
                 
                   Get Started 
                 </Link>
                 </>
               )}
          </div>                     
       </motion.div>
         
      </div> 
     </div>
    </motion.nav>     
  )

}


export default Navigation;