import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import Navigation from '@/components/Navigation';
import { tutorials } from '@/data/tutorials';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, BookOpen, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import 'highlight.js/styles/github-dark.css';

const Tutorials = () => {
  const { lessonId } = useParams<{ lessonId?: string }>();
  const navigate = useNavigate();
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(false);

  const currentTutorial = tutorials.find(t => t.id === lessonId);
  const currentIndex = tutorials.findIndex(t => t.id === lessonId);
  const prevTutorial = currentIndex > 0 ? tutorials[currentIndex - 1] : null;
  const nextTutorial = currentIndex < tutorials.length - 1 ? tutorials[currentIndex + 1] : null;

  useEffect(() => {
    if (currentTutorial) {
      setLoading(true);
      fetch(`/src/tutorials/${currentTutorial.filename}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch tutorial');
          }
          return response.text();
        })
        .then((text) => {
          setMarkdownContent(text);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading tutorial:', error);
          setMarkdownContent('# Error loading tutorial\n\nThe requested tutorial could not be loaded.');
          setLoading(false);
        });
    }
  }, [currentTutorial]);

  if (!lessonId) {
    // Show tutorial list
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
              <span className="gradient-text">Learn Confidential Contracts</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Master privacy-preserving smart contracts with our step-by-step tutorial series
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/tutorials/${tutorial.id}`)}
              >
                <div className="card-gradient p-6 rounded-xl h-full hover:scale-105 transition-transform">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant={
                      tutorial.difficulty === 'beginner' ? 'default' :
                      tutorial.difficulty === 'intermediate' ? 'secondary' : 'destructive'
                    }>
                      {tutorial.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {tutorial.duration}
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <BookOpen className="w-5 h-5 mr-2 text-primary" />
                    <h3 className="text-xl font-semibold">{tutorial.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {tutorial.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {tutorial.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show tutorial content
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="font-semibold mb-4 text-lg">Lessons</h3>
              <nav className="space-y-2">
                {tutorials.map((tutorial) => (
                  <button
                    key={tutorial.id}
                    onClick={() => navigate(`/tutorials/${tutorial.id}`)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      tutorial.id === lessonId
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    {tutorial.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 max-w-4xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {currentTutorial && (
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant={
                      currentTutorial.difficulty === 'beginner' ? 'default' :
                      currentTutorial.difficulty === 'intermediate' ? 'secondary' : 'destructive'
                    }>
                      {currentTutorial.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {currentTutorial.duration}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentTutorial.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {loading ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">Loading tutorial...</p>
                </div>
              ) : (
                <article className="prose prose-invert prose-lg max-w-none mb-12">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                </article>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center pt-8 border-t border-border">
                {prevTutorial ? (
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/tutorials/${prevTutorial.id}`)}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground">Previous</div>
                      <div className="text-sm">{prevTutorial.title}</div>
                    </div>
                  </Button>
                ) : (
                  <div />
                )}

                {nextTutorial ? (
                  <Button
                    onClick={() => navigate(`/tutorials/${nextTutorial.id}`)}
                    className="flex items-center gap-2"
                  >
                    <div className="text-right">
                      <div className="text-xs">Next</div>
                      <div className="text-sm">{nextTutorial.title}</div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate('/tutorials')}
                    variant="outline"
                  >
                    Back to All Lessons
                  </Button>
                )}
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
