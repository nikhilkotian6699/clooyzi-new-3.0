# AI Development Rules for Clooyzi Application

This document outlines the technical stack and specific library usage guidelines for developing the Clooyzi application. Adhering to these rules ensures consistency, maintainability, and optimal performance.

## Tech Stack Overview

*   **Frontend Framework**: React
*   **Meta-framework**: Next.js (using the App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **UI Components**: shadcn/ui (built on Radix UI)
*   **Icons**: Lucide React and React Icons
*   **Form Management**: React Hook Form with Zod for validation
*   **Backend API**: Express.js with Supabase for database and storage
*   **Email Service**: Resend (via a Next.js API route)
*   **Analytics**: Vercel Analytics

## Library Usage Guidelines

To maintain a consistent and efficient codebase, please follow these rules when implementing new features or modifying existing ones:

*   **Frontend Development**: All new frontend code must be written using **React** and **TypeScript**.
*   **Routing**: Utilize **Next.js App Router** for all navigation within the application.
*   **Styling**: Always use **Tailwind CSS** for styling. Prioritize utility classes for responsive and consistent designs. Avoid inline styles or separate CSS files unless absolutely necessary for third-party integrations.
*   **UI Components**:
    *   Prefer **shadcn/ui** components for all common UI elements (buttons, cards, inputs, etc.). These components are already integrated and styled.
    *   If a required component is not available in shadcn/ui, create a new, dedicated component file (`src/components/`) using **Tailwind CSS** and **Radix UI primitives** if applicable. Do **not** modify existing shadcn/ui component files.
*   **Icons**:
    *   Use **Lucide React** for general-purpose icons.
    *   Use **React Icons** (specifically `react-icons/fa` or `react-icons/fa6`) for brand-specific icons (e.g., social media logos) if Lucide React does not offer a suitable alternative.
*   **Form Handling**: Implement all forms using **React Hook Form** for state management and validation. Use **Zod** for defining and validating form schemas.
*   **API Calls**: For client-side data fetching, use the native **`fetch` API**.
*   **Backend Interaction**: The backend is built with **Express.js** and uses **Supabase** for data persistence and file storage. Do not introduce new backend technologies or modify existing backend logic without explicit instructions.
*   **Email Sending**: To send emails, always use the existing `/api/send-email` Next.js API route. Do not attempt to integrate new email services directly from the frontend.
*   **Toasts/Notifications**: Use the `useToast` hook from `@/hooks/use-toast` and the `Toaster` component from `@/components/ui/toaster` for displaying user notifications.
*   **Theming**: The application uses `next-themes` for dark/light mode toggling. Ensure new components respect the current theme.
*   **Component Structure**:
    *   Every new component or custom hook must reside in its own dedicated file within `src/components/` or `src/hooks/` respectively.
    *   Aim for small, focused components, ideally under 100 lines of code.
*   **File Naming**: Directory names must be all lowercase (e.g., `src/pages`, `src/components`). File names can use mixed-case (e.g., `ServiceCard.tsx`).