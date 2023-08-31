import * as React from 'react';

import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@material-ui/lab';
import { Typography } from '@material-ui/core';



export default function EventTimeline(props) {


    function getTimelineItems() {
        console.log("props: ", props);
        let timelineItems = []
        for (let i = 0; i < props.events.length; i++) {
            timelineItems.push(
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        {props.events[i].title}
                        <Typography>{props.events[i].date}</Typography>
                    </TimelineContent>
                </TimelineItem>
            )
        }
        return timelineItems
    }



    return (
            <Timeline position="alternate-reverse">
                {getTimelineItems()}
            </Timeline>
    );
}