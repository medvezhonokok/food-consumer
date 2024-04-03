import React from 'react';
import styles from './ScheduleBox.module.css';
import {Card, Placeholder} from 'react-bootstrap';

const ScheduleBox = ({scheduleElem}) => {
    return (
        <Card className={`${styles.ScheduleBox}`}>
            <Card.Header style={{width: '100%', height: '4rem'}}>
                <span className={`${styles.Header} text-secondary`}>
                    <b>
                        {scheduleElem.loading ? (
                            <Placeholder animation="glow">
                                <Placeholder xs={6}/>
                            </Placeholder>
                        ) : (
                            <div style={{color: '#f0f0f0', border: "1px solid #ccc", borderRadius: "10px"}}>
                                {scheduleElem.workerName}
                            </div>
                        )}
                    </b>
                </span>
            </Card.Header>
            <Card.Body>
                <Card.Text style={{color: '#d2d2d2', fontSize: "20px", marginTop: "-1rem"}}>
                    {scheduleElem.loading ? (
                        <Placeholder animation="glow">
                            <Placeholder xs={4}/> <Placeholder xs={6}/> <Placeholder xs={7}/>
                        </Placeholder>
                    ) : (
                        scheduleElem.info
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ScheduleBox;
