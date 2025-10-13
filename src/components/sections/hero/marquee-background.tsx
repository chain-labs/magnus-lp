"use client";

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

export default function MarqueeBackground() {
	const { questions } = useAnsweredQuestion();

	return (
		<div className="relative w-full h-[260px]  z-10">
			{/* Infinite marquee using provided InfiniteSlider */}
			<InfiniteSlider
				className="absolute inset-x-0 bottom-4 max-h-full"
				gap={24}
				speed={90}
				speedOnHover={0}
				direction="horizontal"
			>
				{[...questions].map((qa, idx) => (
					<div
						key={`marquee-${idx}`}
						className="min-w-[300px] max-w-[300px] h-[260px] max-h-full"
					>
						<QaCard variant="subtle" question={qa.questionText} answer={qa.answerText} />
					</div>
				))}
			</InfiniteSlider>
		</div>
	);
}
