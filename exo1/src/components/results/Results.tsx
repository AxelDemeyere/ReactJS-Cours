import {QUESTIONS} from "../../data/quiz.ts";
import "./Results.module.css"
import type {ResultsProps} from "../../type/ResultsProps.ts";


export const Results = ({userAnswers}: ResultsProps) => {
    const results = userAnswers.map(ans => {
        const question = QUESTIONS.find(q => q.id === ans.questionId);
        const userChoice = question?.choices.find(c => c.id === ans.answerId);
        const correctChoice = question?.choices.find(c => c.id === question.answerId);
        const isCorrect = ans.answerId === question?.answerId;
        return {
            question: question?.prompt || '',
            userAnswer: userChoice?.label || '',
            correctAnswer: correctChoice?.label || '',
            isCorrect,
            explanation: question?.explanation || ''
        };
    });
    const score = results.filter(r => r.isCorrect).length;
    return (
        <>
            <h2>Quiz terminé !</h2>
            <h3>Votre score : {score} / {userAnswers.length}</h3>
            <ul>
                {results.map((res, idx) => (
                    <li key={idx} style={{ background: res.isCorrect ? '#e6ffe6' : '#ffe6e6'}}>
                        <div><strong>Q{idx + 1} :</strong> {res.question}</div>
                        <div>Votre réponse : <span style={{color: res.isCorrect ? 'green' : 'red'}}>{res.userAnswer} {res.isCorrect ? '✔️' : '❌'}</span></div>
                        {!res.isCorrect && (
                            <div>Bonne réponse : <span>{res.correctAnswer}</span></div>
                        )}
                        {res.explanation && (
                            <div className="explanation"><em>Explication : {res.explanation}</em></div>
                        )}
                        <span></span>
                    </li>
                ))}
            </ul>
        </>
    );
};
