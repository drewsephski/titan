import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { siteConfig } from '@/config/site.config';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing - ' + siteConfig.name,
  description: 'Simple, transparent pricing for all your needs.',
};

const pricingPlans = [
  {
    name: 'Starter',
    description: 'Perfect for individuals getting started',
    price: '$9',
    period: '/month',
    features: [
      '5 projects',
      '10GB storage',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Pro',
    description: 'For growing teams and businesses',
    price: '$29',
    period: '/month',
    features: [
      'Unlimited projects',
      '100GB storage',
      'Advanced analytics',
      'Priority support',
      'API access',
    ],
    cta: 'Go Pro',
    featured: true,
  },
  {
    name: 'Enterprise',
    description: 'Custom solutions for your organization',
    price: 'Custom',
    period: '',
    features: [
      'Unlimited projects',
      'Unlimited storage',
      'Dedicated support',
      'Custom integrations',
      'SLA',
      'On-premise options',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Choose the perfect plan for your needs. Start with a 14-day free trial. No credit card required.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              'relative flex flex-col rounded-2xl p-8 ring-1 ring-border lg:flex',
              plan.featured
                ? 'bg-primary/5 ring-2 ring-primary/80 shadow-xl'
                : 'bg-card',
            )}
          >
            {plan.featured && (
              <div className="absolute top-2 right-2 mb-2 inline-flex">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold leading-5 text-primary">
                  Most popular
                </span>
              </div>
            )}
            <h2 className="text-lg font-semibold leading-8 text-foreground">
              {plan.name}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {plan.description}
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-foreground">
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-sm font-semibold leading-6 text-muted-foreground">
                  {plan.period}
                </span>
              )}
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground"
            >
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Icons.check className="h-6 w-5 flex-none text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/documentation">
              <Button
                size="lg"
                className={cn(
                  'mt-8',
                  plan.featured
                    ? 'bg-primary hover:bg-primary/90'
                    : 'bg-foreground hover:bg-foreground/90'
                )}
              >
                {plan.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Need something custom?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We offer custom plans for large teams and enterprises. Contact our sales team to
          discuss your specific needs.
        </p>
        <div className="mt-8 flex items-center justify-center gap-x-6">
          <Link href="mailto:sales@example.com">
            <Button variant="outline" size="lg">
              <Icons.sales className="mr-2 h-4 w-4" />
              Contact Sales
            </Button>
          </Link>
        <Link href="/documentation">
          <Button variant="ghost" size="lg">
            <Icons.bookOpen className="mr-2 h-4 w-4" />
            Learn more
          </Button>
        </Link>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
