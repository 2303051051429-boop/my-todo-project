import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Command, CornerDownLeft } from 'lucide-react';
import { Task } from '../types';
import TaskItem from './TaskItem';

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('todo-cli-tasks');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
    }
    return [
      { id: '1', text: 'Initialize project workspace', completed: true, createdAt: Date.now() - 100000, priority: 'P1' },
      { id: '2', text: 'Configure local environment variables', completed: false, createdAt: Date.now() - 50000, priority: 'P2' },
      { id: '3', text: 'Deploy to production cluster', completed: false, createdAt: Date.now(), priority: 'P3' },
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState<'P1' | 'P2' | 'P3'>('P2');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('todo-cli-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
      priority,
    };

    setTasks((prev) => [newTask, ...prev]);
    setInputValue('');
    setPriority('P2');
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const purgeCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;
  const progressPercent = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  // Keyboard shortcut focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  return (
    <div className="max-w-4xl mx-auto px-8 py-12 md:py-20 min-h-screen border-x border-[#1a1a1a] bg-[#050505] flex flex-col">
      <header className="mb-16 border-b border-white/5 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex flex-col relative"
        >
          <div className="flex items-start justify-between">
            <h1 className="text-[60px] md:text-[100px] font-black leading-[0.8] tracking-[-4px] md:tracking-[-6px] uppercase bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent m-0">
              Nexus<br/>Tasks
            </h1>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6 hidden sm:flex">
              <div className="w-16 h-[2px] bg-[#d9ff00]"></div>
              <span className="text-[10px] font-mono text-white/40 tracking-[4px] uppercase" style={{ writingMode: 'vertical-rl' }}>
                VER 2.0.4 // {today}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-12">
            <p className="text-white/60 flex gap-8 text-xs tracking-[1px] uppercase font-medium">
              <span><strong className="text-white font-bold">{tasks.length}</strong> total</span>
              <span><strong className="text-white font-bold">{pendingCount}</strong> pending</span>
              <span><strong className="text-[#d9ff00] font-bold">{completedCount}</strong> done</span>
            </p>
            {completedCount > 0 && (
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={purgeCompleted}
                className="text-[10px] uppercase font-mono tracking-widest text-white/40 hover:text-white transition-colors border border-white/5 hover:border-white/20 px-3 py-1.5"
              >
                Purge Completed
              </motion.button>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="h-[2px] w-full bg-white/5 mt-6 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#d9ff00]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </header>

      <motion.form 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={addTask} 
        className="mb-12 relative group"
      >
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center gap-3">
          <span className="font-mono text-[10px] text-[#d9ff00] uppercase tracking-widest pointer-events-none">ADD/</span>
          <motion.button 
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setPriority(p => p === 'P1' ? 'P2' : p === 'P2' ? 'P3' : 'P1')}
            className={`font-mono text-[10px] px-1.5 py-0.5 transition-colors uppercase tracking-widest ${
              priority === 'P1' ? 'bg-[#d9ff00] text-black font-bold' : 
              priority === 'P2' ? 'bg-white/10 text-white hover:bg-white/20' : 
              'bg-white/5 text-white/40 hover:bg-white/10'
            }`}
          >
            {priority}
          </motion.button>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full bg-transparent border border-white/5 py-6 pl-32 pr-24 text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-all text-sm tracking-[0.5px]"
        />
        <div className="absolute inset-y-0 right-0 pr-6 flex items-center gap-3">
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-white/5 text-[10px] font-mono text-white/40 tracking-widest uppercase border border-white/10 pointer-events-none group-focus-within:opacity-0 transition-opacity">
            ⌘K
          </kbd>
          <motion.button 
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 text-black bg-white rounded-full font-bold text-[10px] uppercase tracking-[1px] transition-colors hidden sm:block opacity-0 group-focus-within:opacity-100 absolute right-6 hover:bg-[#d9ff00]"
            onClick={addTask}
          >
            Start
          </motion.button>
        </div>
      </motion.form>

      <div className="space-y-0 flex flex-col">
        <AnimatePresence mode="popLayout">
          {tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-24 border border-white/5"
            >
              <p className="text-white/40 text-[11px] uppercase tracking-[2px]">System idle. No pending operations.</p>
            </motion.div>
          ) : (
            tasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onToggle={() => toggleTask(task.id)} 
                onDelete={() => deleteTask(task.id)} 
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
