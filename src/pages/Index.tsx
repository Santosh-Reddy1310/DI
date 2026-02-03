import { LandingHeader } from "@/components/layout/LandingHeader";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <section id="details" className="py-24 bg-accent/30">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose DESY?
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                Our AI-powered platform transforms complex decisions into clear, actionable insights.
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold mb-3">Multi-Step Reasoning</h3>
                  <p className="text-muted-foreground">
                    Advanced AI analyzes your decisions from multiple angles for comprehensive insights.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold mb-3">Full Transparency</h3>
                  <p className="text-muted-foreground">
                    Understand exactly why each recommendation is made with detailed explanations.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                  <p className="text-muted-foreground">
                    Get results in seconds with our optimized AI processing pipeline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="py-24">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Have questions or feedback? We'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:contact@desy.ai" 
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Email Us
                </a>
                <a 
                  href="#" 
                  className="px-6 py-3 rounded-lg border border-border font-medium hover:bg-accent transition-colors"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
