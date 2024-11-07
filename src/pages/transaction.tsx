import React, { useEffect, useState } from 'react'
import { LoadingScreen } from '../components/LoadingScreen';
import { Navbar } from '../components/Navbar';
import Hero from '../components/Hero';
import transactionService from '../services/transaction.services';
import toast from 'react-hot-toast';

function TransactionCard({ transaction }) {
  return (
    <div className="border border-slate-400 rounded-lg px-6 py-2 flex justify-between">
      <div className="grid">
        {transaction.transaction_type === "TOPUP" ? (
          <div className="text-green-400 text-2xl font-medium mb-2">+ Rp.{transaction.total_amount}</div>
        ) : (
          <div className="text-red-500 text-2xl font-medium mb-2">- Rp.{transaction.total_amount}</div>
        )}
        <span className='text-slate-400 text-xs'>{formatToWIB(transaction.created_on)}</span>
      </div>
      <p>{transaction.description}</p>
    </div>
  )
};

function formatToWIB(dateString) {
  // Buat objek Date dari string ISO
  const date = new Date(dateString);  

  // Daftar bulan dalam bahasa Indonesia
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Ambil komponen-komponen tanggal
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  // Ubah waktu ke WIB (UTC+7)
  const hours = (date.getUTCHours() + 7) % 24;
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${year} ${hours}:${minutes} WIB`;
}

interface Transaction {
  invoice_number: string,
  transaction_type: string,
  description: string,
  total_amount: number,
  created_on: Date,
}

export const Transaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTransactions();    
  }, [offset]);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await transactionService.getHistoryTransactions(token, offset, limit);
      if (response.status === 0) {
        if (transactions.length === 0) {
          setTransactions(response.data.records);
        } else {
          setTransactions((prevTransactions) => [
            ...prevTransactions,
            ...response.data.records,
          ]);
        }
      } else {
        console.log(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleShowMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <div className="">
      {isLoading && (<LoadingScreen />)}

      <Navbar />

      <div className="px-32 mx-auto">
        <Hero refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger} />

        <div className="mt-20">
          <h1 className='text-2xl font-semibold'>Semua Transaksi</h1>

          <div className="grid mt-8 gap-4">
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.invoice_number} transaction={transaction} />
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleShowMore}
              className="text-center text-red-500 mt-10 hover:underline">Show more</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction
