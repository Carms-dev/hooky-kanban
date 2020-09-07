import React, { useState, useEffect } from 'react';
import '../style/style.scss';
import Column from './Column';
import AddColumn from './AddColumn';

function App() {
  const [columns, setColumns] = useState([]);
  
  useEffect(() => {
    // retrive data only on mount
    const localStorageRef = localStorage.getItem("kanban");
    if (localStorageRef) {
      setColumns( JSON.parse(localStorageRef) );
    } else {
      // if can't find data from local storage, provide standard template
      const initialColumnName = ["Todo", "In progress", "Done"];
      const initalColumns = initialColumnName.map(name => ({ name: name, tasks: [] }) );
      setColumns(initalColumns);
    }
  }, []);

  useEffect(() => {
    // store data when columns is updated
    localStorage.setItem(
      "kanban",
      JSON.stringify(columns)
    )
  }, [columns]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kanban</h1>        
      </header>
      <div className="column-container">
        {columns.map((column, i) => {
          return (
            <Column 
              key={`column${i}`}
              columns={columns}
              columnIndex={i}
              setColumns={setColumns}
            />
          )
        })}
        <AddColumn 
          columns={columns}
          setColumns={setColumns}
        />
      </div>
    </div>
  );
}

export default App;
