// eslint-disable-next-line
import React from "react";
/* eslint-disable react/prop-types */
import TransactionItem from "./TransactionItem"

const Transactions = ({ transactions }) => {
  
  return (
    <>
      {
        transactions ? (
         transactions.map(tx => (
          <TransactionItem key={tx.hash} transaction={tx} />
         ))
        ) : (
          <span className="font-semibold">You seem to not have any transactions yet</span>
        )
      }
    </>
  )
}

export default Transactions