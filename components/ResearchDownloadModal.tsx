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
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-[24px] leading-8 text-[#030919]">
						Download Research Report
					</DialogTitle>
					<DialogDescription className="text-[14px] leading-6 text-black opacity-60">
						Please fill in your details to download the research
						report for{" "}
						<span className="font-semibold text-black">
							{stockName}
						</span>
					</DialogDescription>
				</DialogHeader>

				{submitSuccess ? (
					<div className="py-8 text-center">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
							<svg
								className="h-6 w-6 text-green-600"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path d="M5 13l4 4L19 7"></path>
							</svg>
						</div>
						<p className="text-[16px] leading-6 text-[#030919] font-medium">
							Success! Your download will start shortly.
						</p>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-4 mt-4">
						<div className="space-y-2">
							<label
								htmlFor="name"
								className="text-[14px] leading-6 text-[#030919] font-medium"
							>
								Full Name{" "}
								<span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg text-[16px] leading-6 focus:outline-none focus:ring-2 focus:ring-[#030919] focus:border-transparent"
								placeholder="Enter your full name"
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="email"
								className="text-[14px] leading-6 text-[#030919] font-medium"
							>
								Email <span className="text-red-500">*</span>
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg text-[16px] leading-6 focus:outline-none focus:ring-2 focus:ring-[#030919] focus:border-transparent"
								placeholder="Enter your email"
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="phone"
								className="text-[14px] leading-6 text-[#030919] font-medium"
							>
								Phone Number{" "}
								<span className="text-red-500">*</span>
							</label>
							<input
								type="tel"
								id="phone"
								name="phoneNumber"
								value={formData.phoneNumber}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg text-[16px] leading-6 focus:outline-none focus:ring-2 focus:ring-[#030919] focus:border-transparent"
								placeholder="Enter your phone number"
							/>
						</div>

						{error && (
							<div className="text-red-500 text-[14px] leading-6 text-center">
								{error}
							</div>
						)}

						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full bg-[#030919] text-white px-6 py-3 rounded-lg text-[16px] leading-6 font-medium hover:bg-[#030919]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
						>
							{isSubmitting ? (
								<span className="flex items-center justify-center gap-2">
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
									Submitting...
								</span>
							) : (
								"Download Report"
							)}
						</button>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
}
