import { supabase } from '../utils/client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import '../styles/App.css'

const Login = () => {
    return (
        <div className='login'>
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme='dark'/>
        </div>
    )
}
export default Login