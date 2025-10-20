import { Button } from "@/components/ui/button";

export default function PatientInfoCard() {
  return (
    <div className="card flex flex-col p-6 h-64 w-96">
      <h1 className="font-bold text-xl mb-4">Patient Information</h1>
      <span>Name: John Doe</span>
      <span>Age: 20</span>
      <span>Phone Number: 0912 3456 789</span>
      <span>Reason: Check-up</span>
      <div className="flex flex-row justify-end gap-4 mt-auto">
        <Button variant="destructive">Cancel</Button>

        <Button variant="secondary">Edit</Button>
        <Button>Accept</Button>
      </div>
    </div>
  );
}
