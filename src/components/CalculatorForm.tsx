import React, { useState } from 'react';
import { RefreshCw, Edit3, Calculator, DollarSign, Percent, Package, Hash } from 'lucide-react';
import { fetchRandomValues } from '../api/mockApi';
import type { FormValues, InputSource } from '../types/form';

const initialValues: FormValues = {
  quantity: '',
  price: '',
  total: '',
  profit: ''
};

export default function CalculatorForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [loading, setLoading] = useState(false);
  const [inputSource, setInputSource] = useState<InputSource>('manual');

  const fetchValues = async () => {
    setLoading(true);
    try {
      const data = await fetchRandomValues();
      setValues({
        quantity: data.quantity.toString(),
        price: data.price.toString(),
        total: data.total.toString(), // Use API's random total
        profit: data.profit.toString()
      });
      setInputSource('api');
    } catch (error) {
      console.error('Failed to fetch values:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormValues, value: string) => {
    // Switch to manual mode if we were in API mode
    if (inputSource === 'api') {
      setInputSource('manual');
    }

    setValues(prev => {
      const newValues = { ...prev, [field]: value };

      // Only calculate total in manual mode when quantity or price changes
      if (inputSource === 'manual' || field === 'quantity' || field === 'price') {
        const quantity = parseFloat(newValues.quantity) || 0;
        const price = parseFloat(newValues.price) || 0;
        newValues.total = (quantity * price).toFixed(2);
      }

      return newValues;
    });
  };

  const getInputIcon = (field: keyof FormValues) => {
    switch (field) {
      case 'quantity':
        return <Package className="h-5 w-5 text-gray-400" />;
      case 'price':
        return <DollarSign className="h-5 w-5 text-gray-400" />;
      case 'total':
        return <Hash className="h-5 w-5 text-gray-400" />;
      case 'profit':
        return <Percent className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Calculator className="h-7 w-7" />
              Value Calculator
            </h2>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                inputSource === 'api' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-green-500 text-white'
              }`}>
                {inputSource === 'api' ? 'API Values' : 'Manual Input'}
              </span>
              <button
                onClick={fetchValues}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 transition-colors duration-200"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                <span className="ml-2">Get Random Values</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {getInputIcon('quantity')}
                </div>
                <input
                  type="number"
                  value={values.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  min="0"
                  step="1"
                  placeholder="Enter quantity"
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {getInputIcon('price')}
                </div>
                <input
                  type="number"
                  value={values.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  min="0"
                  step="0.01"
                  placeholder="Enter price"
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {getInputIcon('total')}
                </div>
                <input
                  type="number"
                  value={values.total}
                  readOnly
                  className="pl-10 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profit %
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {getInputIcon('profit')}
                </div>
                <input
                  type="number"
                  value={values.profit}
                  onChange={(e) => handleInputChange('profit', e.target.value)}
                  min="0"
                  step="0.1"
                  placeholder="Enter profit percentage"
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-gray-400" />
              <p className="text-sm text-gray-600">
                {inputSource === 'api' 
                  ? "Values are from API - values are independent"
                  : "Manual input mode - Total updates automatically based on Quantity × Price"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}