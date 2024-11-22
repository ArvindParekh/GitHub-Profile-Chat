# GitChat - Talk with a GitHub Profile

![GitChat Banner](assets/banner.png)

## Project Overview

GitChat is an innovative web application that allows users to interact with GitHub profiles through an AI-powered chat interface. By simply entering a GitHub profile URL, users can engage in meaningful conversations about the profile's repositories, activities, and more. This tool leverages the power of AI, enhanced by [LangChain.js](https://github.com/hwchase17/langchainjs), to provide insightful responses based on the fetched GitHub data, making it easier to understand and explore GitHub profiles interactively.

### Purpose and Goals

- **Interactive Exploration**: Enable users to explore GitHub profiles beyond static information by engaging in dynamic conversations.
- **AI-Powered Insights**: Utilize AI to analyze and provide meaningful responses based on a user's GitHub data.
- **Seamless Integration**: Combine modern web technologies like Next.js and Cloudflare Workers to deliver a performant and scalable application.
- **Scalability**: Handle large amounts of GitHub data efficiently using Retrieval-Augmented Generation (RAG) techniques with LangChain.js.

### Problem Addressed

Navigating and understanding a GitHub profile's vast amount of data can be overwhelming. GitChat addresses this by offering an intuitive chat-based interface where users can ask specific questions about a GitHub profile, receiving concise and relevant answers powered by AI and enhanced by LangChain.js for improved data handling and response generation.

## Core Features

- **GitHub Data Fetching**: Retrieves comprehensive data from GitHub profiles, including repositories, events, and starred repositories.
- **AI-Powered Chat Interface**: Provides an interactive chat experience where users can ask questions like:
  - "What are the user's 5 most recent commits?"
  - "When did the user first contribute to Kubernetes?"
- **State Management with Recoil**: Efficiently manages application state for a smooth user experience.
- **Responsive Design**: Ensures the application is accessible and visually appealing across various devices.
- **Cloudflare Workers Integration**: Utilizes serverless functions for handling API requests and data storage in Cloudflare KV.
- **Retrieval-Augmented Generation (RAG)**: Optimized AI interactions for handling large-scale data efficiently using LangChain.js.
- **Enhanced Data Processing**: Preprocesses GitHub data into textual summaries for better embeddings and more accurate AI responses.

### Unique Implementation Aspects

- **Cloudflare KV Store**: Efficiently stores and retrieves GitHub data, enabling quick access and scalability.
- **AI Integration with LangChain.js**: Utilizes [LangChain.js](https://github.com/hwchase17/langchainjs) alongside Mistral-7b-instruct and Llama-3-8b-instruct models to interpret user queries and provide accurate responses based on stored data.
- **Tailwind CSS with DaisyUI**: Implements a modern and customizable UI with Tailwind CSS, enhanced by DaisyUI components for rapid development.
- **Comprehensive Data Handling**: Ensures separation of user data in embeddings to prevent confusion and maintain query relevance by preprocessing JSON data into human-readable text.

## Requirements

### Dependencies and Libraries

- **Frontend**:
  - [Next.js](https://nextjs.org/) - React framework for server-side rendering and static website generation.
  - [Recoil](https://recoiljs.org/) - State management library for React.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
  - [DaisyUI](https://daisyui.com/) - Tailwind CSS component library.
  - [Framer Motion](https://www.framer.com/motion/) - Animation library for React.

- **Backend**:
  - [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless platform for deploying functions.
  - [Hono](https://hono.dev/) - Small, simple, and fast web framework for Cloudflare Workers.
  - [Axios](https://axios-http.com/) - Promise-based HTTP client.
  - [Octokit](https://github.com/octokit/rest.js/) - GitHub API client for JavaScript.
  - [LangChain.js](https://github.com/hwchase17/langchainjs) - Framework for building applications powered by language models.
  - [@langchain/core](https://github.com/hwchase17/langchainjs/tree/main/packages/core) - Core utilities for LangChain.js.
  - [@langchain/google-genai](https://github.com/hwchase17/langchainjs/tree/main/packages/google-genai) - Google Generative AI integrations for LangChain.js.
  - [@langchain/community](https://github.com/hwchase17/langchainjs/tree/main/packages/community) - Community-contributed modules for LangChain.js.

### Tools

- **Node.js**: Ensure you have Node.js (version 14 or later) installed.
- **Cloudflare Account**: Required for deploying Cloudflare Workers.
- **Wrangler CLI**: Cloudflare’s CLI tool for managing Workers.

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/github-profile-chat.git
   cd github-profile-chat
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env.local` file in the root directory and add the following:

   ```env
   AUTH_TOKEN=your_github_personal_access_token
   NODE_ENV=development
   GOOGLE_API_KEY=your_google_api_key
   SUPABASE_URL_GITCHAT=your_supabase_url
   SUPABASE_API_KEY=your_supabase_api_key
   CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
   CLOUDFLARE_API_KEY=your_cloudflare_api_key
   ```

4. **Configure Cloudflare Workers**

   - Ensure you have a Cloudflare account.
   - Set up Cloudflare Workers and obtain the necessary API keys.
   - Update the `wrangler.toml` file with your Cloudflare configurations.

5. **Initialize Supabase (If Applicable)**

   If you're using Supabase for vector storage:

   - Sign up for a [Supabase](https://supabase.com/) account.
   - Create a new project and obtain the `SUPABASE_URL_GITCHAT` and `SUPABASE_API_KEY`.
   - Set up the `documents` table for storing embeddings.

## Project Structure
github-profile-chat/
├── app/
│   ├── api/
│   │   └── github/
│   │       └── route.ts
│   ├── components/
│   │   ├── BackgroundProvider.tsx
│   │   ├── ChatInput.tsx
│   │   ├── ChatWrapper.tsx
│   │   ├── RecoilContextProvider.tsx
│   │   ├── UrlInput.tsx
│   │   └── ui/
│   │       └── aurora-background.tsx
│   ├── chat/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── lib/
│       └── utils.ts
├── workers/
│   ├── src/
│   │   ├── index.ts
│   │   └── index2.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .gitignore
├── atoms/
│   └── atoms.ts
├── interfaces/
│   └── interface.ts
├── octokit-config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── next.config.mjs
├── .eslintrc.json
├── .gitignore
└── README.md

### Key Directories and Files

- **app/**: Contains the main Next.js application files.
  - **api/github/route.ts**: API route for fetching GitHub data and preprocessing it for LangChain.js.
  - **components/**: Reusable React components.
  - **chat/page.tsx**: Chat interface page.
  - **layout.tsx**: Root layout for the application.
  - **page.tsx**: Home page of the application.
  - **globals.css**: Global CSS styles.
  - **lib/utils.ts**: Utility functions.

- **workers/**: Contains Cloudflare Workers-related files.
  - **src/index.ts**: Entry point for the Worker handling API requests and LangChain.js integrations.
  - **src/index2.ts**: Additional Worker configurations and prompt handling using LangChain.js.
  - **wrangler.toml**: Configuration file for Wrangler.
  - **package.json**: Dependencies for Workers.
  - **tsconfig.json**: TypeScript configuration for Workers.

- **atoms/**: Recoil state atoms.
  - **atoms.ts**: Defines state atoms for the application.

- **interfaces/**: TypeScript interfaces and types.
  - **interface.ts**: Defines custom TypeScript types.

- **octokit-config.ts**: Configuration for Octokit (GitHub API client).

- **tailwind.config.ts**: Tailwind CSS configuration.
- **postcss.config.mjs**: PostCSS configuration.
- **next.config.mjs**: Next.js configuration.
- **.eslintrc.json**: ESLint configuration.
- **README.md**: Project documentation.

## How to Use

### Running the Application Locally

1. **Start the Development Server**

   In the root directory, run:

   ```bash
   npm run dev
   ```

   This will start the Next.js development server on [http://localhost:3000](http://localhost:3000).

2. **Start Cloudflare Workers**

   Navigate to the `workers` directory and run:

   ```bash
   cd workers
   npm run dev
   ```

   This will start the Workers development server on the specified port (default: 8787).

3. **Using the Application**

   - Open [http://localhost:3000](http://localhost:3000) in your browser.
   - Enter a GitHub profile URL (e.g., `https://github.com/username`) in the input field.
   - Click "Let's chat" to fetch and store the GitHub data.
   - Navigate to the chat page to interact with the AI about the GitHub profile.

### Building and Deploying

1. **Build the Next.js Application**

   ```bash
   npm run build
   npm start
   ```

2. **Deploy Cloudflare Workers**

   In the `workers` directory, run:

   ```bash
   npm run deploy
   ```

   Ensure that your `wrangler.toml` is correctly configured with your Cloudflare account details.

## Future Enhancements/To-Do

- **Enhanced AI Capabilities**: Integrate more advanced AI models to provide deeper insights and more natural conversations.
- **User Authentication**: Implement user accounts to allow personalized experiences and data storage.
- **Expanded Data Fetching**: Include more detailed GitHub data, such as issues, pull requests, and contribution graphs.
- **Improved UI/UX**: Refine the user interface for better accessibility and aesthetics.
- **Testing and CI/CD**: Set up comprehensive testing suites and continuous integration/continuous deployment pipelines.
- **Error Handling**: Enhance error handling mechanisms for a more robust application.
- **Optimize LangChain.js Integrations**: Improve the integration with LangChain.js for more efficient data processing and response generation.

## Additional Notes

### Coding Conventions

- **Language**: TypeScript is used throughout the project for static type checking and enhanced code reliability.
- **State Management**: Recoil is utilized for managing global state in React components.
- **Styling**: Tailwind CSS, augmented with DaisyUI components, ensures a responsive and modern design with minimal effort.

### Architecture

- **Frontend**: Built with Next.js, providing server-side rendering and optimized performance.
- **Backend**: Cloudflare Workers handle API requests and data storage, ensuring low latency and high scalability.
- **State Management**: Recoil atoms manage application state, facilitating seamless data flow between components.
- **AI Integration with LangChain.js**: LangChain.js processes and manages AI interactions, enabling retrieval-augmented generation and more contextually accurate responses based on GitHub data.

### Environment Configuration

Ensure that all environment variables are correctly set up, especially the following:

- `AUTH_TOKEN`: For GitHub API access.
- `GOOGLE_API_KEY`: For Google Generative AI services.
- `SUPABASE_URL_GITCHAT` & `SUPABASE_API_KEY`: For Supabase vector store integrations.
- `CLOUDFLARE_ACCOUNT_ID` & `CLOUDFLARE_API_KEY`: For Cloudflare Workers configurations.

### Contribution Guidelines

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add Your Feature"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

### License

This project is licensed under the [MIT License](LICENSE).

### Contact

For any questions or feedback, feel free to reach out:

- **Email**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)

---

Happy Coding! 🚀
```