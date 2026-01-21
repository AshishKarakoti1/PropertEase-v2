import React from 'react';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex gap-2">
                {/* Dot 1 */}
                <div className="w-4 h-4 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.3s]"></div>
                {/* Dot 2 */}
                <div className="w-4 h-4 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.15s]"></div>
                {/* Dot 3 */}
                <div className="w-4 h-4 rounded-full bg-indigo-600 animate-bounce"></div>
            </div>
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest animate-pulse">
                Loading Data...
            </p>
        </div>
    );
};

export default Loading;