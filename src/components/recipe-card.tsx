'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { CloseOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Button, Card, ConfigProvider } from 'antd';
import Image from 'next/image';
import { Meal } from '../helpers/interface';

const GlobalToken = {
  paddingLG: 16,
  borderRadiusLG: 0,
};

interface RecipeCardInterface {
  meal: Meal;
  clickFavoriteButtonHandler: (evt) => void;
}

export default function RecipeCard({ meal, clickFavoriteButtonHandler }: RecipeCardInterface) {
  return (
    <StyleProvider layer>
      <ConfigProvider
        theme={{
          token: GlobalToken,
        }}
      >
        <Card
          className='recipe-card w-full max-w-[250px] pl-0 mb-6 border-[1.1px] border-[#23180d] bg-[#23180d] text-[#d57d1f]  rounded-none'
          title={
            <Button
              className='bg-transparent border-none'
              shape='circle'
              icon={
                meal.isFavorite ? (
                  <HeartFilled
                    className='text-[#d57d1f] hover:text-[#FFAB50] text-3xl hover:cursor-pointer'
                    key={'favorite'}
                  />
                ) : (
                  <HeartOutlined
                    className='text-[#d57d1f] hover:text-[#FFAB50] text-3xl hover:cursor-pointer'
                    key={'favorite'}
                  />
                )
              }
              onClick={clickFavoriteButtonHandler}
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
              onClick={() => alert(`Recipe ${meal.idMeal} remove`)}
            />
          }
          cover={
            <Image
              src={meal.strMealThumb}
              alt='ui/ux review check'
              width={250}
              height={250}
            />
          }
        >
          <p
            className='!color-[#d57d1f] !hover:text-[#FFAB50] text-sm hover:text-[#FFAB50] hover:cursor-pointer'
            onClick={() => alert(`Go to recipe ${meal.idMeal} page`)}
          >
            {meal.strMeal}
          </p>
        </Card>
      </ConfigProvider>
    </StyleProvider>
  );
}
