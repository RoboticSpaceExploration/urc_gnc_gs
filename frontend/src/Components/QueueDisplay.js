import React from 'react';
import QueueFeed from './QueueFeed';
import { Button } from 'react-bootstrap';

function QueueDisplay({ queueData }) {

    return (
        <div>
            {queueData && queueData.length > 0 ? (
                queueData.map((queue,index) => (
                    <QueueFeed
                        queue={queue.queue}
                        latitude={queue.latitude}
                        longitude={queue.longitude}
                        index={index+1}
                        key={queue.queue}
                    />
                ))
            ) : (
                <p style={{ textAlign: 'center' }}>Queue List is Empty</p>
            )}
        </div>
    );
}

export default QueueDisplay;
