import {useCallback, useEffect, useState} from 'react';
import MealForm from '../../components/MealForm/MealForm';
import {ApiMeal, MealMutation} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate, useParams} from 'react-router-dom';

const NewMeal = () => {
  const [loading, setLoading] = useState(false);
  const [existingMeal, setExistingMeal] = useState<MealMutation | null>(null);
  const {id} = useParams();
  const navigate = useNavigate();

  const request = useCallback(async () => {
    if (id) {
      const {data: apiMeal} = await axiosApi.get(`/meals/${id}.json`);

      setExistingMeal({
        category: apiMeal.category,
        description: apiMeal.description,
        kcal: apiMeal.kcal.toString()
      });
    }
  }, [id]);

  useEffect(() => {
    void request();
  }, [request]);


  const sendForm = async (data: MealMutation) => {
    try {
      setLoading(true);

      const meal: ApiMeal = {
        category: data.category,
        description: data.description,
        kcal: parseInt(data.kcal),
      };

      if (id) {
        await axiosApi.put(`/meals/${id}.json`, meal);
      } else {
        await axiosApi.post('/meals.json', meal);
        navigate('/');
      }

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <MealForm onSubmit={sendForm} isLoading={loading} existingMeal={existingMeal} />
    </div>
  );
};

export default NewMeal;