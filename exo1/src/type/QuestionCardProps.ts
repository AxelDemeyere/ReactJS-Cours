export interface QuestionCardProps {
    userAnswers: {questionId: string, answerId: string}[];
    onAnswer: (questionId: string, answerId: string) => void;
}