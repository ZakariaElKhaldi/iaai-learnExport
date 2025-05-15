"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  Copy, 
  ExternalLink
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Mock reference data for HTML
const htmlReferenceData = {
  title: "HTML Reference",
  description: "A complete reference guide to HTML elements and attributes",
  sections: [
    {
      title: "HTML Elements",
      items: [
        {
          name: "<a>",
          description: "Defines a hyperlink",
          example: `<a href="https://www.example.com">Visit Example.com</a>`,
          attributes: ["href", "target", "rel", "download", "hreflang", "type"]
        },
        {
          name: "<body>",
          description: "Defines the document's body",
          example: `<body>\n  <h1>Hello World</h1>\n  <p>This is a paragraph.</p>\n</body>`,
          attributes: []
        },
        {
          name: "<div>",
          description: "Defines a section in a document",
          example: `<div class="container">\n  <p>This is a paragraph inside a div.</p>\n</div>`,
          attributes: ["class", "id", "style"]
        },
        {
          name: "<h1> to <h6>",
          description: "Defines HTML headings",
          example: `<h1>This is heading 1</h1>\n<h2>This is heading 2</h2>`,
          attributes: ["class", "id", "style"]
        },
        {
          name: "<img>",
          description: "Defines an image",
          example: `<img src="image.jpg" alt="Description">`,
          attributes: ["src", "alt", "width", "height", "loading"]
        },
        {
          name: "<p>",
          description: "Defines a paragraph",
          example: `<p>This is a paragraph.</p>`,
          attributes: ["class", "id", "style"]
        },
        {
          name: "<ul>",
          description: "Defines an unordered list",
          example: `<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>`,
          attributes: ["type"]
        }
      ]
    },
    {
      title: "HTML Attributes",
      items: [
        {
          name: "class",
          description: "Specifies one or more class names for an element",
          example: `<div class="container highlight">This is a div with classes.</div>`,
          elements: ["All HTML elements"]
        },
        {
          name: "id",
          description: "Specifies a unique id for an element",
          example: `<div id="unique-element">This is a div with a unique ID.</div>`,
          elements: ["All HTML elements"]
        },
        {
          name: "style",
          description: "Specifies an inline CSS style for an element",
          example: `<p style="color: blue; font-size: 18px;">Blue paragraph text.</p>`,
          elements: ["All HTML elements"]
        },
        {
          name: "src",
          description: "Specifies the URL of the media resource",
          example: `<img src="image.jpg">`,
          elements: ["<img>", "<script>", "<iframe>", "<audio>", "<video>", "<source>"]
        },
        {
          name: "href",
          description: "Specifies the URL of the linked resource",
          example: `<a href="https://www.example.com">Visit Example</a>`,
          elements: ["<a>", "<link>", "<base>"]
        }
      ]
    }
  ]
};

// Mock reference data for CSS
const cssReferenceData = {
  title: "CSS Reference",
  description: "A complete reference guide to CSS properties and values",
  sections: [
    {
      title: "CSS Properties",
      items: [
        {
          name: "color",
          description: "Sets the color of text",
          example: `color: blue;\ncolor: #0000FF;\ncolor: rgb(0, 0, 255);`,
          values: ["color name", "hex value", "rgb value"]
        },
        {
          name: "background-color",
          description: "Sets the background color of an element",
          example: `background-color: yellow;\nbackground-color: #FFFF00;\nbackground-color: rgb(255, 255, 0);`,
          values: ["color name", "hex value", "rgb value"]
        },
        {
          name: "font-size",
          description: "Sets the size of the font",
          example: `font-size: 16px;\nfont-size: 1em;\nfont-size: 100%;`,
          values: ["px", "em", "rem", "%"]
        },
        {
          name: "margin",
          description: "Sets the margin area on all four sides of an element",
          example: `margin: 10px;\nmargin: 10px 20px;\nmargin: 10px 20px 30px 40px;`,
          values: ["length", "percentage", "auto"]
        },
        {
          name: "padding",
          description: "Sets the padding area on all four sides of an element",
          example: `padding: 10px;\npadding: 10px 20px;\npadding: 10px 20px 30px 40px;`,
          values: ["length", "percentage"]
        },
        {
          name: "display",
          description: "Specifies the display behavior of an element",
          example: `display: block;\ndisplay: inline;\ndisplay: flex;\ndisplay: grid;`,
          values: ["block", "inline", "flex", "grid", "none"]
        }
      ]
    },
    {
      title: "CSS Selectors",
      items: [
        {
          name: "Element Selector",
          description: "Selects all elements with the given element name",
          example: `p {\n  color: blue;\n}`,
          pattern: "element"
        },
        {
          name: "ID Selector",
          description: "Selects an element with a specific ID",
          example: `#myid {\n  color: blue;\n}`,
          pattern: "#id"
        },
        {
          name: "Class Selector",
          description: "Selects all elements with the given class",
          example: `.myclass {\n  color: blue;\n}`,
          pattern: ".class"
        },
        {
          name: "Universal Selector",
          description: "Selects all elements",
          example: `* {\n  margin: 0;\n  padding: 0;\n}`,
          pattern: "*"
        },
        {
          name: "Pseudo-class",
          description: "Selects elements based on a certain state",
          example: `a:hover {\n  color: red;\n}`,
          pattern: "element:pseudo-class"
        }
      ]
    }
  ]
};

// JavaScript reference data could be added similarly

// Define reference data for different language slugs
const referenceDataMap: Record<string, {
  title: string;
  description: string;
  sections: Array<{
    title: string;
    items: Array<{
      name: string;
      description: string;
      example: string;
      attributes?: string[];
      elements?: string[];
      values?: string[];
      pattern?: string;
      [key: string]: unknown;
    }>;
  }>;
}> = {
  "html": htmlReferenceData,
  "css": cssReferenceData,
  // Add more languages here
};

export default function ReferenceIndexPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  
  // Get reference data based on the slug
  const referenceData = referenceDataMap[slug] || {
    title: "Reference Not Found",
    description: "The requested reference guide is not available.",
    sections: []
  };
  
  // Filter items based on search query
  const getFilteredSections = () => {
    if (!searchQuery.trim()) return referenceData.sections;
    
    return referenceData.sections.map(section => {
      const filteredItems = section.items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      return {
        ...section,
        items: filteredItems
      };
    }).filter(section => section.items.length > 0);
  };
  
  // Get content for selected item
  const getSelectedItemContent = () => {
    for (const section of referenceData.sections) {
      const item = section.items.find(i => i.name === selectedItem);
      if (item) return { ...item, sectionTitle: section.title };
    }
    return null;
  };
  
  const selectedItemContent = getSelectedItemContent();
  const filteredSections = getFilteredSections();

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{referenceData.title}</h1>
        <p className="text-slate-600 dark:text-slate-400">
          {referenceData.description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder={`Search ${slug.toUpperCase()} reference...`}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <nav className="space-y-6">
            {filteredSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-sm uppercase text-slate-500 mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <button
                        onClick={() => setSelectedItem(item.name)}
                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm ${
                          selectedItem === item.name 
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-medium' 
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {filteredSections.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <p>No results found</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </Button>
              </div>
            )}
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          {selectedItemContent ? (
            <div className="bg-white dark:bg-slate-900 rounded-lg border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">{selectedItemContent.name}</h2>
                    <div className="text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded">
                      {selectedItemContent.sectionTitle}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    {selectedItemContent.description}
                  </p>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  asChild
                >
                  <a href={`/learn/${slug}/examples?filter=${selectedItemContent.name}`} target="_blank">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Examples
                  </a>
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              {/* Example */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Example</h3>
                <div className="relative">
                  <pre className="bg-slate-50 dark:bg-slate-900 border p-4 rounded-md font-mono text-sm overflow-x-auto">
                    {selectedItemContent.example}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedItemContent.example);
                      // You would add a toast notification here in a real app
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 border"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Attributes or Values Table */}
              {selectedItemContent.attributes && selectedItemContent.attributes.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Attributes</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Attribute</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedItemContent.attributes.map((attr: string, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono">{attr}</TableCell>
                          <TableCell>
                            <Link href={`/learn/${slug}/reference?search=${attr}`} className="text-blue-600 hover:underline">
                              View attribute details
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              
              {/* Elements that can use this attribute */}
              {selectedItemContent.elements && selectedItemContent.elements.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Used With</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedItemContent.elements.map((elem: string, index: number) => (
                      <div key={index} className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-sm font-mono">
                        {elem}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Possible values for CSS properties */}
              {selectedItemContent.values && selectedItemContent.values.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Values</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedItemContent.values.map((value: string, index: number) => (
                      <li key={index}>{value}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Pattern for CSS selectors */}
              {selectedItemContent.pattern && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Syntax</h3>
                  <div className="bg-slate-50 dark:bg-slate-900 border p-3 rounded-md font-mono text-sm">
                    {selectedItemContent.pattern}
                  </div>
                </div>
              )}
              
              {/* Browser Support section could be added here */}
              
              {/* Related Items */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold mb-4">Related Items</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {referenceData.sections.flatMap(section => 
                    section.items
                      .filter(item => item.name !== selectedItemContent.name)
                      .slice(0, 3)
                      .map((item, index) => (
                        <button 
                          key={index}
                          onClick={() => setSelectedItem(item.name)}
                          className="text-left p-3 rounded-md border hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                            {item.description}
                          </p>
                        </button>
                      ))
                  ).slice(0, 6)}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-lg border p-8 text-center">
              <h2 className="text-xl font-semibold mb-4">
                Select an item from the sidebar
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                Choose an item from the {referenceData.title} sidebar to view detailed information, examples, and usage.
              </p>
              
              {/* Popular items for quick access */}
              {referenceData.sections.length > 0 && (
                <>
                  <h3 className="font-medium mb-3">Popular Items</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {referenceData.sections.flatMap(section => 
                      section.items.slice(0, 2).map((item, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedItem(item.name)}
                          className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-sm"
                        >
                          {item.name}
                        </button>
                      ))
                    ).slice(0, 6)}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 