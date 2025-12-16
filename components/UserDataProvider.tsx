"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserData {
	name: string;
	email: string;
	phoneNumber: string;
}

const UserDataContext = createContext<{
	userData: UserData;
	setUserData: React.Dispatch<React.SetStateAction<UserData>>;
} | null>(null);

export const useUserData = () => {
	const context = useContext(UserDataContext);
	if (!context) {
		throw new Error("useUserData must be used within a UserDataProvider");
	}
	return context;
};

interface UserDataProviderProps {
	children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({
	children,
}) => {
	const [userData, setUserData] = useState<UserData>({
		name: "",
		email: "",
		phoneNumber: "",
	});

	return (
		<UserDataContext.Provider value={{ userData, setUserData }}>
			{children}
		</UserDataContext.Provider>
	);
};
