import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";

const LogOutButton = () => {
	const timerRef = useRef(null);
	const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes

	const redirectToLogout = () => {
		window.location.href =
			"https://tux01.uni-frankfurt.de/Shibboleth.sso/Logout";
	};

	const resetTimer = () => {
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			redirectToLogout();
		}, INACTIVITY_LIMIT);
	};

	useEffect(() => {
		// Reset timer whenever the user interacts
		const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];

		const handleActivity = () => {
			resetTimer();
		};

		events.forEach((event) => {
			window.addEventListener(event, handleActivity);
		});

		// Start the first timer
		resetTimer();

		// Clean up when component unmounts
		return () => {
			events.forEach((event) =>
				window.removeEventListener(event, handleActivity)
			);
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	return <Button onClick={redirectToLogout}>Log out</Button>;
};

export default LogOutButton;
