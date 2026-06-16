const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
  });

  // Navigate to login first
  await page.goto('http://localhost:5173/login');
  
  // Assume there is a way to log in, or just inject localStorage
  // Since we don't have the login credentials readily, let's inject a fake admin token and state
  await page.evaluate(() => {
    localStorage.setItem('user', JSON.stringify({
      _id: '123',
      email: 'admin@gmail.com',
      role: 'Admin',
      token: 'fake-token'
    }));
  });

  // Now navigate to the problematic page
  await page.goto('http://localhost:5173/admin/document-admins');
  
  // Wait a bit for the app to render and crash
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
})();
