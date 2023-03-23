import { FC } from 'react';

import Good from 'assets/good.png';
import Bad from 'assets/bad.png';
import { Feedback } from 'models';

import classes from './FeedbackPart.module.scss';

interface FeedbackPartProps {
  feedback: Feedback;
}

export const FeedbackPart: FC<FeedbackPartProps> = ({ feedback }) => {
  return (
    <>
      <div
        className={classes.Feedback}
        style={{ backgroundImage: `url(${Good})`, opacity: feedback === Feedback.Good ? 1 : 0 }}
      />
      <div
        className={classes.Feedback}
        style={{ backgroundImage: `url(${Bad})`, opacity: feedback === Feedback.Bad ? 1 : 0 }}
      />
    </>
  );
};
