import { FC } from 'react';

import Good from 'assets/good.png';
import Bad from 'assets/bad.png';
import { Answer, Question } from 'models';

import classes from './Answers.module.scss';

interface AnswersProps {
  answers: Answer[];
  questions: Question[];
}

export const Answers: FC<AnswersProps> = ({ answers, questions }) => {
  const getAnswerString = (answers: string[]) => {
    return answers.reduce((previous, current) => (previous ? `${previous}, ${current}` : current), '');
  };

  return (
    <div className={classes.AnswerContainer}>
      {answers.map((answer) => (
        <>
          <div>
            {answer.index + 1}. {questions[answer.index].question} ({getAnswerString(questions[answer.index].answers)})
          </div>
          <div className={classes.AnswerIcon} style={{ backgroundImage: `url(${answer.correct ? Good : Bad})` }} />
          <div>{answer.answer}</div>
        </>
      ))}
    </div>
  );
};
