# 🛍️ LuxeLane - Luxury Fashion E-commerce Platform

A modern, elegant e-commerce platform built with React and Vite, designed for luxury fashion retail with comprehensive features including product management, shopping cart, checkout, and social media integration.

![LuxeLane Banner](src/assets/Banner.jpg)

## ✨ Features

### 🎨 **Modern UI/UX Design**
- **Elegant Design System** with editorial gold and navy color scheme
- **Responsive Layout** optimized for all devices
- **Dark/Light Mode** toggle with smooth transitions
- **Smooth Animations** and micro-interactions
- **Glass-morphism Effects** for modern aesthetics

### 🛒 **E-commerce Functionality**
- **Product Catalog** with detailed product pages
- **Shopping Cart** with persistent storage
- **Checkout System** with multiple payment methods
- **Order Tracking** and management
- **Wishlist** functionality
- **Product Search** and filtering

### 📱 **Social Media Integration**
- **Instagram-style Reels** showcase with video content
- **Community Posts** from fashion influencers
- **Social Sharing** capabilities
- **User-generated Content** display

### 🎬 **Interactive Media**
- **Banner Slideshow** with autoplay functionality
- **Video Reels** with manual play/pause controls
- **Image Galleries** with smooth transitions
- **Product Videos** for enhanced shopping experience

### 🔧 **Technical Features**
- **React 18** with modern hooks and context
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **React Router** for navigation
- **Local Storage** for data persistence
- **Responsive Design** with mobile-first approach

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/luxelane.git
   cd luxelane
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
LuxeLane/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, videos, and media files
│   ├── components/        # Reusable React components
│   │   ├── BannerSlideshow.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ReelsSlideshow.jsx
│   │   └── TaskManager.jsx
│   ├── context/           # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── PaymentContext.jsx
│   │   ├── ShippingContext.jsx
│   │   └── ThemeContext.jsx
│   ├── data/              # Data files and mock APIs
│   │   └── products.js
│   ├── hooks/             # Custom React hooks
│   │   ├── useAPI.js
│   │   └── useLocalStorage.js
│   ├── pages/             # Page components
│   │   ├── HomePage.jsx
│   │   ├── ProductListing.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── OrderTracking.jsx
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # Project documentation
```

## 🎯 Key Components

### **BannerSlideshow**
- Automatic slideshow with 5-second intervals
- Manual navigation controls
- Slide indicators and counter
- Smooth fade transitions

### **ReelsSlideshow**
- Instagram-style video reels
- Manual play/pause controls
- Navigation between reel posts
- Social media integration

### **Shopping Cart**
- Persistent cart storage
- Quantity management
- Price calculations
- Checkout integration

### **Theme Context**
- Dark/light mode toggle
- Persistent theme preference
- Smooth theme transitions

## 🎨 Design System

### **Color Palette**
- **Editorial Gold**: `#C5A253` - Primary accent color
- **Editorial Navy**: `#1A1A2E` - Primary dark color
- **Editorial White**: `#FFFFFF` - Primary light color
- **Editorial Cream**: `#F5F5F0` - Secondary light color
- **Editorial Silver**: `#6B7280` - Text color

### **Typography**
- **Headings**: Bold, elegant fonts with gradient effects
- **Body Text**: Clean, readable fonts
- **Accent Text**: Gold gradient effects for emphasis

### **Components**
- **Buttons**: Gradient backgrounds with hover effects
- **Cards**: Clean layouts with subtle shadows
- **Navigation**: Glass-morphism effects with backdrop blur

## 🔧 Configuration

### **Tailwind CSS**
The project uses Tailwind CSS with custom configuration for the editorial design system.

### **Vite**
Fast development server and optimized build process.

### **React Router**
Client-side routing for seamless navigation.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🚀 Deployment

### **Vercel**
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with one click

### **Netlify**
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed

### **GitHub Pages**
1. Add `"homepage": "https://yourusername.github.io/luxelane"` to package.json
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add deploy script: `"deploy": "gh-pages -d dist"`
4. Run: `npm run build && npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for the beautiful icons
- **All contributors** who helped make this project possible

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@luxelane.com
- Documentation: [docs.luxelane.com](https://docs.luxelane.com)

---

**Made with ❤️ by the LuxeLane Team**
