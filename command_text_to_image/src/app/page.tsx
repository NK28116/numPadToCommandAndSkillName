// src/app/page.tsx
/**
 * #TODO:いい感じのスタイルを探す
 */
'use client'
import React from 'react';
import CommandForm from './components/CommandForm';

const Home: React.FC = () => {
  return (
    <div>
      <h1>技コマンド入力</h1>
      <CommandForm />
    </div>
  );
};

export default Home;
