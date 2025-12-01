"use client";

import { useChat, type UIMessage } from "@ai-sdk/react";
import { Mic, MicOff, Send, CircleCheck, MessageCircle } from "lucide-react";
import { InfiniteSlider } from "./motion-primitives/infinite-slider";
import { useSpeechInput } from "@/hooks/useSpeechInput";

const frequentlyAskedQuestions = [
	{
		id: "item-1",
		question: "What is the difference between a stock and a bond?",
		answer: "A stock is a security that represents ownership in a company. A bond is a security that represents a loan to a company or government.",
	},
	{
		id: "item-2",
		question: "What is the difference between a stock and a bond?",
		answer: "A stock is a security that represents ownership in a company. A bond is a security that represents a loan to a company or government.",
	},
	{
		id: "item-3",
		question: "What is the difference between a stock and a bond?",
		answer: "A stock is a security that represents ownership in a company. A bond is a security that represents a loan to a company or government.",
	},
	{
		id: "item-4",
		question: "What is the difference between a stock and a bond?",
		answer: "A stock is a security that represents ownership in a company. A bond is a security that represents a loan to a company or government.",
	},
	{
		id: "item-5",
		question: "What is the difference between a stock and a bond?",
		answer: "A stock is a security that represents ownership in a company. A bond is a security that represents a loan to a company or government.",
	},
];

export default function Hero() {
	const { messages, sendMessage, status } = useChat();

	const {
		input,
		interimText,
		isListening,
		speechSupported,
		textareaRef,
		toggleListening,
		handleInputChange,
		handleSubmit,
		fullText,
	} = useSpeechInput({
		onSubmit: (text) => sendMessage({ text }),
	});

	const isLoading = status === "streaming" || status === "submitted";

	return (
		<section className="w-full min-h-screen flex items-center justify-center py-[120px] max-md:px-[24px] max-md:py-[80px]">
			<div className="w-full mx-auto flex flex-col gap-[48px] items-center">
				{/* Headline */}
				<div className="flex flex-col gap-[24px]">
					<h1 className="text-[48px] leading-[64px] text-white text-center max-w-2xl font-light tracking-wide">
						HNIs get analysts.
						<br /> You get YouTube that gap costs you.
					</h1>
					<h2 className="text-[24px] leading-[32px] text-white text-center max-w-2xl font-light tracking-wide">
						Get your doubts cleared by the top stock experts
					</h2>
				</div>

				{/* Prompt Input Container */}
				<div className="w-full max-w-2xl">
					{/* Messages Display */}
					{messages.length > 0 && (
						<div className="mb-4 max-h-[300px] overflow-y-auto rounded-[16px] bg-white/5 backdrop-blur-sm p-4 space-y-3">
							{messages.map((message: UIMessage) => (
								<div
									key={message.id}
									className={`p-3 rounded-lg ${
										message.role === "user"
											? "bg-[#00177C] text-white ml-auto max-w-[80%]"
											: "bg-white text-gray-800 mr-auto max-w-[80%]"
									}`}
								>
									{message.parts.map(
										(
											part: {
												type: string;
												text?: string;
											},
											i: number
										) => {
											if (part.type === "text") {
												return (
													<span
														key={`${message.id}-${i}`}
													>
														{part.text}
													</span>
												);
											}
											return null;
										}
									)}
								</div>
							))}
						</div>
					)}

					<form onSubmit={handleSubmit}>
						<div className="bg-white rounded-[24px] shadow-2xl shadow-black/20 overflow-hidden">
							{/* Text Input Area */}
							<div className="p-4 pb-0 relative">
								{/* Display layer for showing interim text with different styling */}
								<div className="absolute inset-0 p-4 pb-0 pointer-events-none">
									<div className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
										<span className="text-gray-700">
											{input}
										</span>
										{interimText && (
											<span className="text-gray-400 italic">
												{interimText}
											</span>
										)}
									</div>
								</div>
								<textarea
									ref={textareaRef}
									value={input}
									onChange={handleInputChange}
									placeholder={
										isListening
											? "Listening... speak now"
											: "Ask your stock market queries..."
									}
									className={`w-full min-h-[80px] resize-none text-[15px] leading-relaxed focus:outline-none bg-transparent ${
										interimText
											? "text-transparent caret-gray-700"
											: "text-gray-700 placeholder:text-gray-400"
									}`}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											handleSubmit(e);
										}
									}}
									disabled={isLoading}
								/>
							</div>

							{/* Toolbar */}
							<div className="flex items-center justify-between px-4 py-3">
								{/* Left Side - Toggle */}
								<span className="text-[14px] leading-[20px] text-[#010943] select-none flex items-center gap-2 bg-[#F1F2F9] rounded-[8px] px-[12px] py-[8px]">
									Show relevant answers
									<CircleCheck className="w-4 h-4 text-[#010943]" />
								</span>

								{/* Right Side - Action Buttons */}
								<div className="flex items-center gap-2">
									{/* Microphone Button */}
									{speechSupported && (
										<button
											type="button"
											onClick={toggleListening}
											className={`
												p-2.5 rounded-lg transition-all duration-200
												${
													isListening
														? "bg-red-100 hover:bg-red-200 ring-2 ring-red-400"
														: "hover:bg-gray-100"
												}
											`}
											aria-label={
												isListening
													? "Stop listening"
													: "Voice input"
											}
											disabled={isLoading}
										>
											{isListening ? (
												<MicOff className="w-5 h-5 text-red-600" />
											) : (
												<Mic className="w-5 h-5 text-[#010943]" />
											)}
										</button>
									)}

									{/* Send Button */}
									<button
										type="submit"
										disabled={!fullText.trim() || isLoading}
										className={`
											p-2.5 rounded-[8px] transition-all duration-200
											${
												fullText.trim() && !isLoading
													? "bg-[#00177C] hover:bg-[#001060] shadow-md hover:shadow-lg"
													: "bg-[#00177C] opacity-60 cursor-not-allowed"
											}
										`}
										aria-label="Send message"
									>
										{isLoading ? (
											<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
										) : (
											<Send className="w-5 h-5 text-white" />
										)}
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>

				<div className="h-[50%] w-full flex flex-col gap-[32px]">
					<h2 className="text-[20px] leading-[32px] text-white text-center">
						check these frequently asked questions
					</h2>
					{/* frequently asked questions */}
					<InfiniteSlider speedOnHover={1} gap={24}>
						<div className="flex items-center justify-center gap-[24px]">
							{frequentlyAskedQuestions.map((item) => (
								<div
									key={item.id}
									className="flex flex-col gap-[12px] rounded-[16px] bg-[#FBFBFD1A] backdrop-blur-sm w-[413px] h-[200px] px-[24px] py-[16px]"
								>
									<MessageCircle className="w-6 h-6 text-[#F7F7F7]" />
									{/* <h3 className="text-[24px] leading-[32px] text-white font-light tracking-wide">
									{item.question}
								</h3> */}
									<p className="text-[16px] leading-[24px] text-white opacity-70 font-light tracking-wide">
										{item.answer}
									</p>
								</div>
							))}
						</div>
					</InfiniteSlider>
				</div>
			</div>
		</section>
	);
}
