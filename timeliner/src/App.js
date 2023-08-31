import logo from './logo.svg';
import { useState, React, useEffect } from 'react';
import './App.css';
import EventTimeline from './components/EventTimeline';
import { Grid } from '@material-ui/core';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function App() {

  var [events, setEvents] = useState([])
  var [eventsAsStrings, setEventsAsStrings] = useState("{}")

  var baseEvents = [
      {
        "title": "Event 1",
        "date": "2021-01-01"
      },
      {
        "title": "Event 2",
        "date": "2021-01-02"
      },
      {
        "title": "Event 3",
        "date": "2021-01-04 12:01"
      },
    {
      "title": "Event 4.5",
      "edate": "1693455734"
    },
      {
        "title": "Event 4",
        "date": "2021-01-04 12:00"
      }

    ];

  useEffect(() => {
    setEventsAsStrings(JSON.stringify(baseEvents).replace(/},/g, "},\n"));
    setEvents(baseEvents)
  }, []);

  function createAndSortEvents() {
    let events = JSON.parse(eventsAsStrings)

    for (let i = 0; i < events.length; i++) {
      if (events[i].edate) {
        events[i].date = new Date(events[i].edate * 1000).toISOString();
      }
    }
    events.sort((a, b) => {
      return new Date(a.date) - new Date(b.date)
    });
    return events;
  }
  useEffect(() => {
    try {
      console.log("events changed", eventsAsStrings);
      setEvents(createAndSortEvents())
    } catch (error) {
      console.log("error: ", error);
    }
  }, [eventsAsStrings]);

  return (
    <div className="App-body">
      <Grid container spacing={2}>
        <Grid xs={4}>
          <EventTimeline events={events} />
        </Grid>
        <Grid xs={8}>
          <br/>
          <TextField
            id="outlined-textarea"
            label="Json Events"
            placeholder="Placeholder"
            multiline
            fullWidth={true}
            minRows={12}
            helperText="Full width!"
            variant="filled"
            value={eventsAsStrings}
            onChange={(event, newValue) => {
              setEventsAsStrings(event.target.value);
            
              }}
          />
        </Grid>


      </Grid>

    </div>
  );
}

export default App;
