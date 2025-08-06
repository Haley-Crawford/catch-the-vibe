import { useState, useEffect } from 'react'
import { supabase } from '../utils/client'
import EventDetail from '../components/EventDetail'

const MyEvents = () => {

    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            const { data } = await supabase
                .from('Events')
                .select()
                .eq('author', 'Anon')
                .order('start')
            
            setEvents(data)
        }
        fetchEvents()
    }, [])

    return (
        <div className='gallery'>
            {events.map(event => (
                <EventDetail key={event.id} event={event}/>
            ))}
        </div>
    )
}
export default MyEvents