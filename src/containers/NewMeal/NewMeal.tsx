import {useCallback, useEffect, useState} from 'react';
import MealForm from '../../components/MealForm/MealForm';
import {ApiMeal, MealMutation} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate, useParams} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import handleError from '../../lib/handleError';

const NewMeal = () => {
  const [loading, setLoading] = useState(false);
  const [existingMeal, setExistingMeal] = useState<MealMutation | null>(null);
  const [loadingMeal, setLoadingMeal] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();

  const fetchMeal = useCallback(async () => {
    try {
      setLoadingMeal(true);
      if (id) {
        const {data: apiMeal} = await axiosApi.get<ApiMeal>(`/meals/${id}.json`);

        setExistingMeal({
          category: apiMeal.category,
          description: apiMeal.description,
          kcal: apiMeal.kcal.toString()
        });
      }
    } catch (e) {
      handleError(e as Error, 'Cannot loading current meal!');
    } finally {
      setLoadingMeal(false);
    }
  }, [id]);

  useEffect(() => {
    void fetchMeal();
  }, [fetchMeal]);


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
        toast.success('Update meal is successfully!');
      } else {
        await axiosApi.post('/meals.json', meal);
        navigate('/');
        toast.success('New meal created!');
      }

    } catch (e) {
      handleError(e as Error, 'Cannot sending meal!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loadingMeal && <Spinner />}
      <MealForm onSubmit={sendForm} isLoading={loading} existingMeal={existingMeal} />
    </>
  );
};

export default NewMeal;