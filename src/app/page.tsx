'use client';

import RecipeCard from '@/components/recipe-card';
import {
  ButtonToken,
  CurrentPage,
  Flags,
  GlobalToken,
  InputToken,
  ItemsPerPage,
  Letters,
  Meal,
  PaginationToken,
} from '@/helpers';
import { StyleProvider } from '@ant-design/cssinjs';
import { HeartFilled, HeartTwoTone } from '@ant-design/icons';
import { Button, ConfigProvider, Input, Pagination, Typography } from 'antd';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { mockMeals } from '../../mocks/mock-data-meals.json';
import '@ant-design/v5-patch-for-react-19';
import useMealsStore from '../store/meals-store';

const { Title, Text } = Typography;

const usePagination = (data: Meal[], initialPage = CurrentPage, initialPageSize = ItemsPerPage) => {
  const [page, setPage] = useState(initialPage);
  const [itemsPerPage] = useState(initialPageSize);

  return {
    page: page,
    pageItems: data.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    totalItems: data.length,
    handlePageGange: setPage,
  };
};

export default function Home() {
  const meals = useMealsStore((state) => state.meals);
  const fetchMeals = useMealsStore((state) => state.fetchMeals);
  const removeMeal = useMealsStore((state) => state.removeMeal);

  useEffect(() => {
    return fetchMeals(mockMeals);
  }, [fetchMeals]);

  const { page, pageItems, totalItems, handlePageGange } = usePagination(meals);

  const [isFavoriteFiltered, setIsFavoriteFiltered] = useState(false);

  function handleClickFavoriteFilterButton() {
    setIsFavoriteFiltered(!isFavoriteFiltered);
  }

  function handleClickCloseButton(idMeal: string) {
    removeMeal(idMeal);
    if (page - Math.ceil((meals.length - 1) / ItemsPerPage) === 1) {
      handlePageGange(page - 1);
    }
  }

  return (
    <StyleProvider layer>
      <div className='grid grid-rows-[75.2px_1fr_100px] items-center justify-items-center min-h-screen gap-16'>
        <header className='flex items-center w-full h-full pt-[15px] bg-[#23180d]'>
          <div className='w-[1170px] px-[15px] mx-auto'>
            <Image
              src='/logo-small.png'
              alt='Logo'
              width={296}
              height={41}
            />
          </div>
        </header>
        <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
          <div className='w-[1170px] px-[15px] mx-auto'>
            <section className='flex justify-between'>
              <Image
                src='/meal-icon.png'
                alt='Meal icon'
                width={226}
                height={226}
              />
              <div className='flex flex-col gap-4 items-center justify-center text-white'>
                <Title
                  level={1}
                  className='text-4xl font-semibold text-inherit'
                >
                  Welcome to TheMealDB
                </Title>
                <Text className='text-inherit'>
                  Welcome to TheMealDB: An open, crowd-sourced database of Recipes from around the
                  world.
                </Text>
              </div>
              <Image
                src='/meal-icon.png'
                alt='Meal icon'
                width={226}
                height={226}
              />
            </section>
            <Image
              src='/separator.jpg'
              alt='Separator'
              width={1140}
              height={2}
            />
          </div>
          <div className='w-[1170px] px-[15px] mx-auto'>
            <div className='w-[318px] mx-auto mb-2'>
              <ConfigProvider
                theme={{
                  token: GlobalToken,
                  components: { Input: InputToken, Button: ButtonToken },
                }}
              >
                <Input.Search
                  placeholder='Search for a Meal...'
                  allowClear
                  className='rounded-sm'
                />
              </ConfigProvider>
            </div>
            <div className='w-max mx-auto mb-6'>
              <Image
                src='/meal-icon6.png'
                alt='Total Meal Icon'
                width={16}
                height={16}
                className='inline-block'
              />
              <b className='mr-[10px]'>Total Meals: 303</b>
              <Image
                src='/meal-icon4.png'
                alt='Total Meal Icon'
                width={16}
                height={16}
                className='inline-block'
              />
              <b className='mr-[10px]'>Total Ingredients: 575</b>
              <Image
                src='/image2.png'
                alt='Total Meal Icon'
                width={16}
                height={16}
                className='inline-block'
              />
              <b>Images: 303</b>
            </div>
            <Image
              src='/separator.jpg'
              alt='Separator'
              width={1140}
              height={2}
            />
          </div>
          <div className='w-[1170px] px-[15px] mx-auto'>
            <div className='grid grid-cols-4 place-content-center gap-[30px]'>
              {isFavoriteFiltered
                ? meals
                    .filter((meal) => meal.isFavorite === true)
                    .map((meal) => (
                      <RecipeCard
                        key={meal.idMeal}
                        meal={meal}
                        handleClickCloseButton={handleClickCloseButton}
                      />
                    ))
                : pageItems.map((meal) => (
                    <RecipeCard
                      key={meal.idMeal}
                      meal={meal}
                      handleClickCloseButton={handleClickCloseButton}
                    />
                  ))}
            </div>
            <ConfigProvider
              theme={{
                token: GlobalToken,
                components: { Pagination: PaginationToken },
              }}
            >
              <Pagination
                className='mb-6'
                align='center'
                defaultCurrent={1}
                total={totalItems}
                pageSize={ItemsPerPage}
                showSizeChanger={false}
                showTitle={false}
                // onChange={handlePageGange}
                onChange={(page) => {
                  console.log(page);
                  handlePageGange(page);
                }}
              />
            </ConfigProvider>
            <Image
              src='/separator.jpg'
              alt='Separator'
              width={1140}
              height={2}
            />
          </div>
          <div className='w-[1170px] px-[15px] mx-auto text-center'>
            <Title
              level={3}
              className='text-white'
            >
              Browse Favorites
            </Title>
            <Button
              className='bg-transparent border-none'
              shape='circle'
              icon={
                isFavoriteFiltered ? (
                  <HeartTwoTone
                    className='hover:text-[#FFAB50] text-3xl hover:cursor-pointer'
                    key={'favorite'}
                    twoToneColor='#d57d1f'
                  />
                ) : (
                  <HeartFilled
                    className='text-[#d57d1f] hover:text-[#FFAB50] text-3xl hover:cursor-pointer'
                    key={'favorite'}
                  />
                )
              }
              onClick={handleClickFavoriteFilterButton}
            />
          </div>
          <div className='w-[1170px] px-[15px] mx-auto text-center'>
            <Title
              level={3}
              className='text-white'
            >
              Browse Country
            </Title>
            <div className='flex flex-wrap w-[1140px] gap-1 place-content-center mx-auto'>
              {Flags.map((flag) => (
                <Image
                  key={flag}
                  src={`/flags/${flag}.png`}
                  alt={`flag of ${flag}`}
                  width={64}
                  height={64}
                />
              ))}
            </div>
          </div>
          <div className='w-[1170px] px-[15px] mx-auto text-center'>
            <Title
              level={3}
              className='text-white'
            >
              Browse By Name
            </Title>
            <Title level={3}>
              {Letters.map((letter) => {
                return (
                  <Fragment key={letter}>
                    <Button
                      className='bg-transparent border-none font-bold text-2xl text-[#d57d1f]'
                      shape='circle'
                    >
                      {letter}
                    </Button>
                    {'Z' !== letter && <span className='text-white'>/</span>}
                  </Fragment>
                );
              })}
            </Title>
          </div>
        </main>
        <footer className='flex items-center w-full h-full pt-[15px] bg-[#23180d]'>
          <div className='w-[1170px] px-[15px] mx-auto'>
            <Image
              src='/logo-small.png'
              alt='Logo'
              width={296}
              height={41}
            />
          </div>
        </footer>
      </div>
    </StyleProvider>
  );
}
