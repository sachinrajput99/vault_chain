/* eslint-disable react/prop-types */
import { transactionData } from "../data"
import TransactionItem from "./TransactionItem"

const Transactions = ({ transactions }) => {
  console.log(transactions);
  
  return (
    <>
      {
        transactionData ? (
         transactions.map(tx => (
          <TransactionItem key={tx.hash} transaction={tx} />
         ))
        ) : (
          <span>You seem to not have any transactions yet</span>
        )
      }
    </>
  )
}

export default Transactions