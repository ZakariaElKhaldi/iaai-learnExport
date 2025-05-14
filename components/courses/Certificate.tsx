"use client";

import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';
import { format } from 'date-fns';
import { 
  Download, 
  Share2, 
  Award, 
  CheckCircle, 
  Printer, 
  Mail, 
  Linkedin, 
  Twitter, 
  Facebook,
  Copy
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export interface CertificateProps {
  id: string;
  studentName: string;
  courseName: string;
  courseId: string;
  instructorName: string;
  instructorTitle?: string;
  completionDate: Date;
  issuedDate: Date;
  organizationName: string;
  organizationLogo?: string;
  duration?: string;
  skills?: string[];
  certificateNumber: string;
  signatureImageUrl?: string;
  verificationUrl?: string;
  className?: string;
}

export default function Certificate({
  id,
  studentName,
  courseName,
  courseId,
  instructorName,
  instructorTitle = 'Course Instructor',
  completionDate,
  issuedDate,
  organizationName,
  organizationLogo,
  duration,
  skills = [],
  certificateNumber,
  signatureImageUrl,
  verificationUrl,
  className,
}: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  
  // Handle printing the certificate
  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
    documentTitle: `${courseName} Certificate - ${studentName}`,
    onAfterPrint: () => console.log('Print completed'),
  });
  
  // Handle downloading as PDF
  const handleDownload = () => {
    handlePrint();
  };
  
  // Generate a downloadable image of the certificate
  const handleImageDownload = () => {
    if (!certificateRef.current) return;
    
    // In a real implementation, you would use html2canvas or a similar library
    // to convert the certificate to an image. For this example, we're just simulating.
    console.log('Downloading certificate as image');
    
    // Simulated download
    const link = document.createElement('a');
    link.download = `${courseName.replace(/\s+/g, '_')}_Certificate.png`;
    link.href = '#';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Copy certificate link to clipboard
  const copyToClipboard = () => {
    if (!verificationUrl) return;
    
    navigator.clipboard.writeText(verificationUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy certificate link:', err);
      });
  };
  
  // Share the certificate
  const shareCertificate = (platform: 'email' | 'linkedin' | 'twitter' | 'facebook') => {
    if (!verificationUrl) return;
    
    const shareText = `I've completed ${courseName} on ${organizationName}!`;
    let url = '';
    
    switch (platform) {
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(`Certificate of Completion: ${courseName}`)}&body=${encodeURIComponent(`${shareText} Check out my certificate: ${verificationUrl}`)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verificationUrl)}&title=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(verificationUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(verificationUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank');
    }
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return format(date, 'MMMM d, yyyy');
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      {/* Certificate Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-primary" />
            Certificate of Completion
          </CardTitle>
          <CardDescription>
            Congratulations on completing {courseName}!
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Certificate Actions */}
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm">Issued on {formatDate(issuedDate)}</span>
            </div>
            
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={handleDownload} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Download</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download certificate as PDF</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => shareCertificate('email')}>
                    <Mail className="h-4 w-4 mr-2" />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => shareCertificate('linkedin')}>
                    <Linkedin className="h-4 w-4 mr-2" />
                    <span>LinkedIn</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => shareCertificate('twitter')}>
                    <Twitter className="h-4 w-4 mr-2" />
                    <span>Twitter</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => shareCertificate('facebook')}>
                    <Facebook className="h-4 w-4 mr-2" />
                    <span>Facebook</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    <span>{isCopied ? 'Copied!' : 'Copy Link'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleImageDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    <span>Save as Image</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handlePrint}>
                    <Printer className="h-4 w-4 mr-2" />
                    <span>Print</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">View Certificate</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Certificate of Completion</DialogTitle>
                    <DialogDescription>
                      Your course completion certificate for {courseName}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="overflow-auto max-h-[70vh]">
                    {/* Embed the certificate for full view */}
                    <div className="mt-2 transform scale-90 origin-top">
                      <CertificateContent
                        ref={certificateRef}
                        studentName={studentName}
                        courseName={courseName}
                        instructorName={instructorName}
                        instructorTitle={instructorTitle}
                        completionDate={completionDate}
                        organizationName={organizationName}
                        organizationLogo={organizationLogo}
                        certificateNumber={certificateNumber}
                        signatureImageUrl={signatureImageUrl}
                        skills={skills}
                        duration={duration}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button onClick={handleDownload} className="gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* Certificate Preview */}
          <div className="relative overflow-hidden">
            {/* Semi-transparent overlay to encourage clicking "View Certificate" */}
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    View Full Certificate
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Certificate of Completion</DialogTitle>
                    <DialogDescription>
                      Your course completion certificate for {courseName}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="overflow-auto max-h-[70vh]">
                    {/* Embed the certificate for full view */}
                    <div className="mt-2 transform scale-90 origin-top">
                      <CertificateContent
                        ref={certificateRef}
                        studentName={studentName}
                        courseName={courseName}
                        instructorName={instructorName}
                        instructorTitle={instructorTitle}
                        completionDate={completionDate}
                        organizationName={organizationName}
                        organizationLogo={organizationLogo}
                        certificateNumber={certificateNumber}
                        signatureImageUrl={signatureImageUrl}
                        skills={skills}
                        duration={duration}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button onClick={handleDownload} className="gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Certificate Preview (Scaled down) */}
            <div className="transform scale-[0.6] origin-top mx-auto">
              <CertificateContent
                studentName={studentName}
                courseName={courseName}
                instructorName={instructorName}
                instructorTitle={instructorTitle}
                completionDate={completionDate}
                organizationName={organizationName}
                organizationLogo={organizationLogo}
                certificateNumber={certificateNumber}
                signatureImageUrl={signatureImageUrl}
                skills={skills}
                duration={duration}
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Separator />
          
          {/* Certificate Verification */}
          <div className="w-full flex justify-between items-center flex-wrap gap-2">
            <div className="text-sm">
              Certificate ID: <span className="font-mono">{certificateNumber}</span>
            </div>
            
            {verificationUrl && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Verify Certificate
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Certificate Verification</AlertDialogTitle>
                    <AlertDialogDescription>
                      This certificate can be verified by visiting the following URL or scanning the QR code below.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  
                  <div className="flex flex-col items-center justify-center py-4">
                    {/* QR Code would be generated here in a real implementation */}
                    <div className="h-48 w-48 bg-gray-200 mb-4 flex items-center justify-center">
                      <span className="text-xs text-gray-500">QR Code</span>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm break-all mb-2">{verificationUrl}</p>
                      <Button 
                        onClick={copyToClipboard} 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                      >
                        {isCopied ? 'Copied!' : 'Copy Link'}
                      </Button>
                    </div>
                  </div>
                  
                  <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <a 
                        href={verificationUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Visit Verification Page
                      </a>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardFooter>
      </Card>
      
      {/* Hidden for print only */}
      <div className="hidden">
        <div ref={certificateRef}>
          <CertificateContent
            studentName={studentName}
            courseName={courseName}
            instructorName={instructorName}
            instructorTitle={instructorTitle}
            completionDate={completionDate}
            organizationName={organizationName}
            organizationLogo={organizationLogo}
            certificateNumber={certificateNumber}
            signatureImageUrl={signatureImageUrl}
            skills={skills}
            duration={duration}
          />
        </div>
      </div>
    </div>
  );
}

// Certificate Content Component
const CertificateContent = React.forwardRef<
  HTMLDivElement,
  Omit<CertificateProps, 'id' | 'courseId' | 'issuedDate' | 'verificationUrl' | 'className'>
>(({
  studentName,
  courseName,
  instructorName,
  instructorTitle,
  completionDate,
  organizationName,
  organizationLogo,
  certificateNumber,
  signatureImageUrl,
  skills,
  duration,
}, ref) => {
  return (
    <div 
      ref={ref}
      className="certificate-container w-[800px] h-[600px] bg-white border-8 border-primary/10 p-8 text-center relative font-serif"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-12 border-b-2 border-primary/20" />
        <div className="absolute bottom-0 left-0 right-0 h-12 border-t-2 border-primary/20" />
        <div className="absolute left-0 top-0 bottom-0 w-12 border-r-2 border-primary/20" />
        <div className="absolute right-0 top-0 bottom-0 w-12 border-l-2 border-primary/20" />
      </div>
      
      {/* Organization Logo */}
      <div className="mb-4 flex justify-center">
        {organizationLogo ? (
          <Image 
            src={organizationLogo} 
            alt={organizationName} 
            width={120} 
            height={60} 
            className="object-contain" 
          />
        ) : (
          <div className="h-16 flex items-center justify-center">
            <h2 className="text-xl font-bold text-primary">{organizationName}</h2>
          </div>
        )}
      </div>
      
      {/* Certificate Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-1">Certificate of Completion</h1>
        <p className="text-sm text-muted-foreground">This certifies that</p>
      </div>
      
      {/* Student Name */}
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-slate-800 italic border-b-2 border-primary/20 mx-auto inline-block px-4 pb-1">
          {studentName}
        </h2>
      </div>
      
      {/* Course Info */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">has successfully completed the course</p>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{courseName}</h3>
        {duration && (
          <p className="text-sm text-muted-foreground">
            Course Duration: {duration}
          </p>
        )}
      </div>
      
      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">Skills Acquired</p>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Date and Signature */}
      <div className="mt-8 flex justify-between items-end px-12">
        <div className="text-center">
          <div className="border-t-2 border-slate-300 pt-2 px-8">
            <p className="text-sm">{format(completionDate, 'MMMM d, yyyy')}</p>
            <p className="text-xs text-muted-foreground">Date</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="h-16 mb-2">
            {signatureImageUrl ? (
              <Image 
                src={signatureImageUrl} 
                alt="Signature" 
                width={120} 
                height={60} 
                className="object-contain mx-auto" 
              />
            ) : (
              <div className="h-12 border-b-2 border-slate-300 w-36"></div>
            )}
          </div>
          <p className="text-sm">{instructorName}</p>
          <p className="text-xs text-muted-foreground">{instructorTitle}</p>
        </div>
      </div>
      
      {/* Certificate ID */}
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
        Certificate ID: {certificateNumber}
      </div>
      
      {/* Organization Name */}
      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
        {organizationName}
      </div>
    </div>
  );
}); 