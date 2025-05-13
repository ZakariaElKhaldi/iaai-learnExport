export default function BillingHistoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Billing History</h1>
      <p className="text-gray-600">View your payment history and download invoices</p>
      
      <div className="bg-white rounded shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Dec 15, 2023
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Monthly Subscription - Basic Plan
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                $9.99
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Paid
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                <a href="#">Download</a>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Nov 15, 2023
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Monthly Subscription - Basic Plan
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                $9.99
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Paid
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                <a href="#">Download</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 