// Mock deployments data
export const deployments = [
  {
    id: "deploy1",
    name: "Customer Churn Predictor API",
    status: "Active",
    type: "REST API",
    model: "XGBoost Classifier",
    version: "v1.3",
    lastDeployed: "2023-06-02T14:30:00",
    endpoint: "https://api.example.com/v1/predict/churn",
    performance: {
      availability: 99.98,
      responseTime: 120, // ms
      requestsPerMinute: 42
    },
    resources: {
      instances: 2,
      cpu: "2 cores per instance",
      memory: "4GB per instance"
    }
  },
  {
    id: "deploy2",
    name: "Image Classifier Service",
    status: "Active",
    type: "gRPC Service",
    model: "EfficientNetB4",
    version: "v2.1",
    lastDeployed: "2023-06-07T10:15:00",
    endpoint: "grpc://ml-services.example.com/image-classifier",
    performance: {
      availability: 99.95,
      responseTime: 230, // ms
      requestsPerMinute: 28
    },
    resources: {
      instances: 3,
      cpu: "4 cores per instance",
      memory: "8GB per instance"
    }
  },
  {
    id: "deploy3",
    name: "Sentiment Analysis Endpoint",
    status: "Deploying",
    type: "REST API",
    model: "BERT Fine-tuned",
    version: "v1.0",
    lastDeployed: "2023-06-10T09:45:00",
    endpoint: "https://api.example.com/v1/analyze/sentiment",
    performance: {
      availability: null,
      responseTime: null,
      requestsPerMinute: null
    },
    resources: {
      instances: 1,
      cpu: "4 cores per instance",
      memory: "8GB per instance"
    }
  },
  {
    id: "deploy4",
    name: "Recommendation Engine",
    status: "Degraded",
    type: "Batch Processing",
    model: "Matrix Factorization",
    version: "v3.2",
    lastDeployed: "2023-05-20T16:20:00",
    endpoint: "s3://batch-jobs.example.com/recommendations/",
    performance: {
      availability: 92.31,
      responseTime: 5400, // ms (batch jobs are slower)
      requestsPerMinute: 0.5
    },
    resources: {
      instances: 1,
      cpu: "8 cores per instance",
      memory: "32GB per instance"
    }
  }
]; 