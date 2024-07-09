import {useCallback, useEffect, useState} from 'react';
import {ApiMeal, Meal} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';
import MealsItems from '../../components/MealsItems/MealsItems';
import Spinner from '../../components/Spinner/Spinner';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import handleError from '../../lib/handleError';

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
        return setMealsData([]);
      }

      const newMeals = Object.keys(ApiMeals).map((id) => ({
        ...ApiMeals[id],
        id: id,
      }));
      setMealsData(newMeals);

    } catch (e) {
      handleError(e as Error, 'Cannot load meals!');
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
      toast.success('Meal was deleted!');
    } catch (e) {
      handleError(e as Error, 'Error deleting meal!');
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
      <h1 className="text-primary-emphasis fw-normal">Total calories: <strong>{getTotalCalories()} kcal</strong></h1>
      {mealsData.length > 0 ? (
        <MealsItems
          meals={mealsData}
          onEdit={editMeal}
          onDelete={deleteMeal}
          deleting={deleting}
        />
      ) : <h2 className="text-center">Empty</h2>}
    </>
  );
};

export default Content;