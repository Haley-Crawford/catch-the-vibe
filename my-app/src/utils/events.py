import csv
import json
from datetime import datetime, timedelta
import random

titles = [
    "Summer Vibez", "Late Night Beats", "Chill & Grill", "Vibe Fest", "Coastal Currents",
    "Golden Hour", "Bassline Bash", "Rooftop Reverie", "Neon Dreams", "Lo-Fi Lounge",
    "Rhythm Revival", "Twilight Tunes", "Moonlight Mixer", "Daybreak Disco", "Sunset Social",
    "Nightfall Notes", "Ambient Escape", "Electro Evenings", "Groove Garden", "Midnight Mirage",
    "Zenith Zone", "Vibe Sync", "Aura Afterparty", "Echo Jam", "Cascade Collective"
]

authors = [
    "Jordan Lee", "Amara Cruz", "Dylan Fox", "Riley Stone", "Casey Moon",
    "Taylor Sky", "Morgan Blaze", "Jamie Orion", "Avery Storm", "Rowan Vale"
]

descriptions = [
    "An unforgettable evening of music, lights, and energy.",
    "Join us for a cozy gathering with live performances.",
    "Experience the best underground sounds in town.",
    "A night to vibe, connect, and celebrate the moment.",
    "Groove through the night with soulful beats and good company."
]

events = []
for i in range(25):
    title = titles[i % len(titles)]
    author = random.choice(authors)
    date = (datetime.now() + timedelta(days=random.randint(1, 60))).isoformat()
    guests = [
        {"name": f"Guest {j}", "email": f"guest{j}@example.com"}
        for j in range(random.randint(1, 4))
    ]
    description = random.choice(descriptions)
    image = f"https://picsum.photos/seed/{i}/600/400"
    events.append({
        "title": title,
        "author": author,
        "date": date,
        "guests": json.dumps(guests),
        "description": description,
        "image": image
    })

with open("events.csv", mode="w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=["title", "author", "date", "guests", "description", "image"])
    writer.writeheader()
    writer.writerows(events)

print("✅ events.csv has been created.")