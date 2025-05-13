# LearnExpert Platform

LearnExpert is a modern e-learning platform focused on technical skills development, expert-led consultations, and career advancement. The platform leverages cutting-edge web technologies to deliver an engaging and interactive learning experience.

## Features

- **Expert-led Learning**: Courses and tutorials taught by industry professionals
- **Consultation Services**: One-on-one sessions with experts in various technical fields
- **Interactive Learning Path**: Personalized learning journeys based on user goals
- **Community Support**: Connect with peers and mentors during your learning journey
- **Enterprise Solutions**: Tailored learning programs for organizations
- **Certification**: Validate your skills with recognized certifications

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, TailwindCSS, Framer Motion
- **Animations**: Custom animation library for engaging UI elements
- **Responsive Design**: Mobile-first approach for all device types
- **Accessibility**: WCAG compliant components and interfaces

## Project Structure

```
/iaai-learnexpert-frontend
├── app                      # Next.js app directory
│   ├── (admin)              # Admin section routes
│   ├── (auth)               # Authentication routes
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
