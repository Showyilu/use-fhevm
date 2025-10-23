import { motion } from 'framer-motion';
import { Job } from '@/data/resources';
import { MapPin, Briefcase, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface JobCardProps {
  job: Job;
  index: number;
}

const typeColors = {
  'full-time': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'part-time': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'contract': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'remote': 'bg-yellow-600/20 text-yellow-300 border-yellow-600/30',
};

const JobCard = ({ job, index }: JobCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="h-full rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,215,0,0.15)]">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold mb-1 group-hover:gradient-text transition-all">
              {job.title}
            </h3>
            <p className="text-lg text-muted-foreground font-medium">{job.company}</p>
          </div>
          <Badge className={`${typeColors[job.type]} capitalize`}>
            {job.type}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{job.location}</span>
          </div>
          {job.salary && (
            <div className="flex items-center text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-2" />
              <span className="text-sm">{job.salary}</span>
            </div>
          )}
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
          onClick={() => window.open('https://jobs.zama.ai/', '_blank')}
        >
          <Briefcase className="h-4 w-4 mr-2" />
          Apply Now
        </Button>
      </div>
    </motion.div>
  );
};

export default JobCard;
