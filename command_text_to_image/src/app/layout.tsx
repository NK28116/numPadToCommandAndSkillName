// src/app/layout.tsx

import React from 'react';
import './globals.css'; // グローバルスタイルシートを読み込みたい場合

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>My Next.js App</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;