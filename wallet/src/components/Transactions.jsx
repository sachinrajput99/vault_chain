/* eslint-disable react/prop-types */
import TransactionItem from "./TransactionItem"

const Transactions = ({ transactions }) => {
  console.log(transactions);
  
  return (
    <>
      {
        transactions ? (
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