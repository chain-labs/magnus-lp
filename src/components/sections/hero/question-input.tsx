"use client";

import { Send, Mic, MicOff } from "lucide-react";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

type SpeechRecognitionConstructor = new () => SpeechRecognition;

interface BrowserWindow extends Window {
	SpeechRecognition?: SpeechRecognitionConstructor;
	webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

interface QuestionInputProps {
	onSubmit: (question: string, email?: string) => void;
}

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
			setValue(transcript);
			adjustHeight();
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
	}, [adjustHeight]);

	const toggleListening = () => {
		if (!recognition) return;

		if (isListening) {
			recognition.stop();
			setIsListening(false);
		} else {
			setValue("");
			recognition.start();
			setIsListening(true);
		}
	};

	const handleSubmit = () => {
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
		setValue("");
		setEmail("");
		setShowEmailCapture(false);
		adjustHeight(true);
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
						"relative flex flex-col rounded-xl transition-all duration-200 w-full text-left cursor-text",
						"ring-1 ring-black/10 dark:ring-white/10",
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
							placeholder="Ask anything..."
							className="w-full rounded-xl rounded-b-[0] px-4 py-3 backdrop-blur-md bg-black/5 dark:bg-white/5 border-none dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70 resize-none focus-visible:ring-0 leading-[1.2]"
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
								setValue(e.target.value);
								adjustHeight();
							}}
						/>
					</div>

					{showEmailCapture && (
						<div
							className="px-4 py-3 bg-black/5 dark:bg-white/5 border-t border-black/10 dark:border-white/10"
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
								className="w-full px-3 py-2 rounded-lg bg-background border border-black/10 dark:border-white/10 text-body-md focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20"
							/>
						</div>
					)}

					<div className="h-12 bg-black/5 dark:bg-white/5 rounded-b-xl flex items-center justify-end px-3">
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

				<button
					type="button"
					onClick={handleSubmit}
					disabled={!value.trim()}
					className={`inline-flex mt-4 items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 rounded-md px-6 has-[>svg]:px-4 gap-2 !font-(family-name:--font-poppins) !text-white`}
				>
					Post Question
					<Send />
				</button>

				<div className="text-center mt-4">
					<a
						href="/landing"
						className="text-body-sm text-muted-foreground hover:text-foreground underline transition-colors"
					>
						Continue to site
					</a>
				</div>
			</div>
		</div>
	);
}
