import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { type User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session on page load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth state changes (sign in, sign out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products user={user} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
