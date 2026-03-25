import Navigation from "@/components/landing/Navigation"
import Hero from "../components/landing/Hero"
 import Features from "@/components/landing/Features"
import  Pricing from "@/components/landing/Pricing"


export const Landing :React.FC = ()=>{

    return (
    <div className="min-h-screen overflow-x-hidden"> 
    
    <Navigation/>
       
     <Hero />                   
     
     <Features />
     
  <Pricing />

    </div>


    )

}

export default Landing;