// Mock datasets for AI lab
export const datasets = [
  {
    id: "mnist",
    name: "MNIST Handwritten Digits",
    description: "70,000 grayscale images of handwritten digits (28x28 pixels)",
    size: "11MB",
    type: "Image Classification",
    format: "CSV",
    samples: 70000,
    features: 784,
    lastAccessed: "2 hours ago",
    favorite: true,
    thumbnailUrl: "/datasets/mnist_thumb.png"
  },
  {
    id: "cifar10",
    name: "CIFAR-10",
    description: "60,000 color images across 10 classes (32x32 pixels)",
    size: "170MB",
    type: "Image Classification",
    format: "Binary",
    samples: 60000,
    features: 3072,
    lastAccessed: "Yesterday",
    favorite: false,
    thumbnailUrl: "/datasets/cifar_thumb.png"
  },
  {
    id: "boston_housing",
    name: "Boston Housing",
    description: "Housing values in suburbs of Boston with 14 features",
    size: "57KB",
    type: "Regression",
    format: "CSV",
    samples: 506,
    features: 14,
    lastAccessed: "3 days ago",
    favorite: true,
    thumbnailUrl: "/datasets/boston_thumb.png"
  },
  {
    id: "imdb_reviews",
    name: "IMDB Movie Reviews",
    description: "50,000 movie reviews labeled by sentiment (positive/negative)",
    size: "80MB",
    type: "Text Classification",
    format: "Text",
    samples: 50000,
    features: "N/A",
    lastAccessed: "1 week ago",
    favorite: false,
    thumbnailUrl: "/datasets/imdb_thumb.png"
  },
  {
    id: "wine_quality",
    name: "Wine Quality",
    description: "Red and white wine samples with physicochemical properties",
    size: "250KB",
    type: "Classification/Regression",
    format: "CSV",
    samples: 6497,
    features: 12,
    lastAccessed: "2 weeks ago",
    favorite: false,
    thumbnailUrl: "/datasets/wine_thumb.png"
  }
]; 