"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, ExternalLink, Copy, Check, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// This would normally come from a database or API
const tutorialData = {
  // HTML Tutorial
  "html": {
    title: "HTML Tutorial",
    description: "HTML is the standard markup language for Web pages.",
    introduction: "HTML is the standard markup language for creating Web pages. HTML describes the structure of a Web page. HTML consists of a series of elements. HTML elements tell the browser how to display the content.",
    chapters: [
      { id: "intro", title: "HTML Introduction", path: "/learn/html/intro" },
      { id: "editors", title: "HTML Editors", path: "/learn/html/editors" },
      { id: "basic", title: "HTML Basic", path: "/learn/html/basic" },
      { id: "elements", title: "HTML Elements", path: "/learn/html/elements" },
      { id: "attributes", title: "HTML Attributes", path: "/learn/html/attributes" },
      { id: "headings", title: "HTML Headings", path: "/learn/html/headings" },
      { id: "paragraphs", title: "HTML Paragraphs", path: "/learn/html/paragraphs" },
      { id: "styles", title: "HTML Styles", path: "/learn/html/styles" },
      { id: "formatting", title: "HTML Formatting", path: "/learn/html/formatting" },
      { id: "links", title: "HTML Links", path: "/learn/html/links" },
      { id: "images", title: "HTML Images", path: "/learn/html/images" },
      { id: "tables", title: "HTML Tables", path: "/learn/html/tables" },
      { id: "lists", title: "HTML Lists", path: "/learn/html/lists" },
      { id: "forms", title: "HTML Forms", path: "/learn/html/forms" },
    ],
    example: `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>`,
    content: `
      <h2>What is HTML?</h2>
      <ul>
        <li>HTML stands for Hyper Text Markup Language</li>
        <li>HTML is the standard markup language for creating Web pages</li>
        <li>HTML describes the structure of a Web page</li>
        <li>HTML consists of a series of elements</li>
        <li>HTML elements tell the browser how to display the content</li>
        <li>HTML elements label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", etc.</li>
      </ul>

      <h2>A Simple HTML Document</h2>

      <h3>Example Explained</h3>
      <ul>
        <li>The <code><!DOCTYPE html></code> declaration defines that this document is an HTML5 document</li>
        <li>The <code>&lt;html&gt;</code> element is the root element of an HTML page</li>
        <li>The <code>&lt;head&gt;</code> element contains meta information about the HTML page</li>
        <li>The <code>&lt;title&gt;</code> element specifies a title for the HTML page (which is shown in the browser's title bar or in the page's tab)</li>
        <li>The <code>&lt;body&gt;</code> element defines the document's body, and is a container for all the visible contents, such as headings, paragraphs, images, hyperlinks, tables, lists, etc.</li>
        <li>The <code>&lt;h1&gt;</code> element defines a large heading</li>
        <li>The <code>&lt;p&gt;</code> element defines a paragraph</li>
      </ul>

      <h2>What is an HTML Element?</h2>
      <p>An HTML element is defined by a start tag, some content, and an end tag:</p>
      <pre><code>&lt;tagname&gt;Content goes here...&lt;/tagname&gt;</code></pre>
      <p>The HTML <strong>element</strong> is everything from the start tag to the end tag:</p>
      <pre><code>&lt;h1&gt;My First Heading&lt;/h1&gt;</code></pre>
      <pre><code>&lt;p&gt;My first paragraph.&lt;/p&gt;</code></pre>
    `,
    exercises: [
      {
        id: "ex1",
        question: "Add a heading with the text \"Hello World\" to the document",
        startingCode: `<!DOCTYPE html>
<html>
<body>


</body>
</html>`,
        solution: `<!DOCTYPE html>
<html>
<body>

<h1>Hello World</h1>

</body>
</html>`,
        hint: "Use the h1 tag"
      },
      {
        id: "ex2",
        question: "Add a paragraph with the text \"My First Paragraph\" below the heading",
        startingCode: `<!DOCTYPE html>
<html>
<body>

<h1>Hello World</h1>

</body>
</html>`,
        solution: `<!DOCTYPE html>
<html>
<body>

<h1>Hello World</h1>
<p>My First Paragraph</p>

</body>
</html>`,
        hint: "Use the p tag"
      }
    ],
    color: "#E44D26"
  },
  // JavaScript Tutorial
  "javascript": {
    title: "JavaScript Tutorial",
    description: "JavaScript is the programming language of the Web.",
    introduction: "JavaScript is the world's most popular programming language. JavaScript is the programming language of the Web. JavaScript is easy to learn.",
    chapters: [
      { id: "intro", title: "JavaScript Introduction", path: "/learn/javascript/intro" },
      { id: "where-to", title: "JavaScript Where To", path: "/learn/javascript/where-to" },
      { id: "output", title: "JavaScript Output", path: "/learn/javascript/output" },
      { id: "syntax", title: "JavaScript Syntax", path: "/learn/javascript/syntax" },
      { id: "statements", title: "JavaScript Statements", path: "/learn/javascript/statements" },
      { id: "variables", title: "JavaScript Variables", path: "/learn/javascript/variables" },
      { id: "operators", title: "JavaScript Operators", path: "/learn/javascript/operators" },
      { id: "data-types", title: "JavaScript Data Types", path: "/learn/javascript/data-types" },
      { id: "functions", title: "JavaScript Functions", path: "/learn/javascript/functions" },
      { id: "objects", title: "JavaScript Objects", path: "/learn/javascript/objects" },
      { id: "events", title: "JavaScript Events", path: "/learn/javascript/events" },
      { id: "strings", title: "JavaScript Strings", path: "/learn/javascript/strings" },
      { id: "arrays", title: "JavaScript Arrays", path: "/learn/javascript/arrays" },
      { id: "dom", title: "JavaScript DOM", path: "/learn/javascript/dom" },
    ],
    example: `<button onclick="myFunction()">Click Me!</button>

<p id="demo"></p>

<script>
function myFunction() {
  document.getElementById("demo").innerHTML = "Hello JavaScript!";
}
</script>`,
    content: `
      <h2>What is JavaScript?</h2>
      <p>JavaScript is a programming language that adds interactivity to your website. This happens in games, in the behavior of responses when buttons are pressed or with data entry on forms; with dynamic styling; with animation, etc.</p>
      <p>JavaScript is the world's most popular programming language. JavaScript is the programming language of the Web. JavaScript is easy to learn.</p>

      <h2>Why Study JavaScript?</h2>
      <p>JavaScript is one of the 3 languages all web developers must learn:</p>
      <ol>
        <li>HTML to define the content of web pages</li>
        <li>CSS to specify the layout of web pages</li>
        <li>JavaScript to program the behavior of web pages</li>
      </ol>
      
      <h2>A Simple JavaScript Example</h2>
      <p>Here's a simple example of JavaScript code that displays "Hello, World!" in an alert box:</p>
      <pre><code>alert("Hello, World!");</code></pre>
      <p>When this code is executed in a web browser, it will create a dialog box with the message "Hello, World!".</p>
    `,
    exercises: [
      {
        id: "js-ex1",
        question: "Use JavaScript to change the content of a paragraph to 'Hello JavaScript!'",
        startingCode: `<!DOCTYPE html>
<html>
<body>

<p id="demo">This is a paragraph.</p>
<button onclick="myFunction()">Click Me</button>

<script>
function myFunction() {
  // Add your code here
}
</script>

</body>
</html>`,
        solution: `<!DOCTYPE html>
<html>
<body>

<p id="demo">This is a paragraph.</p>
<button onclick="myFunction()">Click Me</button>

<script>
function myFunction() {
  document.getElementById("demo").innerHTML = "Hello JavaScript!";
}
</script>

</body>
</html>`,
        hint: "Use document.getElementById() and the innerHTML property"
      }
    ],
    color: "#F7DF1E"
  },
  // CSS Tutorial
  "css": {
    title: "CSS Tutorial",
    description: "CSS is the language we use to style an HTML document.",
    introduction: "CSS is the language we use to style an HTML document. CSS describes how HTML elements should be displayed. CSS saves a lot of work. It can control the layout of multiple web pages all at once.",
    chapters: [
      { id: "intro", title: "CSS Introduction", path: "/learn/css/intro" },
      { id: "syntax", title: "CSS Syntax", path: "/learn/css/syntax" },
      { id: "selectors", title: "CSS Selectors", path: "/learn/css/selectors" },
      { id: "colors", title: "CSS Colors", path: "/learn/css/colors" },
      { id: "backgrounds", title: "CSS Backgrounds", path: "/learn/css/backgrounds" },
      { id: "borders", title: "CSS Borders", path: "/learn/css/borders" },
      { id: "margins", title: "CSS Margins", path: "/learn/css/margins" },
      { id: "padding", title: "CSS Padding", path: "/learn/css/padding" },
      { id: "display", title: "CSS Display", path: "/learn/css/display" },
      { id: "positioning", title: "CSS Positioning", path: "/learn/css/positioning" },
      { id: "flexbox", title: "CSS Flexbox", path: "/learn/css/flexbox" },
      { id: "grid", title: "CSS Grid", path: "/learn/css/grid" },
    ],
    example: `body {
  background-color: lightblue;
}

h1 {
  color: white;
  text-align: center;
}

p {
  font-family: verdana;
  font-size: 20px;
}`,
    content: `
      <h2>What is CSS?</h2>
      <ul>
        <li>CSS stands for Cascading Style Sheets</li>
        <li>CSS describes how HTML elements are to be displayed on screen, paper, or in other media</li>
        <li>CSS saves a lot of work. It can control the layout of multiple web pages all at once</li>
        <li>External stylesheets are stored in CSS files</li>
      </ul>

      <h2>CSS Syntax</h2>
      <p>A CSS rule consists of a selector and a declaration block:</p>
      <pre><code>selector {
  property: value;
  property: value;
}</code></pre>
      
      <h2>Three Ways to Insert CSS</h2>
      <ol>
        <li>External CSS</li>
        <li>Internal CSS</li>
        <li>Inline CSS</li>
      </ol>
      
      <h3>External CSS</h3>
      <p>With an external style sheet, you can change the look of an entire website by changing just one file!</p>
      <pre><code>&lt;head&gt;
  &lt;link rel="stylesheet" href="mystyle.css"&gt;
&lt;/head&gt;</code></pre>
    `,
    exercises: [
      {
        id: "css-ex1",
        question: "Add a style rule to make the background color of the page light blue",
        startingCode: `<!DOCTYPE html>
<html>
<head>
<style>
/* Add your style here */

</style>
</head>
<body>

<h1>My First CSS Page</h1>
<p>This is a paragraph.</p>

</body>
</html>`,
        solution: `<!DOCTYPE html>
<html>
<head>
<style>
/* Add your style here */
body {
  background-color: lightblue;
}
</style>
</head>
<body>

<h1>My First CSS Page</h1>
<p>This is a paragraph.</p>

</body>
</html>`,
        hint: "Use the body selector and the background-color property"
      }
    ],
    color: "#264de4"
  },
  // Python Tutorial
  "python": {
    title: "Python Tutorial",
    description: "Python is a popular programming language.",
    introduction: "Python is a popular programming language. It was created by Guido van Rossum, and released in 1991. Python is used for web development, AI, machine learning, operating systems, mobile application development, and video games.",
    chapters: [
      { id: "intro", title: "Python Introduction", path: "/learn/python/intro" },
      { id: "syntax", title: "Python Syntax", path: "/learn/python/syntax" },
      { id: "variables", title: "Python Variables", path: "/learn/python/variables" },
      { id: "data-types", title: "Python Data Types", path: "/learn/python/data-types" },
      { id: "numbers", title: "Python Numbers", path: "/learn/python/numbers" },
      { id: "strings", title: "Python Strings", path: "/learn/python/strings" },
      { id: "lists", title: "Python Lists", path: "/learn/python/lists" },
      { id: "if-else", title: "Python If-Else", path: "/learn/python/if-else" },
      { id: "while-loops", title: "Python While Loops", path: "/learn/python/while-loops" },
      { id: "for-loops", title: "Python For Loops", path: "/learn/python/for-loops" },
      { id: "functions", title: "Python Functions", path: "/learn/python/functions" },
    ],
    example: `# Simple Python example
if 5 > 2:
  print("Five is greater than two!")`,
    content: `
      <h2>What is Python?</h2>
      <p>Python is a popular programming language. It was created by Guido van Rossum, and released in 1991.</p>
      <p>It is used for:</p>
      <ul>
        <li>Web development (server-side)</li>
        <li>Software development</li>
        <li>Mathematics</li>
        <li>System scripting</li>
      </ul>

      <h2>What can Python do?</h2>
      <ul>
        <li>Python can be used on a server to create web applications.</li>
        <li>Python can be used alongside software to create workflows.</li>
        <li>Python can connect to database systems. It can also read and modify files.</li>
        <li>Python can be used to handle big data and perform complex mathematics.</li>
        <li>Python can be used for rapid prototyping, or for production-ready software development.</li>
      </ul>
      
      <h2>Why Python?</h2>
      <ul>
        <li>Python works on different platforms (Windows, Mac, Linux, Raspberry Pi, etc).</li>
        <li>Python has a simple syntax similar to the English language.</li>
        <li>Python has syntax that allows developers to write programs with fewer lines than some other programming languages.</li>
        <li>Python runs on an interpreter system, meaning that code can be executed as soon as it is written. This means that prototyping can be very quick.</li>
        <li>Python can be treated in a procedural way, an object-oriented way or a functional way.</li>
      </ul>
    `,
    exercises: [
      {
        id: "python-ex1",
        question: "Write a Python program that prints 'Hello, World!' to the screen",
        startingCode: `# Write your code here

`,
        solution: `# Write your code here
print("Hello, World!")`,
        hint: "Use the print() function"
      }
    ],
    color: "#3776AB"
  }
}; 

export default function TutorialPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [activeTab, setActiveTab] = useState("tutorial");
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [code, setCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  const tutorial = tutorialData[slug as keyof typeof tutorialData];
  
  if (!tutorial) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Tutorial not found</h1>
        <p className="mb-8">The requested tutorial is not available.</p>
        <Button asChild>
          <Link href="/learn">Back to tutorials</Link>
        </Button>
      </div>
    );
  }
  
  const currentExercise = tutorial.exercises[currentExerciseIndex];
  
  const handleCopy = () => {
    navigator.clipboard.writeText(tutorial.example);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const handleNextExercise = () => {
    if (currentExerciseIndex < tutorial.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCode(tutorial.exercises[currentExerciseIndex + 1].startingCode);
    }
  };
  
  const handlePrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setCode(tutorial.exercises[currentExerciseIndex - 1].startingCode);
    }
  };
  
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {tutorial.title}
          </h1>
          <span 
            className="ml-4 inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: tutorial.color }}
          />
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          {tutorial.description}
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-4 bg-transparent">
          <TabsTrigger value="tutorial" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:rounded-none">
            Tutorial
          </TabsTrigger>
          <TabsTrigger value="exercises" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:rounded-none">
            Exercises
          </TabsTrigger>
          <TabsTrigger value="examples" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:rounded-none">
            Examples
          </TabsTrigger>
          <TabsTrigger value="reference" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:rounded-none">
            Reference
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tutorial">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Tutorial Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{tutorial.introduction}</p>
                
                <div className="my-6 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg border">
                  <h3 className="font-semibold mb-4">Example</h3>
                  <div className="relative">
                    <pre className="p-4 bg-slate-100 dark:bg-slate-900 rounded-md overflow-x-auto">
                      <code className="text-sm font-mono">{tutorial.example}</code>
                    </pre>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="absolute top-2 right-2"
                      onClick={handleCopy}
                    >
                      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button size="sm" asChild>
                      <Link href={`/learn/${slug}/examples/example-1`}>
                        Try it Yourself <ExternalLink className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: tutorial.content }} />
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/learn">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Tutorials
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={`/learn/${slug}/exercises`}>
                    Exercises
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Chapter Navigation */}
            <div className="space-y-4 lg:col-span-1">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border">
                <h3 className="font-semibold text-lg mb-3">Tutorial Chapters</h3>
                <Accordion type="single" collapsible defaultValue="item-0">
                  <AccordionItem value="item-0">
                    <AccordionTrigger className="text-base hover:no-underline">
                      {tutorial.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-1 py-1">
                        {tutorial.chapters.map((chapter, index) => (
                          <Link
                            key={chapter.id}
                            href={chapter.path}
                            className={`block px-3 py-2 rounded-md text-sm ${
                              index === currentExerciseIndex
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-slate-100 dark:hover:bg-slate-700"
                            }`}
                          >
                            {chapter.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border">
                <h3 className="font-semibold text-lg mb-3">Related Tutorials</h3>
                <ul className="space-y-2">
                  {Object.entries(tutorialData)
                    .filter(([key]) => key !== slug)
                    .slice(0, 3)
                    .map(([key, data]) => (
                      <li key={key}>
                        <Link 
                          href={`/learn/${key}`}
                          className="flex items-center p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
                        >
                          <span 
                            className="h-2 w-2 rounded-full mr-2"
                            style={{ backgroundColor: data.color }}
                          />
                          <span className="text-sm">{data.title}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border">
                <h3 className="font-semibold text-lg mb-3">Learning Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href={`/learn/${slug}/reference`}
                      className="flex items-center p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {tutorial.title} Reference
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/learn/${slug}/examples`}
                      className="flex items-center p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {tutorial.title} Examples
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/learn/${slug}/exercises`}
                      className="flex items-center p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {tutorial.title} Exercises
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="exercises">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Exercises</h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Practice your {tutorial.title} skills with the following exercises.
                </p>
                
                <div className="bg-white dark:bg-slate-800 border rounded-lg overflow-hidden mb-6">
                  <div className="p-4 border-b bg-slate-50 dark:bg-slate-900">
                    <h3 className="font-semibold">Exercise {currentExerciseIndex + 1} of {tutorial.exercises.length}</h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">{currentExercise.question}</p>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Your Code:</label>
                      <div className="border rounded-md overflow-hidden">
                        <textarea
                          className="w-full h-60 p-4 font-mono text-sm bg-slate-50 dark:bg-slate-900 resize-none focus:outline-none"
                          value={code || currentExercise.startingCode}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <Button className="mr-2" onClick={() => setCode(currentExercise.solution)}>
                        Show Solution
                      </Button>
                      <Button variant="outline" onClick={() => setCode(currentExercise.startingCode)}>
                        Reset
                      </Button>
                      <div className="ml-auto flex">
                        <Button
                          variant="outline"
                          onClick={handlePrevExercise}
                          disabled={currentExerciseIndex === 0}
                          className="mr-2"
                        >
                          <ArrowLeft className="h-4 w-4 mr-1" />
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleNextExercise}
                          disabled={currentExerciseIndex === tutorial.exercises.length - 1}
                        >
                          Next
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                    
                    <details className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                      <summary className="font-medium cursor-pointer">Hint</summary>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{currentExercise.hint}</p>
                    </details>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("tutorial")}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Tutorial
                </Button>
                <Button asChild>
                  <Link href={`/learn/${slug}/examples`}>
                    View Examples
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="space-y-4 lg:col-span-1">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border">
                <h3 className="font-semibold text-lg mb-3">Exercises Progress</h3>
                <Progress value={(currentExerciseIndex + 1) / tutorial.exercises.length * 100} className="h-2 mb-2" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {currentExerciseIndex + 1} of {tutorial.exercises.length} exercises
                </p>
                
                <div className="mt-4">
                  <h4 className="font-medium text-sm mb-2">All Exercises:</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {tutorial.exercises.map((_, index) => (
                      <Button
                        key={index}
                        variant={index === currentExerciseIndex ? "default" : "outline"}
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setCurrentExerciseIndex(index);
                          setCode(tutorial.exercises[index].startingCode);
                        }}
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border">
                <h3 className="font-semibold text-lg mb-3">Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Read the exercise instructions carefully</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Use the "Show Solution" button if you get stuck</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Try to understand the solution, not just copy it</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Practice regularly to build your skills</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="examples">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-3">Examples</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">
              View interactive examples of {tutorial.title} code.
            </p>
            <Button asChild>
              <Link href={`/learn/examples?category=${slug}`}>
                Browse {tutorial.title} Examples
              </Link>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="reference">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-3">Reference</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">
              Complete reference documentation for {tutorial.title}.
            </p>
            <Button asChild>
              <Link href={`/learn/${slug}/reference`}>
                View {tutorial.title} Reference
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 