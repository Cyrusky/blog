export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export interface LeetCodeTranslateRequest {
  titleSlug: string;
}

export interface LeetCodeQuestionTag {
  id_auto: number;
  tag_id: string;
  name: string;
  slug: string;
}

export interface LeetCodeQuestion {
  id: string;
  id_auto: number;
  title: string;
  title_slug: string;
  difficulty: Difficulty;
  finished_at: string;
  is_paid_only: boolean;
  question_frontend_id: string;
  start_at: string;
  status: number;
  title_cn: string;
  tags: LeetCodeQuestionTag[];
}
