import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import JobCard from '@/components/JobCard';
import { jobs } from '@/data/resources';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const types = ['full-time', 'part-time', 'contract', 'remote'];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'all' || job.type === selectedType;

    return matchesSearch && matchesType;
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
            <span className="gradient-text">Career</span> Opportunities
          </h1>
          <p className="text-xl text-muted-foreground">
            Join the FHEVM ecosystem and shape the future of privacy-preserving technology
          </p>
        </motion.div>

        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border focus:border-primary transition-colors"
            />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Job Type</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('all')}
                className={selectedType === 'all' ? 'bg-gradient-to-r from-primary to-accent' : ''}
              >
                All
              </Button>
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className={selectedType === type ? 'bg-gradient-to-r from-primary to-accent' : ''}
                >
                  {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No jobs found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
