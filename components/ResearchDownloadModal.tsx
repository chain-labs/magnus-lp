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
			<DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none rounded-2xl shadow-2xl">
				{/* Header with gradient background */}
				<div className="bg-[#030919] px-8 pt-8 pb-6">
					<DialogHeader className="space-y-3">
						<DialogTitle className="text-[28px] leading-9 text-white font-medium">
							Download Research Report
						</DialogTitle>
						<DialogDescription className="text-[16px] leading-6 text-white/70">
							Enter your details to access the report for{" "}
							<span className="font-semibold text-white">
								{stockName}
							</span>
						</DialogDescription>
					</DialogHeader>
				</div>

				{/* Content area */}
				<div className="px-8 py-6 bg-white">
					{submitSuccess ? (
						<div className="py-10 text-center">
							<div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#DCFCE7]">
								<svg
									className="h-8 w-8 text-[#16A34A]"
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
							<p className="text-[20px] leading-7 text-[#030919] font-medium">
								Success!
							</p>
							<p className="text-[16px] leading-6 text-[#030919]/60 mt-2">
								Your download will start shortly.
							</p>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="space-y-5">
							<div className="space-y-2">
								<label
									htmlFor="name"
									className="text-[14px] leading-5 text-[#030919] font-medium"
								>
									Full Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
									className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[16px] leading-6 text-[#030919] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#030919]/20 focus:border-[#030919] focus:bg-white transition-all"
									placeholder="John Doe"
								/>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="email"
									className="text-[14px] leading-5 text-[#030919] font-medium"
								>
									Email Address
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[16px] leading-6 text-[#030919] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#030919]/20 focus:border-[#030919] focus:bg-white transition-all"
									placeholder="john@example.com"
								/>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="phone"
									className="text-[14px] leading-5 text-[#030919] font-medium"
								>
									Phone Number
								</label>
								<input
									type="tel"
									id="phone"
									name="phoneNumber"
									value={formData.phoneNumber}
									onChange={handleChange}
									required
									className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[16px] leading-6 text-[#030919] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#030919]/20 focus:border-[#030919] focus:bg-white transition-all"
									placeholder="+91 98765 43210"
								/>
							</div>

							{error && (
								<div className="flex items-center gap-2 text-[#DC2626] text-[14px] leading-5 bg-[#FEF2F2] px-4 py-3 rounded-xl">
									<svg
										className="w-5 h-5 flex-shrink-0"
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
								disabled={isSubmitting}
								className="w-full bg-[#030919] text-white px-6 py-4 rounded-xl text-[16px] leading-6 font-medium hover:bg-[#030919]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-2"
							>
								{isSubmitting ? (
									<>
										<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
										Processing...
									</>
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
										Download Report
									</>
								)}
							</button>

							<p className="text-[12px] leading-4 text-[#030919]/50 text-center pt-1">
								By downloading, you agree to receive research updates from us.
							</p>
						</form>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
