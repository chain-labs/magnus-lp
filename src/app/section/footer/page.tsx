export default function Footer() {
	const footer = {
		brand: "Magnus Hathaway",
		logo: "/assets/logo.png",
		nav: [
			{ label: "Disclaimer", href: "#" },
			{ label: "T&C Magnus Hathaway", href: "#" },
			{ label: "Privacy Policy", href: "#" },
			{ label: "Contact Us", href: "#" },
			{ label: "Investor Charter", href: "#" },
			{ label: "Disclosures", href: "#" },
			{ label: "Grievance Redressal", href: "#" },
		],
		raInfo: {
			name: "Alireza Azar",
			sebiRegNo: "INH000016588",
			address:
				"904, A Wing, Salarpuria Silverwoods, Varthur Road, CV Raman Nagar, Nagavara Palya, Bengaluru 560093",
		},
		disclaimers: [
			"Investments in securities market are subject to market risks. Read all the security related documents carefully before investing.",
			"Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.",
		],
		copyright: `Copyright © ${new Date().getFullYear()} All rights reserved`,
		credit: {
			by: "Chainlabs",
			label: "Made with ❤️ by Chainlabs",
		},
	};
	return (
		<footer className="bg-[#FAFAFA] py-8 font-poppins">
			<div className="container mx-auto px-4">
				<div className="flex flex-col items-center ">
					<div className="flex items-center mb-4">
						<img
							src={footer.logo}
							alt="AlphaQuark Logo"
							className="mr-4 w-8 h-8 md:w-10 md:h-auto rounded-md"
						/>
						<span className="text-2xl md:text-4xl font-semibold leading-[30px] text-center font-montserrat">
							{footer.brand}
						</span>
					</div>
					<nav className="mb-8 w-full">
						<div className="flex flex-col space-y-3 items-center md:hidden">
							{footer.nav.map((l) => (
								<a
									key={l.label}
									href={l.href}
									className="text-black hover:text-blue-900 transition-colors font-normal font-poppins text-sm text-center capitalize cursor-pointer"
								>
									{l.label}
								</a>
							))}
						</div>
						<div className="hidden md:flex justify-center items-center overflow-x-auto whitespace-nowrap py-2">
							{footer.nav.map((l, idx) => (
								<span
									key={l.label}
									className="flex items-center"
								>
									<a
										href={l.href}
										className="text-black hover:text-blue-900 transition-colors font-normal font-poppins text-sm px-3 capitalize cursor-pointer"
									>
										{l.label}
									</a>
									{idx < footer.nav.length - 1 && (
										<span className="text-black">|</span>
									)}
								</span>
							))}
						</div>
					</nav>
				</div>

				<div className="mb-6 text-center">
					<div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 max-w-5xl mx-auto">
						<h3 className="text-lg font-semibold text-gray-800 mb-3">
							Research Analyst Information
						</h3>
						<div className="text-sm text-gray-700 space-y-2">
							<div className="flex flex-col sm:flex-row sm:justify-center sm:items-center sm:gap-8">
								<p>
									<strong>Name:</strong> {footer.raInfo.name}
								</p>
								<p>
									<strong>SEBI Registration Number:</strong>{" "}
									{footer.raInfo.sebiRegNo}
								</p>
							</div>
							<p>
								<strong>Registered Office Address:</strong>{" "}
								{footer.raInfo.address}
							</p>
						</div>
					</div>
				</div>

				<div className="mb-6 text-center">
					<div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 max-w-5xl mx-auto">
						<div className="text-sm text-gray-700 space-y-3">
							<p className="font-medium text-gray-800">
								Important Disclaimers:
							</p>
							<ol className="list-decimal list-inside space-y-2 text-left">
								{footer.disclaimers.map((d, i) => (
									<li key={i}>{d}</li>
								))}
							</ol>
						</div>
					</div>
				</div>

				<div className="w-full flex justify-center mb-6">
					<div className="w-[70%] h-px bg-gray-300" />
				</div>

				<div
					className="text-center text-gray-500 flex flex-col items-center"
					style={{
						fontFamily: "Poppins, sans-serif",
						fontSize: "14px",
						fontWeight: 400,
						lineHeight: "24px",
					}}
				>
					<p className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0">
						<span className="text-xs sm:text-sm">
							{footer.copyright}
						</span>
						<span className="hidden sm:inline mx-2">|</span>
						<span className="flex items-center text-xs sm:text-sm">
							{footer.credit?.by ? (
								<>
									Made with{" "}
									<span
										className="text-red-500 mx-1"
										aria-hidden="true"
									>
										❤️
									</span>
									<span className="sr-only">love</span> by{" "}
									{footer.credit.by}
								</>
							) : (
								footer.credit?.label
							)}
						</span>
					</p>
				</div>
			</div>
		</footer>
	);
}
