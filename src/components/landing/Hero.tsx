 import { Link } from "react-router-dom";
 import React from "react";
import  {animate, easeIn, motion, stagger} from "framer-motion";

 const Hero = ()=>{
   const containerVariant = {
     hidden: {opacity:0},
     visible :{
      opacity:1,
       transition :{
       staggerChildren:0.2,
       delaychildren :0.3
       }
     }
   };

       const itemvariant = {
        hidden:{y:50,opacity:0},
         visible:{
            y:0,
            opacity:1,
           transition:{
          duration:0.8,
          ease:[0.6,-0.05,0.01,0.99]
           }
         }
       };

       const floatingvaraint={
         animate:{
          y:0,
          opacity:1,
          transition:{
           duration:3,
           repeat:Infinity,
           easeIn:'easeInOut'

          }

         }
       };

    return (

    <section className="relative bg-gradient-br bg-purple-600 via-blue-500 to-purple-800 overflow-hidden flex item-center justify-center">
          {/* animation background */}
       <div className="absolute inset-0 overflow-hidden">
 


       </div>

    </section>
)


}

export default Hero;