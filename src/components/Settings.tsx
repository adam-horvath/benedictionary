import { ChangeEvent, FC, useState } from 'react';

import { NUMBER_OF_QUESTIONS } from 'config/Constants';
import { Question, Unit } from 'models';
import { a2Lektion1, a2Lektion2, a2Lektion3, a2Modul6Lektion1 } from 'utils/fragen';
import { zelenaKnjiga } from 'utils/pitanja';
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
  project3TheFuture,
  project3TimesAndPlaces,
  unit1,
  unit2,
  unit3,
  unit4,
  unit5,
  unit6,
  youngExplorers1,
  youngExplorers2,
  project3Cities,
  project3Experiences,
} from 'utils/questions';
import { Checkbox } from './Checkbox';

import classes from './Settings.module.scss';

export interface SettingsProps {
  startGameWith: (questions: Question[]) => void;
}

const englishUnits: Unit[] = [
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
  project3TheFuture,
  project3TimesAndPlaces,
  project3Cities,
  project3Experiences,
];

const deutschLektionen: Unit[] = [a2Lektion1, a2Lektion2, a2Lektion3, a2Modul6Lektion1];

const hrvatskiLekcije: Unit[] = [zelenaKnjiga];

export const Settings: FC<SettingsProps> = ({ startGameWith }) => {
  const [includeds, setIncludeds] = useState<boolean[]>(englishUnits.map(() => false));
  const [allSelected, setAllSelected] = useState<boolean>(false);

  const [gehalt, setGehalt] = useState<boolean[]>(deutschLektionen.map(() => false));
  const [alleGewahlt, setAlleGewahlt] = useState<boolean>(false);

  const [hrvatski, setHrvatski] = useState<boolean[]>(hrvatskiLekcije.map(() => false));
  const [sviHrvatski, setSviHrvatski] = useState<boolean>(false);

  const startGame = (whichIncludeds: boolean[], units: Unit[]) => {
    const questions: Question[] = [];
    whichIncludeds.forEach((included, index) => {
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

  const handleEnglishChange = (index: number, checked: boolean) => {
    const newIncludeds = [...includeds];
    newIncludeds[index] = checked;
    setIncludeds(newIncludeds);
  };

  const handleDeutschChange = (index: number, checked: boolean) => {
    const newGehalt = [...gehalt];
    newGehalt[index] = checked;
    setGehalt(newGehalt);
  };

  const handleHrvatskiChange = (index: number, checked: boolean) => {
    const newHrvatski = [...hrvatski];
    newHrvatski[index] = checked;
    setHrvatski(newHrvatski);
  };

  return (
    <div className={classes.SettingsContainer}>
      <h1>Melyik angol leckéket szeretnéd gyakorolni?</h1>
      <div className={classes.CheckboxContainer}>
        {englishUnits.map((unit, index) => (
          <Checkbox
            key={unit.name}
            label={unit.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleEnglishChange(index, event.currentTarget.checked)}
            checked={includeds[index]}
          />
        ))}
        <Checkbox
          label={'Mind'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setIncludeds(englishUnits.map((_) => event.currentTarget.checked));
            setAllSelected(event.currentTarget.checked);
          }}
          checked={allSelected}
        />
      </div>
      <button onClick={() => startGame(includeds, englishUnits)}>Start</button>

      <h1>Melyik német leckéket szeretnéd gyakorolni?</h1>
      <div className={classes.CheckboxContainer}>
        {deutschLektionen.map((unit, index) => (
          <Checkbox
            key={unit.name}
            label={unit.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleDeutschChange(index, event.currentTarget.checked)}
            checked={gehalt[index]}
          />
        ))}
        <Checkbox
          label={'Mind'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setGehalt(deutschLektionen.map((_) => event.currentTarget.checked));
            setAlleGewahlt(event.currentTarget.checked);
          }}
          checked={alleGewahlt}
        />
      </div>
      <button onClick={() => startGame(gehalt, deutschLektionen)}>Start</button>

      <h1>Melyik horvát leckéket szeretnéd gyakorolni?</h1>
      <div className={classes.CheckboxContainer}>
        {hrvatskiLekcije.map((unit, index) => (
          <Checkbox
            key={unit.name}
            label={unit.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleHrvatskiChange(index, event.currentTarget.checked)
            }
            checked={hrvatski[index]}
          />
        ))}
        <Checkbox
          label={'Mind'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setHrvatski(hrvatskiLekcije.map((_) => event.currentTarget.checked));
            setSviHrvatski(event.currentTarget.checked);
          }}
          checked={sviHrvatski}
        />
      </div>
      <button onClick={() => startGame(hrvatski, hrvatskiLekcije)}>Start</button>
    </div>
  );
};
