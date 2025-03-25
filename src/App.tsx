import React, { useState } from 'react';
import { PinConfigTable } from './components/PinConfigTable';
import { LinkingSection } from './components/LinkingSection';

interface PinConfig {
  pin: string;
  mode: 'input' | 'output';
  pull: 'none' | 'pullup' | 'pulldown';
  inverted: boolean;
  linked_to?: string;
}

const App: React.FC = () => {
  const [pinConfigs, setPinConfigs] = useState<PinConfig[]>([]);

  const handleConfigChange = (configs: PinConfig[]) => {
    setPinConfigs(configs);
  };

  const handleGenerateConfig = () => {
    const config = {
      pins: pinConfigs
    };
    console.log('Generated config:', config);
    // TODO: Save config and trigger flash process via Tauri command
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Zigbee Configurator</h1>
        
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pin Configuration</h2>
          <PinConfigTable
            configs={pinConfigs}
            onChange={handleConfigChange}
          />
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Input/Output Linking</h2>
          <LinkingSection
            configs={pinConfigs}
            onChange={handleConfigChange}
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleGenerateConfig}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate Config
          </button>
          <button
            onClick={() => {}}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Flash Firmware
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;