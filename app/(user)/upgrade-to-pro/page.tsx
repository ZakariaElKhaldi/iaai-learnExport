"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, CreditCard, Calendar, Shield, Zap, BookOpen, Users, Crown, Award, MessageSquare } from "lucide-react";

export default function UpgradeToProPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Basic",
      description: "For individuals just getting started",
      price: billingCycle === "monthly" ? 9.99 : 99,
      features: [
        "10 courses per month",
        "Basic code editor",
        "Community support",
        "Course completion certificates",
        "Access to forum discussions",
      ],
      limitations: [
        "No offline downloads",
        "Limited project storage",
        "No priority support",
        "No mentor sessions",
        "Standard course selection",
      ],
      buttonText: "Current Plan",
      disabled: true,
      highlight: false,
    },
    {
      name: "Pro",
      description: "For serious learners who want more",
      price: billingCycle === "monthly" ? 19.99 : 199,
      features: [
        "Unlimited courses",
        "Advanced code editor",
        "Priority support",
        "Download courses for offline access",
        "Course completion certificates",
        "Access to forum discussions",
        "Unlimited project storage",
        "Early access to new courses",
        "Monthly mentor session",
        "Ad-free experience",
      ],
      limitations: [],
      buttonText: "Upgrade to Pro",
      disabled: false,
      highlight: true,
    },
    {
      name: "Enterprise",
      description: "For teams and organizations",
      price: "Custom",
      features: [
        "Everything in Pro",
        "Team management",
        "Custom learning paths",
        "Analytics dashboard",
        "Dedicated account manager",
        "SSO integration",
        "API access",
        "Custom branding",
        "Unlimited mentor sessions",
        "Bulk licenses management",
      ],
      limitations: [],
      buttonText: "Contact Sales",
      disabled: false,
      highlight: false,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center gap-2">
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">Upgrade Now</Badge>
        <h1 className="text-3xl font-bold">Upgrade to LearnExpert Pro</h1>
        <p className="text-muted-foreground max-w-2xl">
          Take your learning to the next level with unlimited access to all courses, advanced features and premium support.
        </p>
      </div>
      
      <div className="flex justify-center">
        <div className="inline-flex items-center rounded-lg border p-1 bg-muted/50">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-md text-sm ${
              billingCycle === "monthly" 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Monthly billing
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-2 rounded-md text-sm ${
              billingCycle === "yearly" 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Yearly billing
            <span className="ml-1 text-xs font-medium text-emerald-500">Save 20%</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={`border ${plan.highlight ? 'border-primary shadow-md' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
                {plan.highlight && <Crown className="h-5 w-5 text-yellow-500" />}
              </div>
              <div className="mt-4">
                {typeof plan.price === 'number' ? (
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">{billingCycle === "monthly" ? "/month" : "/year"}</span>
                  </div>
                ) : (
                  <div className="text-2xl font-bold">{plan.price}</div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {plan.features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Includes:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {plan.limitations.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Limitations:</h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                disabled={plan.disabled}
                variant={plan.highlight ? "default" : "outline"}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="my-12">
        <h2 className="text-2xl font-bold text-center mb-8">Why Upgrade to Pro?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Unlimited Learning</h3>
                <p className="text-sm text-muted-foreground">Access to our complete library of courses with no monthly limits</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Priority Support</h3>
                <p className="text-sm text-muted-foreground">Get faster responses and dedicated help with your learning questions</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Advanced Features</h3>
                <p className="text-sm text-muted-foreground">Access to premium features like offline downloads and advanced code editor</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Exclusive Content</h3>
                <p className="text-sm text-muted-foreground">Early access to new courses and exclusive Pro-only learning resources</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Can I cancel my subscription at any time?</h3>
            <p className="text-sm text-muted-foreground">Yes, you can cancel your subscription at any time. You'll continue to have Pro access until the end of your current billing period.</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">What payment methods do you accept?</h3>
            <p className="text-sm text-muted-foreground">We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and selected local payment methods.</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Is there a money-back guarantee?</h3>
            <p className="text-sm text-muted-foreground">Yes, we offer a 14-day money-back guarantee if you're not satisfied with your Pro subscription.</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Can I switch between monthly and yearly billing?</h3>
            <p className="text-sm text-muted-foreground">Yes, you can switch between billing cycles at any time. If you switch to yearly, we'll apply any remaining credit from your monthly plan.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="gap-2">
            <Shield className="h-4 w-4" />
            <span>Secure Checkout</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 