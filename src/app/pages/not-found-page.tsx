import { motion } from "motion/react";
import { Link } from "react-router";
import { Home, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="text-9xl bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
              404
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-8 -right-8"
            >
              <AlertCircle className="w-16 h-16 text-yellow-500" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl mb-4">Page Not Found</h1>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            The crop data you're looking for has been moved to a different field, 
            or it might not exist in our database.
          </p>

          <Link to="/">
            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-lime-500 text-slate-900">
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
