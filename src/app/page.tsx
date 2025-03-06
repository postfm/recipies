'use client';

import RecipeCard from '@/components/recipe-card';
import { CARDS_PER_PAGE, Countries, Flags, Letters } from '@/helpers';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { mockMeals } from '../../mocks/mock-data-meals.json';
import useMealsStore from '../store/meals-store';
import { Button, Input, Pagination } from '@heroui/react';
import { HeartFilled, HeartTwoTone, SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function Home() {
  const { meals, currentPage, fetchMeals, removeMeal, setCurrentPage } = useMealsStore();

  const [searchMeals, setSearchMeals] = useState('');
  const [isFavoriteFiltered, setIsFavoriteFiltered] = useState(false);
  const [letterFiltered, setLetterFiltered] = useState('');
  const [countryFiltered, setCountryFiltered] = useState('');

  useEffect(() => {
    const fetchData = async () => fetchMeals(mockMeals);
    fetchData();
  }, [fetchMeals]);

  function handleClickFavoriteFilterButton() {
    setIsFavoriteFiltered(!isFavoriteFiltered);
  }

  function handleClickCloseButton(idMeal: string) {
    removeMeal(idMeal);
  }

  function handleClickLetterButton(evt: React.MouseEvent<HTMLDivElement>) {
    evt.preventDefault();
    const target = evt.target as HTMLElement;
    setLetterFiltered(target.innerText);
  }

  function handleClickCountryButton(evt: React.MouseEvent<HTMLDivElement>) {
    evt.preventDefault();
    const target = evt.target as HTMLElement;
    const img = target as HTMLImageElement;
    setCountryFiltered(img.alt);
  }

  function handleClickClearButton() {
    setSearchMeals('');
    setIsFavoriteFiltered(false);
    setLetterFiltered('');
    setCountryFiltered('');
  }

  // Фильтрация и поиск
  const FilteredRecepies = meals.filter((meal) => {
    const matchesSearch = meal.strMeal.toLowerCase().includes(searchMeals.toLowerCase());
    const matchesFavorite = isFavoriteFiltered ? meal.isFavorite === isFavoriteFiltered : true;
    const matchesLetter = letterFiltered
      ? meal.strMeal[0].toLowerCase() === letterFiltered.toLowerCase()
      : true;
    const matchesCountry = countryFiltered
      ? meal.strArea.toLowerCase() === countryFiltered.toLowerCase()
      : true;
    return matchesSearch && matchesFavorite && matchesLetter && matchesCountry;
  });

  const totalPage = Math.ceil(FilteredRecepies.length / CARDS_PER_PAGE);
  const paginatedItems = FilteredRecepies.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  return (
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
            <h1 className='text-4xl font-semibold text-inherit'>Welcome to TheMealDB</h1>
            <p className='text-inherit'>
              Welcome to TheMealDB: An open, crowd-sourced database of Recipes from around the
              world.
            </p>
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
          <Input
            isClearable
            placeholder='Search for a Meal...'
            className='w-[348px] h-[50px]'
            radius='sm'
            startContent={<SearchOutlined />}
            type='search'
            onChange={(evt) => setSearchMeals(evt.target.value)}
            onClear={() => setSearchMeals('')}
          />
        </div>
        <div className='w-max mx-auto mb-6 text-white'>
          <Image
            src='/meal-icon6.png'
            alt='Total Meal Icon'
            width={16}
            height={16}
            className='inline-block mr-1'
          />
          <b className='mr-[10px]'>
            Total Meals: <span className='font-light'>303</span>
          </b>
          <Image
            src='/meal-icon4.png'
            alt='Total Meal Icon'
            width={16}
            height={16}
            className='inline-block mr-1'
          />
          <b className='mr-[10px]'>
            Total Ingredients: <span className='font-light'>575</span>
          </b>
          <Image
            src='/image2.png'
            alt='Total Meal Icon'
            width={16}
            height={16}
            className='inline-block mr-1'
          />
          <b>
            Images: <span className='font-light'>303</span>
          </b>
        </div>
        <Image
          src='/separator.jpg'
          alt='Separator'
          width={1140}
          height={2}
        />
      </div>
      <div className='w-[1170px] px-[15px] mx-auto'>
        <ul className='grid grid-cols-4 place-content-center gap-[30px]'>
          {paginatedItems.map((meal) => (
            <li key={meal.idMeal}>
              <RecipeCard
                meal={meal}
                handleClickCloseButton={handleClickCloseButton}
              />
            </li>
          ))}
        </ul>
        <div className='justify-self-center mb-4'>
          <Pagination
            showControls
            page={currentPage}
            total={totalPage}
            onChange={setCurrentPage}
            color='warning'
          />
        </div>
        <Image
          src='/separator.jpg'
          alt='Separator'
          width={1140}
          height={2}
        />
      </div>
      <div className='w-[1170px] px-[15px] mx-auto text-center'>
        <h3 className='text-white'>Browse Favorites</h3>
        <Button
          isIconOnly
          aria-label='Like'
          color='danger'
          className='bg-transparent border-none'
          onPress={handleClickFavoriteFilterButton}
        >
          {isFavoriteFiltered ? (
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
          )}
        </Button>
      </div>
      <div className='w-[1170px] px-[15px] mx-auto text-center'>
        <h3 className='text-white'>Browse Country</h3>
        <div
          className='flex flex-wrap w-[1140px] gap-1 place-content-center mx-auto'
          onClick={handleClickCountryButton}
        >
          {Flags.map((flag) => (
            <Fragment key={flag}>
              <Link
                className='w-auto h-auto p-0 border-none rounded-none bg-transparent'
                href=''
              >
                <Image
                  src={`/flags/${flag}.png`}
                  alt={Countries[flag]}
                  width={64}
                  height={64}
                />
              </Link>
            </Fragment>
          ))}
        </div>
      </div>
      <div className='w-[1170px] text-center'>
        <h3 className='text-white'>Browse By Name</h3>
        <h3>
          {Letters.map((letter) => {
            return (
              <div
                className='inline'
                key={letter}
                onClick={handleClickLetterButton}
              >
                <Link
                  className='bg-transparent border-none text-xl text-[#d57d1f] w-auto'
                  href=''
                >
                  {letter}
                </Link>
                {'Z' !== letter && <span className='text-white text-xl font-bold'>{' / '}</span>}
              </div>
            );
          })}
        </h3>
      </div>
      <Button
        className='bg-[#d57d1f] block mx-auto'
        onPress={handleClickClearButton}
      >
        Clear Filters
      </Button>
    </main>
  );
}
