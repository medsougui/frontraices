import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const Forbidden = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/'); // Replace '/your-link-here' with the actual route or URL
  };

  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center border border-red-200">
        <div className="flex justify-center mb-4">
          <AlertCircle className="text-red-500" size={48} />
        </div>
        <h1 className="text-3xl font-bold text-red-600 mb-2">403 - Forbidden</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please contact the administrator if you think this is a mistake.
        </p>
        <button
          onClick={handleRedirect}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Forbidden;
