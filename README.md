# Personal Portfolio Website

A modern, professional portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Next.js 14** with App Router for optimal performance
- 🎨 **Modern Design** with smooth animations and gradients
- 📱 **Fully Responsive** - looks great on all devices
- 🎯 **Hero Section** - Eye-catching introduction with animated background
- 👤 **About Me** - Personal information and skills showcase
- 💼 **Projects Grid** - Beautiful project cards with hover effects
- 📧 **Contact Form** - Interactive contact form with social links
- ⚡ **TypeScript** - Type-safe codebase
- 🎨 **Tailwind CSS** - Utility-first styling

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles
├── components/
│   ├── Hero.tsx         # Hero section
│   ├── About.tsx        # About section
│   ├── Projects.tsx     # Projects grid
│   └── Contact.tsx      # Contact form
├── public/              # Static assets
└── package.json         # Dependencies
```

## Customization

### Update Personal Information

1. **Hero Section** (`components/Hero.tsx`):
   - Change name and title
   - Update button text and links

2. **About Section** (`components/About.tsx`):
   - Update biography text
   - Modify skills array
   - Replace placeholder image

3. **Projects** (`components/Projects.tsx`):
   - Update projects array with your projects
   - Add project images, descriptions, and links
   - Customize technologies

4. **Contact Section** (`components/Contact.tsx`):
   - Update social media links
   - Modify contact information
   - Connect form to backend service

### Styling

The project uses Tailwind CSS. You can customize:
- Colors in `tailwind.config.ts`
- Global styles in `app/globals.css`
- Component-specific styles in each component

## Technologies Used

- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, email your.email@example.com or open an issue in the repository.
