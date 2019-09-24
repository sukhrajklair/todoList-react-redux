export const loadSate = ()=> {
  //wrapping the statement in try-catch because it can fail if the user doesn't
  //allow access to local storage
  try{
    const serializedState=localStorage.getItem('state');
    if (serializedState===null){
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch(err){
    return undefined;
  }
}

export const saveState = (state)=>{
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    //ignore write errors.
  }
}
