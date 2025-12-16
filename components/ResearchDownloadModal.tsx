"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useUserData } from "./UserDataProvider";

interface ResearchDownloadModalProps {
	isOpen: boolean;
	onClose: () => void;
	stockName: string;
	researchReportUrl: string;
}

export default function ResearchDownloadModal({
	isOpen,
	onClose,
	stockName,
	researchReportUrl,
}: ResearchDownloadModalProps) {
	const { userData: formData, setUserData: setFormData } = useUserData();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");

		try {
			const response = await fetch("/api/research/download", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
					stockName,
					researchReportUrl,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				setSubmitSuccess(true);

				// Trigger download
				window.open(researchReportUrl, "_blank");

				// Reset form and close modal after a short delay
				setTimeout(() => {
					setSubmitSuccess(false);
					onClose();
				}, 2000);
			} else {
				setError(data.error || "Failed to submit form");
			}
		} catch (err) {
			setError("An error occurred. Please try again.");
			console.error("Download form error:", err);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="w-[calc(100%-2rem)] max-w-md p-0 overflow-hidden border-0 rounded-2xl sm:rounded-3xl shadow-xl bg-white mx-auto">
				{/* Header */}
				<div className="px-5 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-5 bg-[#000728]">
					<DialogHeader className="space-y-1.5 sm:space-y-2">
						<DialogTitle className="text-xl sm:text-2xl text-white font-semibold tracking-tight">
							Get Research Report
						</DialogTitle>
						<DialogDescription className="text-sm sm:text-base text-white/60">
							<span className="text-white font-medium">
								{stockName}
							</span>
						</DialogDescription>
					</DialogHeader>
				</div>

				{/* Content */}
				<div className="px-5 py-5 sm:px-8 sm:py-6">
					{submitSuccess ? (
						<div className="py-8 sm:py-10 text-center">
							<div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-emerald-50">
								<svg
									className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-500"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2.5"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path d="M5 13l4 4L19 7"></path>
								</svg>
							</div>
							<p className="text-lg sm:text-xl text-gray-900 font-medium">
								Download started
							</p>
							<p className="text-sm text-gray-500 mt-1">
								Check your downloads folder
							</p>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700 mb-1.5"
								>
									Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
									autoComplete="name"
									className="w-full h-12 px-4 bg-gray-50 border-0 rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:bg-white transition-colors"
									placeholder="Your name"
								/>
							</div>

							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 mb-1.5"
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									autoComplete="email"
									className="w-full h-12 px-4 bg-gray-50 border-0 rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:bg-white transition-colors"
									placeholder="you@example.com"
								/>
							</div>

							<div>
								<label
									htmlFor="phone"
									className="block text-sm font-medium text-gray-700 mb-1.5"
								>
									Phone
								</label>
								<input
									type="tel"
									id="phone"
									name="phoneNumber"
									value={formData.phoneNumber}
									onChange={handleChange}
									required
									autoComplete="tel"
									className="w-full h-12 px-4 bg-gray-50 border-0 rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:bg-white transition-colors"
									placeholder="+91 98765 43210"
								/>
							</div>

							{error && (
								<div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl">
									<svg
										className="w-4 h-4 flex-shrink-0"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
									</svg>
									{error}
								</div>
							)}

							<button
								type="submit"
								style={{
									background: `radial-gradient(97.46% 172.79% at 2.54% 70.83%, #A12FFF 0%, rgba(0, 22, 118, 0.5) 100%),
								   radial-gradient(169.02% 564.79% at 77.54% -103.13%, #2FFCFF 0%, rgba(0, 22, 118, 0.5) 100%),
								   #00177C`,
								}}
								disabled={isSubmitting}
								className="w-full h-12 bg-gray-900 text-white rounded-xl text-base font-medium hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all flex items-center justify-center gap-2 mt-2"
							>
								{isSubmitting ? (
									<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
								) : (
									<>
										<svg
											className="w-5 h-5"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
										</svg>
										Download
									</>
								)}
							</button>

							<p className="text-xs text-gray-400 text-center">
								You&apos;ll receive research updates from us
							</p>
						</form>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
