import {Meal} from '../../types';
import React from 'react';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

interface Props {
  meal: Meal;
  deleting: boolean;
  onDelete: VoidFunction;
  onEdit: VoidFunction;
}

const MealItem: React.FC<Props> = ({meal, deleting = false, onDelete, onEdit}) => {
  return (
    <div
      className="d-flex col-10 border border-2 border-primary-subtle text-primary-emphasis p-4 mb-4 rounded fs-4 align-items-center"
    >
      <div className="me-auto">
        <h3 className="text-secondary fs-2">{meal.category}</h3>
        <span>{meal.description}</span>
      </div>
      <div className="mx-5">
        <strong>{meal.kcal} kcal</strong>
      </div>
      <div className="d-flex flex-column gap-2">
        <button className="btn btn-success py-1" onClick={onEdit}>
          <i className="bi bi-pencil-square fs-3"></i>
          <span className="visually-hidden">Edit meal</span>
        </button>
        <button
          className="btn btn-outline-danger p-2 fs-4 d-flex align-items-center gap-1"
          onClick={onDelete}
          disabled={deleting}
        >
          {deleting ? (
            <ButtonSpinner/>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
          Delete
        </button>
      </div>
    </div>
  );
};

export default MealItem;