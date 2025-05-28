// Mock training jobs
export const trainingJobs = [
  {
    id: "job1",
    name: "MNIST Classification Training",
    status: "Running",
    progress: 67,
    startTime: "2023-06-10T14:30:00",
    estimatedCompletion: "2023-06-10T15:45:00",
    dataset: "mnist",
    modelType: "CNN",
    resourceUsage: {
      cpu: "4 cores",
      memory: "8GB",
      gpu: "1x NVIDIA T4"
    }
  },
  {
    id: "job2",
    name: "Sentiment Analysis Fine-tuning",
    status: "Queued",
    progress: 0,
    startTime: null,
    estimatedCompletion: null,
    dataset: "imdb_reviews",
    modelType: "BERT",
    resourceUsage: {
      cpu: "8 cores",
      memory: "16GB",
      gpu: "2x NVIDIA T4"
    }
  },
  {
    id: "job3",
    name: "Boston Housing Regression",
    status: "Completed",
    progress: 100,
    startTime: "2023-06-09T10:15:00",
    estimatedCompletion: "2023-06-09T11:20:00",
    dataset: "boston_housing",
    modelType: "Random Forest",
    resourceUsage: {
      cpu: "4 cores",
      memory: "4GB",
      gpu: "None"
    }
  }
]; 