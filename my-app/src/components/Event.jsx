import { useState, useRef } from 'react'
import { supabase } from '../utils/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket, faCalendarPlus, faCalendarCheck, faComment } from '@fortawesome/free-solid-svg-icons'
import { Box, Modal, Chip, Avatar } from '@mui/material'
import calendarEvent from '../utils/calendarEvent'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'black',
  color: 'white',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
}

const Event = ({ event }) => {

    const [upvotes, setUpvotes] = useState(0)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [rsvp, setRSVP] = useState(event.RSVPed)
    const link = useRef()
    const url = calendarEvent(event.start, event.end, event.title, event.description, event.location)

    const handleRSVP = () => {
        setRSVP(true)

        link.current.href = url;
        link.current.download = event.title;
        link.current.click();
        URL.revokeObjectURL(url);

        const updateData = async () => {
            const guestList = [...event.guests, {'name': 'Anon', 'email': 'anonymous@gmail.com'}]
            await supabase
                .from('Events')
                .update({ RSVPed: true, guests: guestList})
                .eq('id', event.id)
        }
        updateData()
    }

    return (
        <>
            <div className='event'>
                <img src={event.image} alt='Image of event' height={150} width={215}/>
                <button style={{background: 'none', border: 'none'}} onClick={handleOpen}><h2>{event.title}</h2></button>
                <p>Date: {new Date(event.start).toDateString()}</p>
                <p>Host: {event.author}</p>
                <div className='guests'>
                    <FontAwesomeIcon
                        icon={faTicket}
                        style={{ transform: 'rotate(45deg)' }}
                    />
                    <p>Guests: {event.guests.length + (rsvp ? 1 : 0)}</p>
                </div>
                <div className='comments'>
                    <FontAwesomeIcon
                        icon={faComment}
                    />
                    <p>Comments: {event.comments?.length || 0}</p>
                </div>
                <div className='event-btns'>
                    <button className='rsvp-btn' onClick={handleRSVP} disabled={rsvp}>{rsvp ? 'Joined!' : 'RSVP'}</button>
                    <a ref={link}>
                        <FontAwesomeIcon
                            icon={rsvp ? faCalendarCheck : faCalendarPlus}
                            size='2xl'
                        />
                    </a>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                sx={{border: '1px solid white'}}
            >
                <Box sx={style} className='event-modal'>
                    <div className='event'>
                        <img src={event.image} alt='Image of event' height={150} width={215}/>
                        <h2>{event.title}</h2>
                        <p>Date: {new Date(event.start).toDateString()}</p>
                        <p>Host: {event.author}</p>
                        <div className='guests'>
                            <FontAwesomeIcon
                                icon={faTicket}
                                style={{ transform: 'rotate(45deg)' }}
                            />
                            <p>Guests: {event.guests.length + (rsvp ? 1 : 0)}</p>
                        </div>
                        <div className='event-btns'>
                            <button className='rsvp-btn' onClick={handleRSVP} disabled={rsvp}>{rsvp ? 'Joined!' : 'RSVP'}</button>
                            <a ref={link}>
                                <FontAwesomeIcon
                                    icon={rsvp ? faCalendarCheck : faCalendarPlus}
                                    size='2xl'
                                />
                            </a>
                        </div>
                    </div>
                    <div className='comments-div'>
                        <h2>Comments</h2>
                        <br/>
                        {event.comments?.map(comment => (
                            <div className='comment'>
                                <div className='flex'>
                                    <Chip 
                                        avatar={<Avatar sx={{ width: 40, height: 40 }}>{comment.author}</Avatar>} 
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
                                    <p>{new Date(comment.timestamp).toLocaleString()}</p>
                                    
                                </div>
                                <p>{comment.content}</p>
                                <button onClick={() => setUpvotes(upvotes + 1)}>{upvotes} 👍🏾</button>
                            </div>
                        ))}
                    </div>
                </Box>
            </Modal>
      </>
    )
}
export default Event