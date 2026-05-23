// src/utils/priorityEngine.js

/**
 * Calculates a dynamic priority score for active tasks and returns the top recommendation.
 * Formula: Score = (Urgency * 0.5) + (Importance * 0.3) + (OverdueDays * 15)
 */
export function getNextBestTask(tasks) {
  if (!tasks || tasks.length === 0) return null;

  // Filter out already completed tasks
  const activeTasks = tasks.filter(task => task.status !== 'Completed');
  if (activeTasks.length === 0) return null;

  const scoredTasks = activeTasks.map(task => {
    let urgencyScore = 30; // Default base urgency

    // 1. Map real string deadlines to urgency weights
    const dueStr = task.dueDate.toLowerCase();
    if (dueStr.includes('today')) {
      urgencyScore = 90;
    } else if (dueStr.includes('tomorrow')) {
      urgencyScore = 70;
    } else if (dueStr.includes('days')) {
      urgencyScore = 50;
    } else if (dueStr.includes('next week')) {
      urgencyScore = 20;
    }

    // 2. Map User-Defined Importance Weights
    const importanceMap = { High: 100, Medium: 50, Low: 25 };
    const importanceScore = importanceMap[task.priority] || 50;

    // 3. Track History Multipliers (simulated or tracking past rollover counts)
    const overdueMultiplier = task.overdueCount ? task.overdueCount * 15 : 0;

    // 4. Run Final Core Algorithm Matrix
    const finalScore = (urgencyScore * 0.5) + (importanceScore * 0.3) + overdueMultiplier;

    return {
      ...task,
      smartScore: Math.round(finalScore)
    };
  });

  // Sort descending by calculated score and return the highest element
  return scoredTasks.sort((a, b) => b.smartScore - a.smartScore)[0];
}