import React from 'react';

export default function ConfirmModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Yakin",
    cancelText = "Batal"
}) {
    if (!isOpen) 
        return null;
    
    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div
                className="bg-[#1a1a1a] w-full max-w-sm rounded-2xl border border-zinc-800 p-6 shadow-2xl relative animate-fade-in-up">
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">{message}</p>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition">
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600/90 text-white hover:bg-red-600 transition shadow-lg shadow-red-900/20 active:scale-95">
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}