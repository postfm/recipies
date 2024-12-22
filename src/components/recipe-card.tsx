'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { CloseOutlined, HeartOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import Image from 'next/image';

export default function RecipeCard() {
  return (
    <StyleProvider layer>
      <Card
        className='w-full max-w-[250px] pl-0 mb-6 border-none bg-[#23180d] text-[#d57d1f]  rounded-none'
        title={
          <Button
            className='bg-transparent border-none'
            shape='circle'
            icon={
              <HeartOutlined
                className='text-[#d57d1f] hover:text-[#FFAB50] text-3xl hover:cursor-pointer'
                key={'favorite'}
              />
            }
          />
        }
        extra={
          <Button
            className='bg-transparent border-none'
            shape='circle'
            icon={
              <CloseOutlined
                className='text-[#d57d1f] hover:text-[#FFAB50] text-3xl hover:cursor-pointer'
                key={'close'}
              />
            }
          />
        }
        cover={
          <Image
            src='https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
            alt='ui/ux review check'
            width={250}
            height={250}
          />
        }
      >
        <p className='!color-[#d57d1f] !hover:text-[#FFAB50] text-2xl hover:text-[#FFAB50] hover:cursor-pointer'>
          Europe Street beat
        </p>
      </Card>
    </StyleProvider>
  );
}
