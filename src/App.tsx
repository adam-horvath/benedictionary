import { useState } from 'react';

import { Quiz } from 'components/Quiz';
import { Settings } from 'components/Settings';
import { Question } from 'models';

import './App.scss';

const App = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const newGame = () => {
    setQuestions([]);
  };

  return (
    <div className={'App'}>
      {!questions.length ? <Settings startGameWith={setQuestions} /> : <Quiz questions={questions} newGame={newGame} />}
    </div>
  );
};

export default App;
