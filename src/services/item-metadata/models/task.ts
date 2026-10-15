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
