"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

import { InfiniteSlider } from "@/components/manually-addded/infinite-slider";
import QaCard from "./qa-card";
import { useAnsweredQuestion } from "@/hooks/useAnsweredQuestions";

const sampleQuestions = [
	{
		question: "What is the meaning of life?",
		answer: "The meaning of life is subjective and varies for each person. It often involves finding purpose, connection, and happiness.",
		likes: 42,
	},
	{
		question: "How does AI work?",
		answer: "AI works through machine learning algorithms that process data, recognize patterns, and make decisions based on training.",
		likes: 38,
	},
	{
		question: "What is the best programming language?",
		answer: "The best programming language depends on your use case. Python is great for beginners, JavaScript for web, and C++ for performance.",
		likes: 25,
	},
	{
		question: "How to stay motivated?",
		answer: "Set clear goals, celebrate small wins, surround yourself with positive people, and remember why you started.",
		likes: 56,
	},
	{
		question: "What is quantum computing?",
		answer: "Quantum computing uses quantum mechanics principles to process information exponentially faster than classical computers.",
		likes: 31,
	},
];

type ActiveQuestion = {
	questionText: string;
	answerText: string;
};

type DisplayQuestion = ActiveQuestion & {
	id: string;
};

export default function MarqueeBackground() {
	const { questions } = useAnsweredQuestion();
	const [activeQuestion, setActiveQuestion] = useState<ActiveQuestion | null>(
		null
	);

	const fallbackQuestions: DisplayQuestion[] = sampleQuestions.map(
		(item, index) => ({
			questionText: item.question,
			answerText: item.answer,
			id: `sample-${index}`,
		})
	);

	const normalizedQuestions: DisplayQuestion[] =
		questions.length > 0
			? questions.map((question, index) => ({
					id: question.id ?? `question-${index}`,
					questionText: question.questionText,
					answerText: question.answerText,
			  }))
			: fallbackQuestions;

	useEffect(() => {
		if (typeof document === "undefined") {
			return;
		}

		if (!activeQuestion) {
			document.body.style.removeProperty("overflow");
			return;
		}

		const previousOverflow = document.body.style.overflow;
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setActiveQuestion(null);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = previousOverflow;
		};
	}, [activeQuestion]);

	return (
		<div className="relative z-10 h-[160px] w-full">
			<InfiniteSlider
				className="absolute inset-x-0 bottom-4 max-h-full"
				gap={24}
				speed={50}
				speedOnHover={0}
				direction="horizontal"
				paused={Boolean(activeQuestion)}
			>
				{normalizedQuestions.map((qa) => (
					<div
						key={qa.id}
						className="min-w-[300px] max-w-[300px] h-[160px] max-h-full"
					>
						<QaCard
							variant="subtle"
							question={qa.questionText}
							answer={qa.answerText}
							onClick={() =>
								setActiveQuestion({
									questionText: qa.questionText,
									answerText: qa.answerText,
								})
							}
						/>
					</div>
				))}
			</InfiniteSlider>

			{activeQuestion ? (
				<div
					onClick={() => setActiveQuestion(null)}
					role="dialog"
					aria-modal="true"
					aria-labelledby="qa-dialog-title"
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
				>
					<div
						onClick={(event) => event.stopPropagation()}
						className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
					>
						<button
							type="button"
							onClick={() => setActiveQuestion(null)}
							className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
							aria-label="Close question details"
						>
							<X className="h-4 w-4" />
						</button>
						<div className="flex items-start gap-3 pr-8">
							<MessageCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
							<h3
								id="qa-dialog-title"
								className="text-lg font-semibold text-foreground"
							>
								{activeQuestion.questionText}
							</h3>
						</div>
						<div className="mt-4 max-h-[60vh] overflow-y-auto pr-1">
							<p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
								{activeQuestion.answerText}
							</p>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}
