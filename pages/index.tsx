import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const address = useAddress()
  const { contract } = useContract("your contract address here")
  const {
    data: numberValues,
    isLoading
  } = useContractRead(contract, "retrieve")
  const [newValue, setNewValue] = useState(0);
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
        padding: "1rem",
        borderRadius: "1rem",
        backgroundColor: "#232323",
        minWidth: "400px"
      }}>
        <ConnectWallet style={{
          width: "100%"
        }} />

        <div>
          <h1>{isLoading ? "Loading..." : numberValues.toNumber()}</h1>
        </div>

        {
          address && (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%"
            }}>
              <input 
                type="number" 
                value={newValue} onChange={(e) => setNewValue(parseInt(e.target.value))} 
                style={{
                  marginBottom: "1rem",
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid black"
                }}
              />
              <Web3Button
                contractAddress="your contract address here"
                action={(contract) => contract.call("store", [newValue])}
                style={{
                  width: "100%",
                  backgroundColor:"royalblue",
                  color: "white"
                }}
                onSubmit={() => setNewValue(0)}
                onSuccess={() => alert("Success")}
                onError={(error) => alert(error.message)}
              >
                Set New Value
              </Web3Button>
            </div>
          )
        }

      </div>

    </div>
  );
};

export default Home;
