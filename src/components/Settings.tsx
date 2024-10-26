import { NUMBER_OF_QUESTIONS } from 'config/Constants';
import { Question, Unit } from 'models';
import { ChangeEvent, FC, useState } from 'react';
import {
  introduction,
  project3Intro,
  project3MyLife,
  projectAnimals,
  projectFood,
  projectHolidays,
  projectIntro,
  projectMyLife,
  projectTheWorld,
  unit1,
  unit2,
  unit3,
  unit4,
  unit5,
  unit6,
  youngExplorers1,
  youngExplorers2,
} from 'utils/questions';
import { Checkbox } from './Checkbox';

import classes from './Settings.module.scss';

export interface SettingsProps {
  startGameWith: (questions: Question[]) => void;
}

const units: Unit[] = [
  youngExplorers1,
  youngExplorers2,
  introduction,
  unit1,
  unit2,
  unit3,
  unit4,
  unit5,
  unit6,
  projectIntro,
  projectMyLife,
  projectAnimals,
  projectHolidays,
  projectFood,
  projectTheWorld,
  project3Intro,
  project3MyLife,
];

export const Settings: FC<SettingsProps> = ({ startGameWith }) => {
  const [includeds, setIncludeds] = useState<boolean[]>(units.map((_) => false));
  const [allSelected, setAllSelected] = useState<boolean>(false);

  const startGame = () => {
    const questions: Question[] = [];
    includeds.forEach((included, index) => {
      if (included) {
        questions.push(...units[index].questions);
      }
    });

    if (!questions.length) return;

    const result = [];
    const indices = new Set<number>();
    while (indices.size < NUMBER_OF_QUESTIONS) {
      const index = Math.floor(Math.random() * questions.length);
      if (!indices.has(index)) {
        indices.add(index);
        result.push(questions[index]);
      }
    }
    startGameWith(result);
  };

  const handleChange = (index: number, checked: boolean) => {
    const newIncludeds = [...includeds];
    newIncludeds[index] = checked;
    setIncludeds(newIncludeds);
  };

  return (
    <div className={classes.SettingsContainer}>
      <h1>Melyik leckéket szeretnéd gyakorolni?</h1>
      <div className={classes.CheckboxContainer}>
        {units.map((unit, index) => (
          <Checkbox
            key={unit.name}
            label={unit.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(index, event.currentTarget.checked)}
            checked={includeds[index]}
          />
        ))}
        <Checkbox
          label={'Mind'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setIncludeds(units.map((_) => event.currentTarget.checked));
            setAllSelected(event.currentTarget.checked);
          }}
          checked={allSelected}
        />
      </div>
      <button onClick={startGame}>Start</button>
    </div>
  );
};
