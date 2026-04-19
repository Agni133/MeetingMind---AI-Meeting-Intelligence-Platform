import React from "react";

import {motion,rgba,useInView} from "framer-motion"

import { useRef } from "react";
import { div, section } from "framer-motion/client";


const Testimonial = ()=>{
  
  const  ProfileList = [
   {
    name: "Sarah Johnson",
      role: "Small Business Owner",
      Quotes: "Since integrating this to our workflow, we've experienced a significant improvement in our efficiency and performance.",
      avatar: "/src/assets/Sarah.jpg",
},{
  name: "David Patel",
  role: "Project Manager",
  Quotes: "I have tested numerous options in this category, but one stands out for its intuitive design and comprehensive functionality.",
  avatar: "/src/assets/David.jpg",
},{
  name: "Emily Carter",
  role: "Operations Manager",   
  Quotes: "The tool we've adopted has surpassed our expectations, providing invaluable insights and support as our business continues to grow.",
  avatar: "/src/assets/Emily.jpg",
}
  ]
   
   const ref = useRef(null);
   
   const inView = useInView(ref,{once:true ,margin:"-100px"})
       
         
  return (
   <section ref={ref} id="testimonial" className="py-24 px-4 relative overflow-hidden" style={{background:"radial-gradient(circle,green,transparent)"}} >
      {/* background effect left side   */}
    <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle,green, transparent)" }}>
            
    </div>
       {/* background effect right side   */}
    <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{background:"radial-gradient(circle,green,transparent)"}}>
      
    </div>
        {/* wrapper div inside the motion div  */}
      <div className="max-w-6xl relative z-10 mx-auto">
        
        <motion.div
        initial={{x:30,opacity:0}}
        animate={inView?{opacity:1,y:0}:{}}
        transition={{duration:0.6}}
        className="text-center mb-16 mt-4 "
        >
          <h1 className="font-bold text-slate-900 mb-3 text-6xl ">What People Say</h1>
            <p className="text-center font-bold text-2xl "> Discover what our satisfied customers have to say </p>
            <p className="text-center font-bold text-2xl "> about their experiences with our products/services</p>
        </motion.div>
        
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
             {ProfileList.map((item,index)=>(
             
             <motion.div
             key={index}
             initial={{ opacity: 0, y: 50 }}
             animate={inView ? { opacity: 1, y: 0 } : {}}
             transition={{ delay: index * 0.2, duration: 0.6 }}
             whileHover={{ y: -10 }}
             className="h-full"
           > 

            <div className={`rounded-3xl p-6 h-full flex flex-col gap-4 border transition-all duration-300
                  ${index === 1
                    ? "bg-green-500/15 border-green-700/30 shadow-lg shadow-green-500/10"
                    : "bg-white/5 border-white/10"
                  }`}   style={{ backdropFilter: "blur(12px)" }}>

               {/* starting imag of the clients with seperate divs  */}
              <div className="flex items-center gap-3 ">
                
                <img src={item.avatar} alt={item.name} className="h-15 w-15 rounded-full object-cover " style={{ outline: "2px solid rgba(74, 222, 128, 0.3)", outlineOffset:"3px"}}>
                 
                </img>
                 
                 <div>
                  <h3 className="text-slate-800 font-semibold text-sm ">{item.name}</h3>
                  <p className="text">{item.role}</p>
                 </div>

              </div>
                
                    
              <div>
                   <p className="text-slate-800 leading-relaxed text-xs font-stretch-condensed">{item.Quotes}</p>

                  </div>
            </div>


            </motion.div>
           
             ))}


       
          </div>

        <div>
          

        </div>

      </div>


   </section>

  )


}

export default Testimonial;