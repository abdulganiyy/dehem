"use client";

import { useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">DEHEM</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <a
              href="#story"
              className="text-sm hover:text-muted-foreground transition-colors"
            >
              OUR STORY
            </a>
            <a
              href="#collection"
              className="text-sm hover:text-muted-foreground transition-colors"
            >
              COLLECTION
            </a>
            <a
              href="#craftsmanship"
              className="text-sm hover:text-muted-foreground transition-colors"
            >
              CRAFTSMANSHIP
            </a>
            <Button variant="default" className="ml-4">
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-4 bg-card">
            <div className="flex flex-col gap-4">
              <a href="#story" className="text-sm hover:text-muted-foreground">
                OUR STORY
              </a>
              <a
                href="#collection"
                className="text-sm hover:text-muted-foreground"
              >
                COLLECTION
              </a>
              <a
                href="#craftsmanship"
                className="text-sm hover:text-muted-foreground"
              >
                CRAFTSMANSHIP
              </a>
              <Button variant="default" className="w-full">
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-150 md:min-h-175 flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance leading-tight">
            Handcrafted Excellence
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every pair tells a story of traditional craftsmanship, premium
            materials, and unwavering dedication to quality. Step into comfort
            redefined.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="text-base">
              Explore Collection
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base bg-transparent"
            >
              Learn Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Product Section */}
      <section id="story" className="py-20 px-4 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex items-center justify-center bg-secondary rounded-2xl aspect-square">
              <img
                src="/premium-leather-shoe-craftsmanship.jpg"
                alt="Premium leather shoe"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground tracking-widest">
                  SIGNATURE COLLECTION
                </p>
                <h2 className="text-4xl md:text-5xl font-bold">
                  The Heritage Classic
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our flagship design combines timeless elegance with modern
                comfort. Hand-selected Italian leather, reinforced stitching,
                and a cushioned sole designed for all-day wear.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 items-start">
                  <ChevronRight
                    className="text-primary shrink-0 mt-1"
                    size={20}
                  />
                  <span>Ethically sourced premium leather</span>
                </li>
                <li className="flex gap-3 items-start">
                  <ChevronRight
                    className="text-primary shrink-0 mt-1"
                    size={20}
                  />
                  <span>Hand-stitched construction</span>
                </li>
                <li className="flex gap-3 items-start">
                  <ChevronRight
                    className="text-primary shrink-0 mt-1"
                    size={20}
                  />
                  <span>Lifetime sole replacement warranty</span>
                </li>
              </ul>
              <Button size="lg">View Details</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Grid */}
      <section id="collection" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <p className="text-sm font-semibold text-muted-foreground tracking-widest">
              OUR COLLECTION
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Styles for Every Occasion
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Urban Oxford", desc: "Modern sophistication" },
              { name: "Casual Loafer", desc: "Everyday elegance" },
              { name: "Athletic Performance", desc: "Active comfort" },
            ].map((style, idx) => (
              <div key={idx} className="space-y-4 group cursor-pointer">
                <div className="bg-secondary rounded-2xl aspect-square overflow-hidden">
                  <img
                    src={`/brogues.jpg`}
                    alt={style.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{style.name}</h3>
                  <p className="text-muted-foreground">{style.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section
        id="craftsmanship"
        className="py-20 px-4 bg-primary text-primary-foreground"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold tracking-widest opacity-90">
              ARTISAN PROCESS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Crafted by Hand, Worn by Heart
            </h2>
          </div>
          <p className="text-lg leading-relaxed opacity-95 max-w-3xl mx-auto">
            From cutting the leather to the final stitch, each pair is
            meticulously crafted by skilled artisans with decades of experience.
            Our commitment to excellence means every detail matters.
          </p>
          <Button size="lg" variant="secondary">
            Discover Our Process
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 md:p-16 text-center space-y-6 border border-border">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Experience The Difference?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join our community of people who refuse to compromise on quality and
            comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button size="lg">Shop Now</Button>
            <Button size="lg" variant="outline">
              Request a Catalog
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">DEHEM</h3>
              <p className="text-sm opacity-80">
                Handcrafted shoes for the discerning.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">SHOP</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100">
                    Men's Shoes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Women's Shoes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Sale
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">SUPPORT</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Warranty
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Sizing Guide
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">COMPANY</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
            <p>&copy; 2026 DEHEM. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:opacity-100">
                Privacy
              </a>
              <a href="#" className="hover:opacity-100">
                Terms
              </a>
              <a href="#" className="hover:opacity-100">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
