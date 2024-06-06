// src/app/page.tsx
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
