import { getServiceTypes } from "@/app/actions/service";
import { AddServiceClient } from "./add-service-client";

export default async function AddService() {
  const serviceTypes = await getServiceTypes();
  return <AddServiceClient serviceTypes={serviceTypes} />;
}
