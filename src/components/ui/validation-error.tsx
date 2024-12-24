import { motion, AnimatePresence } from "framer-motion";
const ValidationError = ({
  message,
  isErr,
}: {
  message: string;
  isErr: boolean;
}) => {
  return (
    <AnimatePresence>
      {isErr && (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ delay: 0.05 }}
          className="text-destructive text-[14px]"
        >
          
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ValidationError;
