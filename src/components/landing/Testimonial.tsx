import React from "react";

import {motion, useInView}  from 'framer-motion'; 

import { useRef } from "react";


function Testimonial(){
  
const ProfileLists = [
 {name :"Sarah Johnson", role: "Small Business Owner", Quotes: "Since intergrating this to our workflow, we've experienced a siginificant improvement in our efficiency and performance"},
 {name:"David Patel", role : "Project Manager", Quotes:"I have tested numerous option in this category, but one stands out for its intuitive design and comprehensive functionality"},     
 {name :"Emily Carter", role:"The tool we've adopted has surpassed our expectations, providing invaluable insights and support as our business continue to grow"}

]
  const ref = useRef(null);
  const Inview = useInView(ref,{once: true ,margin:"-100px"})
    return (
//    section div first 
    <section ref={ref} id="testimonial" className="py-24 px-4 bg-gradient-b from-green-600 to-slate-900 relative overflow-hidden">
        {/* background */}
        <div className=" absolute inset-0 bg-gradient-l from-green-600 to-slate-900"> </div>

         {/* section header and title  */}
        <div className="max-w-7xl relative z-10 mx-auto">
       <motion.div
        initial ={{y:30,opacity:0}}
        animate ={Inview ?{opacity:1,y:0}: {}}
        transition={{duration:0.6 }}
        className="text-center mb-16"
         >
        <motion.span
        initial ={{ opacity:0,scale:0.8}}
         animate={Inview ?{opacity:1 ,scale:1}: {}}
         className="inline-block px-3 py-4 mb-4 rounded-full text-5xl font-bold "
        >
          What People say 
        </motion.span>
        <h2 className="text-2xl text-slate-700 font-bold">
          Discover what our satisfied customers have to say
       <div className="text-2xl text-slate-700 font-bold"> about their experiences with our products/services </div>
        
        </h2>
        
       </motion.div>
         
         {/*testimonial card  */}
        <div className="grid md:grid-col-3 gap-8 max-w-4xl mx-auto">
          {ProfileLists.map((items,index)=>(
            <motion.div
            key={index}
            initial={{opacity: 0, y: 50}}
            animate={Inview ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ y: -10 }}
            
            >




            </motion.div>
       
          ))}

        </div>

      </div>


    </section>

    )

}

export default Testimonial;