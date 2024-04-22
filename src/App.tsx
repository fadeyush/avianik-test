import React, { useEffect } from 'react';
import classes from './App.module.scss';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUsers } from './store/action-creator/fetchUsers';

function App() {
  const {users, isLoading, error} = useAppSelector(state => state.usersReducer);
  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(fetchUsers())
  }, [])

  return (
    <div className={classes.App}>
      {isLoading ?  
                <h2>Загрузка...</h2> : 
            error ? 
                <h2>{error}</h2> 
            :
            <ul className={classes.productsCatalog__list}>    
                {users.map(user=>
                  <li key={user.id}>{user.id}</li>
                )}
            </ul>
            }
    </div>
  );
}

export default App;
