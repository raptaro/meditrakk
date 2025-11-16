import { NavUser } from "../nav-user";
import { SidebarFooter } from "../ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
  },
};

export default function SidebarFooterProfile() {
  return (
    <SidebarFooter>
      <NavUser user={data.user} />
    </SidebarFooter>
  );
}
