export function calculateEqualSplit(total, members) {
  if (!total || !Array.isArray(members) || members.length === 0) return [];

  const base = Math.floor((total / members.length) * 100) / 100;
  const remainder = Math.round((total - base * members.length) * 100);

  const split = members.map((name, i) => ({
    name,
    amount: (base + (i < remainder ? 0.01 : 0)).toFixed(2)
  }));

  return split;
}
