import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const STORE_DATA_FILE = path.join(DATA_DIR, 'store-data.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJsonFile<T>(filePath: string, defaultValue: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
      return defaultValue;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultValue;
  }
}

function writeJsonFile<T>(filePath: string, data: T): boolean {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Endpoints
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', store: 'Om Hardware Store', location: 'Khesrahi, Bihar' });
  });

  // Store metadata
  app.get('/api/store-data', (_req: Request, res: Response) => {
    const data = readJsonFile(STORE_DATA_FILE, {});
    res.json(data);
  });

  app.put('/api/store-data', (req: Request, res: Response) => {
    const updated = req.body;
    if (!updated) {
      return res.status(400).json({ error: 'Payload missing' });
    }
    writeJsonFile(STORE_DATA_FILE, updated);
    return res.json({ success: true, data: updated });
  });

  // Customer Enquiries
  app.get('/api/enquiries', (_req: Request, res: Response) => {
    const list = readJsonFile<any[]>(ENQUIRIES_FILE, []);
    res.json(list);
  });

  app.post('/api/enquiries', (req: Request, res: Response) => {
    const { customerName, phone, category, product, quantity, message } = req.body;

    if (!customerName || !phone) {
      return res.status(400).json({ error: 'Customer name and phone number are required.' });
    }

    const enquiries = readJsonFile<any[]>(ENQUIRIES_FILE, []);
    const newEnquiry = {
      id: `ENQ-${Date.now().toString().slice(-5)}`,
      createdAt: new Date().toISOString(),
      customerName: String(customerName).trim(),
      phone: String(phone).trim(),
      category: category ? String(category).trim() : 'General Enquiry',
      product: product ? String(product).trim() : '',
      quantity: quantity ? String(quantity).trim() : '',
      message: message ? String(message).trim() : '',
      status: 'Pending'
    };

    enquiries.unshift(newEnquiry);
    writeJsonFile(ENQUIRIES_FILE, enquiries);

    return res.status(201).json({ success: true, enquiry: newEnquiry });
  });

  app.patch('/api/enquiries/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const enquiries = readJsonFile<any[]>(ENQUIRIES_FILE, []);
    const index = enquiries.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    enquiries[index].status = status || enquiries[index].status;
    writeJsonFile(ENQUIRIES_FILE, enquiries);

    return res.json({ success: true, enquiry: enquiries[index] });
  });

  app.delete('/api/enquiries/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const enquiries = readJsonFile<any[]>(ENQUIRIES_FILE, []);
    const filtered = enquiries.filter((e) => e.id !== id);

    if (filtered.length === enquiries.length) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    writeJsonFile(ENQUIRIES_FILE, filtered);
    return res.json({ success: true });
  });

  // Owner Passcode Check (default PIN: om843114)
  app.post('/api/admin/login', (req: Request, res: Response) => {
    const { pin } = req.body;
    const correctPin = process.env.OWNER_PIN || 'om843114';

    if (pin === correctPin) {
      return res.json({ success: true, role: 'owner', token: 'om-verified-owner-token' });
    } else {
      return res.status(401).json({ error: 'Incorrect owner passcode. Please enter the valid PIN.' });
    }
  });

  // Full-Stack Dev & Prod Mode
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Om Hardware Store web app is running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
