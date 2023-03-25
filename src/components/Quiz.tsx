import { FC, FormEvent, useEffect, useRef, useState } from 'react';

import { Answer, Feedback, Question } from 'models';

import { FeedbackPart } from './FeedbackPart';
import { Result } from './Result';
import { Answers } from './Answers';
import classes from './Quiz.module.scss';

export interface QuizProps {
  questions: Question[];
  newGame: VoidFunction;
}

export const Quiz: FC<QuizProps> = ({ questions, newGame }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [index, setIndex] = useState<number>(0);
  const [feedback, setFeedback] = useState<Feedback>(Feedback.None);
  const [end, setEnd] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [questions, index]);

  const reset = () => {
    setIndex(0);
    setFeedback(Feedback.None);
    setEnd(false);
    setCorrectAnswers(0);
    setAnswers([]);
    newGame();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const answer = (event.currentTarget[0] as HTMLInputElement).value;

    const correct = questions[index].answers.includes(answer);
    if (correct) {
      setCorrectAnswers(correctAnswers + 1);
    }
    setAnswers([...answers, { index, answer, correct }]);

    setFeedback(correct ? Feedback.Good : Feedback.Bad);
    setTimeout(() => {
      setFeedback(Feedback.None);
    }, 1000);

    formRef.current?.reset();

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setEnd(true);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} noValidate ref={formRef} style={{ display: end ? 'none' : 'block' }}>
        <div className={classes.QuizContainer}>
          <label htmlFor={'question'}>{`${index + 1}. ${questions[index].question}`}</label>
          <input id={'question'} type={'text'} ref={inputRef} autoComplete={'off'} required disabled={end} autoFocus />
          <button>Válaszol</button>
          {feedback ? <FeedbackPart feedback={feedback} /> : null}
        </div>
      </form>
      {!end ? null : (
        <>
          <Result
            feedback={feedback}
            reset={reset}
            newGame={newGame}
            correctAnswers={correctAnswers}
            noOfQuestions={questions.length}
          />
          <Answers answers={answers} questions={questions} />
        </>
      )}
    </>
  );
};
