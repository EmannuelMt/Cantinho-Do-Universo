import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Timeline.css';

const Timeline = ({ events }) => {
  const [sortedEvents, setSortedEvents] = useState([]);

  useEffect(() => {
    setSortedEvents([...events].sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, [events]);

  return (
    <div className="timeline">
      {sortedEvents.map((event, index) => (
        <motion.div
          key={index}
          className="timeline-event"
          initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="timeline-date">{event.date}</div>
          <div className="timeline-content">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            {event.image && (
              <img 
                src={event.image} 
                alt={event.title} 
                className="timeline-image"
              />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;