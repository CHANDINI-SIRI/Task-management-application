// src/utils/aiBreakdown.js

/**
 * Simulates a fast intelligence response to break a large task into highly specific subtasks.
 */
export function generateSubtasks(taskTitle) {
  const titleLower = taskTitle.toLowerCase();

  // Keyword Matrix Router
  if (titleLower.includes('auth') || titleLower.includes('login')) {
    return [
      { id: `sub-${Date.now()}-1`, title: "Configure JWT tokens and hashing algorithms", is_completed: false },
      { id: `sub-${Date.now()}-2`, title: "Create Login & Registration API endpoints", is_completed: false },
      { id: `sub-${Date.now()}-3`, title: "Design frontend form layouts with validation rules", is_completed: false }
    ];
  }

  if (titleLower.includes('database') || titleLower.includes('schema') || titleLower.includes('models')) {
    return [
      { id: `sub-${Date.now()}-1`, title: "Map out entity-relationship diagram boundaries", is_completed: false },
      { id: `sub-${Date.now()}-2`, title: "Write backend schema models and validations", is_completed: false },
      { id: `sub-${Date.now()}-3`, title: "Run initialization scripts and verify connection pooling", is_completed: false }
    ];
  }

  if (titleLower.includes('server') || titleLower.includes('leak') || titleLower.includes('fix')) {
    return [
      { id: `sub-${Date.now()}-1`, title: "Isolate memory profile snapshots via Chrome DevTools", is_completed: false },
      { id: `sub-${Date.now()}-2`, title: "Patch open event listeners and unclosed database sockets", is_completed: false },
      { id: `sub-${Date.now()}-3`, title: "Deploy sandbox container and run load stress tests", is_completed: false }
    ];
  }

  // Universal fallback if the task is completely unique
  return [
    { id: `sub-${Date.now()}-1`, title: "Research and outline engineering requirements", is_completed: false },
    { id: `sub-${Date.now()}-2`, title: "Draft core implementation architecture", is_completed: false },
    { id: `sub-${Date.now()}-3`, title: "Perform final code review optimization sweeps", is_completed: false }
  ];
}