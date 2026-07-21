import { motion } from 'motion/react';
import { Check, Circle, Trash2, Clock } from 'lucide-react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  // Simple relative time formatter
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const formatRelativeTime = (time: number) => {
    const diff = (time - Date.now()) / 1000;
    if (Math.abs(diff) < 60) return 'just now';
    if (Math.abs(diff) < 3600) return rtf.format(Math.round(diff / 60), 'minute');
    if (Math.abs(diff) < 86400) return rtf.format(Math.round(diff / 3600), 'hour');
    return rtf.format(Math.round(diff / 86400), 'day');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`group flex items-center justify-between p-6 border-x border-b border-white/5 transition-all duration-200 first:border-t ${
        task.completed
          ? 'bg-black/50'
          : 'bg-transparent hover:bg-white/[0.02]'
      }`}
    >
      <div className="flex items-center gap-6 flex-1 min-w-0">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={onToggle}
          className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-none border transition-all duration-300 ${
            task.completed
              ? 'bg-[#d9ff00] border-[#d9ff00] text-black'
              : 'border-white/20 text-transparent hover:border-white/50 focus:outline-none'
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
        </motion.button>
        <div className="flex flex-col min-w-0 flex-1">
          <span 
            className={`text-sm tracking-[0.5px] truncate transition-all duration-300 ${
              task.completed ? 'text-white/30 line-through' : 'text-white font-medium'
            }`}
          >
            {task.text}
          </span>
          <span className="text-[10px] uppercase tracking-widest font-mono text-white/40 flex items-center gap-2 mt-1.5">
            <span className={`px-1.5 py-0.5 ${
              task.completed ? 'opacity-50' : ''
            } ${
              task.priority === 'P1' ? 'bg-[#d9ff00] text-black font-bold' : 
              task.priority === 'P2' ? 'bg-white/10 text-white' : 
              'bg-white/5 text-white/40'
            }`}>
              {task.priority}
            </span>
            // {formatRelativeTime(task.createdAt)}
          </span>
        </div>
      </div>
      
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onDelete}
        className="ml-4 flex-shrink-0 p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-none opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all focus:outline-none uppercase text-[10px] font-mono tracking-widest"
        aria-label="Delete task"
      >
        <Trash2 className="w-4 h-4 hidden" />
        DEL
      </motion.button>
    </motion.div>
  );
}
