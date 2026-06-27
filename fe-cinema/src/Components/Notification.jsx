import {useEffect} from 'react';

export default function Notification({
    message,
    type = 'success',
    onClose
}) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return() => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) 
        return null;
    
    return (
        <div
            className="fixed top-6 right-6 z-[100] animate-in fade-in slide-in-from-top-5 duration-300">
            <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border ${
                type === 'success'
                    ? 'bg-emerald-950/90 border-emerald-900/50 text-emerald-400'
                    : 'bg-red-950/90 border-red-900/50 text-red-400'}`}>
                <span className="text-lg">{
                        type === 'success'
                            ? '✅'
                            : '⚠️'
                    }</span>
                <p className="text-sm font-medium tracking-wide">{message}</p>
                <button
                    onClick={onClose}
                    className="ml-2 text-zinc-500 hover:text-white transition focus:outline-none">✕</button>
            </div>
        </div>
    );
}