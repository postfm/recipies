import React from 'react';
import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      src='/logo-small.png'
      alt='Logo'
      width={296}
      height={41}
    />
  );
}
