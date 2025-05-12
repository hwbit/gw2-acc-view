import { useState, useEffect } from 'react';


function Inventory() {
  const [apiKey, setApiKey] = useState("");
  const [hasStoredValue, setHasStoredValue] = useState<boolean>(false);
  const [accountBank, setAccountBank] = useState<object[]>([{}]);
  const [accountSharedInventory, setAccountSharedInventory] = useState({});
  const [accountMaterials, setAccountMaterials] = useState({});

  const getInventory = async () => {
    const req = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const data = await fetch('http://localhost:4001/util/items/', req).then((response) => response.json());
    console.log(data)
    if (data) {
      setAccountBank(data.account_bank);
      setAccountSharedInventory(data.shared_inventory);
      setAccountMaterials(data.materials);
    }
  }

  const updateInventory = async () => {
    const req = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(`http://localhost:4001/acc/update?key=${apiKey}`, req).then((response) => response.json());
    await fetch(`http://localhost:4001/util/items/update`, req).then((response) => response.json());
    getInventory();
  };

  useEffect(() => {
    const key = localStorage.getItem('userApiKey');
    if (key != undefined) {
      setHasStoredValue(true);
      setApiKey(key);
    }
    getInventory();
  }, [])

  return (
    <>
      <h1>Inventory</h1>
      <div>
        {hasStoredValue &&
          (<p>
            <button onClick={updateInventory}>
              Refresh
            </button>
          </p>)
        }
        <h2>Bank</h2>

        <div
          className="grid gap-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 50px)",
          }}
        >
          {accountBank.map((item, index) => (
            <div
              key={index}
              style={{
                width: "50px",
                height: "50px",
                position: "relative",
                border: "1px solid #ccc",
                backgroundColor: item ? "transparent" : "#f0f0f0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item && (
                <>
                  <img
                    src={item.icon}
                    alt={`Icon ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      left: "4px",
                      fontSize: "0.75rem",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: "white",
                      padding: "1px 4px",
                      borderRadius: "4px",
                    }}
                  >
                    {item.count}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <h2>Shared Inventory</h2>
        {/* {JSON.stringify(accountSharedInventory)} */}
        <div
          className="grid gap-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 50px)",
          }}
        >
          {accountSharedInventory.map((item, index) => (
            <div
              key={index}
              style={{
                width: "50px",
                height: "50px",
                position: "relative",
                border: "1px solid #ccc",
                backgroundColor: item ? "transparent" : "#f0f0f0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item && (
                <>
                  <img
                    src={item.icon}
                    alt={`Icon ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      left: "4px",
                      fontSize: "0.75rem",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: "white",
                      padding: "1px 4px",
                      borderRadius: "4px",
                    }}
                  >
                    {item.count}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <h2>Materials</h2>
        {/* {JSON.stringify(accountMaterials)} */}

        <div
          className="grid gap-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 50px)",
          }}
        >
          {accountMaterials.map((item, index) => (
            <div
              key={index}
              style={{
                width: "50px",
                height: "50px",
                position: "relative",
                border: "1px solid #ccc",
                backgroundColor: item ? "transparent" : "#f0f0f0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item && (
                <>
                  <img
                    src={item.icon}
                    alt={`Icon ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      left: "4px",
                      fontSize: "0.75rem",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: "white",
                      padding: "1px 4px",
                      borderRadius: "4px",
                    }}
                  >
                    {item.count}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

      </div >
    </>
  )
}

export default Inventory;