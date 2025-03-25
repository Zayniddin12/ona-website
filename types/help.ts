export interface TFaq {
  id: number;
  question: string;
  answer: string;
  ordering: number;
}

export interface THelp {
  id: number;
  before_application: string;
  how_to: string;
  app_doc: string;
  created_at: string;
}

export interface THelpType {
  id: number;
  name: string;
  ordering: number;
  created_at: string;
}
