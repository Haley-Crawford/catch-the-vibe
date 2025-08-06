import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import sendEmail from '../utils/sendEmail'

const EventDetail = ({ event }) => {

    const sendReminder = () => {
        sendEmail(event.author, event.title, event.start, event.location)
    }

    return (
        <div className='event'>
            <img src={event.image} alt='Image of event' height={150} width={215}/>
            <h2>{event.title}</h2>
            <p>Date: {new Date(event.start).toDateString()}</p>
            <p>Host: {event.author}</p>
            <p>Description: {event.description}</p>
            <p>Location: {event.location}</p>
            <div className='guests'>
                <p>Guests: {event.guests.length}</p>
                <Stack direction='row' spacing={-10}>
                    {event.guests.map(guest => (
                        <Chip 
                            avatar={<Avatar sx={{ width: 40, height: 40 }}>{guest.name[0]}</Avatar>} 
                            label='Avatar'
                            sx={{
                                height: 48,
                                fontSize: '1rem',
                                '.MuiChip-avatar': {
                                    border: '1px solid black',
                                    width: 40,
                                    height: 40,
                                },
                            }}
                        />
                    ))}
                </Stack>
            </div>
            <button className='reminder-btn' onClick={sendReminder}>Send Reminder!</button>
        </div>
    )
}
export default EventDetail