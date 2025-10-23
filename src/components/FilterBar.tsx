import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  categories: string[];
  difficulties: string[];
}

const FilterBar = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  categories,
  difficulties,
}: FilterBarProps) => {
  return (
    <div className="space-y-4 mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-card border-border focus:border-primary transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <p className="text-sm text-muted-foreground mb-2">Category</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange('all')}
              className={selectedCategory === 'all' ? 'bg-gradient-to-r from-primary to-accent' : ''}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className={selectedCategory === category ? 'bg-gradient-to-r from-primary to-accent' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-[200px]">
          <p className="text-sm text-muted-foreground mb-2">Difficulty</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedDifficulty === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onDifficultyChange('all')}
              className={selectedDifficulty === 'all' ? 'bg-gradient-to-r from-primary to-accent' : ''}
            >
              All
            </Button>
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                size="sm"
                onClick={() => onDifficultyChange(difficulty)}
                className={selectedDifficulty === difficulty ? 'bg-gradient-to-r from-primary to-accent' : ''}
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
