import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { loginUser } from '../api';
 
 


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await loginUser({ email, password });

            console.log(res);
            localStorage.setItem('token', res.token);
            navigate('/conversations');
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || err.message || 'Login failed');
        }
    };





    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">Sign in to Chat</h2>


                {error && <div className="bg-red-100 text-red-800 p-2 rounded mb-4">{error}</div>}


                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            type="email"
                            required
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            type="password"
                            required
                        />
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </form>

                </div>
                </div>
)}
export default Login;