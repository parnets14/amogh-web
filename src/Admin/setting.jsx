export default function Settings() {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">System Settings</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button className="whitespace-nowrap py-4 px-6 border-b-2 border-blue-500 font-medium text-sm text-blue-600">
                General
              </button>
              <button className="whitespace-nowrap py-4 px-6 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Payment
              </button>
              <button className="whitespace-nowrap py-4 px-6 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Shipping
              </button>
              <button className="whitespace-nowrap py-4 px-6 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Notifications
              </button>
            </nav>
          </div>
  
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">Store Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                    <input
                      type="text"
                      defaultValue="Amogh Medical"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Email</label>
                    <input
                      type="email"
                      defaultValue="contact@amoghmedical.com"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Address</label>
                    <input
                      type="text"
                      defaultValue="123 Medical Ave, Boston, MA 02115"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
  
              <div>
                <h2 className="text-lg font-medium mb-4">Business Hours</h2>
                <div className="space-y-3">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <div key={day} className="flex items-center">
                      <div className="w-24">
                        <label className="text-sm font-medium text-gray-700">{day}</label>
                      </div>
                      <div className="flex-1 flex items-center space-x-2">
                        <input
                          type="time"
                          defaultValue="09:00"
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span>to</span>
                        <input
                          type="time"
                          defaultValue="17:00"
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="ml-4 flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                          <span className="ml-2 text-sm text-gray-700">Closed</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  
              <div>
                <h2 className="text-lg font-medium mb-4">Maintenance Mode</h2>
                <div className="flex items-center">
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <span className="ml-2 text-sm text-gray-700">Enable maintenance mode</span>
                  </label>
                </div>
                <p className="mt-1 text-sm text-gray-500">When enabled, only administrators can access the store front.</p>
              </div>
  
              <div className="pt-4 border-t border-gray-200 flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }