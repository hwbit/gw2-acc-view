import { useState } from 'react';

interface ApiResponse {
  // Define this based on the real API structure
  message?: string;
  [key: string]: unknown;
}

function InputApiKey() {
  const [inputValue, setInputValue] = useState<string>('');
  const [apiResult, setApiResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setApiResult(null);

    try {
      const response = await fetch(`http://localhost:4001/acc/update?key=${inputValue}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      setApiResult(data);

    } catch (err) {
      console.error('Fetch error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div style={{ padding: '20px' }}>
      <h1>Insert GW API Key</h1>
      <div>
        Placeholder text
      </div>
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleInputChange} 
        placeholder="Enter your GW2 API Key..." 
      />
      <button onClick={handleSubmit} style={{ marginLeft: '10px' }}>
        Submit
      </button>

      <div style={{ marginTop: '20px' }}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {apiResult && (
          <pre>{JSON.stringify(apiResult, null, 2)}</pre>
        )}
      </div>
    </div>

    </>
  );
}

export default InputApiKey;
