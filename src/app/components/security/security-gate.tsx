import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Fingerprint, Eye, EyeOff, Check } from "lucide-react";
import { Button } from "../ui/button";

interface SecurityGateProps {
  onUnlock: () => void;
}

export function SecurityGate({ onUnlock }: SecurityGateProps) {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState(false);
  const [authMethod, setAuthMethod] = useState<"pin" | "biometric">("pin");
  
  const CORRECT_PIN = "1234"; // In real app, this would be securely stored

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      
      if (newPin.length === 4) {
        setTimeout(() => {
          if (newPin === CORRECT_PIN) {
            onUnlock();
          } else {
            setError(true);
            setTimeout(() => {
              setPin("");
              setError(false);
            }, 500);
          }
        }, 100);
      }
    }
  };

  const handleBiometric = () => {
    // Simulate biometric authentication
    setTimeout(() => {
      onUnlock();
    }, 1000);
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A] flex flex-col items-center justify-center p-6">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-500 mb-6"
          >
            <Lock className="w-10 h-10 text-slate-900" />
          </motion.div>
          
          <h1 className="text-3xl mb-2">Welcome Back</h1>
          <p className="text-slate-400">Unlock to access your crop intelligence system</p>
        </div>

        {/* Auth Method Toggle */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setAuthMethod("pin")}
            className={`flex-1 py-3 rounded-xl border transition-all ${
              authMethod === "pin"
                ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                : "bg-slate-800/50 border-slate-700 text-slate-400"
            }`}
          >
            <Lock className="w-5 h-5 mx-auto" />
          </button>
          
          <button
            onClick={() => setAuthMethod("biometric")}
            className={`flex-1 py-3 rounded-xl border transition-all ${
              authMethod === "biometric"
                ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                : "bg-slate-800/50 border-slate-700 text-slate-400"
            }`}
          >
            <Fingerprint className="w-5 h-5 mx-auto" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {authMethod === "pin" ? (
            <motion.div
              key="pin"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* PIN Display */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-400">Enter PIN</span>
                  <button
                    onClick={() => setShowPin(!showPin)}
                    className="p-1 text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                
                <div className="flex justify-center gap-4 mb-2">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: error ? [1, 1.2, 1] : 1,
                        x: error ? [-10, 10, -10, 10, 0] : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-2xl transition-all ${
                        error
                          ? "border-red-500/50 bg-red-500/10 text-red-400"
                          : pin.length > i
                          ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                          : "border-slate-700 bg-slate-800/50 text-slate-600"
                      }`}
                    >
                      {pin.length > i ? (showPin ? pin[i] : "●") : ""}
                    </motion.div>
                  ))}
                </div>
                
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-red-400 text-center"
                  >
                    Incorrect PIN. Try again.
                  </motion.p>
                )}
              </div>

              {/* Number Pad */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <motion.button
                    key={num}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePinInput(num.toString())}
                    className="h-16 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-xl font-medium transition-colors"
                  >
                    {num}
                  </motion.button>
                ))}
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  className="h-16 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-sm text-slate-400 transition-colors"
                >
                  Delete
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePinInput("0")}
                  className="h-16 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-xl font-medium transition-colors"
                >
                  0
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setPin("");
                    setError(false);
                  }}
                  className="h-16 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-sm text-slate-400 transition-colors"
                >
                  Clear
                </motion.button>
              </div>

              <p className="text-xs text-center text-slate-500">
                Demo PIN: 1234
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="biometric"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex p-6 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 mb-6"
              >
                <Fingerprint className="w-16 h-16 text-emerald-400" />
              </motion.div>
              
              <h3 className="text-xl mb-2">Touch Sensor</h3>
              <p className="text-sm text-slate-400 mb-8">
                Place your finger on the sensor to authenticate
              </p>
              
              <Button
                onClick={handleBiometric}
                className="bg-gradient-to-r from-emerald-500 to-lime-500 text-slate-900 hover:shadow-xl hover:shadow-emerald-500/50"
              >
                <Fingerprint className="w-4 h-4 mr-2" />
                Simulate Biometric Auth
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
