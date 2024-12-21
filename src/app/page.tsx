'use client';

import { Card } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

export default function Home() {
  return (
    <StyleProvider layer>
      <div className='App'>
        <Card>Button</Card>
      </div>
    </StyleProvider>
  );
}
