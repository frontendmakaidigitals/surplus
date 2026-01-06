import { ChevronRight } from "lucide-react";
import { Category } from "../../actions/useCategoryActions";
export function CategoriesBreadcrumb({
  selected,
  clear,
}: {
  selected: Category | null;
  clear: () => void;
}) {
  if (!selected) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
      <button onClick={clear} className="hover:underline">
        Categories
      </button>
      <ChevronRight className="w-4 h-4" />
      <span>{selected.name}</span>
    </div>
  );
}
