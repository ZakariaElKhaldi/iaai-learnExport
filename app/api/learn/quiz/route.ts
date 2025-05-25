import { NextResponse } from 'next/server';

interface QuizAttempt {
  quizId: string;
  courseId: string;
  userId: string;
  selectedOption: string;
  isCorrect: boolean;
  timestamp: number;
}

// Simple in-memory storage for quiz attempts (would be replaced by database in production)
let quizAttempts: QuizAttempt[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.quizId || !body.courseId || !body.selectedOption) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // In a real app, we would get the user ID from an auth system
    const userId = body.userId || 'anonymous';
    
    // Create quiz attempt record
    const quizAttempt: QuizAttempt = {
      quizId: body.quizId,
      courseId: body.courseId,
      userId,
      selectedOption: body.selectedOption,
      isCorrect: body.isCorrect || false,
      timestamp: Date.now()
    };
    
    // Store the attempt
    quizAttempts.push(quizAttempt);
    
    // Return success response
    return NextResponse.json({
      success: true,
      attemptId: quizAttempts.length - 1,
      isCorrect: quizAttempt.isCorrect
    });
  } catch (error) {
    console.error('Error in quiz API:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing the quiz attempt' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // Get the URL parameters
    const url = new URL(request.url);
    const courseId = url.searchParams.get('courseId');
    const userId = url.searchParams.get('userId') || 'anonymous';
    
    // Filter attempts based on parameters
    let filteredAttempts = quizAttempts;
    
    if (courseId) {
      filteredAttempts = filteredAttempts.filter(
        attempt => attempt.courseId === courseId
      );
    }
    
    if (userId) {
      filteredAttempts = filteredAttempts.filter(
        attempt => attempt.userId === userId
      );
    }
    
    // Calculate statistics
    const totalAttempts = filteredAttempts.length;
    const correctAttempts = filteredAttempts.filter(
      attempt => attempt.isCorrect
    ).length;
    
    // Return statistics
    return NextResponse.json({
      totalAttempts,
      correctAttempts,
      successRate: totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0
    });
  } catch (error) {
    console.error('Error in quiz API:', error);
    return NextResponse.json(
      { error: 'An error occurred while retrieving quiz statistics' },
      { status: 500 }
    );
  }
} 