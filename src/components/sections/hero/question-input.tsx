"use client";

import { Send, Mic, MicOff } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

type SpeechRecognitionCallback<TEvent extends Event> =
	| ((this: SpeechRecognition, event: TEvent) => void)
	| null;

interface SpeechRecognitionAlternative {
	transcript: string;
	confidence: number;
}

interface SpeechRecognitionResult {
	readonly length: number;
	readonly isFinal: boolean;
	[index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
	readonly length: number;
	[index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
	readonly resultIndex: number;
	readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
	readonly error: string;
	readonly message?: string;
}

interface SpeechRecognition {
	continuous: boolean;
	interimResults: boolean;
	lang: string;
	start: () => void;
	stop: () => void;
	abort?: () => void;
	onresult: SpeechRecognitionCallback<SpeechRecognitionEvent>;
	onerror: SpeechRecognitionCallback<SpeechRecognitionErrorEvent>;
	onend: SpeechRecognitionCallback<Event>;
}

type SpeechRecognitionConstructor = new () => SpeechRecognition;

interface BrowserWindow extends Window {
	SpeechRecognition?: SpeechRecognitionConstructor;
	webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

interface QuestionInputProps {
	onSubmit: (question: string, email?: string) => void;
}

const CHARACTER_LIMIT = 180;

export default function QuestionInput({ onSubmit }: QuestionInputProps) {
	const [value, setValue] = useState("");
	const [email, setEmail] = useState("");
	const [showEmailCapture, setShowEmailCapture] = useState(false);
	const { textareaRef, adjustHeight } = useAutoResizeTextarea({
		minHeight: 52,
		maxHeight: 200,
	});
	const [isFocused, setIsFocused] = useState(false);
	const [isListening, setIsListening] = useState(false);
	const [recognition, setRecognition] = useState<SpeechRecognition | null>(
		null
	);

	const applyValueUpdate = useCallback(
		(input: string, resetHeight = false) => {
			const sanitized = input.slice(0, CHARACTER_LIMIT);
			setValue(sanitized);
			adjustHeight(resetHeight);
			return sanitized;
		},
		[adjustHeight]
	);

	const charCount = value.length;
	const progress = Math.min(charCount / CHARACTER_LIMIT, 1);
	const size = 24;
	const strokeWidth = 2.5;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const dashOffset = circumference * (1 - progress);
	const remainingChars = Math.max(CHARACTER_LIMIT - charCount, 0);
	const showRemainingCount = remainingChars <= 3;
	const progressColorClass = cn(
		"text-black/40 dark:text-white/40",
		charCount === 0 && "text-black/20 dark:text-white/20",
		progress >= 0.9 && progress < 1 && "text-yellow-500 dark:text-yellow-400",
		progress >= 1 && "text-red-500 dark:text-red-400",
		progress < 0.9 && charCount > 0 && "text-primary"
	);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const {
			SpeechRecognition: NativeSpeechRecognition,
			webkitSpeechRecognition,
		} = window as BrowserWindow;

		const SpeechRecognitionCtor =
			NativeSpeechRecognition ?? webkitSpeechRecognition ?? null;

		if (!SpeechRecognitionCtor) {
			return;
		}

		const recognitionInstance = new SpeechRecognitionCtor();
		recognitionInstance.continuous = true;
		recognitionInstance.interimResults = true;
		recognitionInstance.lang = "en-US";

		recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
			let transcript = "";
			for (let i = event.resultIndex; i < event.results.length; i += 1) {
				transcript += event.results[i][0].transcript;
			}
			const sanitizedTranscript = applyValueUpdate(transcript);
			if (sanitizedTranscript.length >= CHARACTER_LIMIT) {
				recognitionInstance.stop();
			}
		};

		recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
			console.error("Speech recognition error:", event.error);
			setIsListening(false);
		};

		recognitionInstance.onend = () => {
			setIsListening(false);
		};

		setRecognition(recognitionInstance);

		return () => {
			recognitionInstance.stop();
			recognitionInstance.onresult = null;
			recognitionInstance.onerror = null;
			recognitionInstance.onend = null;
			setRecognition(null);
		};
	}, [applyValueUpdate]);

	const toggleListening = () => {
		if (!recognition) return;

		if (isListening) {
			recognition.stop();
			setIsListening(false);
		} else {
			applyValueUpdate("", true);
			recognition.start();
			setIsListening(true);
		}
	};

	const handleSubmit = async () => {
		if (!value.trim()) return;

		if (isListening && recognition) {
			recognition.stop();
		}

		// First click: Show email capture
		if (!showEmailCapture) {
			setShowEmailCapture(true);
			return;
		}

		// Second click or email provided: Submit the question
		onSubmit(value, email.trim() || undefined);
		applyValueUpdate("", true);
		setEmail("");
		setShowEmailCapture(false);
	};

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const handleContainerClick = () => {
		if (textareaRef.current) {
			textareaRef.current.focus();
		}
	};

	return (
		<div className="w-full py-4">
			<div className="relative max-w-xl w-full mx-auto flex flex-col justify-center items-center">
				<div
					role="textbox"
					tabIndex={0}
					aria-label="Search input container"
					className={cn(
						"relative flex flex-col rounded-xl transition-all duration-200 w-full text-left cursor-text bg-white/90 backdrop-blur-md drop-shadow-2xl",
						isFocused && "ring-black/20 dark:ring-white/20"
					)}
					onClick={handleContainerClick}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							handleContainerClick();
						}
					}}
				>
					<div className="overflow-y-auto max-h-[200px]">
						<Textarea
							id="ai-input-04"
							value={value}
							placeholder="Ask Your Stock Market Queries..."
							maxLength={CHARACTER_LIMIT}
							className="w-full rounded-xl rounded-b-[0] px-4 py-3 border-none dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70 resize-none focus-visible:ring-0 leading-[1.2]"
							ref={textareaRef}
							onFocus={handleFocus}
							onBlur={handleBlur}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									handleSubmit();
								}
							}}
							onChange={(e) => {
								applyValueUpdate(e.target.value);
							}}
						/>
					</div>

					{showEmailCapture && (
						<div
							className="px-4 py-3 bg-white/5 border-t border-black/10 dark:border-white/10"
							onClick={(e) => e.stopPropagation()}
						>
							<p className="text-body-sm text-muted-foreground mb-2">
								Want to be notified when this is answered?
								(Optional)
							</p>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="your@email.com"
								className="w-full px-3 py-2 rounded-lg shadow-sm text-body-md focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20"
							/>
						</div>
					)}

					<div className="h-12 bg-white/5 rounded-b-xl flex items-center justify-end px-3">
						<div className="flex items-center gap-2">
							<div
								className={cn(
									"relative flex h-8 w-8 items-center justify-center",
									progressColorClass
								)}
								aria-hidden="true"
							>
								<svg
									className="h-full w-full -rotate-90"
									width={size}
									height={size}
									viewBox={`0 0 ${size} ${size}`}
								>
									<circle
										className="text-black/10 dark:text-white/10"
										stroke="currentColor"
										strokeWidth={strokeWidth}
										fill="none"
										cx={size / 2}
										cy={size / 2}
										r={radius}
									/>
									<circle
										className="transition-[stroke-dashoffset]"
										stroke="currentColor"
										strokeWidth={strokeWidth}
										strokeLinecap="round"
										fill="none"
										cx={size / 2}
										cy={size / 2}
										r={radius}
										strokeDasharray={`${circumference} ${circumference}`}
										strokeDashoffset={dashOffset}
									/>
								</svg>
								{showRemainingCount && (
									<span className="absolute text-[10px] font-medium text-black dark:text-white">
										{remainingChars}
									</span>
								)}
							</div>
							<span className="sr-only" aria-live="polite">
								{remainingChars} characters remaining
							</span>
							{recognition && (
								<button
									type="button"
									onClick={toggleListening}
									className={cn(
										"rounded-lg p-2 transition-colors",
										isListening
											? "bg-red-500/15 text-red-500 animate-pulse"
											: "bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white cursor-pointer"
									)}
									title={
										isListening
											? "Stop recording"
											: "Start voice input"
									}
								>
									{isListening ? (
										<MicOff className="w-4 h-4" />
									) : (
										<Mic className="w-4 h-4" />
									)}
								</button>
							)}
						</div>
					</div>
				</div>

				<button
					type="button"
					onClick={handleSubmit}
					disabled={!value.trim()}
					className={`inline-flex mt-4 items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 rounded-md px-6 has-[>svg]:px-4 gap-2 !font-(family-name:--font-poppins) !text-white`}
				>
					Post Question
					<Send />
				</button>
			</div>
		</div>
	);
}
