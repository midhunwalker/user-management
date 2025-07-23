import React, { useState } from 'react';
import { X, Plus, Minus, DollarSign, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';

const WalletModal = ({ user, onClose, onWalletUpdate }) => {
  const [adjustmentAmount, setAdjustmentAmount] = useState('');
  const [adjustmentType, setAdjustmentType] = useState('add');
  const [adjustmentReason, setAdjustmentReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const transactions = [
    {
      id: 1,
      type: 'credit',
      amount: 25.00,
      description: 'Task completion bonus',
      date: '2024-01-15 10:30 AM',
      status: 'completed'
    },
    {
      id: 2,
      type: 'debit',
      amount: 10.00,
      description: 'Withdrawal to PayPal',
      date: '2024-01-14 2:15 PM',
      status: 'completed'
    },
    {
      id: 3,
      type: 'credit',
      amount: 15.00,
      description: 'Survey completion',
      date: '2024-01-13 9:45 AM',
      status: 'completed'
    },
    {
      id: 4,
      type: 'credit',
      amount: 5.00,
      description: 'Referral bonus',
      date: '2024-01-12 4:20 PM',
      status: 'completed'
    }
  ];

  const handleWalletAdjustment = async () => {
    if (!adjustmentAmount || !adjustmentReason) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const amount = parseFloat(adjustmentAmount);
    const newBalance = adjustmentType === 'add' 
      ? user.walletBalance + amount 
      : user.walletBalance - amount;
    
    onWalletUpdate(user.id, Math.max(0, newBalance));
    
    setIsProcessing(false);
    setAdjustmentAmount('');
    setAdjustmentReason('');
    
    alert('Wallet adjustment completed successfully!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Wallet Management - {user.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Current Balance */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Current Balance</p>
                <p className="text-3xl font-bold">${user.walletBalance.toFixed(2)}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Wallet Adjustment */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Adjust Wallet Balance</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adjustment Type
                  </label>
                  <select
                    value={adjustmentType}
                    onChange={(e) => setAdjustmentType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="add">Add Funds</option>
                    <option value="subtract">Subtract Funds</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    value={adjustmentAmount}
                    onChange={(e) => setAdjustmentAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Adjustment
                </label>
                <textarea
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter reason for wallet adjustment"
                />
              </div>
              <button
                onClick={handleWalletAdjustment}
                disabled={isProcessing || !adjustmentAmount || !adjustmentReason}
                className={`flex items-center gap-2 px-4 py-2 text-white rounded-md transition-colors ${
                  adjustmentType === 'add' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    {adjustmentType === 'add' ? (
                      <Plus className="w-4 h-4" />
                    ) : (
                      <Minus className="w-4 h-4" />
                    )}
                    {adjustmentType === 'add' ? 'Add Funds' : 'Subtract Funds'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Transaction History */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'credit' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.type === 'credit' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">{transaction.status}</p>
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

export default WalletModal;