type TCommonFields = {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
};

export type TTodo = TCommonFields & {
  _id: string;
};

export type TFormType = TCommonFields;
