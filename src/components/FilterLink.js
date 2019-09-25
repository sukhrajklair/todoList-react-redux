import {connect} from 'react-redux';
import {Link} from './Link';
import {setVisibilityFilter} from '../actions/actions.js';

//Passing the context to the Link component using connect()
const mapStateToLinkProps = (state, ownProps)=>{
  return{
    active: ownProps.filter === state.visibilityFilter
  };
};

const mapDispatchToLinkProps = (dispatch, ownProps)=>{
  return {
    onClick: ()=>{
              dispatch(setVisibilityFilter(ownProps.filter))
            }
          }
}

export const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);
