"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  CreditCard,
  Check,
  Building,
  CheckCircle,
  Lock,
  AlertCircle,
  Info,
  ArrowRight,
  Globe,
  DollarSign
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Payment method type
export type PaymentMethod = 'credit-card' | 'paypal' | 'bank-transfer';

// Order item interface
export interface OrderItem {
  id: string;
  title: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  quantity?: number;
  imageUrl?: string;
}

// Payment checkout props
export interface PaymentCheckoutProps {
  items: OrderItem[];
  currency?: string;
  currencySymbol?: string;
  onPaymentComplete?: (paymentDetails: any) => void;
  onCancel?: () => void;
  className?: string;
  hasPromoCode?: boolean;
  taxes?: number;
  termsUrl?: string;
  privacyUrl?: string;
}

// Form schema for credit card
const creditCardSchema = z.object({
  cardName: z.string().min(2, { message: "Cardholder name is required" }),
  cardNumber: z.string()
    .min(13, { message: "Card number is invalid" })
    .max(19, { message: "Card number is invalid" })
    .regex(/^[0-9]+$/, { message: "Card number must contain only digits" }),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, { message: "Expiry date must be in MM/YY format" }),
  cvv: z.string()
    .min(3, { message: "CVV must be 3 or 4 digits" })
    .max(4, { message: "CVV must be 3 or 4 digits" })
    .regex(/^[0-9]+$/, { message: "CVV must contain only digits" }),
  saveCard: z.boolean().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
});

export default function PaymentCheckout({
  items,
  currency = 'USD',
  currencySymbol = '$',
  onPaymentComplete,
  onCancel,
  className,
  hasPromoCode = true,
  taxes = 0,
  termsUrl = '#',
  privacyUrl = '#',
}: PaymentCheckoutProps) {
  // State management
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [promoCode, setPromoCode] = useState('');
  const [isPromoCodeApplied, setIsPromoCodeApplied] = useState(false);
  const [isPromoCodeValid, setIsPromoCodeValid] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Create form with validation
  const form = useForm<z.infer<typeof creditCardSchema>>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      saveCard: false,
      acceptTerms: false,
    },
  });

  // Calculate order totals
  const subtotal = items.reduce((acc, item) => {
    const price = item.discountedPrice ?? item.price;
    const quantity = item.quantity ?? 1;
    return acc + (price * quantity);
  }, 0);

  const taxAmount = (subtotal * taxes) / 100;
  const discountAmount = (subtotal * promoDiscount) / 100;
  const total = subtotal + taxAmount - discountAmount;

  // Format currency
  const formatCurrency = (amount: number) => {
    return `${currencySymbol}${amount.toFixed(2)}`;
  };

  // Form submission handler
  const onSubmit = async (data: z.infer<typeof creditCardSchema>) => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Simulate payment processing with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Successful payment
      if (onPaymentComplete) {
        onPaymentComplete({
          method: paymentMethod,
          details: paymentMethod === 'credit-card' ? {
            // Mask card number for security
            cardName: data.cardName,
            cardNumber: data.cardNumber.replace(/\d(?=\d{4})/g, '*'),
            expiryDate: data.expiryDate,
          } : {},
          total,
          items,
        });
      }
    } catch (error) {
      setPaymentError('There was a problem processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Apply promo code
  const handleApplyPromoCode = () => {
    // This would typically validate with an API
    if (promoCode.toUpperCase() === 'DISCOUNT20') {
      setIsPromoCodeApplied(true);
      setIsPromoCodeValid(true);
      setPromoDiscount(20); // 20% discount
    } else {
      setIsPromoCodeApplied(true);
      setIsPromoCodeValid(false);
      setPromoDiscount(0);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>Complete your purchase</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Order Summary */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-medium">Order Summary</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    {item.description && (
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(item.discountedPrice ?? item.price)}
                    </p>
                    {item.discountedPrice && (
                      <p className="text-sm text-muted-foreground line-through">
                        {formatCurrency(item.price)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            {hasPromoCode && (
              <div className="py-4">
                <Label htmlFor="promo-code">Promo Code</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    id="promo-code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    disabled={isPromoCodeApplied && isPromoCodeValid}
                  />
                  <Button
                    type="button"
                    variant={isPromoCodeApplied && isPromoCodeValid ? "outline" : "default"}
                    onClick={handleApplyPromoCode}
                    disabled={!promoCode || (isPromoCodeApplied && isPromoCodeValid)}
                  >
                    {isPromoCodeApplied && isPromoCodeValid ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Applied
                      </>
                    ) : (
                      "Apply"
                    )}
                  </Button>
                </div>
                {isPromoCodeApplied && !isPromoCodeValid && (
                  <p className="text-sm text-destructive mt-1.5">Invalid promo code. Please try again.</p>
                )}
              </div>
            )}

            {/* Order Totals */}
            <div className="space-y-1.5 pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              
              {taxes > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes ({taxes}%)</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
              )}
              
              {promoDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({promoDiscount}%)</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between font-medium text-lg pt-2">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)} className="mt-6">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="credit-card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Credit Card</span>
              </TabsTrigger>
              <TabsTrigger value="paypal" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">PayPal</span>
              </TabsTrigger>
              <TabsTrigger value="bank-transfer" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span className="hidden sm:inline">Bank Transfer</span>
              </TabsTrigger>
            </TabsList>

            {/* Credit Card Form */}
            <TabsContent value="credit-card">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="cardName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cardholder Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="1234 5678 9012 3456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="saveCard"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Save card for future purchases
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the{" "}
                            <a 
                              href={termsUrl} 
                              className="text-primary underline" 
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              terms and conditions
                            </a>
                            {" "}and{" "}
                            <a 
                              href={privacyUrl} 
                              className="text-primary underline" 
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              privacy policy
                            </a>
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {paymentError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        {paymentError}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex flex-col gap-2 mt-6">
                    <Button 
                      type="submit" 
                      disabled={isProcessing}
                      className="w-full"
                    >
                      {isProcessing ? (
                        <>Processing payment...</>
                      ) : (
                        <>
                          Pay {formatCurrency(total)}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    {onCancel && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={onCancel}
                        disabled={isProcessing}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </TabsContent>

            {/* PayPal Tab */}
            <TabsContent value="paypal">
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Connect with PayPal</AlertTitle>
                  <AlertDescription>
                    You'll be redirected to PayPal to complete your purchase securely.
                  </AlertDescription>
                </Alert>
                
                <Button 
                  className="w-full" 
                  onClick={() => {
                    // Simulate redirect to PayPal
                    setIsProcessing(true);
                    setTimeout(() => {
                      if (onPaymentComplete) {
                        onPaymentComplete({
                          method: 'paypal',
                          total,
                          items,
                        });
                      }
                      setIsProcessing(false);
                    }, 2000);
                  }}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>Connecting to PayPal...</>
                  ) : (
                    <>
                      Continue to PayPal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                
                {onCancel && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onCancel}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </TabsContent>

            {/* Bank Transfer Tab */}
            <TabsContent value="bank-transfer">
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Bank Transfer Information</AlertTitle>
                  <AlertDescription>
                    Please transfer the total amount to the following bank account:
                  </AlertDescription>
                </Alert>
                
                <div className="bg-muted p-4 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Name:</span>
                    <span className="font-medium">Learning Platform Inc.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Number:</span>
                    <span className="font-medium">1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bank Name:</span>
                    <span className="font-medium">International Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SWIFT/BIC:</span>
                    <span className="font-medium">INTLBNK123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reference:</span>
                    <span className="font-medium">ORDER-{Math.floor(Math.random() * 1000000)}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Please include the reference number in your transfer details. Your order will be processed once payment is confirmed.
                </p>
                
                <Button 
                  className="w-full" 
                  onClick={() => {
                    if (onPaymentComplete) {
                      onPaymentComplete({
                        method: 'bank-transfer',
                        total,
                        items,
                        status: 'pending',
                      });
                    }
                  }}
                >
                  I've Completed the Transfer
                  <Check className="ml-2 h-4 w-4" />
                </Button>
                
                {onCancel && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onCancel}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex-col space-y-4">
          <Alert className="border-muted">
            <Lock className="h-4 w-4" />
            <AlertDescription className="text-xs text-muted-foreground">
              All transactions are secure and encrypted. Your personal data is protected with industry-standard encryption.
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-wrap justify-center gap-2">
            <div className="w-12 h-8 bg-muted rounded flex items-center justify-center text-xs font-medium">
              Visa
            </div>
            <div className="w-12 h-8 bg-muted rounded flex items-center justify-center text-xs font-medium">
              MC
            </div>
            <div className="w-12 h-8 bg-muted rounded flex items-center justify-center text-xs font-medium">
              Amex
            </div>
            <div className="w-12 h-8 bg-muted rounded flex items-center justify-center text-xs font-medium">
              PayPal
            </div>
            <div className="w-12 h-8 bg-muted rounded flex items-center justify-center text-xs font-medium">
              Apple
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 