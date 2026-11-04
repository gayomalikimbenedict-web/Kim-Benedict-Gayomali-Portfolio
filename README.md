# Kim Benedict Gayomali Portfolio

Welcome to the Kim Benedict Gayomali Portfolio project! This repository contains the source code for a personal portfolio website showcasing the skills and projects of Kim Benedict Gayomali, an AI Automation Specialist, GHL CRM Builder, and Web Developer.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [License](#license)

## Project Overview

This portfolio website is designed to highlight Kim's expertise in AI automation, CRM building, and web development. It includes sections for projects, services offered, and a contact form for potential clients or collaborators.

## Features

- **Home**: A welcoming landing page with a brief introduction.
- **Projects**: A showcase of various projects completed by Kim, with descriptions and links.
- **Services**: Detailed information about the services offered by Kim.
- **About**: Background information and expertise of Kim Benedict Gayomali.
- **Contact**: A contact form for inquiries and communication.

## Technologies Used

- React
- TypeScript
- Vite
- CSS (with Poppins font)
- Various logos and tools for the marquee animation

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/Kim-Benedict-Gayomali-Portfolio.git
   ```
2. Navigate to the project directory:
   ```
   cd Kim-Benedict-Gayomali-Portfolio
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open your browser and go to `http://localhost:3000` to view the portfolio.

## Local text editor

The Settings page uses a local Python server and SQLite database. Set a private
passcode of at least 12 characters in PowerShell, then start the server:

```powershell
$env:PORTFOLIO_SETTINGS_PASSCODE = Read-Host "Set your private Settings passcode"
npm run settings:server
```

In a second terminal, start the portfolio with `npm run dev`. Open the Settings
item in the sidebar and enter the passcode. Unlocking keeps the original
portfolio visible and lets you edit its text in place. Use Save changes in the
Settings section to save; Lock settings discards unsaved edits. Saved text is
stored in `backend/data/portfolio-settings.sqlite3` and remains on this
computer. The server binds to `127.0.0.1`; do not expose it to the public
internet.

For a built local site, run `npm run build`, then start the Python server with
the passcode set. It serves the built portfolio at `http://127.0.0.1:8000`.

## Usage

Feel free to explore the portfolio and reach out through the contact form for any inquiries or collaboration opportunities.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.