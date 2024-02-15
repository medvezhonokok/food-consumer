import React from 'react';
import styles from './ScheduleBox.module.css';
import {Card, Placeholder} from 'react-bootstrap';

const ScheduleBox = (props: {
    scheduleElem: { workerName: string, creationTime: Date, info: string, waiter: boolean, loading?: boolean }
}) => {
    const {scheduleElem} = props

    return (
        <Card className={`${styles.ScheduleBox}`}>
            <Card.Header style={{width: '100%'}}>
                <span className={`${styles.Header} text-secondary`}>
                    <b>
                        {scheduleElem.loading ?
                            <Placeholder animation={"glow"}><Placeholder xs={6}/></Placeholder>
                            :
                            scheduleElem.workerName
                        }
                    </b>
                </span>
            </Card.Header>
            <Card.Body className={"w-100 h-100"}>
                <Card.Text>
                    {scheduleElem.loading ?
                        <Placeholder animation={"glow"}>
                            <Placeholder xs={4}/> <Placeholder xs={6}/> <Placeholder xs={7}/>
                        </Placeholder>
                        :
                        scheduleElem.info
                    }
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ScheduleBox;
