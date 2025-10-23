import { motion } from 'framer-motion';
import { Resource } from '@/data/resources';
import { BookOpen, Video, Headphones, Wrench, FileText, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ResourceCardProps {
  resource: Resource;
  index: number;
}

const categoryIcons = {
  tutorial: FileText,
  video: Video,
  book: BookOpen,
  podcast: Headphones,
  tool: Wrench,
  guide: FileText,
  course: GraduationCap,
};

const difficultyColors = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const ResourceCard = ({ resource, index }: ResourceCardProps) => {
  const Icon = categoryIcons[resource.category];
  const isExternal = resource.url.startsWith('http');

  return (
    <motion.a
      href={resource.url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative block"
    >
      <div className="relative h-full rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,215,0,0.15)]">
        {resource.featured && (
          <div className="absolute -top-3 -right-3">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-primary to-accent rounded-full blur-md" />
              <Badge className="relative bg-gradient-to-r from-primary to-accent border-0 text-xs font-semibold">
                Featured
              </Badge>
            </div>
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <Badge className={`${difficultyColors[resource.difficulty]} capitalize`}>
            {resource.difficulty}
          </Badge>
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">
          {resource.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {resource.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {resource.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all pointer-events-none" />
      </div>
    </motion.a>
  );
};

export default ResourceCard;
