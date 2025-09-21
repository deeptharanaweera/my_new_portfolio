# Modern Portfolio Website

A beautiful, modern portfolio website built with Next.js, featuring a dark/light theme toggle, Firebase integration, and an admin dashboard for easy content management.

## Features

- 🎨 **Modern Design**: Clean, responsive design with smooth animations
- 🌙 **Dark/Light Theme**: Toggle between dark and light modes
- 🔥 **Firebase Integration**: Real-time data storage and retrieval
- 📱 **Responsive**: Works perfectly on all devices
- ⚡ **Fast Performance**: Built with Next.js 15 and optimized for speed
- 🎯 **Admin Dashboard**: Easy-to-use admin panel for content management
- 🎭 **Smooth Animations**: Framer Motion animations throughout
- 📧 **Contact Form**: Working contact form with validation

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (ready for implementation)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project set up

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd my_new_portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Get your Firebase configuration
5. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

### 5. Access Admin Dashboard

Visit [http://localhost:3000/admin](http://localhost:3000/admin) to manage your portfolio content.

## Project Structure

```
src/
├── app/
│   ├── admin/           # Admin dashboard page
│   ├── globals.css      # Global styles and animations
│   ├── layout.js        # Root layout with theme provider
│   └── page.js          # Main portfolio page
├── components/
│   ├── admin/           # Admin dashboard components
│   ├── Hero.js          # Hero section
│   ├── About.js         # About section
│   ├── Skills.js        # Skills section
│   ├── Projects.js      # Projects section
│   ├── Contact.js       # Contact section
│   └── ThemeToggle.js   # Theme toggle button
├── contexts/
│   └── ThemeContext.js  # Theme management context
└── lib/
    ├── firebase.js      # Firebase configuration
    └── portfolioData.js # Portfolio data management
```

## Customization

### 1. Personal Information

Update your personal information through the admin dashboard or by modifying the default data in `src/lib/portfolioData.js`.

### 2. Styling

- Modify `src/app/globals.css` for global styles
- Update component styles using Tailwind CSS classes
- Customize animations in the CSS file

### 3. Sections

Add or remove sections by:
1. Creating new components in `src/components/`
2. Importing and using them in `src/app/page.js`
3. Adding corresponding admin forms in `src/components/admin/`

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Firebase Security Rules

Make sure to set up proper Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolio/{document} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help, please open an issue on GitHub.

---

**Happy coding! 🚀**