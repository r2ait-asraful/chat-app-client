import React, { useEffect, useState } from 'react'
import { createConversation, searchUsers } from '../api';
import { getSocket } from '../../socket';
 

const SearchUsers = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

     const socket = getSocket();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) {
            setResults([]);
            return;
        }
        try {
            const users = await searchUsers(query.trim());
            setResults(users)
        } catch (err) {
            console.error("Search failed", err);
        }
    };

    const handleAdd = async(user) => {
    try {
        socket.emit("create_conversation", { userId: user});
        setResults([]);
        setQuery(''); 
    } catch (error) {
        alert(error.response.data.message)
    }
    };


    
 

    return (
        <>
            {/* Search Bar */}
            <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 mb-4"
            >
                <input
                    type="text"
                    placeholder="Search users..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent focus:outline-none text-sm"
                />
                <button
                    type="submit"
                    className="text-xs bg-blue-600 text-white px-3 py-1 rounded"
                >
                    Search
                </button>
            </form>

            {/* Search Results */}
            {results.length > 0 && (
                <ul className="mb-4 space-y-1">
                    {results.map((u) => (
                        <li
                            key={u._id}
                            className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm"
                        >
                            <div>
                                <div className="font-medium text-sm">{u.name}</div>
                                <div className="text-xs text-gray-500">{u.email}</div>
                            </div>
                            <button
                                onClick={() => handleAdd(u._id)}
                                className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                            >
                                Add
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default SearchUsers