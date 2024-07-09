import React from 'react';
import {Meal} from '../../types';
import MealItem from './MealItem';

interface Props {
  meals?: Meal[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const MealsItems: React.FC<Props> = ({meals, onEdit, onDelete}) => {
  return meals &&  (
    <div className='row'>
      {meals.map((meal) => (
        <MealItem
          key={meal.id }
          meal={meal}
          onEdit={() => onEdit(meal.id)}
          onDelete={() => onDelete(meal.id)}
        />
      ))}
    </div>
  );
};

export default MealsItems;