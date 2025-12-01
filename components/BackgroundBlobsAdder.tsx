import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

export default function BackgroundBlobsAdder({
	children,
	blobs,
	parentClassName,
}: {
	children: React.ReactNode;
	blobs: ClassValue[];
	parentClassName?: ClassValue;
}) {
	return (
		<div className={cn("relative w-full h-full z-0 overflow-hidden", parentClassName)}>
			<div className="relative z-10 w-full h-full">{children}</div>
			<div className="absolute top-0 left-0 w-full h-full">
				{blobs.map((blob) => (
					<div key={blob as string} className={cn(blob)}></div>
				))}
			</div>
		</div>
	);
}
