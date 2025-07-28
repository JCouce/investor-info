import type { InsiderData } from "../types/insider-data.types";

export function useFilteredInsiders(insiders: InsiderData[], searchQuery: string): InsiderData[] {
  const query = searchQuery.toLowerCase();
  return insiders.filter((insider) =>
    insider.insider.name.toLowerCase().includes(query) ||
    insider.company.name_display.toLowerCase().includes(query)
  );
}
