// src/components/CommandForm.tsx
'use client'
import React, { useState } from 'react';
import CommandInput from './commandInput';
import ImageList from './imageList';
import { generateImageList, ImageItem } from '../util/imageUtl';

const CommandForm: React.FC = () => {
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);

  const handleConvert = (command: string) => {
    const images = generateImageList(command);
    setImageItems(images);
  };

  const handleClear = () => {
    setImageItems([]);
  };

  return (
    <div>
      <CommandInput onConvert={handleConvert} onClear={handleClear} />
      <ImageList items={imageItems} />
    </div>
  );
};

export default CommandForm;
