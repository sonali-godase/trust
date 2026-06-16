const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if(file === 'node_modules' || file === '.git' || file === 'dist' || file === 'build') return;
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            results.push(file);
        }
    });
    return results;
}

const frontendSrcFiles = walk('e:/trust_management_system/frontend/src');
const frontendPublicFiles = walk('e:/trust_management_system/frontend/public');
const allFrontendFiles = [...frontendSrcFiles, ...frontendPublicFiles];

let allContent = '';
frontendSrcFiles.forEach(f => {
    if (f.endsWith('.jsx') || f.endsWith('.js') || f.endsWith('.json') || f.endsWith('.css')) {
        allContent += fs.readFileSync(f, 'utf8') + '\n';
    }
});
allContent += fs.readFileSync('e:/trust_management_system/frontend/index.html', 'utf8') + '\n';

const imageExts = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp', '.ico'];
const images = allFrontendFiles.filter(f => imageExts.includes(path.extname(f).toLowerCase()));

const unusedImages = [];
images.forEach(img => {
    const baseName = path.basename(img);
    if (!allContent.includes(baseName) && baseName !== 'favicon.ico') {
        unusedImages.push(img);
    }
});

const jsFiles = frontendSrcFiles.filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
const unusedFiles = [];
const entryPoints = ['App.jsx', 'main.jsx', 'index.js', 'i18n.js'];

jsFiles.forEach(file => {
    const baseName = path.basename(file);
    const baseNameWithoutExt = path.basename(file, path.extname(file));
    if (entryPoints.includes(baseName)) return;

    let contentWithoutThisFile = allContent.replace(fs.readFileSync(file, 'utf8'), '');
    if (!contentWithoutThisFile.includes(baseNameWithoutExt)) {
        unusedFiles.push(file);
    }
});

console.log(JSON.stringify({
    unusedImages: unusedImages.map(f => f.replace(/\\\\/g, '/')),
    unusedFiles: unusedFiles.map(f => f.replace(/\\\\/g, '/'))
}, null, 2));
