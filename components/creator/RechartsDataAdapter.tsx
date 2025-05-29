"use client";

// This utility helps convert our existing data formats to formats compatible with Recharts

/**
 * Converts time series data from arrays to Recharts format
 * @param data Array of values
 * @param labels Array of labels
 * @param valueKey Name of the value property in the resulting objects
 * @returns Array of objects in Recharts format
 */
export function convertTimeSeriesData(
  data: number[],
  labels: string[],
  valueKey: string = 'value'
): Array<Record<string, any>> {
  return data.map((value, index) => ({
    name: labels[index] || `Item ${index + 1}`,
    [valueKey]: value
  }));
}

/**
 * Converts category data to Recharts format
 * @param data Array of values
 * @param labels Array of category names
 * @param valueKey Name of the value property in the resulting objects
 * @returns Array of objects in Recharts format
 */
export function convertCategoryData(
  data: number[],
  labels: string[],
  valueKey: string = 'value'
): Array<Record<string, any>> {
  return data.map((value, index) => ({
    name: labels[index] || `Category ${index + 1}`,
    [valueKey]: value
  }));
}

/**
 * Converts pie chart data to Recharts format
 * @param data Array of values
 * @param labels Array of segment names
 * @param valueKey Name of the value property in the resulting objects
 * @returns Array of objects in Recharts format
 */
export function convertPieData(
  data: number[],
  labels: string[],
  valueKey: string = 'value'
): Array<Record<string, any>> {
  return data.map((value, index) => ({
    name: labels[index] || `Segment ${index + 1}`,
    [valueKey]: value
  }));
}

/**
 * Converts multi-series data to Recharts format
 * @param dataSeries Object with multiple data series
 * @param labels Array of labels for the x-axis
 * @returns Array of objects in Recharts format
 */
export function convertMultiSeriesData(
  dataSeries: Record<string, number[]>,
  labels: string[]
): Array<Record<string, any>> {
  return labels.map((label, index) => {
    const dataPoint: Record<string, any> = { name: label };
    
    // Add each series value to this data point
    Object.keys(dataSeries).forEach(seriesKey => {
      dataPoint[seriesKey] = dataSeries[seriesKey][index] || 0;
    });
    
    return dataPoint;
  });
}

/**
 * Formats a number for display (adds commas, limits decimals)
 * @param value The number to format
 * @param decimals Number of decimal places
 * @returns Formatted string
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

/**
 * Formats a currency value for display
 * @param value The number to format
 * @param currency Currency code
 * @param decimals Number of decimal places
 * @returns Formatted string
 */
export function formatCurrency(value: number, currency: string = 'USD', decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

/**
 * Formats a percentage for display
 * @param value The decimal value (e.g., 0.75 for 75%)
 * @param decimals Number of decimal places
 * @returns Formatted string
 */
export function formatPercent(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
} 