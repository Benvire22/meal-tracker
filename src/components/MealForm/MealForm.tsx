import React, {useCallback, useEffect, useState} from 'react';
import {MealMutation} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

const initialState: MealMutation = {
  category: '',
  description: '',
  kcal: '',
};

interface Props {
  onSubmit: (meal: MealMutation) => void;
  isLoading: boolean;
  existingMeal: MealMutation | null;
}

const MealForm: React.FC<Props> = ({onSubmit, isLoading, existingMeal}) => {
  const [formData, setFormData] = useState(initialState);

  const getExistingMeal = useCallback(async () => {
    if (existingMeal) {
      setFormData(existingMeal);
    }
  }, [existingMeal]);

  useEffect(() => {
    void getExistingMeal();
  }, [getExistingMeal]);

  const changeForm = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const sendForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <div className="row px-5 fs-5">
        <h3 className="text-primary-emphasis text-center fs-1 mb-5">Add / Edit meal</h3>
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
                  placeholder="Enter meal"
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
                  placeholder="Calories"
                  onChange={changeForm}
                  required
                />
              </div>
              <button type="submit" className="btn btn-warning text-white fs-4 px-4 py-2 mb-3" disabled={isLoading}>
                {isLoading && <ButtonSpinner />}
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
