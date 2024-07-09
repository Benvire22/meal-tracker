import {useCallback, useEffect, useState} from 'react';
import {ApiMeal, Meal} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';
import MealsItems from '../../components/MealsItems/MealsItems';
import Spinner from '../../components/Spinner/Spinner';

interface ApiMeals {
  [key: string]: ApiMeal;
}

const Content = () => {
  const [mealsData, setMealsData] = useState<Meal[]>([]);
  const [mealsLoading, setMealsLoading] = useState(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const navigate = useNavigate();

  const apiRequest = useCallback(async () => {
    try {
      setMealsLoading(true);

      const {data: ApiMeals} = await axiosApi.get<ApiMeals>('/meals.json');

      if (!ApiMeals) {
        setMealsData([]);
      }

      const newMeals = Object.keys(ApiMeals).map((id) => ({
        ...ApiMeals[id],
        id: id,
      }));

      setMealsData(newMeals);

    } catch (e) {
      console.error(e);
    } finally {
      setMealsLoading(false);
    }
  }, []);

  useEffect(() => {
    void apiRequest();
  }, [apiRequest]);

  const deleteMeal = async (id: string) => {
    try {
      setDeleting(true);
      await axiosApi.delete(`/meals/${id}.json`);
      await apiRequest();
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  const editMeal = async (id: string) => {
    navigate('/edit-meal/' + id);
  };

  const getTotalCalories = () => {
    return mealsData.reduce((sum, meal) => {
      return sum += meal.kcal;
    }, 0);
  };

  return (
    <>
      {mealsLoading && <Spinner />}
      <h1>Total calories: {getTotalCalories()}</h1>
      <MealsItems
        meals={mealsData}
        onEdit={editMeal}
        onDelete={deleteMeal}
        deleting={deleting}
      />
    </>
  );
};

export default Content;