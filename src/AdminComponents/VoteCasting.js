import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import VerticalMenu from './VerticalMenu';
import './AdminCss/VoteCasting.css';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function VoteCasting() {
    const [castedVotes, setCastedVotes] = useState(0);
    const [rejectedVotes, setRejectedVotes] = useState(0);
    const [timeSeries, setTimeSeries] = useState([]);
    const [castedVotesSeries, setCastedVotesSeries] = useState([]);
    const [rejectedVotesSeries, setRejectedVotesSeries] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().toLocaleTimeString();
            const newCastedVotes = Math.floor(Math.random() * 10);
            const newRejectedVotes = Math.floor(Math.random() * 3);

            setCastedVotes(prev => prev + newCastedVotes);
            setRejectedVotes(prev => prev + newRejectedVotes);
            setTimeSeries(prev => [...prev, currentTime]);
            setCastedVotesSeries(prev => [...prev, newCastedVotes]);
            setRejectedVotesSeries(prev => [...prev, newRejectedVotes]);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const data = {
        labels: timeSeries,
        datasets: [
            {
                label: 'Casted Votes',
                data: castedVotesSeries,
                borderColor: 'rgb(75, 192, 192)',
                fill: false,
            },
            {
                label: 'Rejected Votes',
                data: rejectedVotesSeries,
                borderColor: 'rgb(255, 99, 132)',
                fill: false,
            },
        ],
    };

    return (
        <> 
        <VerticalMenu/>
        <div className="VoteCasting">
            <div className="vote-blocks">
                <div className="vote-block1">
                    <h2>Casted Votes</h2>
                    <p>{castedVotes}</p>
                </div>
                <div className="vote-block">
                    <h2>Rejected Votes</h2>
                    <p>{rejectedVotes}</p>
                </div>
            </div>
            <div className="vote-graph">
                <Line data={data} />
            </div>
        </div>
        </>
    );
}

export default VoteCasting;
