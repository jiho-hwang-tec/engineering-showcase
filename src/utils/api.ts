import { UserProfile, Project, ResearchItem, GalleryItem, PaperItem, BlogPost, ContactMessage } from '../types';

export interface PortfolioDataPackage {
  profile?: UserProfile;
  projects?: Project[];
  research?: ResearchItem[];
  gallery?: GalleryItem[];
  papers?: PaperItem[];
  blogs?: BlogPost[];
  messages?: ContactMessage[];
  updatedAt?: string;
}

/**
 * Fetches all portfolio data from the backend server or static build storage.
 */
export async function fetchPortfolioData(): Promise<PortfolioDataPackage | null> {
  // 1. Try Live Server REST API
  try {
    const res = await fetch('/api/portfolio');
    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.data) {
        return json.data as PortfolioDataPackage;
      }
    }
  } catch (err) {
    console.warn('Live API not reachable, falling back to static data storage:', err);
  }

  // 2. Fallback for Static Hostings (Netlify, GitHub Pages, Vercel Static)
  try {
    const staticRes = await fetch('/data/portfolio-store.json');
    if (staticRes.ok) {
      const staticData = await staticRes.json();
      if (staticData && typeof staticData === 'object') {
        return staticData as PortfolioDataPackage;
      }
    }
  } catch (err) {
    console.warn('Static data storage not reachable:', err);
  }

  return null;
}

/**
 * Saves all sections to the server in a single sync call.
 */
export async function syncAllPortfolio(data: PortfolioDataPackage): Promise<boolean> {
  try {
    const res = await fetch('/api/portfolio/sync-all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return !!json.success;
  } catch (err) {
    console.error('Failed to sync all portfolio data to server:', err);
    return false;
  }
}

/**
 * Saves projects array to the server.
 */
export async function saveProjectsToServer(projects: Project[]): Promise<boolean> {
  try {
    const res = await fetch('/api/portfolio/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projects }),
    });
    const json = await res.json();
    return !!json.success;
  } catch (err) {
    console.error('Failed to save projects to server:', err);
    return false;
  }
}

/**
 * Saves user profile to the server.
 */
export async function saveProfileToServer(profile: UserProfile): Promise<boolean> {
  try {
    const res = await fetch('/api/portfolio/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile }),
    });
    const json = await res.json();
    return !!json.success;
  } catch (err) {
    console.error('Failed to save profile to server:', err);
    return false;
  }
}

/**
 * Saves research items to the server.
 */
export async function saveResearchToServer(research: ResearchItem[]): Promise<boolean> {
  try {
    const res = await fetch('/api/portfolio/research', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ research }),
    });
    const json = await res.json();
    return !!json.success;
  } catch (err) {
    console.error('Failed to save research to server:', err);
    return false;
  }
}

/**
 * Saves gallery items to the server.
 */
export async function saveGalleryToServer(gallery: GalleryItem[]): Promise<boolean> {
  try {
    const res = await fetch('/api/portfolio/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gallery }),
    });
    const json = await res.json();
    return !!json.success;
  } catch (err) {
    console.error('Failed to save gallery to server:', err);
    return false;
  }
}

/**
 * Saves papers to the server.
 */
export async function savePapersToServer(papers: PaperItem[]): Promise<boolean> {
  try {
    const res = await fetch('/api/portfolio/papers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ papers }),
    });
    const json = await res.json();
    return !!json.success;
  } catch (err) {
    console.error('Failed to save papers to server:', err);
    return false;
  }
}

/**
 * Saves blogs to the server.
 */
export async function saveBlogsToServer(blogs: BlogPost[]): Promise<boolean> {
  try {
    const res = await fetch('/api/portfolio/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blogs }),
    });
    const json = await res.json();
    return !!json.success;
  } catch (err) {
    console.error('Failed to save blogs to server:', err);
    return false;
  }
}

/**
 * Saves contact messages or adds a single message to the server.
 */
export async function saveMessagesToServer(messages: ContactMessage[]): Promise<boolean> {
  try {
    const res = await fetch('/api/portfolio/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    const json = await res.json();
    return !!json.success;
  } catch (err) {
    console.error('Failed to save messages to server:', err);
    return false;
  }
}

/**
 * Resets portfolio data on server to defaults.
 */
export async function resetPortfolioOnServer(): Promise<boolean> {
  try {
    const res = await fetch('/api/portfolio/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await res.json();
    return !!json.success;
  } catch (err) {
    console.error('Failed to reset portfolio on server:', err);
    return false;
  }
}

/**
 * Uploads a file (base64 DataURL) to the server filesystem so it gets a permanent public URL (e.g. /uploads/image.jpg)
 */
export async function uploadFileToServer(
  dataUrl: string,
  fileName?: string,
  fileType?: string
): Promise<{ success: boolean; url: string; fileName?: string }> {
  try {
    // If it is already a server-hosted path or external http URL, return it directly
    if (dataUrl.startsWith('/uploads/') || dataUrl.startsWith('http://') || dataUrl.startsWith('https://')) {
      return { success: true, url: dataUrl };
    }

    const res = await fetch('/api/portfolio/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataUrl, fileName, fileType }),
    });
    const json = await res.json();
    if (json.success && json.url) {
      return { success: true, url: json.url, fileName: json.fileName };
    }
    return { success: false, url: dataUrl };
  } catch (err) {
    console.warn('Upload to server endpoint failed, falling back to embedded data URL:', err);
    return { success: false, url: dataUrl };
  }
}
