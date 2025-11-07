import { prisma } from "@/lib/prisma";

export default async function MedicineSummaryCards() {
  const totalMedicines = await prisma.medicineType.count();
  const batchQuantities = await prisma.medicineBatch.groupBy({
    by: ["medicineId"],
    _sum: { quantity: true },
  });

  type BatchQuantity = {
    medicineId: string;
    _sum: { quantity: number | null };
  };

  const goodStock = (batchQuantities as BatchQuantity[]).filter(
    (b) => (b._sum.quantity ?? 0) > 10
  ).length;

  const lowStock = (batchQuantities as BatchQuantity[]).filter(
    (b) => (b._sum.quantity ?? 0) >= 1 && (b._sum.quantity ?? 0) <= 10
  ).length;

  const outOfStock = (batchQuantities as BatchQuantity[]).filter(
    (b) => (b._sum.quantity ?? 0) === 0
  ).length;

  const medicine = [
    { id: 1, value: totalMedicines, name: "Total Medicines" },
    { id: 2, value: goodStock, name: "Good Stock" },
    { id: 3, value: lowStock, name: "Low Stock" },
    { id: 4, value: outOfStock, name: "Out of Stock" },
  ];

  return (
    <div className="m-4 flex flex-row justify-center gap-4">
      {medicine.map((item) => (
        <div key={item.id} className="card flex w-1/4 flex-col text-center">
          <span className="font-bold">{item.value}</span>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
