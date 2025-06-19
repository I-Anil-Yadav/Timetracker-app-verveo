import React from 'react';
import Timetracker from './Components/Timetracker';

const App: React.FC = () => {
  return (
    <div className="p-4">
      <h1>Timetracker</h1>
      <div>
        <Timetracker />
      </div>
    </div>
  );
};

export default App;