import { FC } from 'react';

import { Feedback } from 'models';

import { FeedbackPart } from './FeedbackPart';
import classes from './Result.module.scss';

interface ResultProps {
  feedback: Feedback;
  reset: VoidFunction;
  newGame: VoidFunction;
  correctAnswers: number;
  noOfQuestions: number;
}

export const Result: FC<ResultProps> = ({ feedback, reset, newGame, correctAnswers, noOfQuestions }) => {
  const getResult = () => {
    return Math.round((correctAnswers / noOfQuestions) * 100);
  };

  return (
    <div className={classes.ResultContainer}>
      <div className={classes.Result} style={{ color: getResult() >= 90 ? 'green' : 'red' }}>{`${getResult()}%`}</div>
      <button
        onClick={() => {
          reset();
        }}
      >
        Újra
      </button>
      <FeedbackPart feedback={feedback} />
    </div>
  );
};
