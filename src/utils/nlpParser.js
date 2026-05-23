// src/utils/nlpParser.js

export function parseNaturalLanguageTask(text) {
  if (!text) return { title: '', priority: 'Medium', dueDate: 'Today', category: 'general' };

  let cleanText = text;
  let priority = 'Medium';
  let dueDate = 'Today';
  let category = 'general';

  // 1. Robust Category Hashtag Isolation (Runs FIRST before strings get manipulated)
  // This looks for #work, #personal, #health anywhere in the string
  const tagMatch = cleanText.match(/#(\w+)/);
  if (tagMatch) {
    const extractedTag = tagMatch[1].toLowerCase().trim();
    // Only accept our system-defined filter tags, otherwise default to general
    if (['work', 'personal', 'health'].includes(extractedTag)) {
      category = extractedTag;
    } else {
      category = 'general';
    }
    // Cleanly strip the hashtag and any trailing spaces out of the title completely
    cleanText = cleanText.replace(/#\w+/, '');
  }

  // 2. Detect Priority Tokens
  if (/\b(high|urgent|asap)\b/i.test(cleanText)) {
    priority = 'High';
    cleanText = cleanText.replace(/\b(high|urgent|asap)\b/i, '');
  } else if (/\b(low|backlog|trivial)\b/i.test(cleanText)) {
    priority = 'Low';
    cleanText = cleanText.replace(/\b(low|backlog|trivial)\b/i, '');
  } else if (/\b(medium|normal)\b/i.test(cleanText)) {
    priority = 'Medium';
    cleanText = cleanText.replace(/\b(medium|normal)\b/i, '');
  }

  // 3. Detect Simple Time Tokens
  if (/\b(tomorrow)\b/i.test(cleanText)) {
    dueDate = 'Tomorrow';
    cleanText = cleanText.replace(/\b(tomorrow)\b/i, '');
  } else if (/\b(next week)\b/i.test(cleanText)) {
    dueDate = 'Next week';
    cleanText = cleanText.replace(/\b(next week)\b/i, '');
  } else if (/\b(today)\b/i.test(cleanText)) {
    dueDate = 'Today';
    cleanText = cleanText.replace(/\b(today)\b/i, '');
  }

  // Clean up any remaining artifacts like the word "priority" if it was typed explicitly
  cleanText = cleanText.replace(/\b(priority)\b/i, '');

  // Strip multi-spaces out and clean edges
  const title = cleanText.replace(/\s+/g, ' ').trim();

  return {
    title: title || text, 
    priority,
    dueDate,
    category
  };
}