import React from 'react';
import {FilterLink} from './FilterLink.js'

//Footer has been converted to a presentational component as well,
//It doesn't pass the state info to FilterLink anymore
//FilterLink gets the state itself
export const Footer = ()=>(
  <p>
    Show:
    {' '}
    <FilterLink filter='all'>All</FilterLink>
    {' '}
    <FilterLink filter='active'>Active</FilterLink>
    {' '}
    <FilterLink filter='completed'>Complteted</FilterLink>
  </p>
)
