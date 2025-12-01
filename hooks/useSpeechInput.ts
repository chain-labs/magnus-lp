"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// Type declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
	results: SpeechRecognitionResultList;
	resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
	error: string;
	message: string;
}

interface SpeechRecognition extends EventTarget {
	continuous: boolean;
	interimResults: boolean;
	lang: string;
	start: () => void;
	stop: () => void;
	abort: () => void;
	onresult: ((event: SpeechRecognitionEvent) => void) | null;
	onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
	onend: (() => void) | null;
	onstart: (() => void) | null;
}

declare global {
	interface Window {
		SpeechRecognition: new () => SpeechRecognition;
		webkitSpeechRecognition: new () => SpeechRecognition;
	}
}

interface UseSpeechInputOptions {
	onSubmit?: (text: string) => void;
	lang?: string;
}

interface UseSpeechInputReturn {
	input: string;
	interimText: string;
	isListening: boolean;
	speechSupported: boolean;
	textareaRef: React.RefObject<HTMLTextAreaElement | null>;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	toggleListening: () => void;
	handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	handleSubmit: (e: React.FormEvent) => void;
	resetInput: () => void;
	fullText: string;
}

export function useSpeechInput(
	options: UseSpeechInputOptions = {}
): UseSpeechInputReturn {
	const { onSubmit, lang = "en-US" } = options;

	const [input, setInput] = useState("");
	const [interimText, setInterimText] = useState("");
	const [isListening, setIsListening] = useState(false);
	const [speechSupported, setSpeechSupported] = useState(false);

	const recognitionRef = useRef<SpeechRecognition | null>(null);
	const baseInputRef = useRef("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Initialize speech recognition
	useEffect(() => {
		if (typeof window !== "undefined") {
			const SpeechRecognitionAPI =
				window.SpeechRecognition || window.webkitSpeechRecognition;

			if (SpeechRecognitionAPI) {
				setSpeechSupported(true);
				const recognition = new SpeechRecognitionAPI();
				recognition.continuous = true;
				recognition.interimResults = true;
				recognition.lang = lang;

				recognition.onresult = (event: SpeechRecognitionEvent) => {
					let finalTranscript = "";
					let currentInterim = "";

					for (
						let i = event.resultIndex;
						i < event.results.length;
						i++
					) {
						const transcript = event.results[i][0].transcript;
						if (event.results[i].isFinal) {
							finalTranscript += transcript;
						} else {
							currentInterim += transcript;
						}
					}

					// Update with final transcript
					if (finalTranscript) {
						baseInputRef.current =
							baseInputRef.current + finalTranscript;
						setInput(baseInputRef.current);
						setInterimText("");
					}

					// Show interim results in real-time
					if (currentInterim) {
						setInterimText(currentInterim);
					}
				};

				recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
					console.error("Speech recognition error:", event.error);
					setIsListening(false);
					setInterimText("");
				};

				recognition.onend = () => {
					setIsListening(false);
					setInterimText("");
				};

				recognitionRef.current = recognition;
			}
		}

		return () => {
			if (recognitionRef.current) {
				recognitionRef.current.abort();
			}
		};
	}, [lang]);

	const toggleListening = useCallback(() => {
		if (!recognitionRef.current) return;

		if (isListening) {
			recognitionRef.current.stop();
			setIsListening(false);
			setInterimText("");
		} else {
			try {
				// Store current input as base before starting
				baseInputRef.current = input;
				recognitionRef.current.start();
				setIsListening(true);
			} catch (error) {
				console.error("Failed to start speech recognition:", error);
			}
		}
	}, [isListening, input]);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const newValue = e.target.value;
			setInput(newValue);
			baseInputRef.current = newValue;
			// Clear interim if user is typing manually
			if (!isListening) {
				setInterimText("");
			}
		},
		[isListening]
	);

	const resetInput = useCallback(() => {
		setInput("");
		setInterimText("");
		baseInputRef.current = "";
	}, []);

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			const fullText = input + interimText;
			if (!fullText.trim()) return;

			// Stop listening if active
			if (isListening && recognitionRef.current) {
				recognitionRef.current.stop();
				setIsListening(false);
			}

			onSubmit?.(fullText);
			resetInput();
		},
		[input, interimText, isListening, onSubmit, resetInput]
	);

	return {
		input,
		interimText,
		isListening,
		speechSupported,
		textareaRef,
		setInput,
		toggleListening,
		handleInputChange,
		handleSubmit,
		resetInput,
		fullText: input + interimText,
	};
}

