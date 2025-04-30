import { useState, useEffect } from 'react';

interface ApiResponse {
  // Define this based on the real API structure
  message?: string;
  [key: string]: unknown;
}

function InputApiKey() {
  const [inputValue, setInputValue] = useState<string>(() => { return localStorage.getItem('userApiKey') || '' });
  const [hasStoredValue, setHasStoredValue] = useState<boolean>(false);
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
      if (!("message" in data)) {
        localStorage.setItem('userApiKey', inputValue);
      } 
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

  const handleClear = () => {
    localStorage.removeItem('userApiKey');
    setInputValue('');
    setHasStoredValue(false);
  };

  useEffect(() => {
    const key = localStorage.getItem('userApiKey');
    if (key != undefined) {
      setHasStoredValue(true);
    }
  }, [inputValue])

  return (
    <>
      <div style={{ padding: '20px' }}>
        <h1>GW2 API Key</h1>

        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your GW2 API Key..."
        />
        <button onClick={handleSubmit}>
          Submit
        </button>

        {hasStoredValue && (
          <button onClick={handleClear} style={{ marginLeft: '10px' }}>
            Forget API Key
          </button>
        )}

        <div>
          <h2>Instructions:</h2>
          <ol>
            <li>Open the <a href="https://account.arena.net/applications">official Guild Wars 2 API Key Management.</a></li>
            <li>Click on the "New Key" button.</li>
            <li>Enter a name of your choice and check all permission checkboxes.</li>
            <li>Copy your new API key.</li>
            <li>Paste it in the form above.</li>
          </ol>
        </div>

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
