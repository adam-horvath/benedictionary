export interface Unit {
  name: string;
  questions: Question[];
}

export interface Question {
  question: string;
  answers: string[];
}
