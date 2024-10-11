# DevLinks

In this project, you will build a Link-Sharing App where users can manage their profile and links. The app will allow users to create, read, update, and delete links while previewing them on a mobile mockup. Key functionalities include form validations, drag-and-drop link reordering, and the ability to add and edit profile details (such as profile picture, first name, last name, and email). Users will also be able to preview their devlinks profile and copy their unique profile URL to the clipboard.

The app should support optimal layout adjustments for different screen sizes and include hover and focus states for interactive elements.

## Features

- Link Management:
  - CRUD (Create, Read, Update, Delete) operations for links.
  - URL validation, ensuring links follow correct URL patterns.
  - Drag-and-drop functionality for reordering links.
- Profile Management:
  - Profile details including profile picture, first name, last name, and email.
  - Form validation ensuring required fields are filled in.
- Profile Preview:
  - Users can preview their profile and copy their profile URL to the clipboard.
- Responsive Design:
  - Responsive layout for optimal display across devices.
- Form Validations:
  - URL validation for links and required field checks for profile forms.
- Bonus Features:

  - Full-Stack App:
    - Save user details and link data to a database ( to be implemented)

- User Authentication:
  -Implement google authentication with NextAuth.

The goal of the project is to create a user-friendly and visually appealing app that meets modern web standards with smooth interactivity and validation.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [NextAuth](https://next-auth.js.org/)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 18 or higher)
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Asif-Zaman-Suvo/devlinks.git
   ```

2. Navigate to the project directory:

   ```bash
   cd devlinks
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Usage

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

To properly set up and run the DevLinks application, you'll need to configure some environment variables and settings:

1. Environment Variables:
   Create a `.env.local` file in the root of your project and add the following variables:

   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here

   # Database (if applicable)
   DATABASE_URL=your_database_connection_string_here
   ```

   Replace the placeholder values with your actual credentials.

2. Google OAuth Setup:

   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Navigate to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Set up the OAuth consent screen if not already done
   - For "Application type", choose "Web application"
   - Add `http://localhost:3000` to the "Authorized JavaScript origins"
   - Add `http://localhost:3000/api/auth/callback/google` to the "Authorized redirect URIs"
   - Copy the generated Client ID and Client Secret to your `.env.local` file

3. NextAuth Secret:
   Generate a secure random string for NEXTAUTH_SECRET. You can use this command:

   ```bash
   openssl rand -base64 32
   ```

4. Database Setup (if applicable):
   If you're using a database, make sure to set up your database and obtain the connection string. Update the DATABASE_URL in your `.env.local` file accordingly.

5. Tailwind CSS Configuration:
   The project uses Tailwind CSS. If you need to customize the default theme or add new utility classes, you can do so in the `tailwind.config.js` file.

Remember to never commit your `.env.local` file to version control. It's already included in the `.gitignore` file, but always double-check to ensure your sensitive information remains secure.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

Md Asifuzzaman Suvo - [@AsifuzzamanSuvo](https://github.com/Asif-Zaman-Suvo) - asif.zaman.suvo@gmail.com

Project Link: [https://github.com/Asif-Zaman-Suvo/devlinks](https://github.com/Asif-Zaman-Suvo/devlinks)

## Acknowledgments

- [Frontend Mentor](https://www.frontendmentor.io/) for providing the challenge and design inspiration for this project
- [Next.js Documentation](https://nextjs.org/docs) for their comprehensive guides and examples
- [Tailwind CSS](https://tailwindcss.com/) for their utility-first CSS framework that made styling a breeze
- [React DnD](https://react-dnd.github.io/react-dnd/about) for the drag-and-drop functionality
- [NextAuth.js](https://next-auth.js.org/) for simplifying the authentication process
- The open-source community for providing invaluable resources and tools
- Fellow developers who provided feedback and suggestions during the development process
