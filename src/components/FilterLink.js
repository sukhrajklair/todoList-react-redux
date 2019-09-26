import React from 'react';
import {Link} from 'react-router-dom';

//Changed the FilterLink component from a container component with dispath methods to a simple
//component that created react links
export const FilterLink = ({filter, children})=>(
  <Link
    to = {filter==='all'? '':filter}
    activestyle={{
      textDecoration:'none',
      color:'black',
    }}
  >
  {children}
  </Link>
)

// import {connect} from 'react-redux';
// import {Link} from './Link';
// import {setVisibilityFilter} from '../actions/actions.js';
//
// //Passing the context to the Link component using connect()
// const mapStateToLinkProps = (state, ownProps)=>{
//   return{
//     active: ownProps.filter === state.visibilityFilter
//   };
// };
//
// const mapDispatchToLinkProps = (dispatch, ownProps)=>{
//   return {
//     onClick: ()=>{
//               dispatch(setVisibilityFilter(ownProps.filter))
//             }
//           }
// }
//
// export const FilterLink = connect(
//   mapStateToLinkProps,
//   mapDispatchToLinkProps
// )(Link);
