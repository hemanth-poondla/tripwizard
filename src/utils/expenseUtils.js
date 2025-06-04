
// Calculate balances for a single day of expenses
export const calculateDailyBalances = (expenses, members) => {
  const balanceSheet = {};

  members.forEach(member => {
    balanceSheet[member] = { paid: 0, owes: 0 };
  });

  expenses.forEach(exp => {
    if (exp.paidBy && balanceSheet[exp.paidBy]) {
      balanceSheet[exp.paidBy].paid += parseFloat(exp.totalAmount || 0);
    }
    Object.entries(exp.amounts).forEach(([member, amount]) => {
      if (balanceSheet[member]) {
        balanceSheet[member].owes += parseFloat(amount || 0);
      }
    });
  });

  // Compute final balance (paid - owes)
  Object.entries(balanceSheet).forEach(([member, data]) => {
    data.balance = data.paid - data.owes;
  });

  return balanceSheet;
};


// Simplify debts to show net settlements only
export const simplifySettlements = (balances) => {
  const settlements = [];
  const members = Object.keys(balances);

  const net = members.map(member => ({
    name: member,
    balance: balances[member].balance
  }));

  // Split creditors and debtors
  const creditors = net.filter(p => p.balance > 0).sort((a, b) => b.balance - a.balance);
  const debtors = net.filter(p => p.balance < 0).sort((a, b) => a.balance - b.balance);

  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const amount = Math.min(creditor.balance, -debtor.balance);

    settlements.push({
      from: debtor.name,
      to: creditor.name,
      amount: parseFloat(amount.toFixed(2))
    });

    debtor.balance += amount;
    creditor.balance -= amount;

    if (Math.abs(debtor.balance) < 0.01) i++;
    if (Math.abs(creditor.balance) < 0.01) j++;
  }

  return settlements;
};
