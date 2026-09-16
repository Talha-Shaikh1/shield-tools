const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../LINKEDIN_30_DAYS_CONTENT_PLAYBOOK.md'), 'utf8');

const days = [];
const dayRegex = /### Day (\d+): ([^\n\r]+)/g;
let match;
const matches = [];
while ((match = dayRegex.exec(content)) !== null) {
  matches.push({ day: parseInt(match[1]), title: match[2].trim(), index: match.index });
}

for (let i = 0; i < matches.length; i++) {
  const current = matches[i];
  const nextIndex = i < matches.length - 1 ? matches[i + 1].index : content.length;
  const chunk = content.substring(current.index, nextIndex);

  const audienceMatch = chunk.match(/\*\*Target Audience:\*\* ([^\n\r]+)/);
  const objectiveMatch = chunk.match(/\*\*Objective:\*\* ([^\n\r]+)/);
  
  // Post copy inside ```markdown ... ```
  const postCopyMatch = chunk.match(/#### Post Copy:[\s\S]*?```markdown\r?\n([\s\S]*?)\r?\n```/);

  // Visual specs
  const visualTypeMatch = chunk.match(/\* \*\*Visual Type:\*\* ([^\n\r]+)/);
  const refAssetMatch = chunk.match(/\* \*\*Reference Asset[^\*]*\*\* ([^\n\r]+)/);
  
  // AI Prompt: look for > `...` or ``` ... ```
  let aiPrompt = '';
  const promptQuoteMatch = chunk.match(/\* \*\*Detailed AI Generation Prompt[^\*]*\*\*[\s\S]*?>\s*`([\s\S]*?)`/);
  if (promptQuoteMatch) {
    aiPrompt = promptQuoteMatch[1].trim();
  } else {
    const promptAlt = chunk.match(/\* \*\*Detailed AI Generation Prompt[^\*]*\*\*[\s\S]*?>\s*([\s\S]*?)(?=\* \*\*|\n\n|$)/);
    if (promptAlt) {
      aiPrompt = promptAlt[1].replace(/^>\s*/gm, '').replace(/`/g, '').trim();
    }
  }

  // Canva Overlay
  const canvaMatch = chunk.match(/\* \*\*Canva Overlay Guide:\*\* ([^\n\r]+)/);
  
  // First Comment
  let firstComment = '';
  const commentMatch = chunk.match(/\* \*\*First Comment Copy:\*\*[\s\S]*?>\s*([\s\S]*?)(?=\n---|\n#|$)/);
  if (commentMatch) {
    firstComment = commentMatch[1]
      .replace(/^>\s*/gm, '')
      .replace(/^[\s"'\*]+|[\s"'\*]+$/g, '')
      .trim();
  }

  let phase = 1;
  let phaseName = 'The Broken State of E-Commerce';
  if (current.day >= 8 && current.day <= 14) {
    phase = 2;
    phaseName = 'Engineering & RAG Architecture';
  } else if (current.day >= 15 && current.day <= 20) {
    phase = 3;
    phaseName = 'Advanced Solutions & Teasers';
  } else if (current.day >= 21) {
    phase = 4;
    phaseName = 'Grand Reveal & Botaura Beta Launch';
  }

  days.push({
    day: current.day,
    title: current.title,
    phase,
    phaseName,
    targetAudience: audienceMatch ? audienceMatch[1].trim() : '',
    objective: objectiveMatch ? objectiveMatch[1].trim() : '',
    postCopy: postCopyMatch ? postCopyMatch[1].trim() : '',
    visualType: visualTypeMatch ? visualTypeMatch[1].trim() : '',
    referenceAsset: refAssetMatch ? refAssetMatch[1].trim() : '',
    aiPrompt: aiPrompt,
    canvaOverlay: canvaMatch ? canvaMatch[1].trim() : '',
    firstComment: firstComment
  });
}

console.log('Parsed successfully, total days:', days.length);
fs.mkdirSync(path.join(__dirname, '../src/data'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '../src/data/playbookData.json'), JSON.stringify(days, null, 2), 'utf8');
console.log('Saved to src/data/playbookData.json');
