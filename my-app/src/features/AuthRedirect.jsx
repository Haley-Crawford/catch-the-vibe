import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../utils/client.js';

const AuthRedirect= () => {
  const [session, setSession] = useState(undefined); // undefined = still checking

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();
  }, []);

  if (session === undefined) {
    return <div>Loading...</div>; // or a spinner
  }

  return session ? <Navigate to='/dashboard' replace /> : <Navigate to='/login' replace />;
}
export default AuthRedirect