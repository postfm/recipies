import React from 'react';
import Logo from './logo';

export default function Header() {
  return (
    <header className='flex items-center w-full h-full pt-[15px] bg-[#23180d]'>
      <div className='flex justify-between w-[1170px] px-[15px] mx-auto'>
        <Logo />
      </div>
    </header>
  );
}
