import React from 'react';
import ThemeSlider from './ThemeSlider';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import MeetOurPartners from './MeetOurPartners';
import FeaturedServices from './FeaturedServices';
import CountUpStats from './CountUpStats';

const Home = () => {
    
    return (
        <div>
            <ThemeSlider></ThemeSlider>
            <FeaturedServices></FeaturedServices> 
            <CountUpStats></CountUpStats>
            <MeetOurPartners></MeetOurPartners>    
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
            
            
        </div>
    );
};

export default Home;