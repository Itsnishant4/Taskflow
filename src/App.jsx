import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { BoltIcon } from '@heroicons/react/24/solid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PlusIcon, ListBulletIcon, Squares2X2Icon, TrophyIcon, SparklesIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import confetti from 'canvas-confetti';
import { TrashIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';




const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('xp')) || 0);
  const [level, setLevel] = useState(() => parseInt(localStorage.getItem('level')) || 1);
  const [achievements, setAchievements] = useState(() => JSON.parse(localStorage.getItem('achievements')) || []);
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('streak')) || 0);
  const [lastCompletedDate, setLastCompletedDate] = useState(() => localStorage.getItem('lastCompletedDate'));
  const location = useLocation();

  useEffect(() => {
    const now = new Date();
    const last = new Date(lastCompletedDate);
    if (last.toDateString() === now.toDateString()) return;

    if (Math.abs(now - last) > 86400000 * 2) {
      setStreak(0);
    }
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('xp', xp);
    localStorage.setItem('level', level);
    localStorage.setItem('achievements', JSON.stringify(achievements));
    localStorage.setItem('streak', streak);
    localStorage.setItem('lastCompletedDate', lastCompletedDate);
  }, [tasks, xp, level, achievements, streak, lastCompletedDate]);

  const addXp = (amount) => {
    setXp(prev => {
      const newXp = prev + amount;
      if (newXp >= level * 100) {
        setLevel(prevLevel => {
          const newLevel = prevLevel + 1;
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });

          return newLevel;
        });
        return newXp % (level * 100);
      }
      return newXp;
    });
  };

  const completeTask = (taskId) => {
    const now = new Date();
    const task = tasks.find(t => t.id === taskId);

    if (!task.completed) {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);

      if (!lastCompletedDate || new Date(lastCompletedDate).toDateString() === yesterday.toDateString()) {
        setStreak(prev => prev + 1);
      } else if (new Date(lastCompletedDate).toDateString() !== now.toDateString()) {
        setStreak(1);
      }

      setLastCompletedDate(now.toISOString());
    }

    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));


    addXp(20);
    checkAchievements();
  };

  const checkAchievements = () => {
    const completedTasks = tasks.filter(t => t.completed).length;
    const newAchievements = [];

    const achievementChecks = {
      '5_tasks': completedTasks >= 5,
      '10_tasks': completedTasks >= 10,
      '3_streak': streak >= 3,
      '7_streak': streak >= 7,
    };

    Object.entries(achievementChecks).forEach(([key, condition]) => {
      if (condition && !achievements.includes(key)) {
        newAchievements.push(key);
      }
    });

    if (newAchievements.length > 0) {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { y: 0.5 }
      });
      setAchievements([...achievements, ...newAchievements]);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${(xp / (level * 100)) * 100}%` }}
        >

        </div>
      </div>


      <AnimatePresence mode='wait'>

        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <HomeScreen
              tasks={tasks}
              setTasks={setTasks}
              darkMode={darkMode}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              completeTask={completeTask}
              xp={xp}
              level={level}
              achievements={achievements}
              streak={streak}
            />
          } />
          <Route path="/settings" element={
            <Settings
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              setTasks={setTasks}
              setAchievements={setAchievements}
              setXp={setXp}
              setStreak={setStreak}
              setLevel={setLevel}
            />
          } />
        </Routes>
      </AnimatePresence>


      {/* Animated Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {tasks.filter(t => t.completed).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1, 0],
              y: [-20, Math.random() * -100 - 50],
              x: Math.random() * 100 - 50,
              rotate: Math.random() * 360
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            {['🌟', '🎉', '💯', '🔥'][Math.floor(Math.random() * 4)]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const HomeScreen = ({ tasks, setTasks, darkMode, selectedDate, setSelectedDate, completeTask, xp, level, achievements, streak }) => {
  const [viewMode, setViewMode] = useState('list');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'low',
    category: 'personal',
    completed: false
  });


  const filteredTasks = tasks.filter(task =>
    new Date(task.dueDate).toDateString() === selectedDate.toDateString()
  );

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      setTasks([...tasks, {
        ...newTask,
        id: Date.now(),
        createdAt: new Date()
      }]);
      setNewTask({
        title: '',
        description: '',
        dueDate: new Date(),
        priority: 'low',
        category: 'personal',
        completed: false
      });
      document.getElementById('taskModal').close();
    }
  };

  return (


    <div className="p-4 max-w-4xl mx-auto font-[Helvetica]">
      <div className="flex flex-col gap-4 mb-6">
        <div className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2 border-purple-200`}>
          <div className="flex items-center gap-3">
            <BoltIcon className="w-8 h-8 text-yellow-500" />
            <div>
              <h2 className="text-xl font-bold font-[Helvetica]">Task Flow</h2>

            </div>
          </div>
          <div className="text-center">

            <Link to='/settings' className=''><Cog6ToothIcon className="w-8 h-8 text-gray-500" /></Link>

          </div>
        </div>
      </div>
      {/* Progress Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2 border-purple-200`}>
          <div className="flex items-center gap-3">
            <TrophyIcon className="w-8 h-8 text-yellow-500" />
            <div>
              <h2 className="text-xl font-bold">Level {level}</h2>
              <p className="text-sm text-gray-500">{xp} / {level * 100} XP</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{streak}</div>
            <div className="text-sm text-gray-500">Day Streak 🔥</div>
          </div>
        </div>


        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2 border-purple-200 mb-6`}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-purple-500" />
            Your Achievements
          </h3>

          {achievements.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Complete tasks to unlock achievements! ✨
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {achievements.map(achievement => (
                <motion.div
                  key={achievement}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center gap-2 p-2 rounded-lg ${darkMode ? 'bg-purple-900 text-purple-100' : 'bg-purple-100 text-purple-800'
                    }`}
                >
                  <SparklesIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">
                    {{
                      '5_tasks': '🥉 Task Beginner (5+ tasks)',
                      '10_tasks': '🥈 Task Master (10+ tasks)',
                      '3_streak': '🔥 Hot Streak (3 days)',
                      '7_streak': '🚀 Weekly Champion (7 days)'
                    }[achievement]}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Task Management */}
      <div className={`flex gap-4 mb-6 p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2 border-purple-200`}>
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          className={`p-2 rounded-lg w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border border-purple-300`}
        />
        <button
          onClick={() => setViewMode(prev => prev === 'list' ? 'grid' : 'list')}
          className="p-2 rounded-lg hover:bg-purple-100 transition-all"
        >
          {viewMode === 'list' ? (
            <Squares2X2Icon className="w-6 h-6 text-purple-600" />
          ) : (
            <ListBulletIcon className="w-6 h-6 text-purple-600" />
          )}
        </button>
      </div>

      {/* Task List */}
      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'flex flex-col gap-4'}`}>
        {filteredTasks.map(task => (
          <motion.div
            key={task.id}
            layout
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2 ${task.priority === 'high' ? 'border-red-300' :
              task.priority === 'medium' ? 'border-yellow-300' : 'border-green-300'
              }`}
          >
            <button
              onClick={() => completeTask(task.id)}
              className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.completed
                ? 'bg-green-500 border-green-600'
                : 'bg-transparent border-gray-300'
                }`}
            >
              {task.completed && '✓'}
            </button>
            <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
            <p className="text-gray-600 mb-2">{task.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className={`px-2 py-1 rounded ${task.priority === 'high' ? 'bg-red-100 text-red-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                {task.priority} priority
              </span>
              <span className="text-purple-600">{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Task Modal */}
      <dialog id="taskModal" className={`rounded-xl p-6 w-[500px] backdrop:bg-black/30 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
        <form method="dialog" onSubmit={addTask}>
          <div className="space-y-4">
            {/* Task Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Task Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className={`w-full p-2 rounded-lg border ${darkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-300'
                  }`}
                placeholder="Enter task title"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className={`w-full p-2 rounded-lg border ${darkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-300'
                  }`}
                placeholder="Add task description"
                rows="3"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <DatePicker
                selected={newTask.dueDate}
                onChange={(date) => setNewTask({ ...newTask, dueDate: date })}
                className={`w-full p-2 rounded-lg border ${darkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-300'
                  }`}
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className={`w-full p-2 rounded-lg border ${darkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-300'
                  }`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                className={`w-full p-2 rounded-lg border ${darkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-300'
                  }`}
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="shopping">Shopping</option>
                <option value="study">Study</option>
              </select>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => document.getElementById('taskModal').close()}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add Task
              </button>
            </div>
          </div>
        </form>
      </dialog>

      {/* Add Task Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all"
        onClick={() => document.getElementById('taskModal').showModal()}
      >
        <PlusIcon className="w-8 h-8" />
      </motion.button>
    </div>


  );

};

const Settings = ({
  darkMode,
  setDarkMode,
  setTasks,
  setAchievements,
  setXp,
  setLevel,
  setStreak
}) => {
  const handleDeleteAll = () => {
    setTasks([]);
    setAchievements([]);
    setXp(0);
    setLevel(1);
    setStreak(0);
    document.getElementById('deleteAllModal').close();
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}  border-2 border-purple-200`}>
        <div className='flex items-center gap-x-2 mb-4 '>
          <Link to={'/'}><ArrowLeftIcon className='w-6 font-extrabold text-purple-600 cursor-pointer' /></Link>
          <h2 className="text-2xl font-bold ">Settings</h2>
        </div>
        {/* Existing settings... */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2 border-purple-200`}>
          <h2 className="text-xl font-bold mb-2 text-purple-600">Mode</h2>

          <div className={`flex items-center justify-between p-3 rounded-lg hover:bg-purple-200 hover:text-black transition-all`}>
            <div className="flex items-center gap-3">
              {darkMode ? (
                <MoonIcon className="w-5 h-5 text-purple-600" />
              ) : (
                <SunIcon className="w-5 h-5 text-purple-600" />
              )}
              <span>Dark Mode</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-purple-600' : 'bg-gray-200'
                }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
            </button>
          </div>
        </div>

        {/* Delete All Tasks Section */}
        <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-red-50'} border-2 border-red-200`}>
          <h3 className="text-lg font-semibold mb-4 text-red-600 flex items-center gap-2">
            <TrashIcon className="w-5 h-5" />
            Dangerous Zone
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-2">This will permanently delete:</p>
              <ul className="text-sm list-disc pl-4">
                <li>All tasks</li>
                <li>Progress and achievements</li>
                <li>XP and level progress</li>
                <li>Current streak</li>
              </ul>
            </div>
            <button
              onClick={() => document.getElementById('deleteAllModal').showModal()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Reset Everything
            </button>
          </div>
        </div>
        <div className='p-4 border-blue-300 w-full border-2 mt-8 rounded-lg bg-blue-100'>
      <footer class=" text-black text-center p-1 w-full font-medium"><p class="text-lg">Made with ❤️ by <a href="https://github.com/Itsnishant4/" class="text-blue-500">Nishant</a></p><p>2025 © Copyright All Rights Reserved.</p></footer>
          </div>
      </div>

      {/* Confirmation Dialog */}
      <dialog id="deleteAllModal" className={`rounded-xl p-6 backdrop:bg-black/50 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <h3 className="text-2xl font-bold mb-4 text-red-500">⚠️ Warning!</h3>
        <p className="mb-6">This will permanently delete all tasks and reset your progress. Are you absolutely sure?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => document.getElementById('deleteAllModal').close()}
            className={`px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteAll}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Confirm Nuclear Delete
          </button>
        </div>
      </dialog>
    </div >
  );
};

export default App;