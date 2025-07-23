
// import { useState, useEffect } from 'react';
// import { format } from 'date-fns';


// const AdminOrdersPanel = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const ordersPerPage = 10;

//   console.log(localStorage.getItem('adminToken'))

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch('http://localhost:5010/api/orders', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
//           }
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch orders');
//         }
//         const data = await response.json();
//         setOrders(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = 
//       order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.shippingInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
//     return matchesSearch && matchesStatus;
//   });

//   // Calculate order total for display in table
//   const calculateOrderTotal = (order) => {
//     return order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   // Pagination logic
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
//   const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

//   const handleViewDetails = (order) => {
//     setSelectedOrder(order);
//   };

//   const handleCloseModal = () => {
//     setSelectedOrder(null);
//   };
//  const token=localStorage.getItem('adminToken')

//   const updateOrderStatus = async (orderId, newStatus) => {

    
    
//     try {
//       const response = await fetch(`http://localhost:5010/api/orders/${orderId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update order status');
//       }

//       const updatedOrder = await response.json();
//       setOrders(orders.map(order => 
//         order._id === updatedOrder._id ? updatedOrder : order
//       ));
      
//       // Update selected order if it's the one being modified
//       if (selectedOrder && selectedOrder._id === orderId) {
//         setSelectedOrder(updatedOrder);
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );
  
//   if (error) return (
//     <div className="text-red-500 text-center mt-8 p-4 bg-red-50 rounded-lg max-w-md mx-auto">
//       Error: {error}
//       <button 
//         onClick={() => window.location.reload()} 
//         className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Retry
//       </button>
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Orders Management</h1>
      
//       {/* Filters and Search */}
//       <div className="mb-6 flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <input
//             type="text"
//             placeholder="Search by order #, email, or name..."
//             className="w-full p-2 pl-10 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1); // Reset to first page when searching
//             }}
//           />
//           <svg 
//             className="absolute left-3 top-3 h-5 w-5 text-gray-400" 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
//         <div>
//           <select
//             className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             value={statusFilter}
//             onChange={(e) => {
//               setStatusFilter(e.target.value);
//               setCurrentPage(1); // Reset to first page when filtering
//             }}
//           >
//             <option value="all">All Statuses</option>
//             <option value="pending">Pending</option>
//             <option value="processing">Processing</option>
//             <option value="shipped">Shipped</option>
//             <option value="delivered">Delivered</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {currentOrders.length > 0 ? (
//                 currentOrders.map((order) => (
//                   <tr key={order._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       #{order.orderNumber}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {format(new Date(order.createdAt), 'MMM dd, yyyy')}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <div className="font-medium">{order.user.name}</div>
//                       <div className="text-gray-400">{order.user.email}</div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {order.items.length} item{order.items.length !== 1 ? 's' : ''}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       ${order.total.toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <select
//                         value={order.status}
//                         onChange={(e) => updateOrderStatus(order._id, e.target.value)}
//                         className={`text-sm px-2 py-1 rounded border ${
//                           order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
//                           order.status === 'processing' ? 'bg-blue-100 text-blue-800 border-blue-200' :
//                           order.status === 'shipped' ? 'bg-purple-100 text-purple-800 border-purple-200' :
//                           order.status === 'delivered' ? 'bg-green-100 text-green-800 border-green-200' :
//                           'bg-red-100 text-red-800 border-red-200'
//                         }`}
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="processing">Processing</option>
//                         <option value="shipped">Shipped</option>
//                         <option value="delivered">Delivered</option>
//                         <option value="cancelled">Cancelled</option>
//                       </select>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button
//                         onClick={() => handleViewDetails(order)}
//                         className="text-blue-600 hover:text-blue-900 mr-3 flex items-center"
//                       >
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                         Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
//                     No orders found matching your criteria
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination */}
//       {filteredOrders.length > ordersPerPage && (
//         <div className="flex justify-between items-center mt-4">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 border rounded disabled:opacity-50 flex items-center"
//           >
//             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//             </svg>
//             Previous
//           </button>
//           <div className="flex items-center space-x-2">
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`w-8 h-8 rounded-full ${currentPage === page ? 'bg-blue-500 text-white' : 'border'}`}
//               >
//                 {page}
//               </button>
//             ))}
//           </div>
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 border rounded disabled:opacity-50 flex items-center"
//           >
//             Next
//             <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>
//       )}

//       {/* Order Details Modal */}
//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h2 className="text-2xl font-bold">Order #{selectedOrder.orderNumber}</h2>
//                   <p className="text-gray-500">
//                     {format(new Date(selectedOrder.createdAt), 'MMMM do, yyyy h:mm a')}
//                   </p>
//                 </div>
//                 <button 
//                   onClick={handleCloseModal} 
//                   className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
//                 {/* Customer Information */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-lg font-semibold mb-3 border-b pb-2">Customer Information</h3>
//                   <div className="space-y-2">
//                     <p><span className="font-medium">Name:</span> {selectedOrder.user.name}</p>
//                     <p><span className="font-medium">Email:</span> {selectedOrder.user.email}</p>
//                     {selectedOrder.user.phone && (
//                       <p><span className="font-medium">Phone:</span> {selectedOrder.user.phone}</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Order Status */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-lg font-semibold mb-3 border-b pb-2">Order Status</h3>
//                   <div className="flex items-center space-x-4">
//                     <select
//                       value={selectedOrder.status}
//                       onChange={(e) => {
//                         updateOrderStatus(selectedOrder._id, e.target.value);
//                         setSelectedOrder({...selectedOrder, status: e.target.value});
//                       }}
//                       className="px-3 py-1 rounded border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="processing">Processing</option>
//                       <option value="shipped">Shipped</option>
//                       <option value="delivered">Delivered</option>
//                       <option value="cancelled">Cancelled</option>
//                     </select>
//                     <span className={`px-2 py-1 rounded text-xs ${
//                       selectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                       selectedOrder.status === 'processing' ? 'bg-blue-100 text-blue-800' :
//                       selectedOrder.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
//                       selectedOrder.status === 'delivered' ? 'bg-green-100 text-green-800' :
//                       'bg-red-100 text-red-800'
//                     }`}>
//                       {selectedOrder.status}
//                     </span>
//                   </div>
//                   <p className="mt-2"><span className="font-medium">Payment Method:</span> 
//                     <span className="capitalize ml-1">
//                       {selectedOrder.paymentMethod.replace('-', ' ')}
//                     </span>
//                   </p>
//                 </div>

//                 {/* Shipping Information */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-lg font-semibold mb-3 border-b pb-2">Shipping Information</h3>
//                   <div className="space-y-2">
//                     <p className="font-medium">{selectedOrder.shippingInfo.fullName}</p>
//                     <p>{selectedOrder.shippingInfo.address}</p>
//                     <p>{selectedOrder.shippingInfo.city}, {selectedOrder.shippingInfo.postalCode}</p>
//                     <p>{selectedOrder.shippingInfo.country}</p>
//                     <p><span className="font-medium">Phone:</span> {selectedOrder.shippingInfo.phone}</p>
//                     <p><span className="font-medium">Email:</span> {selectedOrder.shippingInfo.email}</p>
//                   </div>
//                 </div>

//                 {/* Payment Information */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-lg font-semibold mb-3 border-b pb-2">Payment Information</h3>
//                   <div className="space-y-2">
//                     <p><span className="font-medium">Method:</span> 
//                       <span className="capitalize ml-1">
//                         {selectedOrder.paymentMethod.replace('-', ' ')}
//                       </span>
//                     </p>
//                     {selectedOrder.paymentMethod === 'credit-card' && selectedOrder.paymentDetails && (
//                       <>
//                         <p><span className="font-medium">Card:</span> 
//                           {selectedOrder.paymentDetails.cardBrand} ending in {selectedOrder.paymentDetails.cardLastFour}
//                         </p>
//                         <p><span className="font-medium">Name on Card:</span> {selectedOrder.paymentDetails.cardholderName}</p>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Order Items */}
//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-3 border-b pb-2">Order Items ({selectedOrder.items.length})</h3>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {selectedOrder.items.map((item, index) => (
//                         <tr key={index}>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="flex items-center">
//                               {item.product.images && item.product.images.length > 0 && (
//                                 <img 
//                                   src={item.product.images[0].url} 
//                                   alt={item.product.name}
//                                   className="w-10 h-10 object-cover rounded mr-3"
//                                 />
//                               )}
//                               <div>
//                                 <div className="font-medium">{item.product.name}</div>
//                                 <div className="text-gray-500 text-sm">{item.product.category?.name || 'N/A'}</div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                             ${item.price.toFixed(2)}
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {item.quantity}
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
//                             ${(item.price * item.quantity).toFixed(2)}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Order Totals */}
//               <div className="mt-6 border-t pt-4">
//                 <h3 className="text-lg font-semibold mb-3">Order Totals</h3>
//                 <div className="max-w-xs ml-auto">
//                   <div className="flex justify-between py-2">
//                     <span>Subtotal:</span>
//                     <span>${selectedOrder.subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between py-2">
//                     <span>Shipping:</span>
//                     <span>${selectedOrder.shipping.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between py-2">
//                     <span>Tax:</span>
//                     <span>${selectedOrder.tax.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between py-2 font-bold text-lg border-t mt-2 pt-2">
//                     <span>Total:</span>
//                     <span>${selectedOrder.total.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminOrdersPanel;
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const AdminOrdersPanel = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const token = localStorage.getItem('adminToken');

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5010/api/orders', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setOrders(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [token]);

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5010/api/orders/${orderId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status: newStatus })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedOrder = await response.json();
      
      // Update orders state
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
      
      // Update selected order if it's the one being modified
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder(updatedOrder);
      }

      return true;
    } catch (err) {
      console.error('Failed to update order status:', err);
      setError(err.message);
      return false;
    }
  };

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingInfo?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Calculate order totals
  const calculateOrderTotal = (order) => {
    return order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state
  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading orders...</p>
      </div>
    </div>
  );
  
  // Error state
  if (error) return (
    <div className="text-red-500 text-center mt-8 p-4 bg-red-50 rounded-lg max-w-md mx-auto">
      <svg 
        className="h-6 w-6 text-red-500 mx-auto" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="mt-2 font-medium">Error loading orders</p>
      <p className="mt-1 text-sm">{error}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Orders Management</h1>
        <div className="text-sm text-gray-500">
          {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by order #, email, or name..."
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <svg 
            className="absolute left-3 top-3 h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex gap-4">
          <select
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.orderNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="font-medium">{order.user?.name || 'Guest'}</div>
                      <div className="text-gray-400">{order.user?.email || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${order.total?.toFixed(2) || calculateOrderTotal(order).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className={`text-sm px-3 py-1 rounded border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          order.status === 'shipped' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-800 border-green-200' :
                          'bg-red-100 text-red-800 border-red-200'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="refunded">Refunded</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="text-blue-600 hover:text-blue-900 mr-3 flex items-center transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center">
                    <svg 
                      className="h-12 w-12 mx-auto text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-2 text-gray-500">No orders found matching your criteria</p>
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('all');
                        setCurrentPage(1);
                      }}
                      className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Clear filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filteredOrders.length > ordersPerPage && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-lg disabled:opacity-50 flex items-center transition-colors hover:bg-gray-50"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg ${currentPage === page ? 'bg-blue-500 text-white' : 'border hover:bg-gray-50'} transition-colors`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-lg disabled:opacity-50 flex items-center transition-colors hover:bg-gray-50"
            >
              Next
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">Order #{selectedOrder.orderNumber}</h2>
                  <p className="text-gray-500">
                    {format(new Date(selectedOrder.createdAt), 'MMMM do, yyyy h:mm a')}
                  </p>
                </div>
                <button 
                  onClick={handleCloseModal} 
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                {/* Customer Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 border-b pb-2">Customer Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedOrder.user?.name || 'Guest'}</p>
                    <p><span className="font-medium">Email:</span> {selectedOrder.user?.email || 'N/A'}</p>
                    {selectedOrder.user?.phone && (
                      <p><span className="font-medium">Phone:</span> {selectedOrder.user.phone}</p>
                    )}
                  </div>
                </div>

                {/* Order Status */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 border-b pb-2">Order Status</h3>
                  <div className="flex items-center space-x-4">
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => {
                        updateOrderStatus(selectedOrder._id, e.target.value);
                        setSelectedOrder({...selectedOrder, status: e.target.value});
                      }}
                      className={`px-3 py-1 rounded border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        selectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        selectedOrder.status === 'processing' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        selectedOrder.status === 'shipped' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                        selectedOrder.status === 'delivered' ? 'bg-green-100 text-green-800 border-green-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="refunded">Refunded</option>
                    </select>
                    <span className={`px-2 py-1 rounded text-xs ${
                      selectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      selectedOrder.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      selectedOrder.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                      selectedOrder.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <p className="mt-2">
                    <span className="font-medium">Payment Method:</span> 
                    <span className="capitalize ml-1">
                      {selectedOrder.paymentMethod?.replace('-', ' ') || 'N/A'}
                    </span>
                  </p>
                  <p className="mt-1">
                    <span className="font-medium">Payment Status:</span> 
                    <span className="capitalize ml-1">
                      {selectedOrder.paymentStatus || 'N/A'}
                    </span>
                  </p>
                </div>

                {/* Shipping Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 border-b pb-2">Shipping Information</h3>
                  <div className="space-y-2">
                    <p className="font-medium">{selectedOrder.shippingInfo?.fullName || 'N/A'}</p>
                    <p>{selectedOrder.shippingInfo?.address || 'N/A'}</p>
                    <p>
                      {selectedOrder.shippingInfo?.city || 'N/A'}, 
                      {selectedOrder.shippingInfo?.postalCode && ` ${selectedOrder.shippingInfo.postalCode}`}
                    </p>
                    <p>{selectedOrder.shippingInfo?.country || 'N/A'}</p>
                    {selectedOrder.shippingInfo?.phone && (
                      <p><span className="font-medium">Phone:</span> {selectedOrder.shippingInfo.phone}</p>
                    )}
                    {selectedOrder.shippingInfo?.email && (
                      <p><span className="font-medium">Email:</span> {selectedOrder.shippingInfo.email}</p>
                    )}
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 border-b pb-2">Payment Information</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Method:</span> 
                      <span className="capitalize ml-1">
                        {selectedOrder.paymentMethod?.replace('-', ' ') || 'N/A'}
                      </span>
                    </p>
                    {selectedOrder.paymentMethod === 'credit-card' && selectedOrder.paymentDetails && (
                      <>
                        <p>
                          <span className="font-medium">Card:</span> 
                          {selectedOrder.paymentDetails.cardBrand} ending in {selectedOrder.paymentDetails.cardLastFour}
                        </p>
                        <p>
                          <span className="font-medium">Name on Card:</span> {selectedOrder.paymentDetails.cardholderName}
                        </p>
                      </>
                    )}
                    <p>
                      <span className="font-medium">Amount Paid:</span> 
                      <span className="ml-1">${selectedOrder.total?.toFixed(2) || '0.00'}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 border-b pb-2">
                  Order Items ({selectedOrder.items.length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              {item.product?.images?.[0]?.url && (
                                <img 
                                  src={item.product.images[0].url} 
                                  alt={item.product.name}
                                  className="w-10 h-10 object-cover rounded mr-3"
                                />
                              )}
                              <div>
                                <div className="font-medium">{item.product?.name || 'Product not available'}</div>
                                <div className="text-gray-500 text-sm">
                                  {item.product?.category?.name || 'N/A'}
                                </div>
                                {item.selectedSize && (
                                  <div className="text-gray-500 text-sm">
                                    Size: {item.selectedSize}
                                  </div>
                                )}
                                {item.selectedColor && (
                                  <div className="text-gray-500 text-sm">
                                    Color: {item.selectedColor}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${item.price?.toFixed(2) || '0.00'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                            ${((item.price || 0) * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Totals */}
              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Order Totals</h3>
                <div className="max-w-xs ml-auto space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${selectedOrder.subtotal?.toFixed(2) || calculateOrderTotal(selectedOrder).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>${selectedOrder.shipping?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${selectedOrder.tax?.toFixed(2) || '0.00'}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-${selectedOrder.discount?.toFixed(2) || '0.00'}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg border-t mt-2 pt-2">
                    <span>Total:</span>
                    <span>${selectedOrder.total?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              {selectedOrder.notes && (
                <div className="mt-6 border-t pt-4">
                  <h3 className="text-lg font-semibold mb-3">Order Notes</h3>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-yellow-800">{selectedOrder.notes}</p>
                  </div>
                </div>
              )}

              {/* Admin Actions */}
              <div className="mt-6 border-t pt-4 flex justify-end space-x-3">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Implement print functionality
                    window.print();
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Print Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPanel;