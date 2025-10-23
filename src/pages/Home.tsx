import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, Rocket, Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Explore',
      description: 'Discover books, guides, podcasts, and essential resources for FHEVM development.',
      link: '/explore',
      gradient: 'from-yellow-400 to-amber-500',
    },
    {
      icon: Code2,
      title: 'Learn',
      description: 'Access tutorials, video courses, and hands-on challenges to master FHEVM.',
      link: '/learn',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Rocket,
      title: 'Build',
      description: 'Find starter templates, code examples, and tools to build privacy-preserving apps.',
      link: '/build',
      gradient: 'from-yellow-500 to-orange-600',
    },
    {
      icon: Briefcase,
      title: 'Jobs',
      description: 'Browse career opportunities and contribute to the FHEVM ecosystem.',
      link: '/jobs',
      gradient: 'from-orange-400 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium gradient-text">Your FHEVM Development Hub</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Master{' '}
              <span className="gradient-text">Privacy-Preserving</span>
              <br />
              Blockchain Development
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore curated resources, learn from experts, and build the future of encrypted computation with FHEVM technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 group">
                  Start Exploring
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/learn">
                <Button size="lg" variant="outline" className="border-primary/50 hover:border-primary hover:bg-primary/10">
                  Browse Tutorials
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive resources for every stage of your FHEVM journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link to={feature.link} className="block h-full">
                  <div className="h-full rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] group">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.gradient} bg-opacity-20 mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2 group-hover:gradient-text transition-all">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>

                    <div className="mt-4 flex items-center text-primary group-hover:translate-x-2 transition-transform">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 shimmer" />
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to Build the Future?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join the community of developers building privacy-preserving applications with FHEVM
              </p>
              <Link to="/explore">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  Get Started Today
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
