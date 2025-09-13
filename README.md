# ElevenLabs Clone

A modern text-to-speech web application built with Next.js 14, featuring multi-language audio support and file management capabilities.

![ElevenLabs Clone](https://img.shields.io/badge/Next.js-14.2.32-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Features

### Core Functionality
- **Multi-language Audio Playback**: Support for English and Arabic audio files with production-ready streaming
- **Voice Selection**: Choose from 6 different voice personalities
- **Real-time Audio Controls**: Play, pause, and download audio files with robust error handling
- **Language Switching**: Dynamic language selection with instant audio switching
- **Production Audio Support**: Optimized for deployment with proper CORS, caching, and content headers

### File Management
- **Audio Upload System**: Upload audio files with language tagging (English/Arabic)
- **File Organization**: Categorize and store audio files by language in MongoDB
- **Playback Management**: Single-instance audio playback (stops previous when new audio starts)
- **File Listing**: View all uploaded audio files with metadata and status
- **Debug Capabilities**: Built-in debugging tools for troubleshooting audio issues

### User Interface
- **Modern Design**: Clean, responsive UI built with Tailwind CSS
- **Interactive Components**: Custom dropdown menus, buttons, and form controls
- **Real-time Feedback**: Loading states, visual indicators, comprehensive error handling
- **Tab Navigation**: Organized interface with tab-based navigation
- **Production Alerts**: User-friendly error messages and debugging information

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14.2.32 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes with comprehensive error handling
- **Database**: MongoDB with optimized connection pooling
- **File Storage**: Local file system with production-ready serving (public/uploads)
- **File Handling**: Native Node.js fs/promises with proper MIME type detection
- **Middleware**: Custom middleware for audio file CORS and caching

### Production Features  
- **Audio Streaming**: Optimized audio delivery with proper headers
- **Error Handling**: Comprehensive error tracking and user feedback
- **Debug Tools**: Built-in debugging API for troubleshooting
- **CORS Support**: Cross-origin resource sharing for audio files
- **Caching**: Efficient caching strategies for static assets

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript compiler

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/NamanSoni18/Eleven-labs-clone.git
   cd elevenlabs-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory (copy from `.env.example`):
   ```env
   NODE_ENV=development
   # Replace with your actual MongoDB Atlas connection string
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/panelvoices?retryWrites=true&w=majority&appName=Cluster0
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Create uploads directory**
   ```bash
   mkdir -p public/uploads
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
elevenlabs-clone/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── audio-url/           # Fetch audio by language with production fixes
│   │   │   └── route.ts
│   │   ├── debug/               # Debug API for troubleshooting
│   │   │   └── route.ts
│   │   └── upload/              # File upload and listing with enhanced error handling
│   │       └── route.ts
│   ├── upload-audio/            # Upload page route
│   │   └── page.tsx
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/                   # React Components
│   ├── ui/                      # Reusable UI components
│   │   ├── button.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── textarea.tsx
│   │   └── badge.tsx
│   ├── header.tsx               # Site header
│   ├── hero-section.tsx         # Hero section
│   ├── tab-bar.tsx              # Navigation tabs
│   └── text-to-speech-interface.tsx  # Main TTS interface with production fixes
├── lib/                         # Utilities and configurations
│   ├── mongodb.ts               # MongoDB connection with environment handling
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
│   └── uploads/                 # Uploaded audio files
├── middleware.ts                # Custom middleware for audio file handling
├── next.config.mjs              # Next.js configuration with audio optimizations
├── .env.example                 # Environment template
├── .env.production.example      # Production environment template
└── package.json                 # Dependencies and scripts
```

## 🔧 API Endpoints

### Upload Audio File
```http
POST /api/upload
Content-Type: multipart/form-data

Body:
- file: Audio file (required)
- language: "english" | "arabic" (required)
```

### Get All Audio Files
```http
GET /api/upload
```

### Get Audio URL by Language
```http
GET /api/audio-url?language=english
GET /api/audio-url?language=arabic

Response:
{
  "audioUrl": "http://localhost:3000/uploads/filename.wav",
  "filename": "original-name.wav",
  "language": "english"
}
```

### Debug API (Production Troubleshooting)
```http
GET /api/debug

Response:
{
  "environment": {...},
  "database": {...},
  "audioFiles": [...],
  "languages": {...}
}
```

## 💾 Database Schema

### MongoDB Collections

#### `audioFiles` Collection
```javascript
{
  _id: ObjectId,
  filename: String,        // Generated filename
  originalName: String,    // Original uploaded filename
  url: String,            // Public URL path
  language: String,       // "english" | "arabic"
  uploadedAt: Date        // Upload timestamp
}
```

## 🎯 Usage Guide

### Basic Usage
1. **Main Interface** (`/`):
   - Enter text in the textarea
   - Select a voice from the available options
   - Choose language (English/Arabic) from dropdown
   - Click "PLAY" to hear the audio

2. **Upload Audio** (`/upload-audio`):
   - Select language from dropdown
   - Choose audio file from your device
   - File is automatically uploaded and categorized
   - View and play uploaded files from the list

### Advanced Features
- **Language Switching**: Change language in dropdown to switch audio instantly
- **Voice Personalities**: Each voice has unique characteristics for different use cases
- **Audio Management**: Only one audio plays at a time across the application
- **Download Support**: Download generated or uploaded audio files
- **Production Debugging**: Use `/api/debug` endpoint to troubleshoot audio issues
- **Error Handling**: Comprehensive error messages for production troubleshooting

## 🔒 Environment Variables

The project uses different environment configurations for development and production.

### Development (`.env.local`)
```env
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/panelvoices?retryWrites=true&w=majority&appName=Cluster0
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production (`.env.production`)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/panelvoices?retryWrites=true&w=majority&appName=Cluster0
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Setup Instructions
1. Copy `.env.example` to `.env.local` for development
2. Fill in your actual database credentials
3. For production, create `.env.production` with production values

## 🚀 Deployment

### Production Fixes & Optimizations

This application includes several production-specific optimizations:

- **Audio File Serving**: Custom middleware handles CORS, caching, and MIME types
- **Error Handling**: Comprehensive error tracking with user-friendly messages
- **Database Optimization**: Environment-specific connection pooling
- **Debug Tools**: Built-in debugging endpoint for production troubleshooting
- **Static Asset Optimization**: Proper caching headers for audio files

### Vercel Deployment
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production with optimizations
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Production Deployment
1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Set production environment variables**:
   ```bash
   # Create .env.production with your production values
   cp .env.production.example .env.production
   ```

3. **Start production server**:
   ```bash
   npm start
   ```

### Adding New Features
1. Create components in `components/` directory
2. Add API routes in `app/api/` directory
3. Update database schemas in `lib/` directory
4. Test thoroughly before deployment

## 🐛 Troubleshooting

### Common Issues

1. **"No audio URLs" error**:
   - Ensure MongoDB is running and accessible
   - Upload audio files via `/upload-audio` page
   - Check that files are tagged with correct language (english/arabic)
   - Use `/api/debug` endpoint to verify database connection and file status

2. **Audio not playing in production**:
   - Verify `NEXT_PUBLIC_APP_URL` is set correctly in environment variables
   - Check browser console for CORS or network errors
   - Ensure audio files exist in `public/uploads` directory
   - Test with `/api/debug` to verify file accessibility

3. **Upload failures**:
   - Verify `public/uploads` directory exists and has write permissions
   - Check file size limits (default: reasonable limits for web deployment)
   - Ensure language parameter is included (english/arabic only)
   - Check MongoDB connection and write permissions

4. **Database connection issues**:
   - Verify `MONGODB_URI` in environment file
   - Check MongoDB Atlas cluster status and IP whitelist
   - Ensure database name matches configuration (`panelvoices`)
   - Test connection with `/api/debug` endpoint

5. **Build/deployment issues**:
   - Run `npm run build` to check for build errors
   - Verify all environment variables are set
   - Check middleware configuration for audio file serving

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by ElevenLabs' text-to-speech technology
- Built with modern web technologies and best practices
- UI components based on Radix UI primitives
- Icons provided by Lucide React

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review the API documentation

---

**Made with ❤️ and Next.js**