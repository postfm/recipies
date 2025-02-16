'use client';

import { CloseOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import Image from 'next/image';
import { Meal } from '../helpers/interface';
import useMealsStore from '@/store/meals-store';
import { Button, Card, CardBody, CardHeader } from '@heroui/react';

interface RecipeCardInterface {
  meal: Meal;
  handleClickCloseButton: (idMeal: string) => void;
}

export default function RecipeCard({ meal, handleClickCloseButton }: RecipeCardInterface) {
  const meals = useMealsStore((state) => state.meals);
  const setFavoriteMeal = useMealsStore((state) => state.setFavoriteMeal);

  function clickFavoriteButtonHandler() {
    meals.filter((item) => item.idMeal === meal.idMeal)[0].isFavorite = !meal.isFavorite;
    setFavoriteMeal(meal);
  }

  return (
    <Card className='recipe-card w-full max-w-[250px] pl-0 mb-6 border-[1.1px] border-[#23180d] bg-[#23180d] text-[#d57d1f]  rounded-none'>
      <CardHeader className='justify-between absolute rounded-none z-10 bg-black/60 p-1'>
        <Button
          isIconOnly
          className='bg-transparent border-none'
          onPress={clickFavoriteButtonHandler}
        >
          {meal.isFavorite ? (
            <HeartFilled
              className='text-[#d57d1f] hover:text-[#FFAB50] text-2xl hover:cursor-pointer'
              key={'favorite'}
            />
          ) : (
            <HeartOutlined
              className='text-[#d57d1f] hover:text-[#FFAB50] text-2xl hover:cursor-pointer'
              key={'favorite'}
            />
          )}
        </Button>
        <Button
          isIconOnly
          className='bg-transparent border-none'
          onPress={() => handleClickCloseButton(meal.idMeal)}
        >
          <CloseOutlined
            className='text-[#d57d1f] hover:text-[#FFAB50] text-2xl hover:cursor-pointer'
            key={'close'}
          />
        </Button>
      </CardHeader>
      <div onClick={() => alert(`Go to recipe ${meal.idMeal} page`)}>
        <CardBody className='p-0 hover:cursor-pointer'>
          <Image
            src={meal.strMealThumb}
            alt='ui/ux review check'
            width={250}
            height={250}
          />
          <p className='!color-[#d57d1f] !hover:text-[#FFAB50] text-sm hover:text-[#FFAB50] hover:cursor-pointer text-center'>
            {meal.strMeal}
          </p>
        </CardBody>
      </div>
    </Card>
  );
}
