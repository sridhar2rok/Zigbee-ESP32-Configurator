import React from 'react';

interface PinConfig {
  pin: string;
  mode: 'input' | 'output';
  pull: 'none' | 'pullup' | 'pulldown';
  inverted: boolean;
  linked_to?: string;
}

interface LinkingSectionProps {
  configs: PinConfig[];
  onChange: (configs: PinConfig[]) => void;
}

export const LinkingSection: React.FC<LinkingSectionProps> = ({ configs, onChange }) => {
  const inputPins = configs.filter(config => config.mode === 'input');
  const outputPins = configs.filter(config => config.mode === 'output');

  const handleLinkChange = (inputPin: PinConfig, outputPinId: string) => {
    const newConfigs = configs.map(config => {
      if (config.pin === inputPin.pin) {
        return { ...config, linked_to: outputPinId };
      }
      return config;
    });
    onChange(newConfigs);
  };

  if (inputPins.length === 0 || outputPins.length === 0) {
    return (
      <div className="text-gray-500 italic">
        Configure at least one input and one output pin to create links.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {inputPins.map((inputPin) => (
        <div key={inputPin.pin} className="flex items-center gap-4">
          <span className="text-gray-700 font-medium min-w-[100px]">{inputPin.pin}</span>
          <span className="text-gray-500">→</span>
          <select
            value={inputPin.linked_to || ''}
            onChange={(e) => handleLinkChange(inputPin, e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Output Pin</option>
            {outputPins.map((outputPin) => (
              <option key={outputPin.pin} value={outputPin.pin}>
                {outputPin.pin}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};