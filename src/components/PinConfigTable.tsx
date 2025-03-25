import React from 'react';

interface PinConfig {
  pin: string;
  mode: 'input' | 'output';
  pull: 'none' | 'pullup' | 'pulldown';
  inverted: boolean;
  linked_to?: string;
}

interface PinConfigTableProps {
  configs: PinConfig[];
  onChange: (configs: PinConfig[]) => void;
}

const GPIO_PINS = [
  'GPIO1', 'GPIO2', 'GPIO3', 'GPIO4', 'GPIO5', 'GPIO6',
  'GPIO7', 'GPIO8', 'GPIO9', 'GPIO10', 'GPIO11', 'GPIO12'
];

export const PinConfigTable: React.FC<PinConfigTableProps> = ({ configs, onChange }) => {
  const handleAddPin = () => {
    if (configs.length < 4) {
      onChange([
        ...configs,
        { pin: '', mode: 'input', pull: 'none', inverted: false }
      ]);
    }
  };

  const handleRemovePin = (index: number) => {
    const newConfigs = configs.filter((_, i) => i !== index);
    onChange(newConfigs);
  };

  const handleConfigChange = (index: number, field: keyof PinConfig, value: any) => {
    const newConfigs = configs.map((config, i) => {
      if (i === index) {
        return { ...config, [field]: value };
      }
      return config;
    });
    onChange(newConfigs);
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pin</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pull</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inverted</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {configs.map((config, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={config.pin}
                  onChange={(e) => handleConfigChange(index, 'pin', e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Pin</option>
                  {GPIO_PINS.map((pin) => (
                    <option key={pin} value={pin}>{pin}</option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={config.mode}
                  onChange={(e) => handleConfigChange(index, 'mode', e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="input">Input</option>
                  <option value="output">Output</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={config.pull}
                  onChange={(e) => handleConfigChange(index, 'pull', e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="none">None</option>
                  <option value="pullup">Pull-up</option>
                  <option value="pulldown">Pull-down</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={config.inverted}
                  onChange={(e) => handleConfigChange(index, 'inverted', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleRemovePin(index)}
                  className="text-red-600 hover:text-red-900"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {configs.length < 4 && (
        <button
          onClick={handleAddPin}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Pin
        </button>
      )}
    </div>
  );
};