// supabaseAuth.js
import { createClient } from '@supabase/supabase-js';

// Use environment variables for security
const supabase = createClient(
  'https://tybysenjmnrajhhfqukf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5YnlzZW5qbW5yYWpoaGZxdWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMzM2NzcsImV4cCI6MjA3NzkwOTY3N30.bFzl6PE1aG6AQ2d38f9BiyPu08E9xDKf98phTv3m3HY'
);

/**
 * Sign up a user with email and password
 */
export const signUpWithEmail = async (email, password, name) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name } // Save the name in user metadata
    }
  });
  if (error) throw error;
  return data;
};


/**
 * Sign in a user with email and password
 */
export const signInWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error("SignIn Error:", error);
      return { error };
    }
    console.log("SignIn Success:", data);
    return data;
  } catch (err) {
    console.error("Unexpected SignIn Error:", err);
    return { error: err };
  }
};

/**
 * Sign in with Google OAuth
 */
export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      console.error("Google OAuth Error:", error);
      return { error };
    }
    console.log("Google OAuth Success:", data);
    return data;
  } catch (err) {
    console.error("Unexpected Google OAuth Error:", err);
    return { error: err };
  }
};

/**
 * Sign in with Apple OAuth
 */
export const signInWithApple = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'apple' });
    if (error) {
      console.error("Apple OAuth Error:", error);
      return { error };
    }
    console.log("Apple OAuth Success:", data);
    return data;
  } catch (err) {
    console.error("Unexpected Apple OAuth Error:", err);
    return { error: err };
  }
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("SignOut Error:", error);
      return { error };
    }
    console.log("SignOut Success");
  } catch (err) {
    console.error("Unexpected SignOut Error:", err);
    return { error: err };
  }
};

/**
 * Check if a user is logged in
 */
export const isLoggedIn = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error("isLoggedIn Error:", error);
      return false;
    }
    console.log("Current Session:", session);
    return !!session;
  } catch (err) {
    console.error("Unexpected isLoggedIn Error:", err);
    return false;
  }
};

/**
 * Get the currently logged-in user
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error("getCurrentUser Error:", error);
      return null;
    }
    console.log("Current User:", user);
    return user;
  } catch (err) {
    console.error("Unexpected getCurrentUser Error:", err);
    return null;
  }
};

/**
 * Listen to auth state changes
 * @param {function} callback - function(event, session) called on login/logout
 */
export const onAuthStateChange = (callback) => {
  const { subscription } = supabase.auth.onAuthStateChange((event, session) => {
    console.log("Auth State Change:", event, session);
    callback(event, session);
  });
  return subscription;
};