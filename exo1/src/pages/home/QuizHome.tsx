import {useState} from "react";
import {QuestionCard} from "../../components/questionCard/QuestionCard.tsx";

export const QuizHome = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [userAnswers, setUserAnswers] = useState<{questionId: string, answerId: string}[]>([]);

    const startQuiz = () => {
        setIsStarted(true);
    };

    function handleAnswer(questionId: string, answerId: string) {
        setUserAnswers(prev => [...prev, {questionId, answerId}]);
    }

    if(isStarted) {
        return (
            <QuestionCard userAnswers={userAnswers} onAnswer={handleAnswer} />
        );
    }

    return (
        <>
            <h1>Bienvenue sur mon application Quiz !</h1>
            <button onClick={startQuiz}>Démarrer le quiz</button>
        </>
    );
};
