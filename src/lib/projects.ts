// src\lib\projects.ts
export type Status = 'live' | 'wip' | 'archived';

export type Project = {
    slug: string;
    name: string;
    tagline: string;
    status: Status;
    year: number;
    stack: string[];
    page?: '/projects/hsoj-bot' | '/projects/hsojOS' | '/projects/scrabbly';
    image?: string; // e.g. '/images/projects/hsoj-bot.png' 16:9 ratio
    repo?: string;
    demo?: string;
    preview?: string[];
};

// ---- EDIT THESE: all values below are placeholders ----
export const projects: Project[] = [
    {
        slug: 'hsoj',
        name: 'hsoj.is-a.dev',
        tagline: 'My Personal Site (This site!)',
        status: 'live',
        year: 2026,
        stack: ['Sveltekit', 'Taiwind', 'Cloudflare'],
        repo: 'https://github.com/Hsoj-dev/hsoj.is-a.dev',
        demo: 'https://hsoj-is-a-dev.pages.dev/',
    },
    {
        slug: 'hsoj-bot',
        name: 'hsoj-bot',
        tagline: 'A Slack Bot for HackClub Stardance',
        status: 'live',
        year: 2026,
        stack: ['JavaScript', 'Node.js'],
        page: '/projects/hsoj-bot',
        repo: 'https://github.com/Hsoj-dev/hsoj-bot',
        preview: ['$ hsoj-bot --start', 'logged in as hsoj-bot#0001', 'listening for commands...']
    },
    {
        slug: 'hsojOS',
        name: 'hsojOS',
        tagline: 'My Personal WebOS ',
        status: 'wip',
        year: 2026,
        stack: ['Sveltekit', 'TypeScript', 'Tailwind'],
        repo: 'https://github.com/Hsoj-dev/hsojOS',
        demo: 'https://example.com'
    },
    {
        slug: 'scrabbly',
        name: 'scrabbly',
        tagline: 'A Scrabble Training CLI App',
        status: 'wip',
        year: 2026,
        stack: ['JavaScript'],
        page: '/projects/scrabbly', 
        repo: 'https://github.com/Hsoj-dev/scrabbly',
  },
  {
    slug: 'saypi-blog',
    name: 'saypi-blog',
    tagline: 'A social blogging platform made for Pisay scholars',
    status: 'live',
    year: 2025,
    stack: ['Sveltekit', 'Supabase', 'Tailwind', 'DaisyUI', 'Vercel', 'Sentry'],
    // page: '/projects/saypi-blog',
    repo: 'https://github.com/Hsoj-dev/saypi-blog',
    demo: 'https://saypi.blog',
  },
];