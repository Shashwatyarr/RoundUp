// AuthPage.jsx
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signInWithApple,
} from "../authhandler/supabase";

function AuthPage() {
  const [name, setName] = useState(""); // Name input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      if (isSignup) {
        const { error, data } = await signUpWithEmail(email, password, name);
        if (error) setError(error.message);
        else setSuccess(
          "Signup successful! Check your email and verify your account before logging in."
        );
      } else {
        const { error, data } = await signInWithEmail(email, password);
        if (error) setError(error.message);
        else setSuccess("Login successful!");
      }
    } catch (err) {
      setError("Authentication error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await signInWithApple();
    } catch (err) {
      setError("Apple login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-2">Welcome</h2>
        <p className="text-center mb-4">
          {isSignup ? "Sign up" : "Sign in"} to GoFundMe to continue.
        </p>

        {/* OAuth Buttons */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className={`w-full flex items-center mb-3 px-4 py-2 border rounded-full gap-2 justify-center ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Icon icon="logos:google-icon" />
          {loading ? "Loading..." : "Continue with Google"}
        </button>

        <button
          onClick={handleAppleLogin}
          disabled={loading}
          className={`w-full flex items-center mb-3 px-4 py-2 border rounded-full gap-2 justify-center ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Icon icon="logos:apple" />
          {loading ? "Loading..." : "Continue with Apple"}
        </button>

        <div className="my-3 text-center text-gray-400">or</div>

        {/* Email/password form */}
        <form onSubmit={handleEmailAuth}>
          {isSignup && (
            <input
              type="text"
              required
              value={name}
              placeholder="Full Name"
              className="w-full mb-2 px-3 py-2 border rounded"
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          )}
          <input
            type="email"
            required
            value={email}
            placeholder="Email Address"
            className="w-full mb-2 px-3 py-2 border rounded"
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            required
            value={password}
            placeholder="Password"
            className="w-full mb-4 px-3 py-2 border rounded"
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-800 text-white font-semibold rounded-full py-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : isSignup ? "Sign Up" : "Continue"}
          </button>
        </form>

        {/* Toggle SignUp/SignIn */}
        <div className="mt-3 text-center text-sm">
          <button
            className="text-green-800 underline"
            onClick={() => setIsSignup(!isSignup)}
            disabled={loading}
          >
            {isSignup
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mt-3 text-red-600 text-sm text-center">{error}</div>
        )}
        {success && (
          <div className="mt-3 text-green-600 text-sm text-center">{success}</div>
        )}

        <div className="mt-4 text-xs text-gray-400 text-center">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
