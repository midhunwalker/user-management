import React, { useState } from 'react';
import { X, Plus, Clock, DollarSign, CheckCircle } from 'lucide-react';

const TaskModal = ({ user, onClose }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskReward, setTaskReward] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);

  const existingTasks = [
    {
      id: 1,
      title: 'Complete Survey #1',
      description: 'Fill out the customer satisfaction survey',
      reward: 5.00,
      status: 'completed',
      deadline: '2024-01-15'
    },
    {
      id: 2,
      title: 'Product Review',
      description: 'Write a review for the latest product',
      reward: 10.00,
      status: 'pending',
      deadline: '2024-01-20'
    },
    {
      id: 3,
      title: 'Beta Testing',
      description: 'Test the new feature and provide feedback',
      reward: 15.00,
      status: 'in_progress',
      deadline: '2024-01-25'
    }
  ];

  const handleAssignTask = async () => {
    if (!taskTitle || !taskDescription || !taskReward) return;
    
    setIsAssigning(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsAssigning(false);
    setTaskTitle('');
    setTaskDescription('');
    setTaskReward('');
    setTaskDeadline('');
    
    // Show success message or update UI
    alert('Task assigned successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Task Management - {user.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Assign New Task */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Assign New Task</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reward ($)
                  </label>
                  <input
                    type="number"
                    value={taskReward}
                    onChange={(e) => setTaskReward(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter task description"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline (Optional)
                </label>
                <input
                  type="date"
                  value={taskDeadline}
                  onChange={(e) => setTaskDeadline(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleAssignTask}
                disabled={isAssigning || !taskTitle || !taskDescription || !taskReward}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isAssigning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Assigning...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Assign Task
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Existing Tasks */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Existing Tasks</h3>
            <div className="space-y-3">
              {existingTasks.map((task) => (
                <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                          {getStatusIcon(task.status)}
                          {task.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ${task.reward.toFixed(2)}
                        </div>
                        {task.deadline && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {task.deadline}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;