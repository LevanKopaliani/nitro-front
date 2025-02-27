export type MenuItem = {
  id?: number;
  configs?: string[];
  title: string;
  menu_type: string;
  pid: number;
  slug: string;
  items?: MenuItem[];
};
