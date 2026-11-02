export type TaskColor = 'red' | 'green' | 'blue' | 'purple' | 'brown';

export type TaskStatus = 'error' | 'queued' | 'running' | 'passed' | 'paused';

export type Task = {
  task_id: number;
  cmd: string;
  priority: number;
  wait_admin: number;
  args: Record<string, string>;
  color: TaskColor;
  status: TaskStatus;
};

/**
 * The first task with status `running`, with the `.php` suffix dropped from
 * `cmd` (e.g. `derive.php` becomes `derive`). Undefined when nothing is running.
 */
export function runningTask(tasks: Task[]): Task | undefined {
  const running = tasks.find((task) => task.status === 'running');
  if (!running) return undefined;
  return { ...running, cmd: running.cmd.replace(/\.php$/, '') };
}
