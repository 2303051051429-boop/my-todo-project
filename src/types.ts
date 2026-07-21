export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  priority: 'P1' | 'P2' | 'P3';
}
