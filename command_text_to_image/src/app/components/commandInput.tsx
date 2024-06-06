// src/components/CommandInput.tsx
'use client'
import React, { useState } from 'react';

type CommandInputProps = {
  onConvert: (command: string) => void;
  onClear: () => void;
};

const CommandInput: React.FC<CommandInputProps> = ({ onConvert, onClear }) => {
  const [command, setCommand] = useState("");

  const handleConvertButtonClick = () => {
    onConvert(command);
  };

  const handleClearButtonClick = () => {
    setCommand("");
    onClear();
  };

  return (
    <div className="outline">
      <input
        value={command}
        onChange={(e) => setCommand(e.target.value)}
      />
      <button type="button" onClick={handleConvertButtonClick}>
        テキストを変換
      </button>
      <button type="button" onClick={handleClearButtonClick}>
        テキストをクリア
      </button>
    </div>
  );
};

export default CommandInput;
