import {Meal} from '../../types';
import React from 'react';

interface Props {
  meal: Meal;
  onDelete: VoidFunction;
  onEdit: VoidFunction;
}

const MealItem: React.FC<Props> = ({meal, onDelete, onEdit }) => {
  return (
    <div>
      <div className="card mb-2">
        <div className="card-body">
          <title>{meal.category}</title>
          <span>{meal.description}</span>
          <strong>{meal.kcal} kcal</strong>
        </div>
        <div>
          <button className="btn btn-success" onClick={onEdit} >Edit</button>
          <button className="btn btn-danger" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default MealItem;