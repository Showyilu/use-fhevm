import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import ResourceCard from '@/components/ResourceCard';
import FilterBar from '@/components/FilterBar';
import { resources } from '@/data/resources';

const Build = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const categories = ['tool', 'guide', 'tutorial'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  const buildResources = resources.filter((r) => 
    ['tool', 'guide'].includes(r.category) || r.tags.includes('development')
  );

  const filteredResources = buildResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Build</span> with FHEVM
          </h1>
          <p className="text-xl text-muted-foreground">
            Find tools, templates, and resources to build privacy-preserving applications
          </p>
        </motion.div>

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          categories={categories}
          difficulties={difficulties}
        />

        {filteredResources.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No building resources found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <ResourceCard key={resource.id} resource={resource} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Build;
