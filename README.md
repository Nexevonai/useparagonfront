# FakeUI - Contextual Companion Panel

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) that demonstrates a modern AI chatbot interface with a dynamic Contextual Companion panel.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Project Overview

The main objective of this project is to enhance the user experience of a chatbot interface by providing contextual information and actions in a visually appealing and functional companion panel. The Contextual Companion panel dynamically reacts to user interactions, displaying relevant information and actions based on the context of the conversation.

## Key Features

### Contextual Companion Panel

The Contextual Companion panel is a dynamic interface component that provides contextual information and actions based on the user's current interaction. The panel includes:

1. **Quick Stats Section**
   - Displays relevant statistics based on the active context
   - Dynamically updates when the context changes
   - Provides at-a-glance information relevant to the current task

2. **Suggested Actions**
   - Context-specific action buttons that change based on the active context
   - Intuitive icons and labels for common tasks
   - Smooth animations during context transitions

3. **Context Details**
   - Detailed information about the active context
   - Rich visualizations and interactive elements
   - Loading states and smooth transitions between different contexts

### Specific Context Implementations

1. **Jira Task Details**
   - Displays task information including assignee, status, due date, and priority
   - Provides actions for adding comments and changing task status
   - Shows a visual representation of the task's progress

2. **Shopify Sales Snapshot**
   - Presents sales data with a mini line chart for trends
   - Shows key metrics like today's sales, orders, average order value, and conversion rate
   - Includes actions for viewing full reports and checking inventory

3. **Gmail Draft Preview**
   - Displays email draft details including recipient, subject, and body
   - Shows attachment information and email metadata
   - Provides actions for editing the draft and sending the email

## Technical Implementation

### Frontend Stack

- **React & Next.js**: Core frameworks for building the UI
- **Tailwind CSS**: For styling and responsive design
- **Framer Motion**: For animations and transitions
- **React Icons**: For consistent iconography

### Design Principles

- **Glassmorphism**: Modern UI with frosted glass effects
- **Responsive Design**: Adapts to different screen sizes
- **Micro-interactions**: Subtle animations and transitions for better UX
- **Context-aware UI**: Interface elements that adapt based on user context

## Project Structure

- `/src/app/page.tsx`: Main application layout
- `/src/components/ContextualCompanion.tsx`: Implementation of the Contextual Companion panel
- `/src/app/globals.css`: Global styles and animations

## Future Enhancements

1. **Real-time Data Integration**: Connect to actual APIs for Jira, Shopify, and Gmail
2. **User Preferences**: Allow users to customize the Contextual Companion panel
3. **Additional Contexts**: Support for more integrations like Slack, GitHub, etc.
4. **Advanced Visualizations**: More detailed charts and data visualizations
5. **Mobile Optimization**: Enhanced responsive design for mobile devices

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
