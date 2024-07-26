document.addEventListener("DOMContentLoaded", () => {
	const hamburger = document.getElementById("hamburger");
	const navMenu = document.getElementById("nav-menu");

	hamburger.addEventListener("click", () => {
		navMenu.classList.toggle("show");
		hamburger.textContent = hamburger.textContent === "✕" ? "☰" : "✕";
	});

	// Handle event form submission
	const eventForm = document.getElementById("eventForm");
	if (eventForm) {
		eventForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const formData = new FormData(eventForm);
			const event = {
				name: formData.get("eventName"),
				date: formData.get("eventDate"),
				time: formData.get("eventTime"),
				price: formData.get("eventPrice"),
				location: formData.get("eventLocation"),
				tickets: formData.get("eventTickets"),
				description: formData.get("eventDescription"),
				category: formData.get("eventCategory"),
				image: formData.get("eventImage").name, // For simplicity, we are just using the name here
			};
			localStorage.setItem(`event_${Date.now()}`, JSON.stringify(event));
			alert("Event submitted successfully!");
			eventForm.reset();
		});
	}

	// Load events from localStorage
	const newEventsList = document.querySelector("#new-events .events-list");
	if (newEventsList) {
		Object.keys(localStorage).forEach((key) => {
			if (key.startsWith("event_")) {
				const event = JSON.parse(localStorage.getItem(key));
				const eventCard = createEventCard(event);
				newEventsList.appendChild(eventCard);
			}
		});
	}

	// Sample events for Popular and Concluded sections
	const popularEvents = [
		{
			name: "Tech Conference 2024",
			date: "2024-08-15",
			time: "10:00 AM",
			price: "$150",
			location: "San Francisco, CA",
			tickets: 120,
			image: "tech-conference.jpg",
		},
		{
			name: "Art Expo 2024",
			date: "2024-09-01",
			time: "09:00 AM",
			price: "$30",
			location: "New York, NY",
			tickets: 300,
			image: "art-expo.jpg",
		},
	];

	const concludedEvents = [
		{
			name: "Music Festival 2023",
			date: "2023-07-20",
			time: "03:00 PM",
			price: "$200",
			location: "Los Angeles, CA",
			tickets: 500,
			image: "music-festival.jpg",
		},
		{
			name: "Food Carnival 2023",
			date: "2023-06-10",
			time: "11:00 AM",
			price: "$20",
			location: "Miami, FL",
			tickets: 450,
			image: "food-carnival.jpg",
		},
	];

	const popularEventsList = document.querySelector(
		"#popular-events .events-list"
	);
	if (popularEventsList) {
		popularEvents.forEach((event) => {
			const eventCard = createEventCard(event);
			popularEventsList.appendChild(eventCard);
		});
	}

	const concludedEventsList = document.querySelector(
		"#concluded-events .events-list"
	);
	if (concludedEventsList) {
		concludedEvents.forEach((event) => {
			const eventCard = createEventCard(event);
			concludedEventsList.appendChild(eventCard);
		});
	}

	function createEventCard(event) {
		const eventCard = document.createElement("div");
		eventCard.className = "event-card";

		eventCard.innerHTML = `
            <img src="images/${event.image}" alt="${event.name}">
            <div class="event-info">
                <h3>${event.name}</h3>
                <p>${event.date} at ${event.time}</p>
                <p>Price: ${event.price}</p>
                <p>Location: ${event.location}</p>
                <p>Tickets Bought: ${event.tickets}</p>
            </div>
        `;

		return eventCard;
	}
});
