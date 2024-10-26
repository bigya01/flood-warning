// About.js
import React, { useState } from 'react';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleAbout = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="container">
            <h2>About Us</h2>
            <button onClick={toggleAbout}>
                {isVisible ? 'Hide About Us' : 'Show About Us'}
            </button>
            {isVisible && (
                <div id="about-section" className="about">
                    <p>
                        We are dedicated to providing accurate flood detection to keep communities safe. Our system utilizes advanced technology to monitor water levels and alert users promptly.
                    </p>
                </div>
            )}
        </div>
    );
};

export default About;
