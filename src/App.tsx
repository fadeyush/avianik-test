import React from 'react';
import classes from './App.module.scss';
import EnhancedTable from './components/Table/MyTable';

function App() {
  return (
    <div className={classes.App}>
      <EnhancedTable/>
    </div>
  );
}

export default App;
