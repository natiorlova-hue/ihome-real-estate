// components/quiz/quiz-context.tsx

"use client";

import { QUIZ_STEPS } from "@/lib/quiz";
import React, { ReactNode, createContext, useContext, useReducer } from "react";

type Answers = Record<string, string>;

type State = {
  stepIndex: number;
  answers: Answers;
};

type Action =
  | { type: "ANSWER"; stepId: string; value: string }
  | { type: "NEXT" }
  | { type: "PREV" };

const initialState: State = {
  stepIndex: 0,
  answers: {},
};

const QuizContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  totalSteps: number;
  currentStepId: string;
  isLastStep: boolean;
} | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.stepId]: action.value },
      };
    case "NEXT":
      return {
        ...state,
        stepIndex: Math.min(state.stepIndex + 1, QUIZ_STEPS.length - 1),
      };
    case "PREV":
      return {
        ...state,
        stepIndex: Math.max(state.stepIndex - 1, 0),
      };
    default:
      return state;
  }
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QuizContext.Provider
      value={{
        state,
        dispatch,
        totalSteps: QUIZ_STEPS.length,
        currentStepId: QUIZ_STEPS[state.stepIndex].id,
        isLastStep: state.stepIndex === QUIZ_STEPS.length - 1,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within QuizProvider");
  return context;
};
