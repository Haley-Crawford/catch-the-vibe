import { useState, useEffect } from 'react'
import { supabase } from '../utils/client.js'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Pagination from '@mui/material/Pagination'

import Event from '../components/Event.jsx'

const Dashboard = () => {

    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase
                .from('Events')
                .select()
                .neq('author', 'Anon')
                .order('start')
            
            setEvents(data)
        }
        fetchData()
    }, [])

    return events && (
        <div className='dashboard'>
            <div className='search'>
                <Autocomplete
                    sx={{
                        width: '500px',
                    }}
                    freeSolo
                    disableClearable
                    options={events.map(event => event.title)}
                    slotProps={{
                        paper: {
                            sx: {
                                background: 'black',
                                color: 'white',
                                border: '1px solid #444',
                                borderRadius: '6px',
                            },
                        },
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Search Events...'
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    type: 'search',
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <SearchIcon sx={{ color: 'white' }} />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                },
                                '& .MuiInputBase-root': {
                                    color: 'white',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                            }}
                        />
                    )}
                />
            </div>
            <div className='gallery gallery-max'>
                {events.map(event => (
                    <Event key={event.id} event={event}/>
                ))}
            </div>
            <Pagination count={5} variant='outlined' shape='rounded'
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: 'white', // White text
                        borderColor: 'white', // White border
                    },
                    '& .MuiPaginationItem-ellipsis': {
                        color: 'white',
                    },
                    '& .MuiPaginationItem-root.Mui-selected': {
                        background: 'lightgray', // Custom background for selected page
                        color: 'black', // Keep text white on selected page
                    },
                }}
            />
        </div>
    )
}
export default Dashboard