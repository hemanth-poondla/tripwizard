// 🔁 Calculate balances for a single day of expenses
export const calculateDailyBalances = (expenses = [], members = []) => {
  const balanceSheet = {};

  members.forEach(member => {
    balanceSheet[member] = { paid: 0, owes: 0 };
  });

  expenses.forEach(exp => {
    const paidBy = exp?.paidBy;
    const totalAmount = parseFloat(exp?.total || 0);
    const amounts = exp?.split || [];

    if (paidBy && balanceSheet[paidBy]) {
      balanceSheet[paidBy].paid += totalAmount;
    }

    amounts.forEach(split => {
      const { name, amount } = split;
      if (balanceSheet[name]) {
        balanceSheet[name].owes += parseFloat(amount || 0);
      }
    });
  });

  Object.entries(balanceSheet).forEach(([member, data]) => {
    data.balance = data.paid - data.owes;
  });

  return balanceSheet;
};


// 🔽 Clean and simplify net settlements
export const simplifySettlements = (balances = {}) => {
  const settlements = [];
  const members = Object.keys(balances);

  const net = members.map(member => ({
    name: member,
    balance: parseFloat(balances[member]?.balance || 0)
  }));

  const creditors = net.filter(p => p.balance > 0).sort((a, b) => b.balance - a.balance);
  const debtors = net.filter(p => p.balance < 0).sort((a, b) => a.balance - b.balance);

  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const amount = Math.min(creditor.balance, -debtor.balance);

    if (amount >= 0.01) {
      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: parseFloat((amount).toFixed(2)) // ✅ keep 2 decimals, no rounding up to int
      });
    }

    debtor.balance += amount;
    creditor.balance -= amount;

    if (Math.abs(debtor.balance) < 0.01) i++;
    if (Math.abs(creditor.balance) < 0.01) j++;
  }

  return settlements;
};
