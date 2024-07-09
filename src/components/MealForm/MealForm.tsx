import React, {useCallback, useEffect, useState} from 'react';
import {ApiMeal, MealMutation} from '../../types';
import axiosApi from '../../axiosApi';
import {useParams} from 'react-router-dom';

const initialState: MealMutation = {
  category: '',
  description: '',
  kcal: '',
};

const MealForm: React.FC = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  const request = useCallback(async () => {
    if (id) {
      const {data: apiMeal} = await axiosApi.get(`/meals/${id}.json`);

      setFormData({
        category: apiMeal.category,
        description: apiMeal.description,
        kcal: apiMeal.kcal.toString()
      });
    }
  }, [id]);

  useEffect(() => {
    void request();
  }, [request]);

  const changeForm = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendForm = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);

      const meal: ApiMeal = {
        category: formData.category,
        description: formData.description,
        kcal: parseInt(formData.kcal),
      };

      if (id) {
        await axiosApi.put(`/meals/${id}.json`, meal);
      } else {
        await axiosApi.post('/meals.json', meal);
      }

    } catch (e) {
      console.error(e);

    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      <div className="row px-5 fs-5">
        <h3 className="text-warning text-center fs-1 mb-5">Add / Edit meal</h3>
        <div className="row mt-2 justify-content-center">
          <div className="col-10 text-primary-emphasis">
            <form onSubmit={sendForm}>
              <div className="form-group mb-3">
                <label htmlFor="category" className="fs-4 mb-2">Select Category</label>
                <select
                  className="form-select form-control border-primary fs-5 mb-3 py-2"
                  name="category"
                  id="category"
                  value={formData.category}
                  aria-label="Default select categories"
                  onChange={changeForm}
                  required
                >
                  <option value="" disabled>Select category</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Snack">Snack</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="description" className="fs-4 mb-2">Meal description</label>
                <input
                  type="text"
                  value={formData.description}
                  id="description"
                  name="description"
                  className="form-control border-primary fs-5 mb-3 py-2"
                  onChange={changeForm}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="kcal" className="fs-4 mb-2">kcal</label>
                <input
                  type="number"
                  value={formData.kcal}
                  id="kcal"
                  name="kcal"
                  min="1"
                  className="form-control border-primary fs-5 mb-4 py-2"
                  placeholder="Colories"
                  onChange={changeForm}
                  required
                />
              </div>
              <button type="submit" className="btn btn-warning text-white fs-4 px-4 py-2 mb-3" disabled={loading}>
                save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MealForm;
