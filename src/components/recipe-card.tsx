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
      <CardHeader>
        <Button
          isIconOnly
          className='bg-transparent border-none'
          onPress={() => handleClickCloseButton(meal.idMeal)}
        >
          <CloseOutlined
            className='text-[#d57d1f] hover:text-[#FFAB50] text-3xl hover:cursor-pointer'
            key={'close'}
          />
        </Button>
        <Button
          className='bg-transparent border-none'
          onPress={clickFavoriteButtonHandler}
        >
          {meal.isFavorite ? (
            <HeartFilled
              className='text-[#d57d1f] hover:text-[#FFAB50] text-3xl hover:cursor-pointer'
              key={'favorite'}
            />
          ) : (
            <HeartOutlined
              className='text-[#d57d1f] hover:text-[#FFAB50] text-3xl hover:cursor-pointer'
              key={'favorite'}
            />
          )}
        </Button>
      </CardHeader>
      <CardBody>
        <Image
          src={meal.strMealThumb}
          alt='ui/ux review check'
          width={250}
          height={250}
        />
        <p
          className='!color-[#d57d1f] !hover:text-[#FFAB50] text-sm hover:text-[#FFAB50] hover:cursor-pointer'
          onClick={() => alert(`Go to recipe ${meal.idMeal} page`)}
        >
          {meal.strMeal}
        </p>
      </CardBody>
    </Card>
  );
}
