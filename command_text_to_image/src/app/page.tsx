// src/app/page.tsx
/**
 * #TODO:いい感じのスタイルを探す
 */
'use client'
import React from 'react';
import CommandForm from './components/CommandForm';

const Home: React.FC = () => {
  return (
  <>
    <div className="border-2 border-red-400">
      <h1>技コマンド入力</h1>
      <CommandForm />
          <div className="flex gap-4 mx-4">
            <div className="w-1/2 flex flex-col gap-1">
              <div className="bg-green-400">Column Left Row 1</div>
              <div className="bg-green-400">Column Left Row 2</div>
              <div className="bg-green-400">Column Left Row 3</div>
            </div>
            <div className="w-1/2  flex flex-col gap-1">
              <div className="bg-blue-500">Column Right Row 1</div>
              <div className="bg-blue-500">Column Right Row 2</div>
              <div className="bg-blue-500">Column Right Row 3</div>
            </div>
          </div>
    </div>
   </>
  );
};

export default Home;
