import { v4 } from 'uuid'

const calendarEvent = (start, end, title, description, location) => {

    const uid = `${v4()}@catchthevibe.com`

    const formatDate = (date) => {
        return new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    // have to keep bad indentation. strict ics rules

    const icsContent = `
        BEGIN:VCALENDAR
        VERSION:2.0
        PRODID:-//Haley Crawford//Catch The Vibe//EN
        CALSCALE:GREGORIAN
        BEGIN:VEVENT
        UID:${uid}
        DTSTAMP:${formatDate(Date.now())}
        DTSTART:${formatDate(start)}
        DTEND:${formatDate(end)}
        SUMMARY:${title}
        DESCRIPTION:${description}
        LOCATION:${location || 'Online'}
        STATUS:CONFIRMED
        SEQUENCE:0
        BEGIN:VALARM
        TRIGGER:-PT10M
        ACTION:DISPLAY
        DESCRIPTION:Reminder
        END:VALARM
        END:VEVENT
        END:VCALENDAR
    `
    
    const formattedICS = icsContent.split('\n')
        .slice(1)
        .map(line => line.trim())
        .join('\n')

    const blob = new Blob([formattedICS], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    return url
}
export default calendarEvent