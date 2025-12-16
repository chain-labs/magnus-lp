"use client";

import { useState, useEffect } from "react";
import {
	Mic,
	MicOff,
	Send,
	CircleCheck,
	SlidersHorizontal,
    ArrowBigLeft,
    ArrowLeft,
} from "lucide-react";
import { InfiniteSlider } from "./motion-primitives/infinite-slider";
import { useSpeechInput } from "@/hooks/useSpeechInput";
import Image from "next/image";
import type { HeroData } from "@/sanity/lib/types";
import { useUserData } from "./UserDataProvider";

// Static data - commented out in favor of Sanity CMS
// const frequentlyAskedQuestions = [
// 	{
// 		id: "item-1",
// 		question: "What is the difference between a stock and a bond?",
// 		answer: "A stock is a security that represents ownership in a company. A bond is a security that represents a loan to a company or government.",
// 	},
// 	{
// 		id: "item-2",
// 		question: "What is the difference between a stock and a bond?",
// 		answer: "A stock is a security that represents ownership in a company. A bond is a security that represents a loan to a company or government.",
// 	},
// 	{
// 		id: "item-3",
// 		question: "What is the difference between a stock and a bond?",
// 		answer: "A stock is a security that represents ownership in a company. A bond is a security that represents a loan to a company or government.",
// 	},
// 	{
// 		id: "item-4",
// 		question: "What is the difference between a stock and a bond?",
// 		answer: "A stock is a security that represents ownership in a company. A bond is a security that represents a loan to a company or government.",
// 	},
// 	{
// 		id: "item-5",
// 		question: "What is the difference between a stock and a bond?",
// 		answer: "A stock is a security that represents ownership in a company. A bond is a security that represents a loan to a company or government.",
// 	},
// ];

// Default fallback data
const defaultHeroData: HeroData = {
	visible: true,
	subtitle: "Stock Picking, Simplified",
	headline: "HNIs get analysts. You get YouTube. That gap costs you.",
};

interface HeroProps {
	data?: { data: HeroData | null };
}

export default function Hero({ data }: HeroProps) {
	const heroData = data?.data || defaultHeroData;
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [showUserForm, setShowUserForm] = useState(false);
	const { userData, setUserData } = useUserData();
	const [answeredQuestions, setAnsweredQuestions] = useState<
		{
			questionText: string;
			answerText: string;
			id: string;
		}[]
	>([]);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await fetch("/api/questions/answered");
				if (response.ok) {
					const data = await response.json();
					setAnsweredQuestions(data.questions);
				}
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};

		fetchQuestions();
	}, []);

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
		setInput,
	} = useSpeechInput({
		onSubmit: async (text) => {
			if (!text.trim()) return;

			// First step: show user form
			if (!showUserForm) {
				setShowUserForm(true);
				return;
			}

			// Second step: validate and submit
			if (!userData.name.trim() || !userData.email.trim()) {
				return;
			}

			setIsSubmitting(true);
			try {
				const response = await fetch("/api/questions/submit", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						questionText: text,
						userName: userData.name,
						userEmail: userData.email,
						userPhone: userData.phoneNumber,
					}),
				});

				if (response.ok) {
					setIsSuccess(true);
					setShowUserForm(false);
				} else {
					console.error("Failed to submit question");
				}
			} catch (error) {
				console.error("Error submitting question:", error);
			} finally {
				setIsSubmitting(false);
			}
		},
	});

	const handleBackToQuestion = () => {
		setShowUserForm(false);
	};

	const isLoading = isSubmitting;

	return (
		<section
			id="hero"
			className="w-full min-h-screen flex items-center justify-center py-[120px] pb-[40px] md:pb-[120px]"
		>
			<Image
				src={"/assets/section/hero/skewedGrid.svg"}
				alt="skewed grid"
				width={1000}
				height={1000}
				className="w-full h-[50%] max-h-[500px] absolute top-0 left-0 object-cover"
			/>
			<div className="w-full flex flex-col items-center z-10">
				<div className="w-full min-h-[70vh] flex flex-col justify-center items-center gap-[40px] md:gap-[60px] z-10 px-[20px] md:px-0">
					{/* Headline */}
					<div className="flex flex-col justify-center items-center gap-[20px]">
						<h2 className="text-[20px] md:text-[24px] leading-[32px] md:leading-[32px] max-md:text-[18px] max-md:leading-[24px] text-white text-center max-w-2xl font-light tracking-wide">
							{heroData.subtitle}
						</h2>
						<h1 className="text-[32px] leading-[40px] md:text-[48px] md:leading-[64px] text-white text-center font-light tracking-wide max-w-[846px] font-medium">
							{heroData.headline
								?.split("\n")
								.map((line, idx, arr) => (
									<span key={idx}>
										{line}
										{idx < arr.length - 1 && <br />}
									</span>
								)) || heroData.headline}
						</h1>
					</div>

					{/* Prompt Input Container */}
					<div className="w-full max-w-2xl">
						{isSuccess ? (
							<div className="bg-white rounded-[24px] shadow-2xl shadow-black/20 overflow-hidden min-h-[200px] flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
								<CircleCheck className="w-12 h-12 text-green-500 mb-4" />
								<h3 className="text-xl font-medium text-[#010943] mb-2">
									Question Submitted!
								</h3>
								<p className="text-gray-500">
									We&apos;ve received your query and once
									answered it will be displayed below.
								</p>
							</div>
						) : (
							<form onSubmit={handleSubmit}>
								<div className="bg-white rounded-[24px] shadow-2xl shadow-black/20 overflow-hidden">
									{/* Text Input Area */}
									<div className="px-[32px] py-[24px] pb-0 relative">
										{!showUserForm ? (
											<>
												{/* Display layer for showing interim text with different styling */}
												<div className="absolute inset-0 px-[32px] py-[24px] pb-0 pointer-events-none">
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
													className={`w-full min-h-[80px] max-md:min-h-[120px] resize-none text-[15px] leading-relaxed focus:outline-none bg-transparent ${
														interimText
															? "text-transparent caret-gray-700"
															: "text-gray-700 placeholder:text-gray-400"
													}`}
													onKeyDown={(e) => {
														if (
															e.key === "Enter" &&
															!e.shiftKey
														) {
															e.preventDefault();
															handleSubmit(e);
														}
													}}
													disabled={isLoading}
												/>
											</>
										) : (
											<>
												{/* Show question preview */}
												{/* <div className="mb-4 p-3 bg-gray-50 rounded-lg">
													<p className="text-sm text-gray-600 mb-1">
														Your question:
													</p>
													<p className="text-gray-800">
														{input}
													</p>
												</div> */}

												{/* User details form */}
												<div className="space-y-3 mb-4">
													<input
														type="text"
														placeholder="Your Name *"
														value={userData.name}
														name="name"
														onChange={(e) =>
															setUserData(
																(prev) => ({
																	...prev,
																	name: e
																		.target
																		.value,
																})
															)
														}
														className="w-full p-3 border-b border-[#00177C] rounded-md text-[15px] focus:outline-none focus:ring-2 focus:ring-[#00177C]"
														required
														disabled={isLoading}
													/>
													<input
														type="email"
														placeholder="Your Email *"
														value={userData.email}
														name="email"
														onChange={(e) =>
															setUserData(
																(prev) => ({
																	...prev,
																	email: e
																		.target
																		.value,
																})
															)
														}
														className="w-full p-3 border-b border-[#00177C] rounded-md text-[15px] focus:outline-none focus:ring-2 focus:ring-[#00177C]"
														required
														disabled={isLoading}
													/>
													<input
														type="tel"
														placeholder="Your Phone (optional)"
														name="phoneNumber"
														value={
															userData.phoneNumber
														}
														onChange={(e) =>
															setUserData(
																(prev) => ({
																	...prev,
																	phoneNumber:
																		e.target
																			.value,
																})
															)
														}
														className="w-full p-3 border-b border-[#00177C] rounded-md text-[15px] focus:outline-none focus:ring-2 focus:ring-[#00177C]"
														disabled={isLoading}
													/>
												</div>
											</>
										)}
									</div>

									{/* Toolbar */}
									<div className="flex items-center justify-between px-[32px] py-[24px] pt-0">
										<div>
											{showUserForm && (
												<button
													type="button"
													onClick={
														handleBackToQuestion
													}
													className="text-sm text-[#00177C] hover:underline"
													disabled={isLoading}
												>
													<ArrowLeft className="inline-block w-4 h-4 mr-1" />
                                                    Back to Question
												</button>
											)}
										</div>

										{/* Right Side - Action Buttons */}
										<div className="flex items-center gap-3">
											{/* Microphone Button - only show on question step */}
											{!showUserForm &&
												speechSupported && (
													<button
														type="button"
														onClick={
															toggleListening
														}
														className={`
                                                        p-2 rounded-full transition-all duration-200 cursor-pointer
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
															<MicOff className="w-6 h-6 text-red-600" />
														) : (
															<Mic className="w-6 h-6 text-[#010943]" />
														)}
													</button>
												)}

											{/* Submit Button */}
											<button
												type="submit"
												disabled={
													(!showUserForm &&
														!fullText.trim()) ||
													(showUserForm &&
														(!userData.name.trim() ||
															!userData.email.trim())) ||
													isLoading
												}
												className={`
                                                    p-3 rounded-[12px] transition-all duration-200 flex items-center justify-center cursor-pointer
                                                    ${
														((!showUserForm &&
															fullText.trim()) ||
															(showUserForm &&
																userData.name.trim() &&
																userData.email.trim())) &&
														!isLoading
															? "bg-[#00177C] hover:bg-[#001060] shadow-md hover:shadow-lg"
															: "bg-[#00177C] opacity-50"
													}
                                                `}
												aria-label={
													showUserForm
														? "Submit question"
														: "Next"
												}
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
						)}
					</div>
				</div>

				<div className="h-[50%] w-full flex flex-col gap-[32px]">
					<h2 className=" text-[16px] md:text-[20px] leading-[24px] md:leading-[32px] text-white text-center">
						Check these frequently asked questions
					</h2>
					{/* frequently asked questions */}
					<InfiniteSlider speedOnHover={1} gap={24}>
						<div className="flex items-center justify-center gap-[24px]">
							{answeredQuestions.map((item, index) => (
								<div
									key={`faq-${index}`}
									className="flex flex-col gap-[12px] rounded-[16px] bg-[#FBFBFD1A] backdrop-blur-sm w-[413px] max-md:w-[280px] h-[200px] px-[24px] py-[16px]"
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M13.732 21.77L14.274 20.854L12.984 20.09L12.441 21.006L13.732 21.77ZM9.726 20.854L10.268 21.77L11.558 21.006L11.017 20.09L9.726 20.854ZM12.441 21.006C12.3943 21.0808 12.3293 21.1425 12.2521 21.1853C12.175 21.228 12.0882 21.2505 12 21.2505C11.9118 21.2505 11.825 21.228 11.7479 21.1853C11.6707 21.1425 11.6057 21.0808 11.559 21.006L10.268 21.77C11.041 23.077 12.958 23.077 13.732 21.77L12.441 21.006ZM10.5 2.75H13.5V1.25H10.5V2.75ZM21.25 10.5V11.5H22.75V10.5H21.25ZM2.75 11.5V10.5H1.25V11.5H2.75ZM1.25 11.5C1.25 12.655 1.25 13.558 1.3 14.287C1.35 15.022 1.453 15.634 1.688 16.2L3.074 15.626C2.927 15.274 2.841 14.844 2.796 14.185C2.75 13.519 2.75 12.675 2.75 11.5H1.25ZM7.803 18.242C6.547 18.22 5.889 18.14 5.373 17.926L4.8 19.312C5.605 19.646 6.521 19.721 7.777 19.743L7.803 18.242ZM1.688 16.2C1.97697 16.8977 2.40052 17.5316 2.93448 18.0655C3.46844 18.5995 4.10234 19.023 4.8 19.312L5.373 17.926C4.33168 17.4947 3.50535 16.6673 3.074 15.626L1.688 16.2ZM21.25 11.5C21.25 12.675 21.25 13.519 21.204 14.185C21.159 14.844 21.073 15.274 20.927 15.626L22.312 16.2C22.547 15.634 22.65 15.022 22.701 14.287C22.751 13.558 22.75 12.655 22.75 11.5H21.25ZM16.223 19.741C17.479 19.72 18.395 19.646 19.2 19.312L18.626 17.926C18.111 18.14 17.453 18.22 16.198 18.242L16.223 19.741ZM20.927 15.626C20.4957 16.6673 19.6683 17.4947 18.627 17.926L19.2 19.312C19.8977 19.023 20.5316 18.5995 21.0655 18.0655C21.5995 17.5316 22.023 16.8977 22.312 16.2L20.927 15.626ZM13.5 2.75C15.151 2.75 16.337 2.75 17.262 2.839C18.176 2.926 18.757 3.092 19.221 3.376L20.004 2.097C19.265 1.645 18.427 1.443 17.404 1.345C16.392 1.249 15.122 1.25 13.5 1.25V2.75ZM22.75 10.5C22.75 8.878 22.75 7.609 22.654 6.596C22.557 5.573 22.355 4.734 21.903 3.996L20.623 4.779C20.908 5.243 21.074 5.824 21.161 6.739C21.249 7.663 21.25 8.849 21.25 10.5H22.75ZM19.22 3.376C19.7922 3.7263 20.2733 4.20707 20.624 4.779L21.903 3.996C21.4288 3.22198 20.778 2.57123 20.004 2.097L19.22 3.376ZM10.5 1.25C8.878 1.25 7.609 1.25 6.596 1.345C5.573 1.443 4.734 1.645 3.996 2.097L4.779 3.377C5.243 3.092 5.824 2.926 6.739 2.839C7.663 2.751 8.849 2.75 10.5 2.75V1.25ZM2.75 10.5C2.75 8.849 2.75 7.663 2.839 6.738C2.926 5.824 3.092 5.243 3.376 4.779L2.097 3.997C1.645 4.735 1.443 5.573 1.345 6.596C1.25 7.61 1.25 8.878 1.25 10.5H2.75ZM3.996 2.097C3.22198 2.57123 2.57123 3.22298 2.097 3.997L3.377 4.779C3.72714 4.2073 4.20755 3.72655 4.779 3.376L3.996 2.097ZM11.016 20.09C10.814 19.747 10.636 19.444 10.462 19.206C10.2837 18.9444 10.0511 18.7244 9.78 18.561L9.026 19.858C9.073 19.886 9.138 19.936 9.25 20.09C9.371 20.256 9.508 20.486 9.726 20.854L11.016 20.09ZM7.777 19.741C8.217 19.749 8.494 19.755 8.706 19.778C8.904 19.8 8.981 19.832 9.026 19.858L9.78 18.561C9.50055 18.4046 9.19033 18.3111 8.871 18.287C8.573 18.254 8.215 18.249 7.803 18.242L7.777 19.741ZM14.274 20.854C14.492 20.487 14.629 20.256 14.75 20.09C14.862 19.936 14.927 19.886 14.974 19.858L14.22 18.561C13.93 18.731 13.72 18.956 13.538 19.206C13.365 19.444 13.186 19.746 12.983 20.09L14.274 20.854ZM16.198 18.242C15.786 18.249 15.427 18.254 15.129 18.287C14.818 18.322 14.513 18.391 14.22 18.561L14.974 19.858C15.019 19.832 15.096 19.8 15.294 19.778C15.506 19.755 15.784 19.748 16.224 19.741L16.198 18.242Z"
											fill="#F7F7F7"
										/>
										<path
											d="M8 11H8.009M11.991 11H12M15.991 11H16"
											stroke="#F7F7F7"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>

									{/* <h3 className="text-[24px] leading-[32px] text-white font-light tracking-wide">
									{item.question}
								</h3> */}
									<p className="text-[16px] leading-[24px] text-white opacity-70 font-light tracking-wide line-clamp-5">
										{item.answerText}
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
