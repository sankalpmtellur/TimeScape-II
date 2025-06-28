import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="modern-home-wrapper">
            <div className="modern-card animate-fade">
                <h1>Timelines of the Earth</h1>
                <p>
                    Dive into time — uncover events that shaped the world on this very day.
                </p>
                <button onClick={() => navigate('/history')}>Explore Now</button>
            </div>
        </div>
    );
}

export default Home;