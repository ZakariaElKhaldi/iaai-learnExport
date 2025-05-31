# LearnExpert Platform

LearnExpert is a modern e-learning platform focused on technical skills development, expert-led consultations, and career advancement. The platform leverages cutting-edge web technologies to deliver an engaging and interactive learning experience.

## Features

- **Expert-led Learning**: Courses and tutorials taught by industry professionals
- **Consultation Services**: One-on-one sessions with experts in various technical fields
- **Interactive Learning Path**: Personalized learning journeys based on user goals
- **Community Support**: Connect with peers and mentors during your learning journey
- **Enterprise Solutions**: Tailored learning programs for organizations
- **Certification**: Validate your skills with recognized certifications
- **Modern Authentication**: Enhanced user authentication experience with animations and feedback

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, TailwindCSS, Framer Motion
- **Animations**: Custom animation library for engaging UI elements
- **Form Validation**: Zod for robust form validation
- **Icons**: Lucide React for consistent iconography
- **Responsive Design**: Mobile-first approach for all device types
- **Accessibility**: WCAG compliant components and interfaces

## Project Structure

```
/iaai-learnexpert-frontend
├── app                      # Next.js app directory
│   ├── (admin)              # Admin section routes
│   ├── (auth)               # Authentication routes
│   │   ├── login            # User login page
│   │   ├── register         # User registration page
│   │   ├── forgot-password  # Password recovery page
│   │   └── reset-password   # Password reset page
│   ├── animation-demo       # Animation showcase
│   └── page.tsx             # Landing page
├── components               # Reusable components
│   ├── common               # Shared UI components
│   ├── dashboard            # Dashboard-specific components
│   ├── landing              # Landing page components
│   │   ├── animations       # Animation components
│   │   ├── contact          # Contact section
│   │   ├── cta              # Call to action section
│   │   ├── faq              # FAQ section
│   │   ├── features         # Features section
│   │   ├── hero             # Hero section
│   │   ├── pricing          # Pricing section
│   │   └── testimonials     # Testimonials section
│   └── learning             # Learning platform components
├── docs                     # Documentation
│   ├── auth-libraries.md    # Authentication libraries comparison
│   └── auth-ui-improvements.md # Auth UI/UX improvements details
├── public                   # Static assets
└── styles                   # Global styles
```

## Available Scripts

- **dev**: Runs the development server
- **build**: Builds the application for production
- **start**: Starts the production server
- **lint**: Lints the codebase for potential errors
- **test**: Runs the test suite

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) to view the application

## Authentication Experience

The platform features a modern, user-friendly authentication system with:

- **Split-screen Layout**: Clean, modern design with branding and form sections
- **Animated Transitions**: Smooth animations between states and pages
- **Form Validation**: Real-time validation with helpful error messages
- **Password Strength Meter**: Visual feedback on password security
- **Responsive Design**: Optimized for all device sizes
- **Accessibility**: ARIA attributes and keyboard navigation support
- **Loading States**: Clear visual feedback during operations
- **Success/Error States**: Animated feedback for user actions

For detailed information on authentication improvements, see [Auth UI Improvements](docs/auth-ui-improvements.md).

## Animation Library

The platform includes a robust animation library to enhance user experience:

- **AnimatedText**: Text animations with various effects
- **FloatingElements**: Animated floating UI elements
- **MagneticButton**: Interactive buttons with magnetic effects
- **Tilt3DCard**: Cards with 3D tilt effects
- **CustomCursor**: Enhanced cursor experiences
- **ParallaxEffect**: Depth and motion effects on scroll
- **ScrollReveal**: Reveal animations on scroll
- **AnimatedCounter**: Animated number counters
- **CountdownTimer**: Dynamic countdown timers for promotions

## Landing Page Components

The landing page is divided into several key sections:

1. **Hero**: Main introduction with key messaging and CTA
2. **Features**: Highlights of platform capabilities
3. **Testimonials**: User success stories
4. **Pricing**: Subscription plans and options
5. **CTA**: Call to action for user conversion
6. **FAQ**: Answers to common questions
7. **Contact**: Ways to get in touch
8. **Footer**: Navigation and additional information

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For inquiries about LearnExpert, please contact us at info@learnexpert.com
