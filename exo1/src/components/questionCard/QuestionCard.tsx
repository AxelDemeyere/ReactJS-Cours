import {QUESTIONS} from "../../data/quiz.ts";
import {useState} from "react";
import styles from './QuestionCard.module.css';
import {Results} from "../results/Results.tsx";
import type {QuestionCardProps} from "../../type/QuestionCardProps.ts";
import {ProgressBar} from "../progress/ProgressBar.tsx";

export const QuestionCard = ({userAnswers, onAnswer}: QuestionCardProps) => {
    const [questions, setQuestions] = useState([...QUESTIONS]);
    const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

    function handleSelect(choiceId: string) {
        setSelectedChoice(choiceId);
    }

    function nextQuestion() {
        if (selectedChoice) {
            onAnswer(questions[0].id, selectedChoice);
        }
        setQuestions(prev => prev.slice(1));
        setSelectedChoice(null);
    }

    if (questions.length === 0) {
        return <Results userAnswers={userAnswers} />;
    }

    const question = questions[0];
    const total = QUESTIONS.length;
    const answered = total - questions.length; // nombre déjà validé

    return (
        <div key={question.id}>
            <ProgressBar current={answered + 1} total={total} />
            <h2>{question.prompt}</h2>
            <ul className={styles.list}>
                {question.choices.map((choice) => {
                    const isSelected = selectedChoice === choice.id;
                    return (
                        <li key={choice.id}>
                            <label
                                className={`${styles.choice} ${isSelected ? styles.selected : ''}`}
                                onClick={() => handleSelect(choice.id)}
                            >
                                <input
                                    type="radio"
                                    name="choice"
                                    value={choice.id}
                                    checked={isSelected}
                                    onChange={() => handleSelect(choice.id)}
                                    className={styles.radio}
                                />
                                <span>{choice.label}</span>
                            </label>
                        </li>
                    );
                })}
            </ul>
            <button onClick={nextQuestion} disabled={!selectedChoice}>Submit Answer</button>
        </div>
    );
};
