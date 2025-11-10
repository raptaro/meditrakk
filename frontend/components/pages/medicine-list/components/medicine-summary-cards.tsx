import { prisma } from "@/lib/prisma";

export default async function MedicineSummaryCards() {
  // Fetch all medicine types with their batches
  const medicineTypes = await prisma.medicineType.findMany({
    include: {
      medicineBatch: {
        select: { quantity: true, expiryDate: true },
      },
    },
  });

  // Calculate total available quantity per medicine type (only unexpired)
  const medicineQuantities = medicineTypes.map((type) => {
    const availableQuantity = type.medicineBatch
      .filter((b) => new Date(b.expiryDate) > new Date())
      .reduce((sum, b) => sum + (b.quantity ?? 0), 0);

    return { id: type.id, quantity: availableQuantity };
  });

  const totalMedicines = medicineTypes.length;

  const goodStock = medicineQuantities.filter((m) => m.quantity > 10).length;
  const lowStock = medicineQuantities.filter(
    (m) => m.quantity >= 1 && m.quantity <= 10
  ).length;
  const outOfStock = medicineQuantities.filter((m) => m.quantity === 0).length;

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
