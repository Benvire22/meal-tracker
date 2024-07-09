import {Meal} from '../../types';
import React from 'react';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  meal: Meal;
  deleting: boolean;
  onDelete: VoidFunction;
  onEdit: VoidFunction;
}

const MealItem: React.FC<Props> = ({meal, deleting = false, onDelete, onEdit }) => {
  console.log(meal);
  return (
    <div>
      <div className="card mb-2">
        <div className="card-body">
          <h3>{meal.category}</h3>
          <span>{meal.description}</span>
          <strong>{meal.kcal} kcal</strong>
        </div>
        <div>
          <button className="btn btn-success" onClick={onEdit} >Edit</button>
          <button className="btn btn-danger" onClick={onDelete} disabled={deleting}>
            {deleting && <ButtonSpinner />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealItem;