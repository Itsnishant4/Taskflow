# Task Flow: Your Personal Productivity Powerhouse

Task Flow is a modern, visually engaging task management application designed to help you organize your life, track your progress, and achieve your goals.  It's built with React, utilizes `framer-motion` for smooth animations, and `react-datepicker` for date management. Task Flow aims to go beyond a simple to-do list by incorporating gamified elements like XP, levels, achievements, and streaks to keep you motivated.

## Features

*   **Task Management:**
    *   Create, edit, and delete tasks.
    *   Set due dates, priorities (low, medium, high), and categories (personal, work, shopping, study).
    *   Mark tasks as complete.
    *   Filter tasks by date.
    *   View tasks in list or grid view.
*   **Gamification:**
    *   **XP (Experience Points):** Earn XP for completing tasks.
    *   **Levels:** Level up as you accumulate XP.
    *   **Achievements:** Unlock achievements for hitting milestones (e.g., completing 5 tasks, maintaining a 3-day streak).
    *   **Streaks:** Keep track of your consecutive days of task completion.
*   **Progress Tracking:**
    *   Visual progress bar showing your XP toward the next level.
    *   Day streak counter.
    *   Achievement display.
*   **Settings:**
    *   **Dark Mode:** Toggle between light and dark mode for comfortable viewing.
    *   **Reset Everything:** Option to completely clear all tasks, progress, achievements, and streaks (with confirmation).
* **Visually Appealing:**
    * Smooth animations with `framer-motion`.
    * Uses Heroicons for vector icons.
    * Confetti for achievements and level ups.
*   **Persistence:**
    *   Tasks, XP, levels, achievements, and streaks are saved in `localStorage`, so your progress is maintained across sessions.
* **Responsive:**
    * The app adapts to different screen sizes.
* **Modern UI:**
    * Clean and intuitive design.
    * Uses `react-datepicker` for calendar management.

## Tech Stack

*   **React:** JavaScript library for building user interfaces.
*   **React Router:** For client-side routing.
*   **Framer Motion:** For smooth animations and transitions.
*   **Heroicons:** Beautiful SVG icons.
*   **React Datepicker:** Calendar management.
*   **Canvas Confetti:** For the confetti effect.
*   **Tailwind CSS:** Utility-first CSS framework for styling.

## Getting Started

1.  **Prerequisites:**
    *   Node.js (version 16 or higher recommended)
    *   npm (or yarn)

2.  **Installation:**

    ```bash
    git clone <repository-url> # Replace <repository-url> with the actual URL
    cd <project-directory>  # Navigate into the project directory
    npm install
    ```

3.  **Running the App:**

    ```bash
    npm start
    ```

    This will start the development server, and you can view the app in your browser at `http://localhost:3000`.

## Project Structure

*   `src/`: Contains the main application code.
    *   `App.jsx`: The main application component.
    * `/components`: This folder could be made to store different components of the app, if there were more than 2.
    *   `index.js`: entry file.
    * etc.
*   `public/`: Contains the public assets like `index.html`.
* `package.json`: Manages dependancies.
* `package-lock.json`: Manages versions of dependancies.
* `README.md`: You are here.

## How to Use

1.  **Adding Tasks:**
    *   Click the "+" button at the bottom right of the screen.
    *   Fill in the task title, description, due date, priority, and category.
    *   Click "Add Task."

2.  **Completing Tasks:**
    *   Click the circle next to the task to mark it as complete.

3.  **Viewing Tasks:**
    *   Use the calendar to filter tasks by date.
    * Switch between list and grid views with the button.

4. **Settings:**
    * Click the settings icon in the top right.
    * Change the mode.
    * Erase progress.

5. **Achievements:**
    * As you complete the tasks and follow the gamification instructions, you will unlock these achievements:
        * '🥉 Task Beginner (5+ tasks)',
        * '🥈 Task Master (10+ tasks)',
        * '🔥 Hot Streak (3 days)',
        * '🚀 Weekly Champion (7 days)'
    * Confetti will shower when you unlock one.

## Future Enhancements

*   **Task Editing:** Currently, tasks cannot be edited once created.
*   **Task Deleting:** Add the ability to delete individual tasks.
* **More achievements**: Expand the achievement system.
* **More task customisation**: Add more categories, or other task features.
* **User Login**: Allow for user profiles, and logins.
* **Data Syncing**: Allow for data syncing across devices.
* **Push Notifications:** Provide reminders for tasks.
*   **Mobile App:** Create a native mobile app version.

## Contributing

Contributions are welcome! If you find a bug or want to suggest a new feature, please open an issue or submit a pull request.

## License

[MIT](https://opensource.org/license/mit/)

## Contact

Made with ❤️ by [Nishant](https://github.com/Itsnishant4/)
2025 © Copyright All Rights Reserved.
[GitHub](https://github.com/Itsnishant4/) 