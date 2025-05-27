"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Calendar, AlertCircle, Download, RefreshCw, Clock, ChevronsUpDown } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and payment methods</p>
      </div>
      
      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>Subscription</span>
          </TabsTrigger>
          <TabsTrigger value="payment-methods" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Payment Methods</span>
          </TabsTrigger>
          <TabsTrigger value="billing-history" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Billing History</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscription" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You are currently on the Basic plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-muted/50">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">Basic Plan</h3>
                    <Badge>Active</Badge>
                  </div>
                  <p className="text-muted-foreground">Access to essential learning content and features</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>10 courses per month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Basic code editor</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Community support</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col items-center md:items-end gap-2">
                  <div className="text-3xl font-bold">$9.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                  <Button variant="outline" className="w-full md:w-auto">Change Plan</Button>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Next billing date</div>
                  <div className="font-medium">January 15, 2024</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">Billing cycle</div>
                  <div className="font-medium">Monthly</div>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                  <div className="text-sm">Payment method</div>
                  <div className="font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4" /> •••• 4242
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="w-full sm:w-auto">Cancel Subscription</Button>
              <Button variant="outline" className="w-full sm:w-auto">Pause Subscription</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upgrade Options</CardTitle>
              <CardDescription>Explore other plans to suit your needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Pro Plan</h3>
                    <Badge variant="outline">Popular</Badge>
                  </div>
                  <p className="text-2xl font-bold mt-2">$19.99<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                  <p className="text-muted-foreground mt-2">Enhanced learning experience with advanced features</p>
                  <Separator className="my-3" />
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Unlimited courses</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Advanced code editor</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Download courses for offline access</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-4">Upgrade to Pro</Button>
                </div>
                
                <div className="p-4 border rounded-lg hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Enterprise Plan</h3>
                    <Badge variant="secondary">Custom</Badge>
                  </div>
                  <p className="text-2xl font-bold mt-2">Custom Pricing</p>
                  <p className="text-muted-foreground mt-2">Tailored solutions for teams and organizations</p>
                  <Separator className="my-3" />
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Team management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Custom learning paths</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Dedicated account manager</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">Contact Sales</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment-methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-muted">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Visa ending in 4242</div>
                      <div className="text-sm text-muted-foreground">Expires 04/2025</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>Default</Badge>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-muted">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Mastercard ending in 8888</div>
                      <div className="text-sm text-muted-foreground">Expires 09/2024</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">Make default</Button>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Add Payment Method</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing Address</CardTitle>
              <CardDescription>Manage your billing address</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">123 Main Street</p>
                <p className="text-sm text-muted-foreground">Apt 4B</p>
                <p className="text-sm text-muted-foreground">New York, NY 10001</p>
                <p className="text-sm text-muted-foreground">United States</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Edit Address</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past invoices and payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                      <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Description</th>
                      <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                      <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-background">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">Dec 15, 2023</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">Monthly Subscription - Basic Plan</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">$9.99</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">Paid</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <a href="#" className="flex items-center text-blue-600 hover:text-blue-700">
                          <Download className="h-4 w-4 mr-1" /> PDF
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">Nov 15, 2023</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">Monthly Subscription - Basic Plan</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">$9.99</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">Paid</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <a href="#" className="flex items-center text-blue-600 hover:text-blue-700">
                          <Download className="h-4 w-4 mr-1" /> PDF
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">Oct 15, 2023</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">Monthly Subscription - Basic Plan</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">$9.99</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">Paid</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <a href="#" className="flex items-center text-blue-600 hover:text-blue-700">
                          <Download className="h-4 w-4 mr-1" /> PDF
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 