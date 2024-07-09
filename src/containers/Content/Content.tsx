import {useCallback, useEffect, useState} from 'react';
import {ApiMeal, Meal} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';
import MealsItems from '../../components/MealsItems/MealsItems';

interface ApiMeals {
  [key: string]: ApiMeal;
}

const Content = () => {
  const [mealsData, setMealsData] = useState<Meal[]>([]);
  const [mealsLoading, setMealsLoading] = useState(false);
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
    await axiosApi.delete(`/meals/${id}.json`);
    await apiRequest();
  };

  const editMeal = async (id: string) => {
    navigate('/edit-meal/' + id);
  };

  return (
    <div>
      <MealsItems
        meals={mealsData}
        onEdit={editMeal}
        onDelete={deleteMeal}
      />
    </div>
  );
};

export default Content;