import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { InputLabel, Select, MenuItem, Chip, Box } from '@mui/material'

import { supabase } from '../utils/client'

const Form = () => {

    const [guests, setGuests] = useState([])

    const [selected, setSelected] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        start: '',
        end: '',
        image: '',
        description: '',
        location: ''
    })

    const handleSelection = (e) => {
        setSelected(e.target.value)
    }

    useEffect(() => {
        const fetchGuests = async () => {
            const { data } = await supabase
                .from('Guests')
                .select('name, email')
            
            setGuests(data)
        }
        fetchGuests()
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const createEvent = async (e) => {
        e.preventDefault()
        const guestList = guests.filter(guest => selected.includes(guest.name))
        
        await supabase
            .from('Events')
            .insert({
                title: formData.title, 
                author: formData.author, 
                start: formData.start, 
                end: formData.end, 
                image: formData.image, 
                description: formData.description,
                location: formData.location,
                guests: guestList
            })

        window.location = '/dashboard'
    }

    return (
        <form className='form' onSubmit={createEvent}>
            <div className='form-content'>
                <div className='wrapper'>
                    <label htmlFor='title' className='form-label'>Title:</label>
                    <input type='text' id='title' name='title' className='form-input' value={formData.title} onChange={handleChange} required/>
                </div>

                <div className='wrapper'>
                    <label htmlFor='author' className='form-label'>Author:</label>
                    <input type='text' id='author' name='author' className='form-input' value={formData.author} onChange={handleChange} required/>
                </div>

                <div className='wrapper'>
                    <label htmlFor='image' className='form-label'>Image:</label>
                    <input type='url' id='image' name='image' className='form-input' value={formData.image} onChange={handleChange} required/>
                </div>

                <div className='wrapper'>
                    <label htmlFor='description' className='form-label'>Description:</label>
                    <input type='text' id='description' name='description' className='form-input' value={formData.description} onChange={handleChange} required/>
                </div>

                <div className='wrapper'>
                    <label htmlFor='start' className='form-label'>Start:</label>
                    <input type='datetime-local' id='start' name='start' className='form-input' value={formData.start} onChange={handleChange} required/>
                </div>

                <div className='wrapper'>
                    <label htmlFor='end' className='form-label'>End:</label>
                    <input type='datetime-local' id='end' name='end' className='form-input' value={formData.end} onChange={handleChange} required/>
                </div>

                <div className='wrapper'>
                    <label htmlFor='location' className='form-label'>Location:</label>
                    <input type='text' id='location' name='location' className='form-input' value={formData.location} onChange={handleChange} required/>
                </div>

                <div className='wrapper'>
                    <InputLabel id='multi-select-label' className='form-label' sx={{ color: 'white', fontFamily: 'Quintessential', fontSize: '1em' }}>Guests</InputLabel>
                    <Select
                        labelId='multi-select-label'
                        multiple
                        value={selected}
                        onChange={handleSelection}
                        sx={{
                            color: 'white',
                            borderColor: 'white',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'white',
                            },
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    background: 'black',
                                    color: 'white',
                                    border: '1px solid white',
                                    mt: 1,
                                },
                            },
                        }}
                        renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                            <Chip 
                                key={value} 
                                label={value} 
                                sx={{
                                    color: 'white',
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.36)',
                                    }
                                }}
                            />
                            ))}
                        </Box>
                        )}
                    >
                        {guests.map(guest => (
                        <MenuItem 
                            key={guest.id} 
                            value={guest.name}
                            sx={{
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(101, 101, 101, 0.2)',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(255,255,255,0.3)',
                                },
                            }}
                        >
                            {guest.name}
                        </MenuItem>
                        ))}
                    </Select>
               </div>
            </div>

            <div className='form-choices'>
                <button type='submit'>Create!</button>
                <Link to='/'>
                    <button className='cancel-btn'>Cancel!</button>
                </Link>
            </div>
        </form>
    )   
}
export default Form

