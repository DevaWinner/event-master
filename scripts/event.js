const eventCenters = [
	{ name: "The Grand Regency", imageUrl: "images/event-1.webp" },
  { name: "The Grand Banquet", imageUrl: "images/event-2.webp" },
  { name: "The Grand Hall", imageUrl: "images/event-3.webp" },
  { name: "The Grand Ballroom", imageUrl: "images/event-4.webp" },
  { name: "The Grand Pavilion", imageUrl: "images/event-5.webp" },
  { name: "The Grand Auditorium", imageUrl: "images/event-6.webp" },
  { name: "The Grand Arena", imageUrl: "images/event-7.webp" },
  { name: "The Grand Plaza", imageUrl: "images/event-8.webp" },
  { name: "The Grand Courtyard", imageUrl: "images/event-9.webp" },
  { name: "The Grand Terrace", imageUrl: "images/event-10.webp" },
];

function getEventCenterByName(name) {
	return eventCenters.find((center) => center.name === name);
}

function getRandomEventCenter() {
	const randomIndex = Math.floor(Math.random() * eventCenters.length);
	return eventCenters[randomIndex];
}

document.addEventListener("DOMContentLoaded", () => {
	const hamburger = document.getElementById("hamburger");
	const navMenu = document.getElementById("nav-menu");

	hamburger.addEventListener("click", () => {
		navMenu.classList.toggle("show");
		hamburger.textContent = hamburger.textContent === "✕" ? "☰" : "✕";
	});

	// Populate event centers dropdown in the form
	const eventCenterSelect = document.getElementById("eventCenter");
	if (eventCenterSelect) {
		eventCenters.forEach((center) => {
			const option = document.createElement("option");
			option.value = center.name;
			option.textContent = center.name;
			eventCenterSelect.appendChild(option);
		});
	}

	// Handle event form submission
	const eventForm = document.getElementById("eventForm");
	if (eventForm) {
		eventForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const formData = new FormData(eventForm);
			const center = getEventCenterByName(formData.get("eventCenter"));
			const event = {
				name: formData.get("eventName"),
				date: formData.get("eventDate"),
				time: formData.get("eventTime"),
				price: formData.get("eventPrice"),
				location: formData.get("eventLocation"),
				tickets: formData.get("eventTickets"),
				description: formData.get("eventDescription"),
				category: formData.get("eventCategory"),
				centerName: center.name,
				centerImageUrl: center.imageUrl,
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

	// Sample events for Popular and Concluded sections with randomly assigned event centers
	const popularEvents = [
		{
			name: "Tech Conference 2024",
			date: "2024-08-15",
			time: "10:00 AM",
			price: "$150",
			location: "San Francisco, CA",
			tickets: 120,
			center: getRandomEventCenter(),
		},
		{
			name: "Art Expo 2024",
			date: "2024-09-01",
			time: "09:00 AM",
			price: "$30",
			location: "New York, NY",
			tickets: 300,
			center: getRandomEventCenter(),
		},
		{
			name: "Business Summit 2024",
			date: "2024-10-20",
			time: "11:00 AM",
			price: "$200",
			location: "Chicago, IL",
			tickets: 250,
			center: getRandomEventCenter(),
		},
		{
			name: "Health & Wellness Fair 2024",
			date: "2024-11-05",
			time: "08:00 AM",
			price: "Free",
			location: "Seattle, WA",
			tickets: 400,
			center: getRandomEventCenter(),
		},
		{
			name: "Food & Wine Festival 2024",
			date: "2024-12-12",
			time: "01:00 PM",
			price: "$100",
			location: "Austin, TX",
			tickets: 350,
			center: getRandomEventCenter(),
		},
		{
			name: "Music Fest 2024",
			date: "2024-12-25",
			time: "05:00 PM",
			price: "$250",
			location: "Los Angeles, CA",
			tickets: 600,
			center: getRandomEventCenter(),
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
			center: getRandomEventCenter(),
		},
		{
			name: "Food Carnival 2023",
			date: "2023-06-10",
			time: "11:00 AM",
			price: "$20",
			location: "Miami, FL",
			tickets: 450,
			center: getRandomEventCenter(),
		},
		{
			name: "Fashion Week 2023",
			date: "2023-05-15",
			time: "07:00 PM",
			price: "$300",
			location: "New York, NY",
			tickets: 200,
			center: getRandomEventCenter(),
		},
		{
			name: "Startup Pitch Night 2023",
			date: "2023-04-25",
			time: "06:00 PM",
			price: "Free",
			location: "San Francisco, CA",
			tickets: 100,
			center: getRandomEventCenter(),
		},
		{
			name: "Film Festival 2023",
			date: "2023-03-10",
			time: "04:00 PM",
			price: "$50",
			location: "Austin, TX",
			tickets: 300,
			center: getRandomEventCenter(),
		},
		{
			name: "Book Fair 2023",
			date: "2023-02-20",
			time: "10:00 AM",
			price: "Free",
			location: "Chicago, IL",
			tickets: 150,
			center: getRandomEventCenter(),
		},
	];

	const popularEventsList = document.querySelector(
		"#popular-events .events-list"
	);
	if (popularEventsList) {
		popularEvents.forEach((event) => {
			event.centerName = event.center.name;
			event.centerImageUrl = event.center.imageUrl;
			const eventCard = createEventCard(event);
			popularEventsList.appendChild(eventCard);
		});
	}

	const concludedEventsList = document.querySelector(
		"#concluded-events .events-list"
	);
	if (concludedEventsList) {
		concludedEvents.forEach((event) => {
			event.centerName = event.center.name;
			event.centerImageUrl = event.center.imageUrl;
			const eventCard = createEventCard(event);
			concludedEventsList.appendChild(eventCard);
		});
	}

	function createEventCard(event) {
		const eventCard = document.createElement("div");
		eventCard.className = "event-card";

		eventCard.innerHTML = `
            <img src="${event.centerImageUrl}" alt="${event.name}">
            <div class="event-info">
                <h3>${event.name}</h3>
                <p>${event.date} at ${event.time}</p>
                <p>Price: ${event.price}</p>
                <p>Location: ${event.location}</p>
                <p>Event Center: ${event.centerName}</p>
                <p>Tickets Bought: ${event.tickets}</p>
            </div>
        `;

		return eventCard;
	}
});
