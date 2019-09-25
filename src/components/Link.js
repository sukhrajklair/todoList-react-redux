import React from 'react';

//Link is just a presentational component
export const Link = ({
  active,
  children,
  onClick
}) => {
  if (active){
    return(
      <span>{children}</span>
    );
  }
  return (
    <a href='#'
      onClick={e=> {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};
