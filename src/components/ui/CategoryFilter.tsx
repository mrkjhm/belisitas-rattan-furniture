import { motion } from "framer-motion";
import { useCategories } from "@/hooks/use-products";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const { data: categories = ["All"], isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-20 rounded-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            selected === category
              ? "text-accent-foreground"
              : "text-muted-foreground hover:text-background"
          }`}
        >
          {selected === category && (
            <motion.div
              layoutId="category-pill"
              className="absolute inset-0 bg-[#0D2893] rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </div>
  );
}
