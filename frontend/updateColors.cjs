const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'Dashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace hex backgrounds
content = content.replace(/#06141d/g, '#040a0f'); // Main bg
content = content.replace(/#0b1e29/g, '#0a141b'); // Panel bg

// Replace cyan with green tailwind classes
content = content.replace(/cyan-400/g, '[#4ade80]');
content = content.replace(/cyan-500/g, 'green-500');
content = content.replace(/cyan-600/g, 'green-600');
content = content.replace(/cyan-900/g, 'green-900');
content = content.replace(/cyan-200/g, 'green-200');
content = content.replace(/cyan-300/g, 'green-300');

// Replace specific cyan hex used in style tag / SVGs / inline styles
content = content.replace(/#22d3ee/g, '#4ade80');
content = content.replace(/#06b6d4/g, '#22c55e');

// Some lingering cyan references like border-t-cyan-400 would now be border-t-[#4ade80] which is valid tailwind

fs.writeFileSync(filePath, content, 'utf8');
console.log('Dashboard theme updated.');
