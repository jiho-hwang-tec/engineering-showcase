import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

// Ensure data and public upload directories exist
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'portfolio-store.json');
const PUBLIC_DATA_DIR = path.join(process.cwd(), 'public', 'data');
const PUBLIC_DATA_FILE = path.join(PUBLIC_DATA_DIR, 'portfolio-store.json');
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(PUBLIC_DATA_DIR)) {
  fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Helper to load or initialize server data store
function getStoredData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
    if (fs.existsSync(PUBLIC_DATA_FILE)) {
      const content = fs.readFileSync(PUBLIC_DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading data file, initializing fallback:', err);
  }
  return null;
}

const MOCK_DATA_FILE = path.join(process.cwd(), 'src', 'data', 'mockData.ts');

function sanitizeBase64ToFiles(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeBase64ToFiles(item));
  }
  const result: any = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (typeof val === 'string' && val.startsWith('data:')) {
      const match = val.match(/^data:([a-zA-Z0-9\/\-+.]+);base64,(.+)$/s);
      if (match) {
        const mime = match[1];
        const base64Data = match[2];
        let ext = 'bin';
        if (mime.includes('pdf')) ext = 'pdf';
        else if (mime.includes('jpeg') || mime.includes('jpg')) ext = 'jpg';
        else if (mime.includes('png')) ext = 'png';
        else if (mime.includes('webp')) ext = 'webp';
        else if (mime.includes('svg')) ext = 'svg';

        const filename = `${key}_${Date.now()}_${Math.floor(Math.random() * 1000)}.${ext}`;
        const filePath = path.join(UPLOAD_DIR, filename);
        try {
          fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
          result[key] = `/uploads/${filename}`;
          continue;
        } catch (e) {
          console.error('Error extracting base64 asset:', e);
        }
      }
    }
    if (typeof val === 'object' && val !== null) {
      result[key] = sanitizeBase64ToFiles(val);
    } else {
      result[key] = val;
    }
  }
  return result;
}

function saveStoredData(rawData: any) {
  try {
    const data = sanitizeBase64ToFiles(rawData);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    try {
      if (!fs.existsSync(PUBLIC_DATA_DIR)) {
        fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(PUBLIC_DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.warn('Could not write to public data directory:', e);
    }

    try {
      const mockDataContent = `import { UserProfile, Project, ResearchItem, GalleryItem, PaperItem, BlogPost } from '../types';

export const initialProfile: UserProfile = ${JSON.stringify(data.profile || {}, null, 2)};

export const initialProjects: Project[] = ${JSON.stringify(data.projects || [], null, 2)};

export const initialResearch: ResearchItem[] = ${JSON.stringify(data.research || [], null, 2)};

export const initialGallery: GalleryItem[] = ${JSON.stringify(data.gallery || [], null, 2)};

export const initialPapers: PaperItem[] = ${JSON.stringify(data.papers || [], null, 2)};

export const initialBlogPosts: BlogPost[] = ${JSON.stringify(data.blogs || [], null, 2)};
`;
      fs.writeFileSync(MOCK_DATA_FILE, mockDataContent, 'utf-8');
    } catch (e) {
      console.warn('Could not write to mockData.ts:', e);
    }

    return true;
  } catch (err) {
    console.error('Error writing to data file:', err);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware with high body limits for image uploads and base64 payloads
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ limit: '100mb', extended: true }));

  // Serve static uploads
  app.use('/uploads', express.static(UPLOAD_DIR));

  // 1. Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // 2. GET /api/portfolio - Retrieve all portfolio data
  app.get('/api/portfolio', (req: Request, res: Response) => {
    const data = getStoredData();
    if (data) {
      res.json({ success: true, data });
    } else {
      res.json({ success: true, data: null, message: 'No server data yet, client defaults will be used' });
    }
  });

  // 3. POST /api/portfolio/sync-all - Bulk save all portfolio data
  app.post('/api/portfolio/sync-all', (req: Request, res: Response) => {
    const payload = req.body;
    if (!payload || typeof payload !== 'object') {
      res.status(400).json({ success: false, error: 'Invalid payload' });
      return;
    }
    const current = getStoredData() || {};
    const updated = { ...current, ...payload, updatedAt: new Date().toISOString() };
    const saved = saveStoredData(updated);
    res.json({ success: saved, data: updated });
  });

  // 4. POST /api/portfolio/projects - Update projects list
  app.post('/api/portfolio/projects', (req: Request, res: Response) => {
    const { projects } = req.body;
    if (!Array.isArray(projects)) {
      res.status(400).json({ success: false, error: 'projects must be an array' });
      return;
    }
    const current = getStoredData() || {};
    current.projects = projects;
    current.updatedAt = new Date().toISOString();
    saveStoredData(current);
    res.json({ success: true, count: projects.length });
  });

  // 5. POST /api/portfolio/profile - Update user profile
  app.post('/api/portfolio/profile', (req: Request, res: Response) => {
    const { profile } = req.body;
    if (!profile || typeof profile !== 'object') {
      res.status(400).json({ success: false, error: 'Invalid profile data' });
      return;
    }
    const current = getStoredData() || {};
    current.profile = profile;
    current.updatedAt = new Date().toISOString();
    saveStoredData(current);
    res.json({ success: true, profile });
  });

  // 6. POST /api/portfolio/research - Update research list
  app.post('/api/portfolio/research', (req: Request, res: Response) => {
    const { research } = req.body;
    const current = getStoredData() || {};
    current.research = research;
    current.updatedAt = new Date().toISOString();
    saveStoredData(current);
    res.json({ success: true });
  });

  // 7. POST /api/portfolio/gallery - Update gallery list
  app.post('/api/portfolio/gallery', (req: Request, res: Response) => {
    const { gallery } = req.body;
    const current = getStoredData() || {};
    current.gallery = gallery;
    current.updatedAt = new Date().toISOString();
    saveStoredData(current);
    res.json({ success: true });
  });

  // 8. POST /api/portfolio/papers - Update papers list
  app.post('/api/portfolio/papers', (req: Request, res: Response) => {
    const { papers } = req.body;
    const current = getStoredData() || {};
    current.papers = papers;
    current.updatedAt = new Date().toISOString();
    saveStoredData(current);
    res.json({ success: true });
  });

  // 9. POST /api/portfolio/blogs - Update blogs list
  app.post('/api/portfolio/blogs', (req: Request, res: Response) => {
    const { blogs } = req.body;
    const current = getStoredData() || {};
    current.blogs = blogs;
    current.updatedAt = new Date().toISOString();
    saveStoredData(current);
    res.json({ success: true });
  });

  // 10. POST /api/portfolio/messages - Save contact messages
  app.post('/api/portfolio/messages', (req: Request, res: Response) => {
    const { messages, message } = req.body;
    const current = getStoredData() || {};
    if (messages && Array.isArray(messages)) {
      current.messages = messages;
    } else if (message) {
      current.messages = [message, ...(current.messages || [])];
    }
    current.updatedAt = new Date().toISOString();
    saveStoredData(current);
    res.json({ success: true, messages: current.messages });
  });

  // 11. POST /api/portfolio/reset - Reset data
  app.post('/api/portfolio/reset', (req: Request, res: Response) => {
    try {
      if (fs.existsSync(DATA_FILE)) {
        fs.unlinkSync(DATA_FILE);
      }
      res.json({ success: true, message: 'Data file removed, client defaults restored' });
    } catch (err) {
      res.status(500).json({ success: false, error: String(err) });
    }
  });

  // 12. POST /api/portfolio/upload - Save base64 image or PDF to server uploads folder
  app.post('/api/portfolio/upload', (req: Request, res: Response) => {
    try {
      const { dataUrl, fileName, fileType } = req.body;
      if (!dataUrl || typeof dataUrl !== 'string') {
        res.status(400).json({ success: false, error: 'dataUrl is required' });
        return;
      }

      // Check if it's already an external URL
      if (dataUrl.startsWith('http://') || dataUrl.startsWith('https://')) {
        res.json({ success: true, url: dataUrl });
        return;
      }

      // Parse base64 header
      const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        res.status(400).json({ success: false, error: 'Invalid data URL format' });
        return;
      }

      const mimeType = matches[1];
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');

      // Determine file extension
      let ext = '.png';
      if (mimeType.includes('jpeg') || mimeType.includes('jpg')) ext = '.jpg';
      else if (mimeType.includes('webp')) ext = '.webp';
      else if (mimeType.includes('gif')) ext = '.gif';
      else if (mimeType.includes('svg')) ext = '.svg';
      else if (mimeType.includes('pdf')) ext = '.pdf';

      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const cleanFileName = (fileName || `upload_${timestamp}`)
        .replace(/[^a-zA-Z0-9_\-\.]/g, '_')
        .replace(/\.[^/.]+$/, '');
      const savedFileName = `${cleanFileName}_${timestamp}_${randomStr}${ext}`;
      const filePath = path.join(UPLOAD_DIR, savedFileName);

      fs.writeFileSync(filePath, buffer);

      const fileUrl = `/uploads/${savedFileName}`;
      res.json({
        success: true,
        url: fileUrl,
        fileName: savedFileName,
        size: buffer.length,
        mimeType
      });
    } catch (err) {
      console.error('File upload error:', err);
      res.status(500).json({ success: false, error: 'Failed to save uploaded file' });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
