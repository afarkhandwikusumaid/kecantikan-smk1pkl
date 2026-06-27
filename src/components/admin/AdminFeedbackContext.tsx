import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AlertCircle, CheckCircle, X, Trash2 } from 'lucide-react';

interface AlertState {
  message: string;
  type: 'error' | 'success';
}

interface ConfirmState {
  message: string;
  onConfirm: () => void;
}

interface AdminFeedbackContextProps {
  showAlert: (message: string, type: 'error' | 'success') => void;
  showConfirm: (message: string, onConfirm: () => void) => void;
}

const AdminFeedbackContext = createContext<AdminFeedbackContextProps | undefined>(undefined);

export function useAdminFeedback() {
  const context = useContext(AdminFeedbackContext);
  if (!context) throw new Error('useAdminFeedback must be used within AdminFeedbackProvider');
  return context;
}

export function AdminFeedbackProvider({ children }: { children: ReactNode }) {
  const [alertState, setAlertState] = useState<AlertState | null>(null);
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const showAlert = (message: string, type: 'error' | 'success') => {
    setAlertState({ message, type });
  };

  const showConfirm = (message: string, onConfirm: () => void) => {
    setConfirmState({ message, onConfirm });
  };

  const handleConfirm = async () => {
    if (confirmState) {
      setIsProcessing(true);
      try {
        await confirmState.onConfirm();
      } finally {
        setIsProcessing(false);
        setConfirmState(null);
      }
    }
  };

  return (
    <AdminFeedbackContext.Provider value={{ showAlert, showConfirm }}>
      {children}

      {/* ALERT MODAL */}
      {alertState && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in transform scale-100 transition-all">
            <div className={`p-6 flex flex-col items-center text-center ${alertState.type === 'error' ? 'bg-red-50/50' : 'bg-green-50/50'}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${alertState.type === 'error' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'}`}>
                {alertState.type === 'error' ? <AlertCircle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {alertState.type === 'error' ? 'Peringatan' : 'Berhasil'}
              </h3>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">{alertState.message}</p>
            </div>
            <div className="p-4 bg-white border-t border-slate-100">
              <button onClick={() => setAlertState(null)} className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all shadow-md" style={{ background: alertState.type === 'error' ? '#ef4444' : '#10b981' }}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM MODAL */}
      {confirmState && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in transform scale-100 transition-all">
            <div className="p-6">
              <div className="flex justify-between items-start mb-5">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                  <Trash2 className="w-6 h-6" />
                </div>
                <button disabled={isProcessing} onClick={() => setConfirmState(null)} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Konfirmasi Hapus</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{confirmState.message}</p>
            </div>
            <div className="p-4 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
              <button disabled={isProcessing} onClick={() => setConfirmState(null)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 transition-colors">
                Batal
              </button>
              <button disabled={isProcessing} onClick={handleConfirm} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-500 shadow-md shadow-red-200 hover:bg-red-600 disabled:opacity-50 flex items-center gap-2 transition-all">
                {isProcessing ? (
                  <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Menghapus...</>
                ) : 'Ya, Hapus Data'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminFeedbackContext.Provider>
  );
}
