import ViewToggle from "../View-Toggle";
import { StatsGrid } from "../Info-Cards";

export function CategoriesHeader({ view, setView, count, onAdd }: any) {
  return (
    <div className="flex justify-between items-end mb-4">
      <StatsGrid
        products={32}
        categories={count}
        actionCard={{ title: "Add Category", onClick: onAdd }}
      />
      <ViewToggle view={view} onChange={setView} />
    </div>
  );
}
