const fs = require('fs');
const path = require('path');

const files = ['index.html'];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    const replacements = [
        { bad: 'â€¢', good: '•' },
        { bad: 'â€“', good: '–' },
        { bad: 'â€”', good: '—' },
        { bad: 'â€™', good: "'" },
        { bad: 'â€œ', good: '"' },
        { bad: 'â€', good: '"' },
        { bad: 'â†’', good: '→' },
        { bad: 'Â£', good: '£' },
        { bad: 'Â©', good: '©' },
        { bad: 'Â ', good: ' ' },
        { bad: 'Â', good: '' },
        { bad: 'â€', good: '"' }
    ];
    
    let original = content;
    for (const {bad, good} of replacements) {
        content = content.split(bad).join(good);
    }
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed encoding issues in ${file}`);
    } else {
        console.log(`No encoding issues found in ${file}`);
    }
});
